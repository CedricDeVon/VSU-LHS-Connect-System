<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { Chart, registerables } from 'chart.js';
import AdminHeader from '~/components/Blocks/AdminHeader.vue';
import AdminSidebar from '~/components/Blocks/AdminSidebar.vue';
import { incidentReport } from '~/data/incident';
import { initialReport } from '~/data/initialReport';
import { caseConference } from '~/data/caseconference';

Chart.register(...registerables);

const recentSubmissions = useState('recentSubmissions', () => []);
const pendingCases = useState('pendingCases', () => 0);
const scheduledConferences = useState('scheduledConferences', () => 0);
const totalIncidents = useState('totalIncidents', () => 0);
const unreadReports = useState('unreadReports', () => 0);

// Modified data loading function
const loadDashboardData = () => {
  // Get pending cases count
  pendingCases.value = incidentReport.filter(inc => inc.status === 'NotResolved').length;

  // Get scheduled conferences count
  scheduledConferences.value = caseConference.filter(conf => new Date(conf.conferenceDate) > new Date()).length;

  // Get total incidents for current AY
  totalIncidents.value = incidentReport.filter(inc => inc.AY === '2024-2025').length;

  // Get recent submissions 
  recentSubmissions.value = initialReport
    .filter(report => !report.isDraft)
    .sort((a, b) => new Date(b.dateReported).getTime() - new Date(a.dateReported).getTime())
    .slice(0, 5)
    .map(report => ({
      title: report.narrativeReport.substring(0, 60) + '...',
      people: report.peopleInvolved.join(', '),
      date: new Date(report.dateReported).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      status: report.status
    }));

  unreadReports.value = initialReport.filter(report => report.status === 'Unread').length;
};

const monthlyIncidentCounts = computed(() => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  return months.map(month => {
    return incidentReport.filter(inc => {
      const incidentMonth = new Date(inc.dateOfIncident).toLocaleString('en-US', { month: 'short' });
      return incidentMonth === month;
    }).length;
  });
});

const dashboardStats = computed(() => ([
  {
    label: 'Scheduled Conferences',
    value: scheduledConferences.value,
    icon: 'lucide:calendar',
    color: 'blue'
  },
  {
    label: 'Pending Cases',
    value: pendingCases.value,
    icon: 'lucide:alert-circle',
    color: 'yellow'
  },
  {
    label: 'Unread Report Submissions',
    value: unreadReports.value,
    icon: 'lucide:mail',
    color: 'red'
  },
  {
    label: 'Total Incident Reports',
    value: totalIncidents.value,
    icon: 'lucide:file-text',
    color: 'green'
  }
]));

const chartConfig = computed(() => ({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{
    label: 'Monthly Incidents',
    data: monthlyIncidentCounts.value,
    borderColor: '#265630',
    backgroundColor: 'rgba(38, 86, 48, 0.1)',
    tension: 0.4,
    fill: true
  }]
}));

onMounted(() => {
  loadDashboardData();
  
  const trendsCtx = document.getElementById('trendsChart') as HTMLCanvasElement;
  if (trendsCtx) {
    new Chart(trendsCtx, {
      type: 'line',
      data: chartConfig.value,
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(38, 86, 48, 0.9)',
            titleColor: 'white',
            bodyColor: 'white',
            padding: 12,
            cornerRadius: 8
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(0,0,0,0.05)' }
          },
          x: { grid: { display: false } }
        }
      }
    });
  }
});

const gradientColors = {
  green: 'from-green-50 to-green-100',
  yellow: 'from-amber-50 to-amber-100',
  blue: 'from-blue-50 to-blue-100',
  red: 'from-red-50 to-red-100'
};
</script>

