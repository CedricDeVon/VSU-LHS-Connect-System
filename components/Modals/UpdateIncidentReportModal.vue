<template>
  <div class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-center justify-center min-h-screen p-4">
      <!-- Overlay -->
      <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" @click="$emit('close')"></div>

      <!-- Modal -->
      <div class="relative bg-white rounded-lg w-full max-w-2xl p-6 shadow-xl">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-semibold text-gray-900">Update Incident Report</h3>
          <button @click="$emit('close')" class="text-gray-400 hover:text-gray-500">
            <span class="sr-only">Close</span>
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Read-only Fields -->
          <div class="grid grid-cols-2 gap-4">
            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700">Report ID</label>
              <input type="text" :value="incident.reportID" disabled
                class="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-600">
            </div>

            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700">Date of Incident</label>
              <input type="text" :value="incident.dateOfIncident" disabled
                class="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-600">
            </div>
          </div>

          <!-- Editable Fields -->
          <div class="space-y-4">
            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700">Action Taken</label>
              <textarea v-model="formData.actionTaken" rows="3"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                :class="{ 'border-red-500': errors.actionTaken }"
                placeholder="Describe the actions taken..."></textarea>
              <p v-if="errors.actionTaken" class="mt-1 text-sm text-red-600">{{ errors.actionTaken }}</p>
            </div>

            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700">Reason for Action</label>
              <textarea v-model="formData.reasonOfAction" rows="3"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                :class="{ 'border-red-500': errors.reasonOfAction }"
                placeholder="Explain the reason for the action..."></textarea>
              <p v-if="errors.reasonOfAction" class="mt-1 text-sm text-red-600">{{ errors.reasonOfAction }}</p>
            </div>

            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700">Additional Notes</label>
              <textarea v-model="formData.others" rows="3"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Add any additional notes..."></textarea>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex justify-end space-x-3 mt-6 pt-4 border-t">
            <button type="button" @click="$emit('close')"
              class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Cancel
            </button>
            <button type="submit"
              class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UpdateIncidentReportModal',
  props: {
    incident: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      formData: {
        actionTaken: this.incident.actionTaken || '',
        reasonOfAction: this.incident.reasonOfAction || '',
        others: this.incident.others || ''
      },
      errors: {}
    }
  },

  methods: {
    validate() {
      this.errors = {}
      
      if (!this.formData.actionTaken?.trim()) {
        this.errors.actionTaken = 'Action taken is required'
      }
      
      if (!this.formData.reasonOfAction?.trim()) {
        this.errors.reasonOfAction = 'Reason for action is required'
      }

      return Object.keys(this.errors).length === 0
    },

    handleSubmit() {
      if (this.validate()) {
        const updatedData = {
          ...this.formData,
          lastModified: new Date().toISOString().split('T')[0]
        }
        this.$emit('update', updatedData)
      }
    }
  }
}
</script>