<template>
  <div class="flex h-screen bg-gray-100">
    <AdminSidebar />
    <div class="flex-1 overflow-hidden">
      <AdminHeader />
      <div class="p-8 pt-0 overflow-y-auto h-[calc(100vh-64px)]">
        <!-- Page Title -->
        <div class="mb-6">
          <h1 class="text-2xl font-bold text-gray-900">Incident Report Details</h1>
          <p class="text-sm text-gray-600">Managing incident report and related actions</p>
        </div>

        <div class="flex gap-6">
          <!-- Left side: PDF Viewer -->
          <div class="flex-1 bg-white rounded-lg shadow-md min-h-[80vh] overflow-hidden">
            <!-- PDF Viewer Header -->
            <div class="bg-gray-50 px-6 py-3 border-b border-gray-200 flex items-center justify-between">
              <h2 class="text-lg font-semibold text-gray-800">Document Preview</h2>
              <div class="flex items-center space-x-2">
                <span class="text-sm text-gray-600">Status:</span>
                <span :class="{
                  'px-2 py-1 text-xs font-medium rounded-full': true,
                  'bg-green-100 text-green-800': incidentData?.status === 'Resolved',
                  'bg-yellow-100 text-yellow-800': incidentData?.status === 'NotResolved'
                }">
                  {{ incidentData?.status === 'NotResolved' ? 'Unresolved' : 'Resolved' }}
                </span>
              </div>
            </div>
            <!-- PDF Viewer Content -->
            <iframe id="pdf-viewer" class="w-full h-[calc(100%-48px)] border-none"></iframe>
          </div>

          <!-- Right side: Actions Panel -->
          <div class="w-96 space-y-6">
            <!-- Main Actions -->
            <div class="bg-white rounded-lg shadow-md p-6 space-y-6">
              <h2 class="text-xl font-bold text-gray-800 pb-4 border-b border-gray-200">Actions</h2>

              <!-- Update Report Section -->
              <div v-if="incidentData?.status === 'NotResolved'" class="space-y-3">
                <h3 class="text-sm font-semibold text-gray-700 uppercase tracking-wide">Update Report</h3>
                <button @click="openUpdateForm" 
                  class="w-full bg-blue-500 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 shadow-sm">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span>Edit Report Details</span>
                </button>
              </div>

              <!-- Case Conference Section -->
              <div class="space-y-3">
                <h3 class="text-sm font-semibold text-gray-700 uppercase tracking-wide">Schedule Conference</h3>
                <button @click="openScheduleDialog" 
                  class="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 shadow-sm">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Schedule Case Conference</span>
                </button>
              </div>

              <!-- Status Management -->
              <div v-if="incidentData?.status === 'NotResolved'" class="space-y-3">
                <h3 class="text-sm font-semibold text-gray-700 uppercase tracking-wide">Case Management</h3>
                <button @click="confirmResolve" 
                  class="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 shadow-sm">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Mark as Resolved</span>
                </button>
              </div>
            </div>

            <!-- Document Actions -->
            <div class="bg-white rounded-lg shadow-md p-6 space-y-4">
              <h3 class="text-sm font-semibold text-gray-700 uppercase tracking-wide">Document Actions</h3>
              <div class="space-y-3">
                <button @click="printDocument" 
                  class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 border border-gray-300">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  <span>Print Document</span>
                </button>
                <button @click="downloadPDF" 
                  class="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 shadow-sm">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

   
  </div>
</template>

<script>
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { headerImage } from '~/assets/images/sample-header';
import { footer } from '~/assets/images/footer';
import { incidentReport } from '~/data/incident';
import { Admin } from '~/data/admin';
import { initialReport } from '~/data/initialReport';
import { adviser } from '~/data/adviser';
import AdminSidebar from '~/components/Blocks/AdminSidebar.vue';
import AdminHeader from '~/components/Blocks/AdminHeader.vue';