<template>
  <div class="flex h-screen bg-[#FFFEF1]">
    <AdminSidebar />
    <div class="flex-1 overflow-hidden">
      <AdminHeader />

      <main class="p-8 overflow-y-auto h-[calc(100vh-64px)] space-y-6">
        <!-- Academic Year Header -->
        <div class="text-center text-lg font-semibold text-gray-600">
          1st Semester, Academic Year 2024-2025
        </div>

        <!-- Welcome Banner -->
        <div class="relative p-8 rounded-xl bg-gradient-to-r from-[#1B4221] to-[#265630] text-white">
          <div class="relative z-10">
            <h1 class="text-3xl font-bold mb-2">Welcome back, Admin</h1>
            <p class="text-green-100 opacity-90">
              Monitor and manage student incidents, track cases, and schedule conferences.
            </p>
          </div>
          <div class="absolute inset-0 opacity-10">
            <div class="absolute inset-0 bg-repeat pattern-grid"></div>
          </div>
        </div>

        <!-- Statistics Grid - now 4 items -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div v-for="stat in dashboardStats" :key="stat.label"
            class="relative bg-gradient-to-br rounded-xl p-6 shadow-sm border border-gray-100"
            :class="gradientColors[stat.color]">
            <div class="flex items-start space-x-4">
              <div class="p-3 bg-white/80 rounded-lg shadow-sm">
                <Icon :name="stat.icon" class="w-6 h-6" :class="`text-${stat.color}-600`" />
              </div>
              <div>
                <p class="text-sm font-medium text-gray-600">{{ stat.label }}</p>
                <p class="text-2xl font-bold text-gray-900 mt-1">{{ stat.value }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Charts and Quick Actions in 2-column layout -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Incident Trends Chart -->
          <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
            <div class="p-4 border-b border-gray-100">
              <h3 class="text-lg font-semibold text-gray-900">Incident Trends</h3>
              <p class="text-sm text-gray-500">Monthly incident reports (2024)</p>
            </div>
            <div class="p-4">
              <canvas id="trendsChart" height="200"></canvas>
            </div>
          </div>

          <div class="bg-white rounded-xl h-auto shadow-sm border border-gray-100">
            <div class="p-4 border-b border-gray-100">
              <h3 class="text-lg font-semibold text-gray-900">Quick Actions</h3>
            </div>
            <div class="p-4 flex flex-col gap-2">
              <NuxtLink v-for="(action, idx) in [
                { text: 'New Report', link: '/admin/reports/create', icon: 'lucide:file-plus' },
                { text: 'Schedule Conference', link: '/admin/conferences/schedule', icon: 'lucide:calendar-plus' },
                { text: 'View Incident Reports', link: '/admin/incidental', icon: 'lucide:clipboard-list' },
                { text: 'View Anecdotal Reports', link: '/admin/anecdotal', icon: 'lucide:book-open' },
                { text: 'Manage Users', link: '/admin/users', icon: 'lucide:users' },
                { text: 'Make Announcements', link: '/admin/announcements', icon: 'lucide:megaphone' }
              ]" 
                :key="idx" 
                :to="action.link"
                class="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 text-gray-700 hover:text-green-700 transition-colors">
                <Icon :name="action.icon" class="w-5 h-5" />
                <span class="font-medium">{{ action.text }}</span>
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100">
          <div class="p-4 border-b border-gray-100">
            <h3 class="text-lg font-semibold text-gray-900">Recent Report Submissions by Advisers</h3>
          </div>
          <div class="divide-y divide-gray-100">
            <div v-for="(activity, idx) in recentSubmissions" :key="idx" class="p-4 hover:bg-gray-50 transition-colors">
              <div class="flex items-start space-x-3">
                <div class="flex-1">
                  <p class="font-medium text-gray-900">{{ activity.title }}</p>
                  <p class="text-sm text-gray-600 mt-1">Students Involved: {{ activity.people }}</p>
                  <p class="text-xs text-gray-500 mt-1">{{ activity.date }}</p>
                </div>
                <span class="px-2 py-1 text-xs font-medium rounded-full"
                  :class="activity.status === 'Read' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'">
                  {{ activity.status }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.dashboard-card {
  @apply bg-white rounded-xl shadow-sm border border-gray-100;
  transition: all 0.3s ease-in-out;
}

.section-header {
  @apply text-xl font-semibold text-gray-900 mb-1;
}

.section-subtext {
  @apply text-sm text-gray-500;
}

/* Remove the problematic transition-all class and use standard CSS instead */
.hover-animate {
  transition: all 0.3s ease-in-out;
}

.pattern-grid {
  background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

.animate-fade-in-delayed {
  animation: fadeIn 0.5s ease-out 0.2s both;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}


.transition-all {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hover-lift {
  @apply transform transition-transform duration-300;
}

.hover-lift:hover {
  transform: translateY(-2px);
}
</style>
