<script setup lang="ts">
definePageMeta({
  middleware: ['authenticate-and-authorize-admin']
});

import { useAdminViewStore } from '~/stores/views/adminViewStore'

const adminViewStore = useAdminViewStore();
await adminViewStore.updateDashboard();

onBeforeMount(async () => {
  await adminViewStore.updateDashboard();
})

import AdminSidebar from '@/components/Blocks/AdminSidebar.vue';
import AdminHeader from '~/components/Blocks/AdminHeader.vue';

const recentSubmissions = useState<RecentSubmission[]>('recentSubmissions', () => []);
const pendingCases = useState('pendingCases', () => 0);
const scheduledConferences = useState('scheduledConferences', () => 0);
const totalIncidents = useState('totalIncidents', () => 0);
const unreadReports = useState('unreadReports', () => 0);

let trendsChart: Chart | null = null;

// Modified data loading function
const loadDashboardData = () => {
  // Get pending cases count
  pendingCases.value = incidentReport.filter(inc => inc.status === 'NotResolved').length;
  console.log('Pending Cases:', pendingCases.value);

  // Get scheduled conferences count
  scheduledConferences.value = caseConference.filter(conf => new Date(conf.conferenceDate) > new Date()).length;
  console.log('Scheduled Conferences:', scheduledConferences.value);

  // Get total incidents for current AY
  totalIncidents.value = incidentReport.filter(inc => inc.AY === '2024-2025').length;
  console.log('Total Incidents:', totalIncidents.value);

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
  console.log('Recent Submissions:', recentSubmissions.value);

  unreadReports.value = initialReport.filter(report => report.status === 'Unread').length;
  console.log('Unread Reports:', unreadReports.value);

  // Ensure the chart is updated when data changes
  if (trendsChart) {
    trendsChart.data.datasets[0].data = monthlyIncidentCounts.value;
    trendsChart.update();
  }
};

const showModal = ref(false); // State to control modal visibility
const selectedConferences = ref<CaseConference[]>([]); // Define with type

const unresolvedIncidentIds = computed(() => 
  incidentReport
    .filter(inc => inc.status === 'NotResolved')
    .map(inc => inc.incidentDocID)
);

const openModal = () => {
  const today = new Date();
  selectedConferences.value = caseConference
    .filter(conf => {
      const confDate = new Date(conf.conferenceDate);
      // Only include conferences for unresolved incidents
      return confDate > today && unresolvedIncidentIds.value.includes(conf.incidentID);
    })
    .map(conf => ({
      ...conf,
      conferenceDate: new Date(conf.conferenceDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }))
    .sort((a, b) => new Date(a.conferenceDate).getTime() - new Date(b.conferenceDate).getTime());
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const monthlyIncidentCounts = computed(() => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map(month => {
    return incidentReport.filter(inc => {
      const incidentMonth = new Date(inc.dateOfIncident).toLocaleString('en-US', { month: 'short' });
      return incidentMonth === month;
    }).length;
  });
});

const dashboardStats = computed<DashboardStat[]>(() => ([
  {
    label: 'Scheduled Conferences',
    value: caseConference.filter(conf => {
      const confDate = new Date(conf.conferenceDate);
      return confDate > new Date() && unresolvedIncidentIds.value.includes(conf.incidentID);
    }).length,
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
    label: 'Total Incidents',
    value: totalIncidents.value,
    icon: 'lucide:file-text',
    color: 'green'
  }
]));

const chartConfig = computed(() => ({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
    trendsChart = new Chart(trendsCtx, {
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

      <!-- Main Dashboard Content -->
      <main class="main-container">
        <section class="mt-10 flex gap-5">
          <article class="flex-col justify-between mt-1">
            <section class="flex gap-10 justify-between">
              <div class="flex flex-row w-[80%] justify-between">
                <div class="flex flex-col items-start gap-5 text-4xl font-bold text-green-900">
                  <div class="flex flex-row items-center gap-10">
                    <img loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/7c60d16a8e36909a44f9f80aa566bf7473375c2826a2dd18236b1b237a36b114?placeholderIfAbsent=true&apiKey=a61ecd0d5bec4c4f94bc2ce5eda3f7bc"
                      alt="Incidents icon" class="w-[30px] object-contain" />
                    <h2> {{ adminViewStore.dashBoardReportsCount }} Reports</h2>
                  </div>
                  <p class="short-description">View reports by class advisers and track report progress.</p>
                </div>
              </div>
              <div class="w-[20%] mt-5 text-white">
              <button class="w-full py-3 rounded-lg bg-728B78 ease" aria-label="View sections">
                View
              </button>
            </div>
            </section>
            <section class="flex gap-10 justify-between">
              <div class="flex flex-row  w-[80%] justify-between">
                <div class="flex flex-col items-start gap-5 text-4xl font-bold text-green-900">
                  <div class="flex flex-row items-center gap-10">
                    <img loading="lazy"
                      src="@/assets/icons/reading-book-dark.png"
                      alt="Incidents icon" class="w-[40px] object-contain" />
                    <h2> {{ adminViewStore.dashBoardStudentsCount }} Students</h2>
                  </div>
                  <p class="short-description">Search for a student and view relevant information.</p>
                </div>
              </div>
            </div>
            </section>
            <section class="flex gap-10 justify-between">
              <div class="flex flex-row w-[80%] justify-between">
                <div class="flex flex-col items-start gap-5 text-4xl font-bold text-green-900">
                  <div class="flex flex-row items-center gap-10">
                    <img loading="lazy"
                      src="@/assets/icons/approved-dark.png"
                      alt="Incidents icon" class="w-[30px] object-contain" />
                    <h2>{{ adminViewStore.dashBoardAccountApprovalsCount }} Account Approvals</h2>
                  </div>
                  <p class="short-description">See pending account approvals by class advisers and track account status.</p>
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

  <!-- Modal for Scheduled Conferences -->
  <ScheduledCaseConferences 
    v-if="showModal" 
    :conferences="selectedConferences"
    :unresolved-incidents="unresolvedIncidentIds"
    @close="closeModal"
  />
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
