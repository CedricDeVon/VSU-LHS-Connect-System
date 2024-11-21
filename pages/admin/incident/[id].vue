<script>
definePageMeta({
  middleware: ['authenticate-and-authorize-admin']
});

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { headerImage } from '~/assets/images/sample-header';
import { footer } from '~/assets/images/footer';
import AdminSidebar from '~/components/Blocks/AdminSidebar.vue';
import AdminHeader from '~/components/Blocks/AdminHeader.vue';
import { useAdminViewStore } from '~/stores/views/adminViewStore';

export default {
  components: {
    AdminSidebar,
    AdminHeader
  },

  data() {
    return {
      reportType: 'INCIDENT REPORT',
      adminViewStore: useAdminViewStore()
    };
  },

  async mounted() {
    await this.adminViewStore.updateIncident(this.$route.params.id);
    this.displayPDF();
  },

  computed: {
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
                  { text: `${this.adminViewStore.incidentIncidentReport.data.peopleInvolved?.join(', ') || 'None' }`, style: 'content', border: [false, false, false, false] }
                ],
                [
                  { text: 'Witness:', style: 'label', border: [false, false, false, false] },
                  { text: `${this.adminViewStore.incidentIncidentReport.data.witness}` || 'None', style: 'content', border: [false, false, false, false] }
                ],
                [
                  { text: 'Date of Incident:', style: 'label', border: [false, false, false, false] },
                  { text: `${this.adminViewStore.incidentIncidentReport.data.dateOfIncident}` || 'None', style: 'content', border: [false, false, false, false] }
                ],
                [
                  { text: 'Place of Incident:', style: 'label', border: [false, false, false, false] },
                  { text: `${this.adminViewStore.incidentIncidentReport.data.placeOfIncident}` || 'None', style: 'content', border: [false, false, false, false] }
                ],
                [
                  { text: 'Things Involved:', style: 'label', border: [false, false, false, false] },
                  { text: `${this.adminViewStore.incidentIncidentReport.data.thingsInvolved}` || 'None', style: 'content', border: [false, false, false, false] }
                ],
              ]
            },
            layout: {
              hLineWidth: function(i, node) {
                return 0.5;
              },
              vLineWidth: function(i, node) {
                return 0;
              },
              hLineColor: function(i, node) {
                return '#cccccc';
              },
            }
          },
          { text: 'Narrative Report:', style: 'label', margin: [0, 15, 0, 5] },
          {
            text: `${this.adminViewStore.incidentIncidentReport.data.narrativeReport}`,
            style: 'content',
            margin: [30, 0, 30, 10],
            alignment: 'justify'
          },
          { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 460, y2: 0, lineWidth: 0.5, lineColor: '#cccccc' }] },
          { text: 'Action Taken:', style: 'label', margin: [0, 15, 0, 5] },
          {
            text: `${this.adminViewStore.incidentIncidentReport.data.actionTaken || 'Pending'}`,
            style: 'content',
            margin: [30, 0, 30, 10],
            alignment: 'justify'
          },
          { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 460, y2: 0, lineWidth: 0.5, lineColor: '#cccccc' }] },
          { text: 'Reason for Action:', style: 'label', margin: [0, 15, 0, 5] },
          {
            text: `${this.adminViewStore.incidentIncidentReport.data.reasonOfAction || 'Pending'}`,
            style: 'content',
            margin: [30, 0, 30, 10],
            alignment: 'justify'
          },
          { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 460, y2: 0, lineWidth: 0.5, lineColor: '#cccccc' }] },
          { text: 'Additional Notes:', style: 'label', margin: [0, 15, 0, 5] },
          {
            text: `${this.adminViewStore.incidentIncidentReport.data.others || 'None'}`,
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
                  { text: `${this.adminViewStore.incidentIncidentReport.data.dateReported}`, style: 'content', border: [false, false, false, false] }
                ],
                [
                  { text: 'Last Modified:', style: 'label', border: [false, false, false, false] },
                  { text: `${this.adminViewStore.incidentIncidentReport.data.lastModified || 'Not modified'}`, style: 'content', border: [false, false, false, false] }
                ],
                [
                  { text: 'Status:', style: 'label', border: [false, false, false, false] },
                  { text: `${this.adminViewStore.incidentIncidentReport.data.status}`, style: 'content', border: [false, false, false, false] }
                ],
              ]
            },
            layout: {
              hLineWidth: function(i, node) {
                return 0.5;
              },
              vLineWidth: function(i, node) {
                return 0;
              },
              hLineColor: function(i, node) {
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
    displayPDF() {
      pdfMake.createPdf(this.defineIncidentDoc).getBlob((blob) => {
        const url = URL.createObjectURL(blob);
        
        // Display in an iframe
        const iframe = document.createElement('iframe');
        iframe.style.width = '100%';
        iframe.style.height = '80vh';
        iframe.style.border = 'none';
        iframe.src = url;
        
        // Clear previous content and append new iframe
        const container = document.getElementById('incident-display-container');
        container.innerHTML = '';
        container.appendChild(iframe);
      });
    },
  },
};
</script>

<template>
  <div class="flex h-screen">
    <AdminSidebar />
    <div class="general flex-grow">
      <AdminHeader />
      <div class="p-8 pt-0 general min-h-screen max-h-screen flex flex-col w-full">
        <div class="flex justify-center items-start w-full h-full pt-4">
          <div id="incident-display-container" class="w-[90%]">
            <!-- The iframe will be appended here -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

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