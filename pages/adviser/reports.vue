<template>
    <div class="reports-page">
        <InitialReportModal
        v-if="showCreateReport"
        :report="reportChosen"
        :adviserId="secStore.section.adviserId"
        @close ="creationClose"
        /> 
        <AdviserHeader @notif-click="notifClick" class="relative z-10"/>
        <div >
            <div class="m-5 flex justify-between items-center mx-20">
                <h1 class="text-2xl font-bold text-green-900">Academic Year {{ AcademicYear }}</h1>
            </div>

            <div class="contain" :style="{ width: containWidth}">
                <div class="title flex justify-center items-center">
                    <h1 class="text-white text-2xl font-bold">
                        {{ selectedSort === 'anecdotal' ? 'Anecdotal Reports' : 'Incident Reports' }}
                    </h1>
                </div>  

                <div class="flex flex-col h-full p-6">
                    <!-- Controls Section -->
                    <div class="flex justify-between items-center mb-6 px-4">
                        <div class="relative">
                            <select v-model="selectedSort"
                                class="appearance-none bg-white border-b-2 border-green-700 px-4 py-2 pr-8 rounded-lg focus:outline-none focus:border-green-800 text-green-900 font-medium">
                                <option value="" disabled selected>Select View</option>
                                <option value="incident">Incident Report</option>
                                <option value="anecdotal">Anecdotal Report</option>
                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-green-700">
                                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 9l-7 7-7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                        </div>

                        <button v-if="selectedSort !== 'anecdotal'" @click="reportEvent" 
                            class="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors">
                            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M12 4v16m8-8H4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            Report an Incident
                        </button>
                    </div>

                    <!-- Reports Table with Fixed Height -->
                    <div class="flex-1 overflow-hidden rounded-lg border border-gray-200">
                        <div class="h-[calc(95vh-300px)] overflow-y-auto">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-green-700 text-white sticky top-0 z-5">
                                    <tr class="bg-green-700 text-white">
                                        <th class="px-6 py-4 text-left text-sm font-semibold w-1/5">Report ID</th>
                                        <th class="px-6 py-4 text-left text-sm font-semibold w-2/5">Student Name</th>
                                        <th class="px-6 py-4 text-left text-sm font-semibold w-1/5">{{selectedSort === 'anecdotal'? 'Last Modified' : 'Date'}}</th>
                                        <th class="px-6 py-4 text-center text-sm font-semibold w-1/5">Action</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-100">
                                    <template v-if="selectedSort === 'anecdotal'">
                                        <tr v-for="report in anecdotalReports" 
                                            :key="report.anecdotalDocID"
                                            class="hover:bg-green-50 transition-colors">
                                            <td class="px-6 py-4 text-sm text-green-900">{{ report.anecdotalDocID }}</td>
                                            <td class="px-6 py-4 text-sm font-medium text-green-900">{{ getStudentName(report.studentId) }}</td>
                                            <td class="px-6 py-4 text-sm text-green-900">{{ getLatestReportDate(report.reportIDs) }}</td>
                                            <td class="px-6 py-4 text-center">
                                                <button @click="viewAnecdotal(report.studentId)" 
                                                    class="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium bg-yellow-100 text-green-800 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300 transition-colors">
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    </template>
                                    <template v-else>
                                        <tr v-for="report in reports" 
                                            :key="report.reportIDRef"
                                            class="hover:bg-green-50 transition-colors">
                                            <td class="px-6 py-4 text-sm text-green-900">{{ report.reportIDRef }}</td>
                                            <td class="px-6 py-4 text-sm font-medium text-green-900">{{ report.peopleInvolved.join(', ') }}</td>
                                            <td class="px-6 py-4 text-sm text-green-900">{{ report.dateOfIncident }}</td>
                                            <td class="px-6 py-4 text-center">
                                                <button @click="report.isDraft ? editReport(report) : viewDetails(report)" 
                                                    class="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium"
                                                    :class="report.isDraft ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-yellow-100 text-green-800 hover:bg-yellow-200'">
                                                    {{ report.isDraft ? 'Edit' : 'View Details' }}
                                                </button>
                                            </td>
                                        </tr>
                                    </template>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import AdviserHeader from '~/components/Blocks/AdviserHeader.vue';
import InitialReportModal from '~/components/Modals/AdviserReport/InitialReportModal.vue';
import { initialReport } from '~/data/initialReport';
import { anecdotalReport } from '~/data/anecdotal';
import { student } from '~/data/student';
import { section } from '~/data/section';
import { report } from '~/data/report';
import { adviserReportStore } from '~/stores/adviserReport';
import { useSectionStore } from '#imports';

// Define props
const props = defineProps({
//   AdviserID: {
//     type: String,
//     required: true,
//     default: 'adviserid1', // this should be the adviserID of the logged in user
//   },
  AcademicYear: {
    type: String,
    required: true,
    default: '2024-2025', // this should be the current academic year
  },
});

