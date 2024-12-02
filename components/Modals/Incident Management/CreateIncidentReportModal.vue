<template>
  <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-center justify-center min-h-screen p-4">
      <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" @click="$emit('close')"></div>

      <div class="relative bg-white rounded-lg w-full max-w-2xl p-6 shadow-xl">
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-semibold text-gray-900">Create New Incident Report</h3>
          <button @click="$emit('close')" class="text-gray-400 hover:text-gray-500">
            <span class="sr-only">Close</span>
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Student Info (Read-only) -->
          <div class="bg-gray-50 p-4 rounded-lg mb-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700">Student Name</label>
                <input type="text" :value="studentInfo.name" disabled
                  class="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-600">
              </div>
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700">Section</label>
                <input type="text" :value="studentInfo.section" disabled
                  class="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-600">
              </div>
            </div>
          </div>

          <!-- Incident Details -->
          <div class="space-y-4">
            <!-- Date and Place -->
            <div class="grid grid-cols-2 gap-4">
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700">Date of Incident*</label>
                <input v-model="formData.dateOfIncident" type="date"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  :class="{ 'border-red-500': errors.dateOfIncident }">
                <p v-if="errors.dateOfIncident" class="mt-1 text-sm text-red-600">{{ errors.dateOfIncident }}</p>
              </div>
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700">Place of Incident*</label>
                <input v-model="formData.placeOfIncident" type="text"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  :class="{ 'border-red-500': errors.placeOfIncident }">
                <p v-if="errors.placeOfIncident" class="mt-1 text-sm text-red-600">{{ errors.placeOfIncident }}</p>
              </div>
            </div>

            <!-- Things Involved -->
            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700">Things Involved*</label>
              <input v-model="formData.thingsInvolved" type="text"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                :class="{ 'border-red-500': errors.thingsInvolved }">
              <p v-if="errors.thingsInvolved" class="mt-1 text-sm text-red-600">{{ errors.thingsInvolved }}</p>
            </div>

            <!-- Narrative -->
            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700">Narrative Report*</label>
              <textarea v-model="formData.narrativeReport" rows="4"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                :class="{ 'border-red-500': errors.narrativeReport }"
                placeholder="Describe what happened..."></textarea>
              <p v-if="errors.narrativeReport" class="mt-1 text-sm text-red-600">{{ errors.narrativeReport }}</p>
            </div>

            <!-- Action Taken -->
            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700">Initial Action Taken*</label>
              <textarea v-model="formData.actionTaken" rows="3"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                :class="{ 'border-red-500': errors.actionTaken }"></textarea>
              <p v-if="errors.actionTaken" class="mt-1 text-sm text-red-600">{{ errors.actionTaken }}</p>
            </div>
          </div>

          <!-- Footer -->
          <div class="flex items-center justify-between mt-6 pt-4 border-t">
            <div>
              <!-- Secondary Action -->
              <button type="button" @click="$emit('close')"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200">
                Cancel
              </button>
            </div>
            <div class="flex items-center space-x-3">
              <!-- Clear Form -->
              <button type="button" @click="handleClearForm"
                class="px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-300 rounded-md hover:bg-red-50 transition-colors duration-200">
                Clear Form
              </button>
              <!-- Primary Action -->
              <button type="submit"
                class="px-6 py-2 text-sm font-medium text-white bg-[#265630] border border-transparent rounded-md hover:bg-[#728B78] transition-colors duration-200 flex items-center space-x-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
                <span>Create Report</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateIncidentReportModal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    studentInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      formData: {
        peopleInvolved: [this.studentInfo.name],
        dateOfIncident: new Date().toISOString().split('T')[0],
        placeOfIncident: '',
        thingsInvolved: '',
        narrativeReport: '',
        actionTaken: '',
        reasonOfAction: 'To be determined after investigation',
        others: ''
      },
      errors: {}
    }
  },
  methods: {
    validate() {
      this.errors = {};
      
      if (!this.formData.dateOfIncident) {
        this.errors.dateOfIncident = 'Date is required';
      }
      if (new Date(this.formData.dateOfIncident) > new Date()) {
        this.errors.dateOfIncident = 'Date cannot be in the future';
      }
      if (!this.formData.placeOfIncident?.trim()) {
        this.errors.placeOfIncident = 'Place of incident is required';
      }
      if (!this.formData.thingsInvolved?.trim()) {
        this.errors.thingsInvolved = 'Things involved is required';
      }
      if (!this.formData.narrativeReport?.trim()) {
        this.errors.narrativeReport = 'Narrative report is required';
      }
      if (!this.formData.actionTaken?.trim()) {
        this.errors.actionTaken = 'Initial action taken is required';
      }

      return Object.keys(this.errors).length === 0;
    },
    handleSubmit() {
      if (this.validate()) {
        const newIncidentId = `IR${Date.now()}`;
        const newIncident = {
          incidentDocID: newIncidentId,
          reportID: newIncidentId,
          dateReported: new Date().toISOString().split('T')[0],
          status: 'NotResolved',
          ...this.formData,
          witness: [], // Initialize empty witness array
          lastModified: new Date().toISOString().split('T')[0],
          hasCaseConference: [] // Initialize empty case conference array
        };
        
        this.$emit('create', newIncident);
      }
    },
    handleClearForm() {
      if (confirm('Are you sure you want to clear the form? This cannot be undone.')) {
        this.formData = {
          peopleInvolved: [this.studentInfo.name],
          dateOfIncident: new Date().toISOString().split('T')[0],
          placeOfIncident: '',
          thingsInvolved: '',
          narrativeReport: '',
          actionTaken: '',
          reasonOfAction: 'To be determined after investigation',
          others: ''
        };
        this.errors = {};
      }
    }
  }
}

</script>