<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

// Component imports
import AdminSidebar from '~/components/Blocks/AdminSidebar.vue';
import AdminHeader from '~/components/Blocks/AdminHeader.vue';
import UpdateAnecdotal from '~/components/Modals/UpdateAnecdotal.vue';

// Document imports
import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts?.vfs;
import { defineAnecdotalDoc } from '~/utils/documentDefinitions';

  
// Data imports
import { anecdotalReport } from '~/data/anecdotal';
import { student } from '~/data/student';
import { report, initializeReports } from '~/data/report';


const route = useRoute();
const anecReport = ref<any>(null);
const studentData = ref<any>(null);
const showUpdateModal = ref(false);
const selectedReport = ref<any>(null);
const showSuccessAlert = ref(false);
const showErrorAlert = ref(false);

const sortedReports = computed(() => {
  if (!anecReport.value || !anecReport.value.reportIDs) return [];

  return report
    .filter(r => anecReport.value.reportIDs.includes(r.reportID))
    .sort((a, b) => new Date(b.datePrepared).getTime() - new Date(a.datePrepared).getTime());
});

const initData = async (studentId: string) => {
  studentData.value = student.find(s => s.studentId === studentId);
  if (!studentData.value) return;

  anecReport.value = anecdotalReport.find(
    report => report.anecdotalDocID === studentData.value.anecdotalDocID
  );
};

const displayPDF = () => {
  if (!anecReport.value || !studentData.value) {
    console.error('Required data not available');
    return;
  }

  const associatedReports = report.filter(r => anecReport.value.reportIDs.includes(r.reportID))
    .sort((a, b) => new Date(a.datePrepared).getTime() - new Date(b.datePrepared).getTime());

  const docDefinition = defineAnecdotalDoc({
    studentData: studentData.value,
    anecdotalData: anecReport.value,
    associatedReports
  }) as any;

  if (!docDefinition) {
    console.error('Failed to create document definition');
    return;
  }

  pdfMake.createPdf(docDefinition).getBlob((blob) => {
    if (!blob) {
      console.error('Failed to create PDF blob');
      return;
    }
    const url = URL.createObjectURL(blob);
    const viewer = document.getElementById('pdf-viewer') as HTMLIFrameElement;
    if (viewer) {
      viewer.src = url;
    }
  });
};

const openUpdateForm = () => {
  selectedReport.value = {
    date: '',
    purpose: '',
    witnesses: [],
    placeOfIncident: '',
    thingsInvolved: '',
    details: '',
    remarks: '',
    isReportedByGuidance: true
  };
  showUpdateModal.value = true;
};

const closeUpdateModal = () => {
  showUpdateModal.value = false;
  selectedReport.value = null;
};

