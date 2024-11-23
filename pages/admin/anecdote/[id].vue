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
import UpdateAnecdotalModal from '~/components/Modals/UpdateAnecdotalModal.vue'
import { formatDate } from '@vueuse/core';
import { useAdminViewStore } from '~/stores/views/adminViewStore';

import { anecdotalReport } from '~/data/anecdotal';

export default {
  components: {
    AdminSidebar,
    AdminHeader,
    UpdateAnecdotalModal,
  },

  data() {
      return {
          adminViewStore: useAdminViewStore()
      };
  },

  async mounted() {
      await this.adminViewStore.updateAnecdote(this.$route.params.id);
      this.displayPDF();
  },

  computed: {
      defineAnecdotalDoc() {
          // Get associated reports
          const associatedReports = this.adminViewStore.anecdoteAnecdotalReport.data.reportIds;

          // Create content array for the document
          const content = [
              { text: 'ANECDOTAL REPORT', style: 'header', margin: [0, 0, 0, 30] },
              {
                  table: {
                      widths: ['30%', '70%'],
                      headerRows: 0,
                      body: [
                          [
                              { text: 'Student Name:', style: 'label', border: [false, false, false, false] },
                              { text: `${this.adminViewStore.anecdoteStudent.data.firstName || ''} ${this.adminViewStore.anecdoteStudent.data.middleName || ''} ${this.adminViewStore.anecdoteStudent.data.lastName || ''}`, style: 'content', border: [false, false, false, false] }
                          ],
                          [
                              { text: 'Student ID:', style: 'label', border: [false, false, false, false] },
                              { text: this.adminViewStore.anecdoteStudent.id, style: 'content', border: [false, false, false, false] }
                          ],
                          [
                              { text: 'Academic Year:', style: 'label', border: [false, false, false, false] },
                              { text: this.adminViewStore.anecdoteAnecdotalReport.data.schoolYear, style: 'content', border: [false, false, false, false] }
                          ],
                          [
                              { text: 'Prepared By:', style: 'label', border: [false, false, false, false] },
                              { text: this.adminViewStore.anecdoteAnecdotalReport.data.preparedBy, style: 'content', border: [false, false, false, false] }
                          ]
                      ]
                  }
              }
          ];

          // Add each report as a section
          associatedReports.forEach((rep, index) => {
              content.push(
                  { text: `Report ${index + 1}`, style: 'subheader', margin: [0, 20, 0, 10] },
                  {
                      table: {
                          widths: ['30%', '70%'],
                          headerRows: 0,
                          body: [
                              [
                                  { text: 'Report ID:', style: 'label', border: [false, false, false, false] },
                                  { text: rep.id, style: 'content', border: [false, false, false, false] }
                              ],
                              [
                                  { text: 'Date of Incident:', style: 'label', border: [false, false, false, false] },
                                  { text: rep.data.dateOfIncident, style: 'content', border: [false, false, false, false] }
                              ],
                              [
                                  { text: 'Date Prepared:', style: 'label', border: [false, false, false, false] },
                                  { text: rep.data.datePrepared, style: 'content', border: [false, false, false, false] }
                              ],
                              [
                                  { text: 'Purpose:', style: 'label', border: [false, false, false, false] },
                                  { text: rep.data.purpose, style: 'content', border: [false, false, false, false] }
                              ],
                              [
                                  { text: 'Witnesses:', style: 'label', border: [false, false, false, false] },
                                  { text: rep.data.witnesses.join(', '), style: 'content', border: [false, false, false, false] }
                              ],
                              [
                                  { text: 'Place of Incident:', style: 'label', border: [false, false, false, false] },
                                  { text: rep.data.placeOfIncident, style: 'content', border: [false, false, false, false] }
                              ],
                              [
                                  { text: 'Things Involved:', style: 'label', border: [false, false, false, false] },
                                  { text: rep.data.thingsInvolved, style: 'content', border: [false, false, false, false] }
                              ],
                              [
                                  { text: 'Details:', style: 'label', border: [false, false, false, false] },
                                  { text: rep.data.details, style: 'content', border: [false, false, false, false] }
                              ],
                              [
                                  { text: 'Adviser Remarks:', style: 'label', border: [false, false, false, false] },
                                  { text: rep.data.adviserRemarks, style: 'content', border: [false, false, false, false] }
                              ]
                          ]
                      }
                  }
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
                      fontSize: 18,
                      bold: true,
                      alignment: 'center',
                  },
                  subheader: {
                      fontSize: 14,
                      bold: true,
                      decoration: 'underline'
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
      },

    methods: {
        displayPDF() {
            pdfMake.createPdf(this.defineAnecdotalDoc).getBlob((blob) => {
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
  },
}
}
</script>

<template>
    <div class="flex h-screen">
        <AdminSidebar />
        <div class="general flex-grow">
            <AdminHeader />
            <div class="p-8 pt-0 general min-h-screen max-h-screen flex flex-col w-full">
                <div class="flex justify-center items-start w-full h-full pt-4">
                    <div id="incident-display-container" class="w-[90%]">
                        <!-- The PDF will be displayed here -->
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