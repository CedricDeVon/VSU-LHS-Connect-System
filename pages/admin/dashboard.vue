<script setup lang="ts">
definePageMeta({
  middleware: ['authenticate-and-authorize-admin', 'admin-dashboard']
});

import { ref, computed, onMounted } from 'vue';
import { Chart, registerables } from 'chart.js';
import AdminHeader from '~/components/Blocks/AdminHeader.vue';
import AdminSidebar from '~/components/Blocks/AdminSidebar.vue';
import PendingCases from '~/components/Modals/Dashboard/PendingCases.vue';
import PendingInitialReports from '~/components/Modals/Dashboard/PendingInitialReports.vue';
import ScheduledCaseConferences from '~/components/Modals/Dashboard/ScheduledCaseConferences.vue'; // Import the modal component
import UnreadReportSubmissions from '~/components/Modals/Dashboard/UnreadReportSubmissions.vue';
import MakeAnnouncements from '~/components/Modals/Dashboard/MakeAnnouncements.vue'; // Add import
import CreateReportFromDashboard from '~/components/Modals/Dashboard/CreateReportFromDashboard.vue'; // Add import
import ScheduleConferenceFromDashboard from '~/components/Modals/Dashboard/ScheduleConferenceFromDashboard.vue'; // Add import
import { useAdminViewStore } from '~/stores/views/adminViewStore';

const adminViewStore = useAdminViewStore();
// await adminViewStore.updateDashboard();

Chart.register(...registerables);

interface DashboardStat {
  label: string;
  value: number;
  icon: string;
  color: 'blue' | 'yellow' | 'red' | 'green';
}

interface RecentSubmission {
  title: string;
  people: string;
  date: string;
  status: 'Read' | 'Unread';
}

const recentSubmissions = useState('recentSubmissions', () => []);
const pendingCases = useState('pendingCases', () => 0);
const scheduledConferences = useState('scheduledConferences', () => 0);
const totalIncidents = useState('totalIncidents', () => 0);
const unreadReports = useState('unreadReports', () => 0);

let trendsChart: Chart | null = null;

// Modified async data loading function
const loadDashboardData = async () => {
  // await adminViewStore.updateDashboard();

  // Get pending cases count
  pendingCases.value = adminViewStore.dashBoardIncidentReports.map(a => { return a }).filter((inc: any) => inc.data.status === 'NotResolved').length;
  // console.log('Pending Cases:', pendingCases.value);

  // Get scheduled conferences count
  scheduledConferences.value = adminViewStore.dashBoardCaseConferences.filter((conf: any) => new Date(conf.data.conferenceDate) > new Date() && conf.data.incident.data.status === 'NotResolved').length;
  // console.log('Scheduled Conferences:', scheduledConferences.value);

  // Get total incidents for current AY
  totalIncidents.value = adminViewStore.dashBoardIncidentReports.length;
  // console.log('Total Incidents:', totalIncidents.value);

  // Get recent submissions 
  recentSubmissions.value = adminViewStore.dashBoardInitialReports
    .filter((report: any) => !report.data.isDraft)
    .sort((a: any, b: any) => new Date(b.data.dateReported).getTime() - new Date(a.data.dateReported).getTime())
    .slice(0, 5)
    .map((report: any) => ({
      id: report.id,
      title: report.data.narrativeReport.substring(0, 60) + '...',
      people: report.data.peopleInvolved.join(', '),
      date: new Date(report.data.dateReported).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      status: report.data.status
    }));
  // console.log('Recent Submissions:', recentSubmissions.value);

  unreadReports.value = adminViewStore.dashBoardInitialReports.filter((report: any) => report.data.status === 'Unread' && !report.data.isDraft).length;
  // console.log('Unread Reports:', unreadReports.value);

  // Ensure the chart is updated when data changes
  if (trendsChart) {
    trendsChart.data.datasets[0].data = monthlyIncidentCounts.value;
    trendsChart.update();
  }
};

const showModal = ref(false); // State to control modal visibility
const selectedConferences = ref([]); // Define with type

