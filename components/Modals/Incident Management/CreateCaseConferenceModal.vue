<template>
    <div class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-center justify-center min-h-screen p-4">
        <!-- Overlay -->
        <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" @click="$emit('close')"></div>
  
        <!-- Modal -->
        <div class="relative bg-white rounded-lg w-full max-w-2xl p-6 shadow-xl">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-lg font-semibold text-gray-900">Create Case Conference Document</h3>
            <button @click="$emit('close')" class="text-gray-400 hover:text-gray-500">
              <span class="sr-only">Close</span>
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
  
          <!-- Form -->
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700">Student Name</label>
                <input v-model="formData.studentName" type="text"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  :class="{ 'border-red-500': errors.studentName }"
                  placeholder="Enter student name">
                <p v-if="errors.studentName" class="mt-1 text-sm text-red-600">{{ errors.studentName }}</p>
              </div>
  
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700">Grade and Section</label>
                <input v-model="formData.gradeAndSection" type="text"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  :class="{ 'border-red-500': errors.gradeAndSection }"
                  placeholder="Enter grade and section">
                <p v-if="errors.gradeAndSection" class="mt-1 text-sm text-red-600">{{ errors.gradeAndSection }}</p>
              </div>
            </div>
  
            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700">Circumstance</label>
              <textarea v-model="formData.circumstance" rows="2"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                :class="{ 'border-red-500': errors.circumstance }"
                placeholder="Describe the circumstance..."></textarea>
              <p v-if="errors.circumstance" class="mt-1 text-sm text-red-600">{{ errors.circumstance }}</p>
            </div>
  
            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700">Discussions</label>
              <textarea v-model="formData.discussions" rows="4"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                :class="{ 'border-red-500': errors.discussions }"
                placeholder="Enter discussion points..."></textarea>
              <p v-if="errors.discussions" class="mt-1 text-sm text-red-600">{{ errors.discussions }}</p>
            </div>
  
            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700">Agreement</label>
              <textarea v-model="formData.agreement" rows="3"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                :class="{ 'border-red-500': errors.agreement }"
                placeholder="Enter agreements made..."></textarea>
              <p v-if="errors.agreement" class="mt-1 text-sm text-red-600">{{ errors.agreement }}</p>
            </div>
  
            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700">Remarks</label>
              <textarea v-model="formData.remarks" rows="2"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Add any remarks..."></textarea>
            </div>
  
            <div class="grid grid-cols-2 gap-4">
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700">Conference Date Time</label>
                <input v-model="formData.conferenceDate" type="date"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  :class="{ 'border-red-500': errors.conferenceDate }">
                <p v-if="errors.conferenceDate" class="mt-1 text-sm text-red-600">{{ errors.conferenceDate }}</p>
              </div>
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700">Time</label>
                <input v-model="formData.time" type="time"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  :class="{ 'border-red-500': errors.time }">
                <p v-if="errors.time" class="mt-1 text-sm text-red-600">{{ errors.time }}</p>
              </div>
            </div>
  
            <!-- Actions -->
            <div class="flex justify-between space-x-3 mt-6 pt-4 border-t">
              <div>
              <button type="button" @click="$emit('close')"
                class="px-4 py-2 border border-gray-500 border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
            </div>
            <div class="flex gap-3">
              <button type="button" @click="clearForm"
                class="px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-300 rounded-md hover:bg-red-50">
                Clear
              </button>
              <button type="button" @click="saveAsDraft"
                class="px-4 py-2 border border-gray-500 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
                Save as Draft
              </button>
              <button type="submit"
                class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#265630] hover:bg-[#728B78]">
                Create Document
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
    name: 'CreateCaseConferenceModal',
    props: {
      incidentId: {
        type: String,
        required: true
      },
      studentInfo: {
        type: Object,
        default: null
      },
      savedDraft: {
        type: Object,
        default: null
      }
    },
  
    data() {
      return {
        formData: this.savedDraft || {
          studentName: '',
          gradeAndSection: '',
          circumstance: '',
          discussions: '',
          agreement: '',
          remarks: '',
          time: '',
          incidentId: this.incidentId,
          conferenceDate: new Date().toISOString().split('T')[0],
          dateAdded: TimeConverters.dateConverter.convert(Date.now()).data,
          status: 'Pending'
        },
        errors: {}
      }
    },
  
    // watch: {
    //   studentInfo: {
    //     handler(newVal) {
    //       if (newVal) {
    //         this.formData.studentName = newVal.name || '';
    //         this.formData.gradeAndSection = newVal.gradeSection || '';
    //       }
    //     },
    //     immediate: true
    //   }
    // },
  
    methods: {
      validate() {
        this.errors = {}
        
        if (!this.formData.studentName?.trim()) {
          this.errors.studentName = 'Student name is required'
        }
        
        if (!this.formData.gradeAndSection?.trim()) {
          this.errors.gradeAndSection = 'Grade and section is required'
        }
        
        if (!this.formData.circumstance?.trim()) {
          this.errors.circumstance = 'Circumstance is required'
        }
        
        if (!this.formData.discussions?.trim()) {
          this.errors.discussions = 'Discussions are required'
        }
        
        if (!this.formData.agreement?.trim()) {
          this.errors.agreement = 'Agreement is required'
        }
        
        if (!this.formData.conferenceDate) {
          this.errors.conferenceDate = 'Conference date is required'
        }
  
        return Object.keys(this.errors).length === 0
      },
  
      handleSubmit() {
        if (this.validate()) {
          const conferenceData = {
            ...this.formData,
          }
          this.$emit('create', conferenceData)
        }
      },

      saveAsDraft() {
        const draftData = {
          ...this.formData,
        }
        this.$emit('save-draft', draftData)
      },

      clearForm() {
        this.formData = {
          studentName: '',
          gradeAndSection: '',
          circumstance: '',
          discussions: '',
          agreement: '',
          remarks: '',
          conferenceDate: new Date().toISOString().split('T')[0],
          time: '',
          status: 'Pending'
        }
      }
    }
  }
  </script>