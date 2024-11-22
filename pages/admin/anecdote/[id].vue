<template>
  <div class="flex h-screen bg-gray-100">
    <AdminSidebar />
    <div class="flex-1 overflow-hidden">
      <AdminHeader />
      <div class="p-8 pt-0 overflow-y-auto h-[calc(100vh-64px)]">
        <!-- Page Title -->
        <div class="mb-6">
          <h1 class="text-2xl font-bold text-gray-900">Anecdotal Report Details</h1>
          <p class="text-sm text-gray-600">Managing anecdotal report and related actions</p>
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
                  class="w-full px-4 py-3 rounded-lg bg-white border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition-colors duration-200 flex items-center justify-center space-x-2">
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

            
          </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <UpdateAnecdotalModal 
      v-if="showUpdateModal" 
      :report="selectedReport"
      @close="closeUpdateModal"
      @update="handleUpdate"
    />
  </div>
</template>

<script>
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
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
    defineAnecdotalDoc() {
      if (!this.anecReport || !this.studentData) return null;

      const associatedReports = report.filter(r => this.anecReport.reportIDs.includes(r.reportID));

      // Sort reports by date prepared
      associatedReports.sort((a, b) => new Date(a.datePrepared) - new Date(b.datePrepared));

      const content = [
        { text: 'ANECDOTAL REPORT', style: 'header', margin: [0, 0, 0, 0] },
        {
          table: {
            widths: ['30%', '70%'], 
            headerRows: 0,
            body: [
              [
                { text: 'Student Name:', style: 'label', border: [false, false, false, false] },
                { text: `${this.studentData.firstName} ${this.studentData.middleName} ${this.studentData.lastName}`, style: 'content', border: [false, false, false, false] }
              ],
              [
                { text: 'Student ID:', style: 'label', border: [false, false, false, false] },
                { text: this.studentData.studentId, style: 'content', border: [false, false, false, false] }
              ],
              [
                { text: 'Academic Year:', style: 'label', border: [false, false, false, false] },
                { text: this.anecReport.AY, style: 'content', border: [false, false, false, false] }
              ],
              [
                { text: 'Prepared By:', style: 'label', border: [false, false, false, false] },
                { text: this.anecReport.preparedBy, style: 'content', border: [false, false, false, false] }
              ]
            ]
          }
        }
      ];

      associatedReports.forEach((rep) => {
        // Format the date using the Date object
        const preparedDate = new Date(rep.datePrepared);
        const formattedDate = preparedDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });

        const incidentDate = new Date(rep.date);
        const formattedIncidentDate = incidentDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });

        content.push(
          { 
            text: formattedDate,
            style: 'subheader',
            margin: [0, 20, 0, 10],
            color: '#1f2937'
          },
          {
            table: {
              widths: ['30%', '70%'],
              headerRows: 0,
              body: [
                [
                  { text: 'Date of Incident:', style: 'label', border: [false, false, false, false] },
                  { text: formattedIncidentDate, style: 'content', border: [false, false, false, false] }
                ],
                [
                  { text: 'Purpose:', style: 'label', border: [false, false, false, false] },
                  { text: rep.purpose, style: 'content', border: [false, false, false, false] }
                ],
                [
                  { text: 'Witnesses:', style: 'label', border: [false, false, false, false] },
                  { text: rep.witnesses.join(', '), style: 'content', border: [false, false, false, false] }
                ],
                [
                  { text: 'Place of Incident:', style: 'label', border: [false, false, false, false] },
                  { text: rep.placeOfIncident, style: 'content', border: [false, false, false, false] }
                ],
                [
                  { text: 'Things Involved:', style: 'label', border: [false, false, false, false] },
                  { text: rep.thingsInvolved, style: 'content', border: [false, false, false, false] }
                ],
              ]
            }
          },

          { text: 'Details:', style: 'label', margin: [0, 15, 0, 5] },
          { text: rep.details, style: 'content', margin: [30, 0, 30, 15] },
          
          { text: 'Remarks:', style: 'label', margin: [0, 15, 0, 5] },
          { text: rep.adviserRemarks, style: 'content', margin: [30, 0, 30, 15] }
        );
      });

      return {
        pageMargins: [72, 120, 72, 90],
        header: {
          image: headerImage,
          width: 600,
          height: 100,
          alignment: 'center',
          margin: [0, 10, 0, 0],
        },
        content: content,
        styles: {
          header: {
            fontSize: 20,
            bold: true,
            alignment: 'center',
          },
          subheader: {
            fontSize: 15,
            bold: true,
          },
          label: {
            bold: true,
            fontSize: 11,
            margin: [0, 10, 0, 10],
          },
          content: {
            fontSize: 11,
            margin: [0, 10, 0, 10],
          }
        },
        footer: {
          image: footer,
          width: 480,
          alignment: 'center',
          margin: [0, 10, 0, 0]
        }
      };
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
      if (!this.defineAnecdotalDoc) {
        console.error('No document definition available');
        return;
      }

      try {
        // Create new PDF with updated content
        pdfMake.createPdf(this.defineAnecdotalDoc).getBlob((blob) => {
          const url = URL.createObjectURL(blob);
          const viewer = document.getElementById('pdf-viewer');
          if (viewer) {
            viewer.src = url;
          } else {
            console.error('PDF viewer element not found');
          }
        });
      } catch (error) {
        console.error('Error creating PDF:', error);
      }
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
        adviserRemarks: ''
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

        // Prepare new report data with the correct field label
        const newReport = {
          reportID: reportId,
          date: updatedData.date,
          datePrepared: datePrepared,
          purpose: updatedData.purpose,
          witnesses: updatedData.witnesses,
          placeOfIncident: updatedData.placeOfIncident,
          thingsInvolved: updatedData.thingsInvolved,
          details: updatedData.details,
          adviserRemarks: updatedData.adviserRemarks // This will be displayed as "Remarks from the Guidance Counsel" in the PDF
        };

        // Add new report to reports array
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
  },
};
</script>

<style scoped>
#incident-display-container {
  min-height: 80vh;
  background: white;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

iframe {
  border-radius: 0.5rem;
}
</style>