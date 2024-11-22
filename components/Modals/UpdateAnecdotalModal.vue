<template>
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <!-- Background overlay -->
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <!-- Modal panel -->
      <div class="inline-block w-full max-w-2xl overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle">
        <!-- Header -->
        <div class="px-6 py-4 bg-gray-50 border-b">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-medium text-gray-900">Update Report Details</h3>
            <button @click="$emit('close')" class="text-gray-400 hover:text-gray-500">
              <span class="sr-only">Close</span>
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Form content -->
        <form @submit.prevent="handleSubmit" class="px-6 py-4">
          <div class="space-y-4">
            <!-- Date field - only date of incident -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Date of Incident</label>
              <input type="date" v-model="formData.date" required
                class="mt-1 h-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            </div>

            <!-- Purpose -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Purpose</label>
              <input type="text" v-model="formData.purpose" required
                class="mt-1 h-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            </div>

            <!-- Witnesses -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Witnesses</label>
              <input type="text" v-model="formData.witnesses" required
                placeholder="Separate names with commas"
                class="mt-1 h-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            </div>

            <!-- Place of Incident -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Place of Incident</label>
              <input type="text" v-model="formData.placeOfIncident" required
                class="mt-1 h-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            </div>

            <!-- Things Involved -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Things Involved</label>
              <input type="text" v-model="formData.thingsInvolved" required
                class="mt-1 h-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            </div>

            <!-- Details -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Details</label>
              <textarea v-model="formData.details" rows="4" required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
            </div>

            <!-- Change the label here -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Remarks from the Guidance Counsel</label>
              <textarea v-model="formData.adviserRemarks" rows="3" required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
            </div>
          </div>

          <!-- Error message -->
          <div v-if="error" class="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p class="text-sm text-red-600">{{ error }}</p>
          </div>

          <!-- Form actions -->
          <div class="mt-6 flex items-center justify-end space-x-3">
            <button type="button" @click="$emit('close')"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit"
              class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700">
              Update Report
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    report: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      formData: {
        date: '',
        purpose: '',
        witnesses: '',
        placeOfIncident: '',
        thingsInvolved: '',
        details: '',
        adviserRemarks: ''
      },
      error: null
    }
  },

  created() {
    // Initialize form with existing report data
    if (this.report) {
      this.formData = {
        date: this.report.date,
        purpose: this.report.purpose,
        witnesses: Array.isArray(this.report.witnesses) ? this.report.witnesses.join(', ') : this.report.witnesses,
        placeOfIncident: this.report.placeOfIncident,
        thingsInvolved: this.report.thingsInvolved,
        details: this.report.details,
        adviserRemarks: this.report.adviserRemarks
      }
    }
  },

  methods: {
    handleSubmit() {
      try {
        const updatedData = {
          ...this.formData,
          witnesses: this.formData.witnesses.split(',').map(w => w.trim()),
          lastModified: new Date().toISOString()
        }

        this.$emit('update', updatedData)
      } catch (err) {
        this.error = 'Failed to update report. Please try again.'
        console.error('Update error:', err)
      }
    }
  }
}
</script>
