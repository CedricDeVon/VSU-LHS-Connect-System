<template>
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <!-- Background overlay -->
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <!-- Modal panel -->
      <div
        class="inline-block w-full max-w-2xl overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle">
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
                class="mt-1 px-4 h-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            </div>

            <!-- Purpose -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Purpose</label>
              <input type="text" v-model="formData.purpose" required
                class="mt-1 px-4 h-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            </div>

            <!-- Witnesses -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Witnesses</label>
              <input type="text" v-model="formData.witnesses" required placeholder="Separate names with commas"
                class="mt-1 px-4 h-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            </div>

            <!-- Place of Incident -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Place of Incident</label>
              <input type="text" v-model="formData.placeOfIncident" required
                class="mt-1 px-4 h-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            </div>

            <!-- Things Involved -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Things Involved</label>
              <input type="text" v-model="formData.thingsInvolved" required
                class="mt-1 px-4 h-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            </div>

            <!-- Details -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Details</label>
              <textarea v-model="formData.details" rows="4" required
                class="mt-1 px-4 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
            </div>

            <!-- Remarks section -->
            <div>
              <label class="block text-sm font-medium text-gray-700">
                {{ isFromAdviserRoute ? 'Adviser\'s Remarks' : 'Remarks from the Guidance Office' }}
              </label>
              <textarea v-model="formData.remarks" rows="3" required
                class="mt-1 px-4 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
              </textarea>
            </div>
          </div>

          <!-- Error message -->
          <div v-if="error" class="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p class="text-sm text-red-600">{{ error }}</p>
          </div>

          <!-- Form actions -->
          <div class="mt-6 flex items-center justify-between space-x-3">
            <div>
              <button type="button" @click="$emit('close')"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                Cancel
              </button>
            </div>
            <div class="flex items-center gap-3">
              <button type="button" @click="clearForm"
                class="px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-300 rounded-md hover:bg-red-50">
                Clear
              </button>
              <button type="button" @click="saveDraft"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                Save Draft
              </button>
              <button type="submit"
                class="px-4 py-2 text-sm font-medium text-white bg-[#265630] border border-transparent rounded-md hover:bg-[#728B78]">
                Update Report
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
        remarks: '',
        isReportedByGuidance: false // Default to adviser view
      },
      error: null
    }
  },

  computed: {
    isFromAdviserRoute() {
      return this.$route.path.includes('/adviser/')
    }
  },

  created() {
    // Check for saved draft first
    const savedDraft = localStorage.getItem('reportDraft');
    if (savedDraft) {
      this.formData = JSON.parse(savedDraft);
    } else if (this.report) {
      // Initialize with report data if no draft exists
      this.formData = {
        ...this.formData,
        date: this.report.date,
        purpose: this.report.purpose,
        witnesses: Array.isArray(this.report.witnesses) ? this.report.witnesses.join(', ') : this.report.witnesses,
        placeOfIncident: this.report.placeOfIncident,
        thingsInvolved: this.report.thingsInvolved,
        details: this.report.details,
        remarks: this.report.remarks,
        isReportedByGuidance: !this.isFromAdviserRoute // Set based on route
      }
    }
  },

  methods: {
    handleSubmit() {
      try {
        const updatedData = {
          ...this.formData,
          witnesses: this.formData.witnesses.split(',').map(w => w.trim()),
          lastModified: new Date().toISOString(),
          isReportedByGuidance: !this.isFromAdviserRoute // Set based on route when submitting
        }

        this.$emit('update', updatedData)
        localStorage.removeItem('reportDraft'); // Clear draft after successful submission
      } catch (err) {
        this.error = 'Failed to update report. Please try again.'
        console.error('Update error:', err)
      }
    },

    saveDraft() {
      try {
        localStorage.setItem('reportDraft', JSON.stringify(this.formData));
        alert('Draft saved successfully!');
      } catch (err) {
        console.error('Error saving draft:', err);
        this.error = 'Failed to save draft. Please try again.';
      }
    },

    clearForm() {
      if (confirm('Are you sure you want to clear all fields? This cannot be undone.')) {
        this.formData = {
          date: '',
          purpose: '',
          witnesses: '',
          placeOfIncident: '',
          thingsInvolved: '',
          details: '',
          remarks: '',
          isReportedByGuidance: true
        };
        localStorage.removeItem('reportDraft'); // Clear saved draft as well
      }
    }
  }
}
</script>
