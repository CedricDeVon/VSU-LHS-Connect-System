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
            <div v-if="report?.isDraft === false && store.peopleInvolved" 
              class="p-3 bg-gray-50 rounded-lg text-gray-700">
              {{ store.peopleInvolved.join(', ') }}
            </div>
            <div v-else>
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
              <div v-if="report?.isDraft === false && store.witness" 
                class="p-3 bg-gray-50 rounded-lg text-gray-700">
                {{ store.witness.join(', ') }}
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
              <div v-if="report?.isDraft === false" 
                class="p-3 bg-gray-50 rounded-lg text-gray-700">
                {{ store.dateOfIncident }}
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
              <div v-if="report?.isDraft === false" 
                class="p-3 bg-gray-50 rounded-lg text-gray-700">
                {{ store.placeOfIncident }}
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
              <div v-if="report?.isDraft === false" 
                class="p-3 bg-gray-50 rounded-lg text-gray-700">
                {{ store.thingsInvolved }}
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
            <div v-if="report?.isDraft === false" 
              class="p-3 bg-gray-50 rounded-lg text-gray-700 whitespace-pre-line">
              {{ store.narrativeReport }}
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

          <!-- Reason of Action Section -->
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700">Reason of Action</label>
            <div v-if="report?.isDraft === false" 
              class="p-3 bg-gray-50 rounded-lg text-gray-700 whitespace-pre-line">
              {{ store.reasonOfAction }}
            </div>
            <textarea v-else
              v-model="store.reasonOfAction"
              rows="2"
              placeholder="Provide detailed description of the incident"
              class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200 resize-none"
              @input="autoExpand"
              @keydown="handleTab"
              :class="{ 'border-red-500': errors.reasonOfAction }">
            </textarea>
            <p v-if="errors.reasonOfAction" class="mt-1 text-sm text-red-600">{{ errors.reasonOfAction}}</p>
          </div>

          <!-- Action Taken Section -->
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700">Action Taken</label>
            <div v-if="report?.isDraft === false" 
              class="p-3 bg-gray-50 rounded-lg text-gray-700 whitespace-pre-line">
              {{ store.actionTaken }}
            </div>
            <textarea v-else
              v-model="store.actionTaken"
              rows="2"
              placeholder="Provide detailed description of the incident"
              class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200 resize-none"
              @input="autoExpand"
              @keydown="handleTab"
              :class="{ 'border-red-500': errors.actionTaken }">
            </textarea>
            <p v-if="errors.actionTaken" class="mt-1 text-sm text-red-600">{{ errors.actionTaken}}</p>
          </div>

          <!-- Others Section -->
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700">Others</label>
            <div v-if="report?.isDraft === false" 
              class="p-3 bg-gray-50 rounded-lg text-gray-700 whitespace-pre-line">
              {{ store.others }}
            </div>
            <textarea v-else
              v-model="store.others"
              rows="2"
              placeholder="Provide additional context of the incident"
              class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200 resize-none"
              @input="autoExpand"
              @keydown="handleTab"
              :class="{ 'border-red-500': errors.others }">
            </textarea>
            <p v-if="errors.others" class="mt-1 text-sm text-red-600">{{ errors.others}}</p>
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
          Go Back
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
import { TimeConverters } from '~/library/timeConverters/timeConverters';

  export default {
    name: 'UpdateIncidentReportModal',
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
            default: {
              isDraft: false,
              dateOfIncident: '',
              narrativeReport: '',
              reasonOfAction: '',
              actionTaken: '',
              peopleInvolved: [],
              others: '',
              placeOfIncident: '',
              thingsInvolved: '',
              witness: [], // Update the type to string
            }
        }
    },
    setup(props, { emit }) {
        const peopleInput = ref('');
        const errors = ref({
            peopleInvolved: false,
            witness: false,
            dateOfIncident: false,
            placeOfIncident: false,
            others: false,
            reasonOfAction: false,
            thingsInvolved: false,
            narrativeReport: false,
        });
        const store = adviserReportStore();

        const adviserViewStore = useAdviserViewStore();
        // console.log(adviserViewStore.reportsReportChosen)

        store.peopleInvolved = adviserViewStore.reportsReportChosen.data.peopleInvolved;
        store.witness = adviserViewStore.reportsReportChosen.data.witness;
        store.dateOfIncident = adviserViewStore.reportsReportChosen.data.dateOfIncident;
        store.placeOfIncident = adviserViewStore.reportsReportChosen.data.placeOfIncident;
        store.others = adviserViewStore.reportsReportChosen.data.others;
        store.reasonOfAction = adviserViewStore.reportsReportChosen.data.reasonOfAction;
        store.thingsInvolved = adviserViewStore.reportsReportChosen.data.thingsInvolved;
        store.narrativeReport = adviserViewStore.reportsReportChosen.data.narrativeReport;
        store.actionTaken = adviserViewStore.reportsReportChosen.data.actionTaken;
        

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
      // console.log(store.reportedBY);
      
    };

    const clear = () => {
        store.resetAllData();
    }

    const finalize = async () => {
      await UserSecurity.logInViaToken();
      let user = await getCurrentUser();
      const result: any = await $fetch('/api/incident/draftStatus', {
            method: 'POST',
            body: {
              userId: user.uid,
              initialId: adviserViewStore.reportsReportChosen.data.reportId,
              incidentId: adviserViewStore.reportsReportChosen.id
            }
      })
      // console.log(result)

      await adviserViewStore.updateReports();
      
      alert('Incident Report Finalized')
      emit('close'); // Emit close event to parent component
      };
  
      const submit = async () => {
        initialize();
        const initRep = store.getAllData();
        
        await UserSecurity.logInViaToken();
        let user = await getCurrentUser();
        // console.log(user)
        const result: any = await $fetch('/api/incident/update', {
            method: 'POST',
            body: {
              userId: user.uid,
              dateReported: TimeConverters.dateConverter.convert(Date.now()).data,
              initialId: adviserViewStore.reportsReportChosen.data.reportId,
              incidentId: adviserViewStore.reportsReportChosen.id,
              data: initRep
            }
        })
        // console.log(result)
        await adviserViewStore.updateReports();
        store.resetAllData();
        
        // console.log(initialReport);
        alert('Incident Report Successfully Updated')
        emit('close'); // Emit close event to parent component
      };

      
      return { adviserViewStore, initialize,  messageTextarea, autoExpand, handleTab, store, finalize, submit, peopleInput, addPerson, removePerson, errors, clear };
    },
  };
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
