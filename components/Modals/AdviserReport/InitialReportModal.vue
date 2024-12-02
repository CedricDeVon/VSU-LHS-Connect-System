<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
    <div class="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
      <!-- Header -->
      <div class="bg-green-700 px-6 py-4 flex justify-between items-center">
        <h2 class="text-2xl font-bold text-white">Incident Report Details</h2>
        <button @click="$emit('close')" 
          class="text-white/80 hover:text-white transition-colors focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Form Content -->
      <div class="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
        <div class="space-y-6">
          <!-- People Involved Section -->
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700">People Involved</label>
            <div v-if="report?.isDraft === false && report.peopleInvolved" 
              class="p-3 bg-gray-50 rounded-lg text-gray-700">
              {{ report.peopleInvolved.join(', ') }}
            </div>
            <div v-else class="space-y-2">
              <input
                type="text"
                v-model="peopleInput"
                @keydown.enter.prevent="addPerson"
                @keydown.tab.prevent="addPerson"
                @keydown.comma.prevent="addPerson"
                placeholder="Press Enter or Tab to add person"
                class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200"
                :class="{ 'border-red-500': errors.peopleInvolved }"/>
                <p v-if="errors.peopleInvolved" class="mt-1 text-sm text-red-600">{{ errors.peopleInvolved}}</p>
                
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="(person, index) in store.peopleInvolved" 
                  :key="index"
                  class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                  {{ person }}
                  <button 
                    @click="removePerson(index)"
                    class="ml-1 hover:text-green-900">
                    ×
                  </button>
                </span>
              </div>
            </div>
          </div>

          <!-- Other Form Fields -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700">Witness(es)</label>
              <div v-if="report?.isDraft === false && report.witness" 
                class="p-3 bg-gray-50 rounded-lg text-gray-700">
                {{ report.witness }}
              </div>
              <input v-else
                v-model="store.witness"
                type="text"
                placeholder="Enter witness names or N/A"
                class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200"
                :class="{ 'border-red-500': errors.witness }"/>
                <p v-if="errors.witness" class="mt-1 text-sm text-red-600">{{ errors.witness}}</p>
              
            </div>

            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700">Date of Incident</label>
              <div v-if="report?.isDraft === false && report.dateOfIncident" 
                class="p-3 bg-gray-50 rounded-lg text-gray-700">
                {{ report.dateOfIncident }}
              </div>
              <UiVeeDatepicker v-else
                v-model="store.dateOfIncident"
                placeholder="Select date"
                class="w-full"
              />
                      <!-- :class="'border-red-500': errors.dateOfIncident" -->
                <p v-if="errors.dateOfIncident" class="mt-1 text-sm text-red-600">{{ errors.dateOfIncident}}</p>
            </div>

            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700">Place of Incident</label>
              <div v-if="report?.isDraft === false && report.placeOfIncident" 
                class="p-3 bg-gray-50 rounded-lg text-gray-700">
                {{ report.placeOfIncident }}
              </div>
              <input v-else
                v-model="store.placeOfIncident"
                type="text"
                placeholder="Enter location"
                class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200"
                :class="{ 'border-red-500': errors.placeOfIncident }"/>
                <p v-if="errors.placeOfIncident" class="mt-1 text-sm text-red-600">{{ errors.placeOfIncident}}</p>
            </div>

            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700">Things Involved</label>
              <div v-if="report?.isDraft === false && report.thingsInvolved" 
                class="p-3 bg-gray-50 rounded-lg text-gray-700">
                {{ report.thingsInvolved }}
              </div>
              <input v-else
                v-model="store.thingsInvolved"
                type="text"
                placeholder="Enter items involved"
                class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200"
                :class="{ 'border-red-500': errors.thingsInvolved }"/>
                <p v-if="errors.thingsInvolved" class="mt-1 text-sm text-red-600">{{ errors.thingsInvolved}}</p>
            </div>
          </div>

          <!-- Narrative Section -->
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700">Narrative Report</label>
            <div v-if="report?.isDraft === false && report.narrativeReport" 
              class="p-3 bg-gray-50 rounded-lg text-gray-700 whitespace-pre-line">
              {{ report.narrativeReport }}
            </div>
            <textarea v-else
              v-model="store.narrativeReport"
              rows="6"
              placeholder="Provide detailed description of the incident"
              class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200 resize-none"
              @input="autoExpand"
              @keydown="handleTab"
              :class="{ 'border-red-500': errors.narrativeReport }">
            </textarea>
            <p v-if="errors.narrativeReport" class="mt-1 text-sm text-red-600">{{ errors.narrativeReport}}</p>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div v-if ="report?.isDraft === false" ></div>
      <div v-else class="bg-gray-50 px-6 py-4 flex justify-between space-x-3">
        
        <div>
        <button
          @click="$emit('close')"
          class="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
        >
          Cancel
        </button>
      </div>
        
      <div>
        <button
          @click="draft"
          class="mr-3 px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
        >
          Save as Draft
        </button>
        <button
          @click="submit"
          class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Submit Report
        </button>
      </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { adviserReportStore } from '../../../stores/adviserReport'; // Correct import path
  import { initialReport } from '../../../data/initialReport';
