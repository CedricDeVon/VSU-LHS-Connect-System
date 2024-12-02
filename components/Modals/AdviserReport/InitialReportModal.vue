<template>
    <div class="fixed inset-0 overlap flex justify-center bg-black bg-opacity-70">
      <div class="flex items-center justify-center h-full w-full">
        <div class="h-5/6 w-1/2 bg-white rounded-2xl">
            <button @click="$emit('close')" 
                        class=" flex justify-self-end p-3 text-black hover:text-red-500 z-20">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            <div class="flex justify-self-center">   
            </div>
                <h1 class="header pb-10">INCIDENT DETAILS</h1>
            <div class="body overflow-x-auto overflow-y-auto max-h-96 px-24">
              <div>
                  <h2 class="p-3 pl-0 pr-7">Name of People Involved</h2>
              
                  <h2 v-if="!report.isDraft && report.peopleInvolved" class="input-text">{{ `${report.peopleInvolved}` }}</h2>
                  <input  v-else
                  type="text"
                  v-model="store.peopleInvolved"
                  placeholder="Enumerate student/s involved separated by comma ' , '"
                  class="w-full py-3 px-3 border input-style"
                  required
                  />
          
              </div>
          <div>
            <h2 class="p-3 pt-5 pl-0">Witness/es Involved</h2>
            <h2 v-if="!report.isDraft && report.witness" class="input-text">{{ `${report.witness}` }}</h2>
            <input v-else
              type="text"
              v-model="store.witness"
              placeholder="Enumerate Witness/es"
              class="w-full py-3 px-3 border input-style"
              required
            />
          </div>
          <div>
            <h2 class="p-3 pt-5 pl-0">Date of Incident</h2>
            <h2 v-if="!report.isDraft && report.dateOfIncident" class="input-text">{{ report.dateOfIncident }}</h2>
            <UiVeeDatepicker v-else placeholder="MM/DD/YYYY" v-model="store.dateOfIncident"></UiVeeDatepicker>
          </div>
          <div>
            <h2 class="p-3 pt-5 pl-0">Place of Incident</h2>
            <h2 v-if="!report.isDraft && report.placeOfIncident" class="input-text">{{ report.placeOfIncident }}</h2>
            <input v-else
              type="text"
              v-model="store.placeOfIncident"
              placeholder="Where the incident happened"
              class="w-full py-3 px-3 border input-style"
              required
            />
          </div>
          <div>
            <h2 class="p-3 pt-5 pl-0">Thing/s Involved</h2>
            <h2 v-if="!report.isDraft && report.thingsInvolved" class="input-text">{{ report.thingsInvolved }}</h2>
            <input v-else
              type="text"
              v-model="store.thingsInvolved"
              placeholder="Thing(s) involved in the incident"
              class="w-full py-3 px-3 border input-style"
              required
            />
          </div>
          <div>
            <h2 class="p-3 pt-5 pl-0">Narrative Incident Details</h2>
            <h2 v-if="!report.isDraft && report.narrativeReport" class="input-text">{{ report.narrativeReport }}</h2>
            <textarea v-else
              v-model="store.narrativeReport"
              placeholder="Narrative Report of the incident"
              ref="messageTextarea"
              @input="autoExpand"
              @keydown="handleTab"
              class="w-full py-3 px-3 border input-style"
              required
            ></textarea>
          </div>
        </div>
        

        <div v-if="report.isDraft " class="flex flex-col px-52">
          <button
            @click="draft"
            class="py-3 m-1 rounded-lg whitebutton text-white focus:outline-none"
            aria-label="Draft"
          >
            Save as Draft
          </button>
          <button
            @click="submit"
            class="py-3 m-1 rounded-lg gray-button text-white focus:outline-none"
            aria-label="Submit"
          >
            Submit
          </button>
        </div>
      </div>

      <!-- Action Buttons -->
      <div v-if="report.isDraft" class="bg-gray-50 px-6 py-4 flex justify-between space-x-3">
        
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
  import { useAdviserViewStore } from "~/stores/views/adviserViewStore";
import { UserSecurity } from '~/library/security/userSecurity';

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
            required: true,
            default:{
              initialDocID: '',
              reportIDRef: '',
              reportedBY: '',
              peopleInvolved: [],
              witness: [], // Update the type to string
              dateOfIncident: '',
              placeOfIncident: '',
              thingsInvolved: '',
              narrativeReport: '',
              dateReported: '',
              status: '',
              isDraft:true,
              academicYear: ''
            }
        }
    },
    setup(props, { emit }) {
        console.log();
      
        const peopleInput = ref('');
        const errors = ref({
          peopleInvolved: false,
          witness: false,
          dateOfIncident: false,
          placeOfIncident: false,
          thingsInvolved: false,
          narrativeReport: false,
        });
        const store = adviserReportStore();
        const adviserViewStore = useAdviserViewStore();
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
      const value = peopleInput.value.trim().split(',');
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
      const draft = () => {
        // Handle saving as draft
        // store.dispatch('adviserReportStore/saveDraft', { ...store });
        // store.resetAllData();
        emit('close'); // Emit close event to parent component
      };
      

  
      const submit = async () => {
        // Handle submitting the report
        // store.dispatch('adviserReportStore/submitReport', { ...store });
        initialize();
        const initRep = store.getAllData();
        
        await UserSecurity.logInViaToken();
        let user = await getCurrentUser();
        const result: any = await $fetch('/api/initialReport/create', {
            method: 'POST',
            body: {
              userId: user.uid,
              studentId: adviserViewStore.advisoryStudentData.id,
              data: initRep
            }
        })
        // initialReport.push(initRep);
        store.resetAllData();
        
        // console.log(initialReport);
        emit('close'); // Emit close event to parent component
      };

      
      return { adviserViewStore, initialize,  messageTextarea, autoExpand, handleTab, store, draft, submit, peopleInput, addPerson, removePerson };
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