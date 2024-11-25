<template>
  <div class="flex h-screen bg-[#FFFEF1]">  <!-- Changed bg-gray-100 to bg-[#FFFEF1] -->
    <AdminSidebar />
    <div class="flex-1 overflow-hidden">
      <AdminHeader />
      <div class="p-8 pt-0 overflow-y-auto h-[calc(100vh-64px)]">
        <!-- Page Title -->
        <div class="mb-6">
          <h1 class="text-2xl font-bold text-[#265630]">Incident Report Details</h1>
          <p class="text-sm text-[#265630]">Managing incident report and related actions</p>
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
            <!-- Status Card -->
            <div class="bg-white rounded-lg shadow-md p-4">
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-500">Current Status</span>
                <span :class="{
                  'px-3 py-1 text-sm font-medium rounded-full': true,
                  'bg-green-100 text-green-800': incidentData?.status === 'Resolved',
                  'bg-yellow-100 text-yellow-800': incidentData?.status === 'NotResolved'
                }">
                  {{ incidentData?.status === 'NotResolved' ? 'Under Investigation' : 'Case Resolved' }}
                </span>
              </div>
              <div class="mt-3 text-xs text-gray-500">
                Last updated: {{ incidentData?.lastModified || 'Not modified' }}
              </div>
            </div>

            <!-- Case Conference Section - Show only if not resolved with conferences or if has conferences -->
            <div v-if="showCaseConferenceSection" class="bg-white rounded-lg shadow-md overflow-hidden">
              <div class="p-4 bg-gray-50 border-b border-gray-200">
                <h2 class="text-sm font-semibold text-gray-900">Case Conference Management</h2>
              </div>
              
              <div class="p-4 space-y-4">
                <!-- Conference Status -->
                <div v-if="hasScheduledConferences" class="mb-4">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-sm font-medium text-gray-700">Next Conference</span>
                    <span class="text-xs text-gray-500">{{ nextConferenceDate }}</span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <div class="flex-1">
                      <div class="h-2 bg-blue-100 rounded-full overflow-hidden">
                        <div class="h-full bg-blue-500" :style="{ width: conferenceProgress + '%' }"></div>
                      </div>
                    </div>
                    <span class="text-xs font-medium text-gray-600">
                      {{ pendingConferencesCount }} pending
                    </span>
                  </div>
                </div>

                <!-- Conference Actions -->
                <div class="space-y-3">
                  <!-- Schedule Conference - Show if unresolved and no pending conferences -->
                  <button v-if="!isResolved && !hasScheduledConferences"
                    @click="openScheduleDialog"
                    class="w-full px-4 py-3 rounded-lg bg-[#265630] hover:bg-[#728B78] text-white">
                    <div class="flex items-center justify-center space-x-2">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>Schedule New Conference</span>
                    </div>
                  </button>

                  <!-- Create Conference Document - Show if has scheduled but undocumented conference -->
                  <button v-if="hasUndocumentedConference"
                    @click="openCreateConferenceDoc"
                    class="w-full px-4 py-3 rounded-lg bg-[#265630] hover:bg-[#728B78] text-white">
                    <div class="flex items-center justify-center space-x-2">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>Document Latest Conference</span>
                    </div>
                  </button>

                  <!-- View Conference History - Only show if has actual conferences -->
                  <button v-if="shouldShowConferenceHistory"
                    @click="viewConferenceHistory"
                    class="w-full px-4 py-3 rounded-lg bg-white border-2 border-[#265630] text-[#265630] hover:bg-[#728B78] hover:text-white hover:border-[#728B78]">
                    <div class="flex items-center justify-center space-x-2">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <span>View Conference History</span>
                      <span class="text-xs text-gray-600 bg-gray-200 px-2 py-1 rounded-full">{{ conferenceCount }}</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <!-- Message when resolved without conferences -->
            <div v-else-if="isResolved && !hasCaseConference" class="bg-white rounded-lg shadow-md p-4">
              <p class="text-center text-gray-600">This incident does not have any case conferences</p>
            </div>

            <!-- Primary Actions - Only show if incident is not resolved -->
            <div v-if="!isResolved" class="bg-white rounded-lg shadow-md overflow-hidden">
              <div class="p-4 bg-gray-50 border-b border-gray-200">
                <h2 class="text-sm font-semibold text-gray-900">Case Actions</h2>
              </div>
              
              <div class="p-4 space-y-3">
                <!-- Create Case Conference Document Button -->
                <button v-if="hasCaseConference"
                  @click="openCreateConferenceDoc"
                  class="w-full px-4 py-3 rounded-lg bg-[#265630] hover:bg-[#728B78] text-white transition-colors duration-200 flex items-center">
                  <div class="flex items-center justify-center w-full space-x-3">
                    <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>{{ hasConferenceDraft ? 'Update Case Conference' : 'Create Case Conference Document' }}</span>
                  </div>
                </button>
                <div v-else>
                  <h3><i>The incident does not have a case conference</i></h3>
                </div>

                <!-- Update Report -->
                <button @click="openUpdateForm"
                  class="w-full px-4 py-3 rounded-lg bg-white border-2 border-[#265630] text-[#265630] hover:bg-[#728B78] hover:text-white hover:border-[#728B78] transition-colors duration-200 flex items-center justify-center space-x-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span>Update Incident Report</span>
                </button>

                <!-- Resolution Button -->
                <button @click="confirmResolve"
                  class="w-full px-4 py-3 rounded-lg bg-white border-2 border-[#265630] text-[#265630] hover:bg-[#728B78] hover:text-white hover:border-[#728B78] transition-colors duration-200 flex items-center justify-center space-x-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Mark as Resolved</span>
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
                  class="flex flex-col items-center justify-center p-4 rounded-lg border border-[#265630] text-[#265630] hover:bg-[#728B78] hover:text-white hover:border-[#728B78] transition-colors duration-200">
                  <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span class="mt-2 text-sm font-medium text-gray-600">Download</span>
                </button>

                <button @click="printDocument"
                  class="flex flex-col items-center justify-center p-4 rounded-lg border border-[#265630] text-[#265630] hover:bg-[#728B78] hover:text-white hover:border-[#728B78] transition-colors duration-200">
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
        <!-- Add Case Conference Button -->
        <!-- <div class="mt-4">
          <button
            @click="navigateToCreateConference"
            class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Create Case Conference
          </button>
        </div> -->
      </div>
    </div>

    <!-- Modals -->
    <UpdateIncidentReportModal v-if="showUpdateModal" :incident="incdReport" @close="showUpdateModal = false"
      @update="handleUpdate" />

    <ScheduleConferenceModal 
      v-if="showScheduleModal && !isViewingHistory" 
      @close="showScheduleModal = false"
      @schedule="handleScheduleConference" />

    <ViewCaseConferencesModal 
      v-if="showScheduleModal && isViewingHistory"
      :conferences="caseConferences"
      :incident-id="incdReport.incidentDocID"
      @close="closeConferenceHistory" />

    <CreateCaseConferenceModal 
      v-if="showCreateConfDocModal"
      :incident-id="incdReport.incidentDocID"
      :student-info="showCreateConfDocModal ? {
        name: incdReport.peopleInvolved?.join(', '),
        gradeSection: incdReport.peopleInvolved ? 'Grade 7 - Javascript' : ''
      } : null"
      :saved-draft="savedConferenceDoc"
      @close="showCreateConfDocModal = false"
      @create="handleCreateConferenceDoc"
      @save-draft="handleSaveDraft" />
  </div>
