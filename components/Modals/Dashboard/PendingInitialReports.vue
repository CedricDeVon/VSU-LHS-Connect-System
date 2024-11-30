<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-4xl mx-4">
      <header class="p-4 border-b border-gray-200 flex justify-between items-center bg-[#265630] text-white rounded-t-lg">
        <h3 class="text-xl font-semibold">Pending Initial Reports from Advisers</h3>
        <button @click="$emit('close')" class="text-white hover:text-gray-200">
          <Icon name="lucide:x" class="h-6 w-6" />
        </button>
      </header>

      <div class="p-6 max-h-[70vh] overflow-y-auto">
        <div v-if="reports.length === 0" class="text-center text-gray-500 py-8">
          No pending initial reports found.
        </div>
        
        <div v-else class="space-y-4">
          <div v-for="report in reports" :key="report.initialDocID" 
            class="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start">
              <div class="space-y-2">
                <h4 class="font-medium text-gray-900">{{ report.narrativeReport }}</h4>
                <p class="text-sm text-gray-600">Students: {{ report.peopleInvolved.join(', ') }}</p>
                <p class="text-sm text-gray-600">Reported by: {{ getAdviserName(report.reportedBY) }}</p>
                <p class="text-sm text-gray-500">{{ report.dateFormatted }}</p>
              </div>
              <div class="flex flex-col gap-2">
                <button
                  @click="handleDocumentIncident(report)"
                  class="px-4 py-2 bg-[#265630] text-white rounded-lg hover:bg-[#1a3d21] transition-colors flex items-center gap-2"
                >
                  <Icon name="lucide:file-plus" class="h-4 w-4" />
                  Document Incident
                </button>
                <button
                  @click="confirmIgnore(report)"
                  class="px-4 py-2 text-gray-900 bg-red-300 rounded-lg hover:bg-red-200 transition-colors flex items-center gap-2"
                >
                  <Icon name="lucide:x-circle" class="h-4 w-4" />
                  Ignore Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer class="p-4 border-t border-gray-200">
        <button
          @click="$emit('close')"
          class="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Close
        </button>
      </footer>
    </div>

    <!-- CreateReportFromDashboard Modal -->
    <CreateReportFromDashboard
      v-if="showCreateReportModal"
      :initial-report-data="selectedReport"
      @close="closeCreateReportModal"
      @submit="handleReportSubmit"
    />

    <!-- Ignore Confirmation Dialog -->
    <div v-if="showIgnoreDialog" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
      <div class="bg-white rounded-lg shadow-lg p-6 max-w-md mx-4">
        <h4 class="text-lg font-semibold text-gray-900 mb-4">Confirm Ignore Report</h4>
        <p class="text-gray-600 mb-6">
          Are you sure you want to ignore this report? This action will remove it from the pending list.
        </p>
        <div class="flex justify-end gap-3">
          <button
            @click="showIgnoreDialog = false"
            class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="handleIgnoreConfirm"
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Confirm Ignore
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CreateReportFromDashboard from './CreateReportFromDashboard.vue';
import { adviser } from '~/data/adviser';

const props = defineProps({
  reports: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['close']);

const showCreateReportModal = ref(false);
const selectedReport = ref(null);

const handleDocumentIncident = (report) => {
  selectedReport.value = report;
  showCreateReportModal.value = true;
};

const closeCreateReportModal = () => {
  showCreateReportModal.value = false;
  selectedReport.value = null;
};

const handleReportSubmit = (data) => {
  // Handle the report submission
  console.log('Report submitted:', data);
  closeCreateReportModal();
  emit('close');
};

const getAdviserName = (adviserId) => {
  const adviserData = adviser.find(a => a.id === adviserId);
  return adviserData ? `${adviserData.firstName} ${adviserData.lastName}` : 'Unknown Adviser';
};

const showIgnoreDialog = ref(false);
const reportToIgnore = ref(null);

const confirmIgnore = (report) => {
  reportToIgnore.value = report;
  showIgnoreDialog.value = true;
};

const handleIgnoreConfirm = () => {
  // Here you would typically update your database or state
  console.log('Ignoring report:', reportToIgnore.value);
  
  // Remove the report from the list
  const index = props.reports.findIndex(r => r.initialDocID === reportToIgnore.value.initialDocID);
  if (index !== -1) {
    props.reports.splice(index, 1);
  }
  
  // Close the dialog
  showIgnoreDialog.value = false;
  reportToIgnore.value = null;
  
  // If no more reports, close the modal
  if (props.reports.length === 0) {
    emit('close');
  }
};
</script>

<style scoped>
.max-h-[70vh] {
  max-height: 70vh;
}
</style>