// Define reactive state
const reports = ref([]);
const reportChosen = ref({ isDraft: true });
const showCreateReport = ref(false);
const isDraft = ref(true);
const containWidth = ref('89%');
const titleWidth = ref('87%');
const selectedSort = ref('incident'); // Changed default to 'incident' for proper initial state
const anecdotalReports = ref([]);
const students = ref(student);
const sections = ref(section);

// Access the store
const store = adviserReportStore();
const secStore = useSectionStore();
const router = useRouter();

// Define methods
const handleRowClick = (item) => {
  // Handle row click event
};

const notifClick = () => {
  containWidth.value = containWidth.value === '89%' ? '70%' : '89%';
  titleWidth.value = titleWidth.value === '87%' ? '68%' : '87%';
};

const reportEvent = () => {
  store.resetAllData();
  showCreateReport.value = true;
};

const editReport = (rep) => {
  reportChosen.value = rep;
  store.resetAllData();
  if (rep) {
    store.peopleInvolved = rep.peopleInvolved;
    store.witness = rep.witness;
    store.dateOfIncident = rep.dateOfIncident;
    store.placeOfIncident = rep.placeOfIncident;
    store.thingsInvolved = rep.thingsInvolved;
    store.narrativeReport = rep.narrativeReport;
  }
  showCreateReport.value = true;
};

const viewDetails = (rep) => {
  reportChosen.value = rep;
  showCreateReport.value = true;
};

const fetchReports = (id, ay) => {
  if (selectedSort.value === 'anecdotal') {
    // Get adviser's section first
    const adviserSection = secStore.section;
    // const adviserSection = sections.value.find(
    //   (sec) =>
    //     sec.adviserId === id &&
    //     sec.sectionSchoolYear === ay
    // );

    if (adviserSection) {
      // Filter anecdotal reports for students in adviser's section
      anecdotalReports.value = anecdotalReport.filter(
        (rep) =>
          rep.AY === ay &&
          adviserSection.sectionStudents.includes(rep.studentId)
      );
    } else {
      anecdotalReports.value = [];
    }
  } else {
    reports.value = initialReport.filter(
      (rep) => rep.reportedBY === secStore.section.adviserId && rep.academicYear === ay
    );
  }
};

const getStudentName = (studentId) => {
  const student = students.value.find((s) => s.studentId === studentId);
  if (student) {
    return `${student.firstName} ${student.middleName} ${student.lastName}`;
  }
  return 'Unknown Student';
};

const viewAnecdotal = (studentId) => {
  if (studentId) {
    // Navigate to anecdotal page with student ID
    router.push(`/adviser/anecdotal/${studentId}`);
  } else {
    console.error('No student ID provided for anecdotal report');
  }
};

const creationClose = () => {
  showCreateReport.value = false;
  reportChosen.value = { isDraft: true };
  fetchReports(props.AdviserID, props.AcademicYear);
};

const getLatestReportDate = (reportIDs) => {
  if (!reportIDs || reportIDs.length === 0) return 'No reports';

  const dates = reportIDs
    .map((id) => report.find((r) => r.reportID === id))
    .filter((r) => r) // Remove any undefined reports
    .map((r) => new Date(r.datePrepared));

  if (dates.length === 0) return 'No valid dates';

  const latestDate = new Date(Math.max(...dates));
  return latestDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Watchers
watch(selectedSort, (newValue) => {
  fetchReports(secStore.section.adviserId, props.AcademicYear);
});

// Lifecycle hooks
onMounted(() => {
  fetchReports(secStore.section.adviserId, props.AcademicYear);
});

</script>

<style scoped>
    .reports-page{
        @apply bg-[#fffef1] min-h-screen;
        background-image: url('~/assets/images/vsu-main-the-search-for-truth-statue.png');
        background-position: 90% 20px;
        background-size: 50% auto;
        background-repeat: no-repeat;
    }

    .backPic{
        position: absolute;
        width: 50%;
        height: auto;
        border-radius: 15px;
        left: 50%;
        top: 20px;
        z-index: 0;
    }


    .AY_Sem {
    color: #000000;
    text-align: center;
    font-size: 25px;
    font-weight: 500;
   
  
    } 

    .gray-button {
        background-color: #728B78;
        font: Century Gothic, sans-serif;
        font-size: 16px;
        font-weight: 500;

    }
    .gray-button:hover {
        background-color: #4a5e4e;
    }

    .gray {
        background-color: #728B78;
        font: Century Gothic, sans-serif;
    }

    .yellow-button {
        background-color: #F8F1BA;
        font-family: Century Gothic, sans-serif;
        font-size: 14px;
        font-weight: 500;
        color:#56685B;
    }

    .yellow-button:hover {
        background-color: #728B78;
        color: white;
    }


    .contain{
        @apply absolute left-20 top-40 bg-white/90 rounded-xl shadow-lg;
        height: 75vh;
    }

    .title{
        @apply -mt-8 mx-auto w-[98%] py-3 bg-green-800 rounded-xl;
    }

    .text{
        font-family: Century Gothic, sans-serif;
        font-size: 20px;
        font-weight: 545;
        color: #265630;
    }

    .text2{
        font-family: Century Gothic, sans-serif;
        font-size: 16px;
        font-weight: 500;
        color: #265630;
    }



</style>