const unresolvedIncidentIds = computed(() => 
  adminViewStore.dashBoardIncidentReports
    .filter((inc: any) => inc.data.status === 'NotResolved')
    .map((inc: any) => inc.id)
);

const openModal = () => {
  const today = new Date();
  selectedConferences.value = adminViewStore.dashBoardCaseConferences
    .filter((conf: any) => new Date(conf.data.conferenceDate) > new Date() && conf.data.incident.data.status === 'NotResolved')
    .map((conf: any) => ({
      ...conf,
      conferenceDate: new Date(conf.data.conferenceDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }))
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

// Add these computed properties
const currentAcademicYear = computed(() => {
  // Current AY is in format "2024-2025"
  return "2024-2025"; // This should come from your system settings/state
});

const academicYearMonths = computed(() => {
  const [startYear, endYear] = currentAcademicYear.value.split('-');
  return [
    'Jun ' + startYear,
    'Jul ' + startYear,
    'Aug ' + startYear,
    'Sep ' + startYear,
    'Oct ' + startYear,
    'Nov ' + startYear,
    'Dec ' + startYear,
    'Jan ' + endYear,
    'Feb ' + endYear,
    'Mar ' + endYear,
    'Apr ' + endYear,
    'May ' + endYear
  ];
});

// Update monthlyIncidentCounts computed
const monthlyIncidentCounts = computed(() => {
  const [startYear, endYear] = adminViewStore.dashBoardTimeline.data.schoolYear.split('-');
  const months = [
    { month: 6, year: parseInt(startYear) },  // June
    { month: 7, year: parseInt(startYear) },  // July
    { month: 8, year: parseInt(startYear) },  // August
    { month: 9, year: parseInt(startYear) },  // September
    { month: 10, year: parseInt(startYear) }, // October
    { month: 11, year: parseInt(startYear) }, // November
    { month: 12, year: parseInt(startYear) }, // December
    { month: 1, year: parseInt(endYear) },    // January
    { month: 2, year: parseInt(endYear) },    // February
    { month: 3, year: parseInt(endYear) },    // March
    { month: 4, year: parseInt(endYear) },    // April
    { month: 5, year: parseInt(endYear) }     // May
  ];
  const result = months.map(({ month, year }) => {
    return adminViewStore.dashBoardIncidentReports.filter(inc => {
      const incidentDate = new Date(inc.data.dateOfIncident);
      // console.log(incidentDate.getMonth(), incidentDate.getFullYear())
      return incidentDate.getMonth() + 1 === month && 
             incidentDate.getFullYear() === year &&
             inc.data.academicYear === adminViewStore.dashBoardTimeline.data.schoolYear;
    }).length;
  });
  return result;
  
});

const dashboardStats = computed<DashboardStat[]>(() => ([
  {
    label: 'Scheduled Conferences',
    value: scheduledConferences.value,
    icon: 'lucide:calendar',
    color: 'blue',
    onClick: openModal  // Add onClick handler just like pendingCases
  },
  {
    label: 'Pending Cases',
    value: pendingCases.value,
    icon: 'lucide:alert-circle',
    color: 'yellow',
    onClick: openPendingModal // Add onClick handler
  },
  {
    label: 'Review Report Submissions',
    value: unreadReports.value,
    icon: 'lucide:mail',
    color: 'red',
    onClick: openPendingReportsModal // renamed from openUnreadModal
  },
  {
    label: 'Total Incidents',
    value: totalIncidents.value,
    icon: 'lucide:file-text',
    color: 'green'
  }
]));

// Update chartConfig
const chartConfig = computed(() => ({
  labels: academicYearMonths.value,
  datasets: [{
    label: 'Monthly Incidents',
    data: monthlyIncidentCounts.value,
    borderColor: '#265630',
    backgroundColor: 'rgba(38, 86, 48, 0.1)',
    tension: 0.4,
    fill: true
  }]
}));

onBeforeMount(async () => {
  await loadDashboardData();
  
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
  green: 'from-green-50 to-green-100 hover:from-green-100 hover:to-green-50',
  yellow: 'from-amber-50 to-amber-100 hover:from-amber-100 hover:to-amber-50',
  blue: 'from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-50',
  red: 'from-red-50 to-red-100 hover:from-red-100 hover:to-red-50'
};

// Add these new refs for pending cases modal
const showPendingModal = ref(false);
const selectedPendingCases = ref<any[]>([]);

const openPendingModal = () => {
  selectedPendingCases.value = adminViewStore.dashBoardIncidentReports
    .filter((inc: any) => inc.data.status === 'NotResolved')
    .map((inc: any) => ({
      ...inc,
      dateFormatted: new Date(inc.data.dateOfIncident).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }));
  showPendingModal.value = true;
  // console.log(adminViewStore.dashBoardIncidentReports)
  // console.log(selectedPendingCases.value)
};

const closePendingModal = () => {
  showPendingModal.value = false;
};

// Rename modal handling functions
const showPendingReportsModal = ref(false);
const selectedPendingReports = ref<any[]>([]);

const openPendingReportsModal = () => {
  selectedPendingReports.value = adminViewStore.dashBoardInitialReports
    .filter((report: any) => report.data.status === 'Unread' && !report.data.isDraft)
    .map((report: any) => ({
      ...report,
      dateFormatted: new Date(report.data.dateReported).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    })).sort((a: any, b: any) => { return new Date(b.dateFormatted) - new Date(a.dateFormatted) });
  showPendingReportsModal.value = true;
};

const closePendingReportsModal = () => {
  showPendingReportsModal.value = false;
};

// Add state for announcements modal
const showAnnouncementsModal = ref(false);

const openAnnouncementsModal = () => {
  // Check for existing draft
  const savedDraft = localStorage.getItem('announcementDraft');
  existingDraft.value = savedDraft ? JSON.parse(savedDraft) : null;
  showAnnouncementsModal.value = true;
};

const closeAnnouncementsModal = () => {  
  showAnnouncementsModal.value = false;
};

const handleAnnouncementSubmit = (announcement: any) => {
  // Handle the announcement submission here
  // // console.log('New announcement:', announcement);
  // You can add the announcement to your state/database here
  localStorage.setItem('announcementDraft', null)
  
  closeAnnouncementsModal();
};

const handleAnnouncementDraft = (draft: any) => {
  // console.log('Saved draft:', draft);
  // Save to localStorage or your drafts state
  localStorage.setItem('announcementDraft', JSON.stringify({
    ...draft,
    lastSaved: new Date().toLocaleTimeString()
  }));
};

const existingDraft = ref(null);

// Add state for schedule conference modal
const showScheduleModal = ref(false);

const openScheduleModal = () => {
  showScheduleModal.value = true;
  // console.log(showScheduleModal.value)
};

const closeScheduleModal = () => {
  showScheduleModal.value = false;
  // console.log(showScheduleModal.value)
};

const handleScheduleSubmit = (data: any) => {
  // console.log('Schedule conference:', data);
  // Handle the scheduling logic here
  closeScheduleModal();
};

// Add state for create report modal
const showCreateReportModal = ref(false);

const openCreateReportModal = () => {
  showCreateReportModal.value = true;
};

const closeCreateReportModal = () => {
  showCreateReportModal.value = false;
};

const handleReportSubmit = (data: any) => {
  // console.log('New report:', data);
  // Handle the report submission here
  // create new document in incident collections later
  closeCreateReportModal();
};

const makeSubmissionRead = async (report: any) => {
  // console.log(report);
  const result = await $fetch('/api/initialReport/updateData', {
    method: 'POST',
    body: {
      id: report.id,
      data: {
        status: 'Read'
      }
    }
  })
  // console.log(result);
  await adminViewStore.updateDashboard();
  recentSubmissions.value = adminViewStore.dashBoardInitialReports
    .filter((report: any) => !report.data.isDraft)
    .sort((a: any, b: any) => new Date(b.data.dateReported).getTime() - new Date(a.data.dateReported).getTime())
    .slice(0, 5)
    .map((report: any) => ({
      id: report.id,
      title: report.data.narrativeReport.substring(0, 60) + '...',
      people: report.data.peopleInvolved.join(', '),
      date: new Date(report.data.dateReported).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      status: report.data.status
  }));
  alert('Notification Read');
}

</script>

<template>
  <div class="flex h-screen bg-[#FFFEF1]">
    <AdminSidebar />
    <div class="flex-1 overflow-hidden">
      <AdminHeader />

      <main class="p-8 overflow-y-auto h-[calc(100vh-64px)] space-y-6">
        <!-- Academic Year Header -->
        <div class="text-start text-xl font-bold text-gray-600">
          {{ adminViewStore.getAcademicYear(adminViewStore.dashBoardTimeline) }}
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

        <!-- Statistics Grid -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div v-for="stat in dashboardStats" :key="stat.label"
            class="relative group overflow-hidden rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
            :class="gradientColors[stat.color]"
            @click="stat.onClick ? stat.onClick() : null">
            <div class="absolute inset-0 opacity-50 bg-gradient-to-br" 
              :class="`from-${stat.color}-200 to-${stat.color}-400`">
            </div>
            <!-- Decorative Pattern -->
            <div class="absolute inset-0 opacity-5">
              <div class="absolute inset-0 bg-repeat pattern-grid"></div>
            </div>
            <!-- Content -->
            <div class="relative p-6">
              <div class="flex items-start justify-between">
                <div class="p-3 bg-white rounded-lg shadow-sm ring-1 ring-gray-100">
                  <Icon :name="stat.icon" class="w-6 h-6" :class="`text-${stat.color}-600`" />
                </div>
                <div class="text-xs font-medium px-2 py-1 rounded-full"
                  :class="`bg-${stat.color}-100 text-${stat.color}-700`">
                  {{ stat.label === 'Scheduled Conferences' ? 'Click to view' : 'Updated today' }}
                </div>
              </div>
              <div class="mt-4">
                <h4 class="text-sm font-medium text-gray-600">{{ stat.label }}</h4>
                <div class="flex items-baseline gap-2 mt-2">
                  <span class="text-3xl font-bold text-gray-900">{{ stat.value }}</span>
                  <span class="text-sm text-gray-500">
                    {{ stat.label === 'Total Incidents' ? 'this year' : 'total' }}
                  </span>
                </div>
              </div>
            </div>
            <!-- Hover Effect Overlay -->
            <div class="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300"
              :class="`from-${stat.color}-500 to-${stat.color}-600`">
            </div>
          </div>
        </div>

        <!-- Charts and Quick Actions in 3-column layout -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Incident Trends Chart - Takes 2 columns -->
          <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
            <div class="p-4 border-b border-gray-100">
              <h3 class="text-lg font-semibold text-gray-900">Incident Trends</h3>
              <p class="text-sm text-gray-500">Monthly incident reports ({{ adminViewStore.dashBoardTimeline.data.schoolYear }})</p>
            </div>
            <div class="p-4">
              <canvas id="trendsChart" height="200"></canvas>
            </div>
          </div>

          <!-- Right Column for Quick Actions and Recent Submissions -->
          <div class="flex flex-col gap-6">
            <!-- Quick Actions -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-100">
              <div class="p-4 border-b border-gray-100">
                <h3 class="text-lg font-semibold text-gray-900">Quick Actions</h3>
              </div>
              <div class="p-2 flex flex-col gap-2">
                <!-- Replace 'New Report' link with button -->
                <!-- <button
                  @click="openCreateReportModal"
                  class="flex items-center gap-3 p-2 rounded-lg hover:bg-green-50 text-gray-700 hover:text-green-700 transition-colors w-full text-left"
                >
                  <Icon name="lucide:file-plus" class="w-5 h-5" />
                  <span class="font-small">New Report</span>
                </button> -->
                <NuxtLink v-for="(action, idx) in [
                  { text: 'View Incident Reports', link: '/admin/incidental', icon: 'lucide:clipboard-list' },
                  { text: 'View Anecdotal Reports', link: '/admin/anecdotal', icon: 'lucide:book-open' },
                  { text: 'Manage Adviser Accounts', link: '/admin/accounts', icon: 'lucide:users' }
                ]" 
                  :key="idx" 
                  :to="action.link"
                  class="flex items-center gap-3 p-2 rounded-lg hover:bg-green-50 text-gray-700 hover:text-green-700 transition-colors">
                  <Icon :name="action.icon" class="w-5 h-5" />
                  <span class="font-small">{{ action.text }}</span>
                </NuxtLink>
                <!-- Add Schedule Conference button -->
                <!-- <button
                  @click="openScheduleModal"
                  class="flex items-center gap-3 p-2 rounded-lg hover:bg-green-50 text-gray-700 hover:text-green-700 transition-colors w-full text-left"
                >
                  <Icon name="lucide:calendar-plus" class="w-5 h-5" />
                  <span class="font-small">Schedule Conference</span>
                </button> -->
                <!-- Add Make Announcements button -->
                <button
                  @click="openAnnouncementsModal"
                  class="flex items-center gap-3 p-2 rounded-lg hover:bg-green-50 text-gray-700 hover:text-green-700 transition-colors w-full text-left"
                >
                  <Icon name="lucide:megaphone" class="w-5 h-5" />
                  <span class="font-small">Make Announcement</span>
                </button>
              </div>
            </div>

            <!-- Recent Activity - Now in right column -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 flex-1">
              <div class="p-4 border-b border-gray-100">
                <h3 class="text-lg font-semibold text-gray-900">Recent Report Submissions</h3>
              </div>
              <div class="divide-y divide-gray-100 overflow-y-auto" style="max-height: 200px">
                <div v-for="(activity, idx) in recentSubmissions" :key="idx" class="p-4 hover:bg-gray-50 transition-colors">
                  <div class="flex items-start space-x-2s">
                    <div class="flex-1">
                      <p class="font-medium text-gray-900">{{ activity.title }}</p>
                      <p class="text-sm text-gray-600 mt-1">Students: {{ activity.people }}</p>
                      <p class="text-xs text-gray-500 mt-1">{{ activity.dateReported }}</p>
                    </div>
                    <span class="px-2 py-1 text-xs font-medium rounded-full"
                      :class="activity.status === 'Read' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'">
                      {{ activity.status }}
                    </span>
                  </div>
                </div>
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

  <!-- Add PendingCases Modal -->
  <PendingCases 
    v-if="showPendingModal"
    :incidents="selectedPendingCases"
    @close="closePendingModal"
  />

  <!-- Add PendingInitialReports Modal -->
  <PendingInitialReports 
    v-if="showPendingReportsModal"
    :reports="selectedPendingReports"
    @close="closePendingReportsModal"
  />

  <!-- Add MakeAnnouncements Modal -->
  <MakeAnnouncements
    v-if="showAnnouncementsModal"
    :existing-draft="existingDraft"
    @close="closeAnnouncementsModal"
    @submit="handleAnnouncementSubmit"
    @save-draft="handleAnnouncementDraft"
  />

  <!-- Add ScheduleConferenceFromDashboard Modal -->
  <ScheduleConferenceFromDashboard
    v-if="showScheduleModal"
    @close="closeScheduleModal"
    @submit="handleScheduleSubmit"
  />

  <!-- Add CreateReportFromDashboard Modal -->
  <CreateReportFromDashboard
    v-if="showCreateReportModal"
    @close="closeCreateReportModal"
    @submit="handleReportSubmit"
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
  transition: all 0.3s cubic-bezier(0.4, 0, 2, 1);
}

.hover-lift {
  @apply transform transition-transform duration-300;
}

.hover-lift:hover {
  transform: translateY(-2px);
}

/* Add this new style for the recent submissions scrollbar */
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: rgba(114, 139, 120, 0.3) rgba(243, 244, 246, 0.5);
}

.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: rgba(243, 244, 246, 0.5);
  border-radius: 8px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: rgba(114, 139, 120, 0.3);
  border-radius: 8px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background-color: rgba(85, 104, 89, 0.5);
}

/* Add these new styles for the statistics cards */
.pattern-grid {
  background-image: radial-gradient(currentColor 1px, transparent 1px);
  background-size: 16px 16px;
}
</style>
