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
              <input type="text" :value="incident.id" disabled
                class="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-600">
            </div>
          </div>

          <!-- Editable Fields -->
          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700">People Involved</label>
                <div class="relative">
                  <input 
                    type="text"
                    v-model="peopleInput"
                    @keydown.enter.prevent="addPerson"
                    @keydown.tab.prevent="addPerson"
                    @keydown.comma.prevent="addPerson"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    :class="{ 'border-red-500': errors.peopleInvolved }"
                    placeholder="Type and press Enter to add">
                  <div class="mt-2 flex flex-wrap gap-2">
                    <span 
                      v-for="(person, index) in formData.peopleInvolved" 
                      :key="index"
                      class="inline-flex items-center px-2 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
                      {{ person }}
                      <button 
                        type="button"
                        @click="removePerson(index)"
                        class="ml-1 text-blue-600 hover:text-blue-800">
                        ×
                      </button>
                    </span>
                  </div>
                </div>
                <p v-if="errors.peopleInvolved" class="mt-1 text-sm text-red-600">{{ errors.peopleInvolved }}</p>
              </div>

              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700">Witness</label>
                <div class="relative">
                  <input 
                    type="text"
                    v-model="witnessInput"
                    @keydown.enter.prevent="addWitness"
                    @keydown.tab.prevent="addWitness"
                    @keydown.comma.prevent="addWitness"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    :class="{ 'border-red-500': errors.witness }"
                    placeholder="Type and press Enter to add">
                  <div class="mt-2 flex flex-wrap gap-2">
                    <span 
                      v-for="(w, index) in formData.witness" 
                      :key="index"
                      class="inline-flex items-center px-2 py-1 rounded-full text-sm bg-green-100 text-green-700">
                      {{ w }}
                      <button 
                        type="button"
                        @click="removeWitness(index)"
                        class="ml-1 text-green-600 hover:text-green-800">
                        ×
                      </button>
                    </span>
                  </div>
                </div>
                <p v-if="errors.witness" class="mt-1 text-sm text-red-600">{{ errors.witness }}</p>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700">Date of Incident</label>
                <input v-model="formData.dateOfIncident" type="date"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  :class="{ 'border-red-500': errors.dateOfIncident }">
                <p v-if="errors.dateOfIncident" class="mt-1 text-sm text-red-600">{{ errors.dateOfIncident }}</p>
              </div>

              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700">Place of Incident</label>
                <input v-model="formData.placeOfIncident" type="text"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  :class="{ 'border-red-500': errors.placeOfIncident }"
                  placeholder="Enter incident location">
                <p v-if="errors.placeOfIncident" class="mt-1 text-sm text-red-600">{{ errors.placeOfIncident }}</p>
              </div>
            </div>

            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700">Things Involved</label>
              <input v-model="formData.thingsInvolved" type="text"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                :class="{ 'border-red-500': errors.thingsInvolved }"
                placeholder="Enter items involved">
              <p v-if="errors.thingsInvolved" class="mt-1 text-sm text-red-600">{{ errors.thingsInvolved }}</p>
            </div>

            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700">Narrative Report</label>
              <textarea v-model="formData.narrativeReport" rows="4"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                :class="{ 'border-red-500': errors.narrativeReport }"
                placeholder="Describe what happened..."></textarea>
              <p v-if="errors.narrativeReport" class="mt-1 text-sm text-red-600">{{ errors.narrativeReport }}</p>
            </div>

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
          <div class="flex justify-between space-x-3 mt-6 pt-4 border-t">
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
            <button type="submit"
              class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#265630] hover:bg-[#728B78] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Save Changes
            </button>
          </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { TimeConverters } from '~/library/timeConverters/timeConverters';
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
      peopleInput: '',
      witnessInput: '',
      formData: {
        peopleInvolved: Array.isArray(this.incident.data.peopleInvolved) 
          ? [...this.incident.data.peopleInvolved] 
          : [this.incident.data.peopleInvolved].filter(Boolean),
        witness: Array.isArray(this.incident.data.witness)
          ? [...this.incident.data.witness]
          : [this.incident.data.witness].filter(Boolean),
        dateOfIncident: this.incident.data.dateOfIncident || '',
        placeOfIncident: this.incident.data.placeOfIncident || '',
        thingsInvolved: this.incident.data.thingsInvolved || '',
        narrativeReport: this.incident.data.narrativeReport || '',
        actionTaken: this.incident.data.actionTaken || '',
        reasonOfAction: this.incident.data.reasonOfAction || '',
        others: this.incident.data.others || ''
      },
      errors: {}
    }
  },

  methods: {
    addPerson() {
      const value = this.peopleInput.trim();
      if (value && !this.formData.peopleInvolved.includes(value)) {
        this.formData.peopleInvolved.push(value);
        this.peopleInput = '';
      }
    },

    clearForm() {
      this.formData = {
        peopleInvolved: [],
        witness: [],
        dateOfIncident: '',
        placeOfIncident: '',
        thingsInvolved: '',
        narrativeReport: '',
        actionTaken: '',
        reasonOfAction: '',
        others: ''
      }
    },

    removePerson(index) {
      this.formData.peopleInvolved.splice(index, 1);
    },

    addWitness() {
      const value = this.witnessInput.trim();
      if (value && !this.formData.witness.includes(value)) {
        this.formData.witness.push(value);
        this.witnessInput = '';
      }
    },

    removeWitness(index) {
      this.formData.witness.splice(index, 1);
    },

    validate() {
      this.errors = {}
      
      if (!this.formData.peopleInvolved?.length) {
        this.errors.peopleInvolved = 'At least one person must be involved'
      }
      
      if (!this.formData.witness?.length) {
        this.errors.witness = 'At least one witness is required'
      }
      
      if (!this.formData.dateOfIncident) {
        this.errors.dateOfIncident = 'Date is required'
      }

      if (new Date(this.formData.dateOfIncident) > new Date()) {
        this.errors.dateOfIncident = 'Date cannot be in the future';
      }
      
      if (!this.formData.placeOfIncident?.trim()) {
        this.errors.placeOfIncident = 'Place of incident is required'
      }
      
      if (!this.formData.thingsInvolved?.trim()) {
        this.errors.thingsInvolved = 'Things involved is required'
      }
      
      if (!this.formData.narrativeReport?.trim()) {
        this.errors.narrativeReport = 'Narrative report is required'
      }
      
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
          lastModified: TimeConverters.dateConverter.convert(new Date().toISOString().split('T')[0]).data
        }
        this.$emit('update', updatedData)
      }
    }
  }
}
</script>