import { adviser } from '~/data/adviser';
import { init } from '@emailjs/browser';
import { academicYear } from '~/data/academicYear';
  
  export default defineComponent({
    name: 'InitialReportModal',
    props: {
        show: {
        type: Boolean,
        default: false
        },

        adviserId: {
          type: String,
          required: true,
          
        },

        report: {
            type: Object,
            required: false,
        }
    },
   
    setup(props, { emit }) {
      
        const peopleInput = ref('');
       const errors = ref({
          peopleInvolved: '',
          witness: '',
          dateOfIncident: '',
          placeOfIncident: '',
          thingsInvolved: '',
          narrativeReport: ''
       });
        const store = adviserReportStore();
        const messageTextarea = ref<HTMLTextAreaElement | null>(null);
        const autoExpand = () => {
        const textarea = messageTextarea.value;
        if (textarea) {
          textarea.style.height = 'auto';
          textarea.style.height = `${Math.min(textarea.scrollHeight, 300)}px`; // 300px is the max height
        }
      };
  
      const handleTab = (event: KeyboardEvent) => {
        const textarea = messageTextarea.value;
        if (event.key === 'Tab' && textarea) {
          event.preventDefault();
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
  
          // Set textarea value to: text before caret + tab + text after caret
          textarea.value = textarea.value.substring(0, start) + '\t' + textarea.value.substring(end);
  
          // Put caret at right position again
          textarea.selectionStart = textarea.selectionEnd = start + 1;
  
          // Trigger input event to update v-model
          textarea.dispatchEvent(new Event('input'));
        }
      };

      const addPerson = () => {
      const value = peopleInput.value.trim();
      if (value && !store.peopleInvolved.includes(value)) {
        store.peopleInvolved.push(value);
        peopleInput.value = '';
      }
    };


    const removePerson = (index: number) => {
      store.peopleInvolved.splice(index, 1);
    };


    const initialize = () => {
      store.reportIDRef = 'Pending Action';
      store.reportedBY = props.adviserId;
      console.log(store.reportedBY);
      
    };


    const validateInputs = () => {
      let isValid = true;

      // Validate each field
      if (!store.peopleInvolved.length) {
        errors.value.peopleInvolved = 'Please add at least one person involved.';
        isValid = false;
      } else {
        errors.value.peopleInvolved = '';
      }

      if (!store.witness.trim()) {
        errors.value.witness = 'Witness is required.';
        isValid = false;
      } else {
        errors.value.witness = '';
      }

      if (!store.dateOfIncident) {
        errors.value.dateOfIncident = 'Date of incident is required.';
        isValid = false;
      } else {
        errors.value.dateOfIncident = '';
      }
      if (new Date(store.dateOfIncident).toISOString().split('T')[0] > new Date().toISOString().split('T')[0]) {
        errors.value.dateOfIncident = "Date of incident can't be in the future.";
        isValid = false;
      } else {
        errors.value.dateOfIncident = '';
      }

      if (!store.placeOfIncident.trim()) {
        errors.value.placeOfIncident = 'Place of incident is required.';
        isValid = false;
      } else {
        errors.value.placeOfIncident = '';
      }

      if (!store.thingsInvolved.trim()) {
        errors.value.thingsInvolved = 'Things involved is required.';
        isValid = false;
      } else {
        errors.value.thingsInvolved = '';
      }

      if (!store.narrativeReport.trim()) {
        errors.value.narrativeReport = 'Narrative report is required.';
        isValid = false;
      } else {
        errors.value.narrativeReport = '';
      }

      return isValid;
    };


    const draft = () => {
      // Handle saving as draft in database
      if(validateInputs()){
      const draftData = store.getAllData();
       draftData.isDraft = true;
       const currentAY = academicYear.find((ay) => ay.isActive);
       if(currentAY){
         draftData.academicYear = currentAY.AY;
       }
      initialReport.push(draftData);

       console.log(initialReport);
       alert('Report saved as draft');

      store.resetAllData();
      emit('close'); // Emit close event to parent component
      }
    };

  
      const submit = () => {
        // Handle submitting the report
        if(validateInputs()){
          initialize();
          const initRep = store.getAllData();
          initRep.isDraft = false;
          const currentAY = academicYear.find((ay) => ay.isActive);
          if(currentAY){
            initRep.academicYear = currentAY.AY;
          }
          initialReport.push(initRep);
          store.resetAllData();
          console.log(initialReport);
          emit('close'); // Emit close event to parent component
        }
       
      };

      
      return { validateInputs, initialize,  messageTextarea, autoExpand, handleTab, store, draft, submit, peopleInput, addPerson, removePerson, errors };
    },
  });
  </script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>