export default {
  components: {
    AdminSidebar,
    AdminHeader,
  },

  data() {
    return {
      incdReport: {},
      reportType: 'INCIDENT REPORT',
      receivedBy: `${(Admin.firstName).toUpperCase()} ${(Admin.middleName).charAt(0).toUpperCase() + '.'} ${(Admin.lastName).toUpperCase()}`,
      reportedBy: '',
      incidentData: null,
      showUpdateModal: false,
      showScheduleModal: false,
    };
  },

  async created() {
    const incidentId = this.$route.params.id;
    await this.initIncidentByID(incidentId);
    await this.getReporter(this.incdReport.reportID);
    this.displayPDF();
  },

  computed: {
    processedIncidentData(){
      if(!this.incidentData) return {};
      return {
        ...this.incidentData,
        status: this.incidentData.status === 'Resolved' ? 'NotResolved' : this.incidentData.status
      }
    },
    defineIncidentDoc() {
      return {
        pageMargins: [72, 120, 72, 90],
        header: {
          image: headerImage,
          width: 600,
          height: 100,
          alignment: 'center',
          margin: [0, 10, 0, 0],
        },
        content: [
          [
            { text: `${this.reportType}`, style: 'header', margin: [0, 0, 0, 30] },
          ],
          {
            table: {
              widths: ['30%', '70%'],
              headerRows: 0,
              body: [
                [
                  { text: 'Name of People Involved:', style: 'label', border: [false, false, false, false] },
                  { text: `${this.incdReport.peopleInvolved?.join(', ')}`, style: 'content', border: [false, false, false, false] }
                ],
                [
                  { text: 'Witness:', style: 'label', border: [false, false, false, false] },
                  { text: `${this.incdReport.witness}`, style: 'content', border: [false, false, false, false] }
                ],
                [
                  { text: 'Date of Incident:', style: 'label', border: [false, false, false, false] },
                  { text: `${this.incdReport.dateOfIncident}`, style: 'content', border: [false, false, false, false] }
                ],
                [
                  { text: 'Place of Incident:', style: 'label', border: [false, false, false, false] },
                  { text: `${this.incdReport.placeOfIncident}`, style: 'content', border: [false, false, false, false] }
                ],
                [
                  { text: 'Things Involved:', style: 'label', border: [false, false, false, false] },
                  { text: `${this.incdReport.thingsInvolved}`, style: 'content', border: [false, false, false, false] }
                ],
              ]
            },
            layout: {
              hLineWidth: function (i, node) {
                return 0.5;
              },
              vLineWidth: function (i, node) {
                return 0;
              },
              hLineColor: function (i, node) {
                return '#cccccc';
              },
            }
          },
          { text: 'Narrative Report:', style: 'label', margin: [0, 15, 0, 5] },
          {
            text: `${this.incdReport.narrativeReport}`,
            style: 'content',
            margin: [30, 0, 30, 10],
            alignment: 'justify'
          },
          { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 460, y2: 0, lineWidth: 0.5, lineColor: '#cccccc' }] },
          { text: 'Action Taken:', style: 'label', margin: [0, 15, 0, 5] },
          {
            text: `${this.incdReport.actionTaken || 'Pending'}`,
            style: 'content',
            margin: [30, 0, 30, 10],
            alignment: 'justify'
          },
          { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 460, y2: 0, lineWidth: 0.5, lineColor: '#cccccc' }] },
          { text: 'Reason for Action:', style: 'label', margin: [0, 15, 0, 5] },
          {
            text: `${this.incdReport.reasonOfAction || 'Pending'}`,
            style: 'content',
            margin: [30, 0, 30, 10],
            alignment: 'justify'
          },
          { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 460, y2: 0, lineWidth: 0.5, lineColor: '#cccccc' }] },
          { text: 'Additional Notes:', style: 'label', margin: [0, 15, 0, 5] },
          {
            text: `${this.incdReport.others || 'None'}`,
            style: 'content',
            margin: [30, 0, 30, 10],
            alignment: 'justify'
          },
          { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 460, y2: 0, lineWidth: 0.5, lineColor: '#cccccc' }] },
          {
            table: {
              widths: ['30%', '70%'],
              headerRows: 0,
              body: [
                [
                  { text: 'Date Reported:', style: 'label', border: [false, false, false, false] },
                  { text: `${this.incdReport.dateReported}`, style: 'content', border: [false, false, false, false] }
                ],
                [
                  { text: 'Last Modified:', style: 'label', border: [false, false, false, false] },
                  { text: `${this.incdReport.lastModified || 'Not modified'}`, style: 'content', border: [false, false, false, false] }
                ],
                [
                  { text: 'Status:', style: 'label', border: [false, false, false, false] },
                  { text: `${this.incdReport.status}`, style: 'content', border: [false, false, false, false] }
                ],
              ]
            },
            layout: {
              hLineWidth: function (i, node) {
                return 0.5;
              },
              vLineWidth: function (i, node) {
                return 0;
              },
              hLineColor: function (i, node) {
                return '#cccccc';
              },
            }
          }
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            alignment: 'center',
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
        footer: (currentPage, pageCount) => {
          return [
            {
              image: footer,
              width: 480,
              alignment: 'center',
              margin: [0, 10, 0, 0]
            },
            {
              text: `FM-OOP-05                                    Rev.: 01                                    ${new Date().toLocaleDateString()}                                       Page ${currentPage} of ${pageCount}                                  Control Number:______`,
              alignment: 'justify',
              margin: [70, 0],
              fontSize: 7,
            },
          ];
        },
      };
    },
  },

  methods: {
    async initIncidentByID(id) {
      const fetchedObject = incidentReport.find(item => item.incidentDocID === id);
      if (fetchedObject) {
        this.incdReport = { ...fetchedObject };
        this.incidentData = { ...fetchedObject };
      }
    },

    async getReporter(incidentReportID) {
      let index = initialReport.findIndex((incd) => incd.reportIDRef === incidentReportID);
      if (index === -1) return false;

      const id = initialReport[index].reportedBY;
      if (id) {
        index = adviser.findIndex((adv) => adv.id === id);
        this.reportedBy = `${(adviser[index].firstName).toUpperCase()} ${(adviser[index].middleName).charAt(0).toUpperCase() + '.'} ${(adviser[index].lastName).toUpperCase()}`;
        return true;
      }
      return false;
    },

    displayPDF() {
      pdfMake.createPdf(this.defineIncidentDoc).getBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const viewer = document.getElementById('pdf-viewer');
        if (viewer) {
          viewer.src = url;
        }
      });
    },    
  },
};
</script>
