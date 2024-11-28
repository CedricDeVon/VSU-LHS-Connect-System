<template>
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
            <!-- Document Actions -->
            <div class="bg-white rounded-lg shadow-md overflow-hidden">
              <div class="p-4 bg-gray-50 border-b border-gray-200">
                <h2 class="text-sm font-semibold text-gray-900">Document Actions</h2>
              </div>

              <div class="grid grid-cols-2 gap-3 p-4">
                <button @click="downloadPDF"
                  class="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                  <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span class="mt-2 text-sm font-medium text-gray-600">Download</span>
                </button>

                <button @click="printDocument"
                  class="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                  <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  <span class="mt-2 text-sm font-medium text-gray-600">Print</span>
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
                        <time class="text-xs text-gray-500">{{ formatDate(report.datePrepared) }}</time>
                      </div>
                      <div class="mt-2 text-sm text-gray-700 space-y-2">
                        <p><span class="font-medium">Incident Date:</span> {{ formatDate(report.date) }}</p>
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
    <UpdateAnecdotalModal v-if="showUpdateModal" :report="selectedReport" @close="closeUpdateModal"
      @update="handleUpdate" />
  </div>
</template>

<script>
import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { headerImage } from '~/assets/images/sample-header';
import { footer } from '~/assets/images/footer';
import { anecdotalReport } from '~/data/anecdotal';
import { student } from '~/data/student';
import { report, updateReport, initializeReports } from '~/data/report';
import AdminSidebar from '~/components/Blocks/AdminSidebar.vue';
import AdminHeader from '~/components/Blocks/AdminHeader.vue';
import UpdateAnecdotalModal from '~/components/Modals/UpdateAnecdotalModal.vue'
import { formatDate } from '@vueuse/core';
import { defineAnecdotalDoc } from '~/utils/documentDefinitions';

export default {
  components: {
    AdminSidebar,
    AdminHeader,
    UpdateAnecdotalModal,
  },

  data() {
    return {
      anecReport: null,
      studentData: null,
      showUpdateModal: false,
      selectedReport: null,
    };
  },

  async created() {
    initializeReports(); // Initialize from localStorage
    const studentId = this.$route.params.id;
    await this.initData(studentId);
    this.displayPDF();
  },

  computed: {
    sortedReports() {
      if (!this.anecReport || !this.anecReport.reportIDs) return [];

      return report
        .filter(r => this.anecReport.reportIDs.includes(r.reportID))
        .sort((a, b) => new Date(b.datePrepared) - new Date(a.datePrepared));
    }
  },

  methods: {
    async initData(studentId) {
      this.studentData = student.find(s => s.studentId === studentId);
      if (!this.studentData) return;

      this.anecReport = anecdotalReport.find(
        report => report.anecdotalDocID === this.studentData.anecdotalDocID
      );
    },

    displayPDF() {
      if (!this.anecReport || !this.studentData) {
        console.error('Required data not available');
        return;
      }

      const associatedReports = report.filter(r => this.anecReport.reportIDs.includes(r.reportID))
        .sort((a, b) => new Date(a.datePrepared) - new Date(b.datePrepared));

      const docDefinition = defineAnecdotalDoc({
        studentData: this.studentData,
        anecdotalData: this.anecReport,
        associatedReports
      });

      pdfMake.createPdf(docDefinition).getBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const viewer = document.getElementById('pdf-viewer');
        if (viewer) {
          viewer.src = url;
        }
      });
    },

    formatDate(date) {
      return formatDate(date, 'MMMM DD, YYYY');
    },

    openUpdateForm() {
      // Create a new report object with required fields
      this.selectedReport = {
        date: '',
        purpose: '',
        witnesses: [],
        placeOfIncident: '',
        thingsInvolved: '',
        details: '',
        remarks: '',
        isReportedByGuidance: true
      };
      this.showUpdateModal = true;
      console.log('Modal should open', this.showUpdateModal); // Debug log
    },

    closeUpdateModal() {
      this.showUpdateModal = false;
      this.selectedReport = null;
    },

    handleUpdate(updatedData) {
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

        // Update anecdotal report with new report ID
        this.anecReport.reportIDs.push(reportId);

        // Update localStorage
        localStorage.setItem('reports', JSON.stringify(report));

        // Refresh the PDF display
        this.displayPDF();
        this.showUpdateModal = false;

        alert('Report added successfully');

      } catch (error) {
        console.error('Error updating report:', error);
        alert('Failed to update report');
      }
    },

    downloadPDF() {
      const fileName = `Anecdotal_Report_${this.anecReport.anecdotalDocID}_${new Date().toISOString().split('T')[0]}.pdf`;
      pdfMake.createPdf(this.defineAnecdotalDoc).download(fileName);
    },

    printDocument() {
      pdfMake.createPdf(this.defineAnecdotalDoc).print({
        silent: false,
        printBackground: true
      });
    },

    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  },
};
</script>

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