</template>
<script>
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { headerImage } from '~/assets/images/sample-header';
import { footer } from '~/assets/images/footer';
import { incidentReport, updateIncidentReport, initializeIncidentReports } from '~/data/incident';
import { Admin } from '~/data/admin';
import { initialReport } from '~/data/initialReport';
import { adviser } from '~/data/adviser';
import AdminSidebar from '~/components/Blocks/AdminSidebar.vue';
import AdminHeader from '~/components/Blocks/AdminHeader.vue';
import UpdateIncidentReportModal from '~/components/Modals/Incident Management/UpdateIncidentReportModal.vue';
import ScheduleConferenceModal from '~/components/Modals/Incident Management/ScheduleConferenceModal.vue';
import ViewCaseConferencesModal from '~/components/Modals/Incident Management/ViewCaseConferencesModal.vue';
import CreateCaseConferenceModal from '~/components/Modals/Incident Management/CreateCaseConferenceModal.vue';
import { caseConference } from '~/data/caseconference';
import { defineIncidentDoc } from '~/utils/documentDefinitions';

const route = useRoute();
const router = useRouter();

const navigateToCreateConference = () => {
  router.push(`/admin/conferences/create?incidentId=${route.params.id}`);
};

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
      incdReport: {},
      reportType: 'INCIDENT REPORT',
      receivedBy: `${(Admin.firstName).toUpperCase()} ${(Admin.middleName).charAt(0).toUpperCase() + '.'} ${(Admin.lastName).toUpperCase()}`,
      reportedBy: '',
      incidentData: null,
      showUpdateModal: false,
      showScheduleModal: false,
      caseConferences: [], // Will store conference history
      isViewingHistory: false,
      showCreateConfDocModal: false,
      savedConferenceDoc: null,
    };
  },

  async created() {
    initializeIncidentReports(); // Initialize from localStorage
    const incidentId = this.$route.params.id;
    await this.initIncidentByID(incidentId);
    await this.getReporter(this.incdReport.reportID);
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

    hasConferenceDraft() {
      const savedDraft = localStorage.getItem(`draft_conference_${this.incdReport.incidentDocID}`);
      return !!savedDraft;
    },

    shouldShowConferenceHistory() {
      const conferences = this.incidentData?.hasCaseConference;
      if (!Array.isArray(conferences)) return false;
      if (conferences.length === 0) return false;
      // Only show if at least one conference ID exists and is valid
      return conferences.some(id => typeof id === 'string' && id.includes('caseConID'));
    }
  },

  methods: {
    async initIncidentByID(id) {
      const fetchedObject = incidentReport.find(item => item.incidentDocID === id);
      if (fetchedObject) {
        // Ensure hasCaseConference is always an array
        const hasCaseConference = Array.isArray(fetchedObject.hasCaseConference) 
          ? fetchedObject.hasCaseConference.filter(id => id?.includes('caseConID'))
          : [];

        this.incdReport = { 
          ...fetchedObject,
          hasCaseConference 
        };
        this.incidentData = { ...this.incdReport };
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
      const docDefinition = defineIncidentDoc({
        reportType: this.reportType,
        incidentData: this.incdReport,
        reportedBy: this.reportedBy,
        receivedBy: this.receivedBy
      });

      pdfMake.createPdf(docDefinition).getBlob((blob) => {
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
      const docDefinition = defineIncidentDoc({
        reportType: this.reportType,
        incidentData: this.incdReport,
        reportedBy: this.reportedBy,
        receivedBy: this.receivedBy
      });
      
      pdfMake.createPdf(docDefinition).download(fileName);
    },

    printDocument() {
      const docDefinition = defineIncidentDoc({
        reportType: this.reportType,
        incidentData: this.incdReport,
        reportedBy: this.reportedBy,
        receivedBy: this.receivedBy
      });

      pdfMake.createPdf(docDefinition).print({
        silent: false,
        printBackground: true
      });
    }
  }
}
</script>
