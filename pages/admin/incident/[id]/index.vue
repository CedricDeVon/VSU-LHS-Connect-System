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
    AdminHeader,
    UpdateIncidentReportModal,
    ScheduleConferenceModal,
    ViewCaseConferencesModal,
    CreateCaseConferenceModal,
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
    processedIncidentData() {
      if (!this.incidentData) return {};
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
    isResolved() {
      return this.incidentData?.status === 'Resolved';
    },
    
    hasCaseConference() {
      return Array.isArray(this.incidentData?.hasCaseConference) 
        ? this.incidentData.hasCaseConference.length > 0 
        : this.incidentData?.hasCaseConference;
    },

    hasValidConferences() {
      if (!this.incidentData?.hasCaseConference) return false;
      return Array.isArray(this.incidentData.hasCaseConference) && 
             this.incidentData.hasCaseConference.length > 0;
    },

    conferenceCount() {
      if (!this.incidentData?.hasCaseConference) return 0;
      return Array.isArray(this.incidentData.hasCaseConference) 
        ? this.incidentData.hasCaseConference.length 
        : (this.incidentData.hasCaseConference ? 1 : 0);
    },

    hasScheduledConferences() {
      return this.pendingConferences.length > 0;
    },

    hasUndocumentedConference() {
      // Check if there are scheduled conferences without documentation
      return this.pendingConferences.some(conf => !conf.documented);
    },

    pendingConferences() {
      if (!this.caseConferences) return [];
      return this.caseConferences.filter(conf => 
        conf.status === 'Pending' && new Date(conf.conferenceDate) >= new Date()
      );
    },

    pendingConferencesCount() {
      return this.pendingConferences.length;
    },

    nextConferenceDate() {
      if (!this.hasScheduledConferences) return null;
      const nextConf = this.pendingConferences[0];
      return new Date(nextConf.conferenceDate).toLocaleDateString();
    },

    conferenceProgress() {
      const total = this.conferenceCount;
      const completed = total - this.pendingConferencesCount;
      return total ? (completed / total) * 100 : 0;
    },

    showCaseConferenceSection() {
      // Show if:
      // 1. Not resolved OR
      // 2. Has case conferences (regardless of resolution status)
      return !this.isResolved || this.hasCaseConference;
    },
  },

  methods: {
    displayPDF() {
      pdfMake.createPdf(this.defineIncidentDoc).getBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const viewer = document.getElementById('pdf-viewer');
        if (viewer) {
          viewer.src = url;
        }
      });
    },

    openUpdateForm() {
      this.showUpdateModal = true;
    },

    viewConferenceHistory() {
      this.isViewingHistory = true;
      this.loadCaseConferences();
      this.showScheduleModal = true;
    },

    closeConferenceHistory() {
      this.showScheduleModal = false;
      this.isViewingHistory = false;
    },

    openScheduleDialog() {
      this.isViewingHistory = false;
      this.showScheduleModal = true;
    },

    openCreateConferenceDoc() {
      // Check for existing draft when opening modal
      const savedDraft = localStorage.getItem(`draft_conference_${this.incdReport.incidentDocID}`);
      if (savedDraft) {
        this.savedConferenceDoc = JSON.parse(savedDraft);
      }
      this.showCreateConfDocModal = true;
    },

    handleUpdate(updatedData) {
      try {
        // Update in data store and localStorage
        if (updateIncidentReport(this.incdReport.incidentDocID, updatedData)) {
          // Update local state
          this.incdReport = {
            ...this.incdReport,
            ...updatedData
          };
          this.incidentData = {
            ...this.incidentData,
            ...updatedData
          };

          // Refresh PDF
          this.displayPDF();
          
          // Close modal
          this.showUpdateModal = false;
          
          alert('Incident report updated successfully');
        } else {
          throw new Error('Failed to update incident report');
        }
      } catch (error) {
        console.error('Error updating incident:', error);
        alert('Failed to update incident report');
      }
    },

    async handleScheduleConference(conferenceData) {
      try {
        // Create new conference ID
        const newConferenceId = `caseConID${Date.now()}`;
        
        // Prepare conference data
        const newConference = {
          caseConDocID: newConferenceId,
          incidentID: this.incidentData.incidentDocID,
          studentName: this.incidentData.peopleInvolved.join(', '),
          conferenceDate: conferenceData.date,
          time: conferenceData.time,
          discussions: conferenceData.notes || '',
          status: 'Pending',
          scheduledBy: this.receivedBy
        };

        // In a real application, you would save this to your backend
        // For now, we'll just update the local state
        
        // Update incident with new conference reference
        const updatedData = {
          hasCaseConference: [...(Array.isArray(this.incidentData.hasCaseConference) 
            ? this.incidentData.hasCaseConference 
            : []), newConferenceId]
        };

        await this.handleUpdate(updatedData);
        this.showScheduleModal = false;
        alert('Case conference scheduled successfully');
      } catch (error) {
        console.error('Error scheduling conference:', error);
        alert('Failed to schedule case conference');
      }
    },

    async handleCreateConferenceDoc(docData) {
      try {
        // Create new conference document ID
        const newConfDocId = `caseConDoc${Date.now()}`;
        
        // Prepare document data
        const newConfDoc = {
          ...docData,
          caseConDocID: newConfDocId,
          status: 'Active',
          createdBy: this.receivedBy,
          createdAt: new Date().toISOString()
        };

        // Here you would typically save to your backend
        // For now, just close the modal and show success message
        this.showCreateConfDocModal = false;
        alert('Case conference document created successfully');
        
        // Clear the draft after successful creation
        localStorage.removeItem(`draft_conference_${this.incdReport.incidentDocID}`);
        this.savedConferenceDoc = null;

        // Refresh the conference list if needed
        await this.loadCaseConferences();
      } catch (error) {
        console.error('Error creating conference document:', error);
        alert('Failed to create case conference document');
      }
    },

    async handleSaveDraft(draftData) {
      try {
        // In a real app, save to backend/localStorage
        this.savedConferenceDoc = draftData;
        localStorage.setItem(`draft_conference_${this.incdReport.incidentDocID}`, JSON.stringify(draftData));
        
        this.showCreateConfDocModal = false;
        alert('Document saved as draft successfully');
      } catch (error) {
        console.error('Error saving draft:', error);
        alert('Failed to save draft');
      }
    },

    async loadCaseConferences() {
      if (!this.incidentData?.hasCaseConference) {
        this.caseConferences = [];
        return;
      }

      // Handle both array and boolean cases
      const conferenceIds = Array.isArray(this.incidentData.hasCaseConference) 
        ? this.incidentData.hasCaseConference 
        : [];

      this.caseConferences = conferenceIds
        .map(id => caseConference.find(conf => conf.caseConDocID === id))
        .filter(conf => conf !== undefined)
        .sort((a, b) => new Date(a.conferenceDate) - new Date(b.conferenceDate));
    },

    downloadPDF() {
      const fileName = `Incident_Report_${this.incdReport.reportID}_${new Date().toISOString().split('T')[0]}.pdf`;
      pdfMake.createPdf(this.defineIncidentDoc).download(fileName);
    },

    printDocument() {
      pdfMake.createPdf(this.defineIncidentDoc).print({
        silent: false,
        printBackground: true
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