const handleUpdate = (updatedData: any) => {
  try {
    const now = new Date();
    const datePrepared = now.toISOString().split('T')[0];
    const reportId = `REP-${datePrepared.replace(/-/g, '')}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;

    const newReport = {
      reportID: reportId,
      date: updatedData.date,
      datePrepared: datePrepared,
      purpose: updatedData.purpose,
      witnesses: updatedData.witnesses,
      placeOfIncident: updatedData.placeOfIncident,
      thingsInvolved: updatedData.thingsInvolved,
      details: updatedData.details,
      remarks: updatedData.remarks,
      isReportedByGuidance: true,
    };

    report.push(newReport);

    anecReport.value.reportIDs.push(reportId);

    localStorage.setItem('reports', JSON.stringify(report));

    displayPDF();
    showUpdateModal.value = false;

    showSuccessAlert.value = true;
    setTimeout(() => {
      showSuccessAlert.value = false;
    }, 4000);

  } catch (error) {
    showErrorAlert.value = true;
    setTimeout(() => {
      showErrorAlert.value = false;
    }, 4000);
  }
};


const formatDateString = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};


onMounted(async () => {
  initializeReports();
  const studentId = route.params.id as string;
  await initData(studentId);
  displayPDF();
});
</script>

<template>
  <div v-if="showSuccessAlert"
    class="fixed top-4 right-4 bg-green-100 z-[60] border border-green-400 text-green-700 px-4 py-3 rounded flex items-center gap-3 shadow-lg animate-fade-in max-w-md">
    <Icon name="lucide:check-circle" class="h-6 w-6 text-green-600" />
    <div>
      <p class="font-medium">Report Updated Successfully!</p>
      <p class="text-sm">Anecdotal Document has been updated with the latest report.</p>
    </div>
  </div>

  <div v-if="showErrorAlert"
    class="fixed top-4 right-4 bg-red-100 z-[60] border border-red-400 text-red-700 px-4 py-3 rounded flex items-center gap-3 shadow-lg animate-fade-in max-w-md">
    <Icon name="lucide:alert-circle" class="h-6 w-6 text-red-600" />
    <div>
      <p class="font-medium">Update Failed!</p>
      <p class="text-sm">There was an error updating the anecdotal document. Please try again.</p>
    </div>
  </div>

  <div class="flex h-screen bg-[#FFFEF1]">
    <AdminSidebar />
    <div class="flex-1 overflow-hidden">
      <AdminHeader />
      <div class="p-8 pt-0 overflow-y-auto h-[calc(100vh-64px)]">
        <!-- Page Title -->
        <div class="mb-6">
          <h1 class="text-2xl font-bold text-[#265630]">Anecdotal Report Details</h1>
          <p class="text-sm text-[#265630]">Managing anecdotal report and related actions</p>
        </div>

        <div class="flex gap-6">
          <!-- Left side: PDF Viewer -->
          <div class="flex-1 bg-white rounded-lg shadow-md min-h-[80vh] overflow-hidden">
            <!-- PDF Viewer Header -->
            <div class="bg-gray-50 px-6 py-3 border-b border-gray-200 flex items-center justify-between">
              <h2 class="text-lg font-semibold text-gray-800">Document Preview</h2>
            </div>
            <!-- PDF Viewer Content -->
            <iframe id="pdf-viewer" class="w-full h-[calc(100%-48px)] border-none"></iframe>
          </div>

          <!-- Right side: Actions Panel -->
          <div class="w-96 space-y-6">
            <!-- Update Report -->
            <div class="bg-white rounded-lg shadow-md overflow-hidden">
              <div class="p-4 bg-gray-50 border-b border-gray-200">
                <h2 class="text-sm font-semibold text-gray-900">Update Report</h2>
              </div>

              <div class="p-4 space-y-3">
                <button @click="openUpdateForm"
                  class="w-full px-4 py-3 rounded-lg bg-white border-2 border-[#265630] text-[#265630] hover:bg-[#728B78] hover:text-white hover:border-[#728B78] transition-colors duration-200 flex items-center justify-center space-x-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span>Update Report Details</span>
                </button>
              </div>
            </div>

            <!-- Report Timeline -->
            <div class="bg-white rounded-lg shadow-md overflow-hidden mt-6">
              <div class="p-4 bg-gray-50 border-b border-gray-200">
                <h2 class="text-sm font-semibold text-gray-900">Report Timeline</h2>
              </div>

              <div class="p-4 space-y-8">
                <div v-for="(report, index) in sortedReports" :key="report.reportID" class="relative">
                  <!-- Timeline connector -->
                  <div v-if="index !== sortedReports.length - 1"
                    class="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-200"></div>

                  <!-- Timeline item -->
                  <div class="relative flex items-start space-x-4">
                    <!-- Date circle -->
                    <div class="flex items-center justify-center w-8 h-8 rounded-full bg-[#265630] text-white">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>

                    <!-- Content -->
                    <div class="flex-1">
                      <div class="flex items-center justify-between">
                        <h3 class="text-sm font-medium text-gray-900">
                          {{ report.purpose }}
                        </h3>
                        <time class="text-xs text-gray-500">{{ formatDateString(report.datePrepared) }}</time>
                      </div>
                      <div class="mt-2 text-sm text-gray-700 space-y-2">
                        <p><span class="font-medium">Incident Date:</span> {{ formatDateString(report.date) }}</p>
                        <p><span class="font-medium">Place:</span> {{ report.placeOfIncident }}</p>
                        <p><span class="font-medium">Witnesses:</span> {{ report.witnesses.join(', ') }}</p>
                        <p class="mt-2">{{ report.details }}</p>
                        <p class="mt-2 text-gray-600 italic">{{ report.remarks }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <UpdateAnecdotal v-if="showUpdateModal" :report="selectedReport" @close="closeUpdateModal" @update="handleUpdate" />
  </div>
</template>

<style scoped>
.body {
  background: #FFFEF1;
}

#incident-display-container {
  min-height: 80vh;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

iframe {
  border-radius: 0.5rem;
}

.timeline-connector {
  position: absolute;
  left: 1rem;
  top: 2rem;
  bottom: 0;
  width: 2px;
  background-color: #e5e7eb;
}
</style>