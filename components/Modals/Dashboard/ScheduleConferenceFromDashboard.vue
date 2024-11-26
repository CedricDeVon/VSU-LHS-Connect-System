<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <!-- Confirmation Dialog -->
    <div v-if="showConfirmation" 
      class="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg flex items-center gap-3 shadow-lg animate-fade-in max-w-md">
      <div class="flex-shrink-0">
        <Icon name="lucide:check-circle" class="h-6 w-6 text-green-600" />
      </div>
      <div class="flex-1">
        <p class="font-medium">Case Conference Scheduled Successfully!</p>
        <p class="text-sm mt-1">
          Advisers have been notified via email.
        </p>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-lg w-full max-w-4xl mx-4">
      <header class="p-4 border-b border-gray-200 flex justify-between items-center bg-[#265630] text-white">
        <div>
          <h3 class="text-xl font-semibold">Schedule Case Conference</h3>
          <p class="text-sm opacity-90">Reference ID: {{ generateReferenceId() }}</p>
        </div>
        <button @click="$emit('close')" class="text-white hover:text-gray-200">
          <Icon name="lucide:x" class="h-6 w-6" />
        </button>
      </header>
      
      <main class="p-6 max-h-[80vh] overflow-y-auto">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Add Incident Selection before student selection -->
          <div class="bg-white p-6 rounded-xl border border-gray-200">
            <h4 class="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Icon name="lucide:flag" class="h-5 w-5 text-[#265630]" />
              Select Incident
            </h4>
            <div class="relative">
              <button
                type="button"
                @click="showIncidentDropdown = !showIncidentDropdown"
                class="w-full px-4 py-2.5 text-left border rounded-lg flex justify-between items-center hover:border-[#265630] focus:outline-none focus:ring-2 focus:ring-[#265630] focus:ring-opacity-50"
              >
                <span v-if="selectedIncident">
                  {{ unresolvedIncidents.find(i => i.id === selectedIncident)?.students.join(', ') }} - 
                  {{ unresolvedIncidents.find(i => i.id === selectedIncident)?.date }}
                </span>
                <span v-else class="text-gray-500">
                  Select an unresolved incident...
                </span>
                <Icon name="lucide:chevron-down" class="h-5 w-5 text-gray-400" />
              </button>

              <!-- Dropdown Panel -->
              <div v-if="showIncidentDropdown"
                class="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
                <div v-if="unresolvedIncidents.length === 0" 
                  class="p-4 text-center text-gray-500">
                  No unresolved incidents found
                </div>
                <div v-else v-for="incident in unresolvedIncidents" 
                  :key="incident.id"
                  @click="selectedIncident = incident.id; showIncidentDropdown = false"
                  class="p-4 hover:bg-gray-50 cursor-pointer border-b last:border-b-0">
                  <div class="flex justify-between items-start gap-2">
                    <div>
                      <p class="font-medium text-gray-900">{{ incident.date }}</p>
                      <p class="text-sm text-gray-600 mt-1">Students: {{ incident.students }}</p>
                      <p class="text-sm text-gray-500 mt-1 line-clamp-2">{{ incident.summary }}</p>
                    </div>
                    <div v-if="selectedIncident === incident.id" 
                      class="text-[#265630]">
                      <Icon name="lucide:check" class="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Student Selection -->
          <div class="bg-white p-6 rounded-xl border border-gray-200">
            <h4 class="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Icon name="lucide:users" class="h-5 w-5 text-[#265630]" />
              Students Involved
            </h4>
            <div class="space-y-4">
              <!-- Show selected students from incident -->
              <div class="flex flex-wrap gap-2">
                <span v-for="student in selectedStudents" :key="student.id"
                  class="px-2 py-1 bg-[#265630] text-white text-sm rounded-full flex items-center gap-1">
                  {{ student.name }}
                  <span class="text-xs opacity-75">(From Incident)</span>
                </span>
              </div>
            </div>
          </div>

          <!-- Witness Selection -->
          <div class="bg-white p-6 rounded-xl border border-gray-200">
            <h4 class="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Icon name="lucide:eye" class="h-5 w-5 text-[#265630]" />
              Witnesses
            </h4>
            <div class="space-y-4">
              <!-- Show existing witness from incident -->
              <div v-if="selectedWitnesses.length > 0" class="flex flex-wrap gap-2 mb-4">
                <span v-for="witness in selectedWitnesses" :key="witness.name"
                  class="px-2 py-1 bg-[#265630] text-white text-sm rounded-full flex items-center gap-1">
                  {{ witness.name }}
                  <span v-if="witness.isStudent" class="text-xs opacity-75">(Student)</span>
                  <span v-else class="text-xs opacity-75">(From Incident)</span>
                </span>
              </div>

              <!-- Add additional witnesses -->
              <div>
                <p class="text-sm text-gray-600 mb-2">Add additional witnesses:</p>
                <div class="relative flex gap-2">
                  <div class="flex-1 relative">
                    <input
                      type="text"
                      v-model="witnessSearch"
                      placeholder="Search students or enter witness name..."
                      class="w-full pl-10 pr-4 py-2 rounded-lg border-gray-300 focus:border-[#265630] focus:ring focus:ring-[#265630] focus:ring-opacity-50"
                      @keyup.enter="addCustomWitness"
                    />
                    <Icon name="lucide:search" class="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                  </div>
                  <button 
                    @click="addCustomWitness"
                    type="button"
                    class="px-4 py-2 text-sm bg-[#265630] text-white rounded-lg hover:bg-[#1a3d21]">
                    Add
                  </button>
                </div>
              </div>
      
              <!-- Show student suggestions if searching -->
              <div v-if="filteredWitnessStudents.length > 0" 
                class="border rounded-lg max-h-48 overflow-y-auto">
                <div v-for="student in filteredWitnessStudents" 
                  :key="student.id"
                  @click="selectedWitnesses.push({ id: student.id, name: student.name, isStudent: true }); witnessSearch = '';"
                  class="p-2 hover:bg-gray-50 flex items-center gap-2 cursor-pointer">
                  <Icon name="lucide:user" class="h-4 w-4 text-gray-400" />
                  <span>{{ student.name }} <span class="text-sm text-gray-500">(Student)</span></span>
                </div>
              </div>
      
              <!-- Selected witnesses list -->
              <div class="flex flex-wrap gap-2">
                <span v-for="witness in selectedWitnesses" :key="witness.name"
                  class="px-2 py-1 bg-[#265630] text-white text-sm rounded-full flex items-center gap-1">
                  {{ witness.name }}
                  <span v-if="witness.isStudent" class="text-xs opacity-75">(Student)</span>
                  <button @click="selectedWitnesses = selectedWitnesses.filter(w => w.name !== witness.name)" 
                    class="hover:text-gray-200">
                    <Icon name="lucide:x" class="h-4 w-4" />
                  </button>
                </span>
              </div>
            </div>
          </div>

          <!-- Date and Time -->
          <div class="bg-white p-6 rounded-xl border border-gray-200">
            <h4 class="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Icon name="lucide:calendar" class="h-5 w-5 text-[#265630]" />
              Schedule Details
            </h4>
            <div class="grid grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  v-model="formData.date"
                  :min="new Date().toISOString().split('T')[0]"
                  class="w-full rounded-lg border-gray-300 focus:border-[#265630] focus:ring focus:ring-[#265630] focus:ring-opacity-50"
                  required
                />
              </div>
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">Time</label>
                <input
                  type="time"
                  v-model="formData.time"
                  class="w-full rounded-lg border-gray-300 focus:border-[#265630] focus:ring focus:ring-[#265630] focus:ring-opacity-50"
                  required
                />
              </div>
            </div>
          </div>

          <!-- Notes -->
          <div class="bg-white p-6 rounded-xl border border-gray-200">
            <h4 class="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Icon name="lucide:file-text" class="h-5 w-5 text-[#265630]" />
              Additional Notes
            </h4>
            <textarea
              v-model="formData.notes"
              rows="4"
              class="w-full rounded-lg border-gray-300 focus:border-[#265630] focus:ring focus:ring-[#265630] focus:ring-opacity-50"
              placeholder="Enter any additional notes or agenda items..."
            ></textarea>
          </div>
        </form>
      </main>

      <footer class="p-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
        <button @click="$emit('close')" 
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
          Cancel
        </button>
        <button
          @click="handleSubmit"
          :disabled="!isFormValid"
          class="px-4 py-2 text-sm font-medium text-white bg-[#265630] rounded-lg hover:bg-[#1a3d21] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
          <Icon name="lucide:check" class="h-4 w-4" />
          Schedule Conference
        </button>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { student } from '~/data/student';
import { incidentReport } from '~/data/incident';
import { initialReport } from '~/data/initialReport';

const studentSearch = ref('');
const witnessSearch = ref('');
const selectedStudents = ref<any[]>([]);
const selectedWitnesses = ref<Array<{ id?: string; name: string; isStudent: boolean }>>([]);

const formData = ref({
  date: '',
  time: '',
  notes: ''
});

// Replace mock student data with actual student data
const availableStudents = computed(() => {
  return student
    .filter(s => s.isEnrolled) // Only get enrolled students
    .map(s => ({
      id: s.studentId,
      name: `${s.firstName} ${s.lastName}`,
      section: s.sectionID
    }));
});

const filteredStudents = computed(() => {
  if (!studentSearch.value) return [];
  const searchTerm = studentSearch.value.toLowerCase();
  return availableStudents.value.filter(student => 
    student.name.toLowerCase().includes(searchTerm)
  );
});

const filteredWitnessStudents = computed(() => {
  if (!witnessSearch.value) return [];
  const searchTerm = witnessSearch.value.toLowerCase();
  const selectedIds = selectedStudents.value.map(s => s.id);
  return availableStudents.value
    .filter(student => !selectedIds.includes(student.id))
    .filter(student => student.name.toLowerCase().includes(searchTerm));
});

const toggleStudent = (student: any) => {
  const index = selectedStudents.value.findIndex(s => s.id === student.id);
  if (index === -1) {
    selectedStudents.value.push(student);
  } else {
    selectedStudents.value.splice(index, 1);
  }
};

const addCustomWitness = () => {
  if (!witnessSearch.value.trim()) return;
  
  // Check if witness matches any student first
  const matchedStudent = availableStudents.value.find(
    s => s.name.toLowerCase() === witnessSearch.value.toLowerCase()
  );

  if (matchedStudent) {
    selectedWitnesses.value.push({
      id: matchedStudent.id,
      name: matchedStudent.name,
      isStudent: true
    });
  } else {
    // Add as non-student witness
    selectedWitnesses.value.push({
      name: witnessSearch.value.trim(),
      isStudent: false
    });
  }
  witnessSearch.value = '';
};

const removeStudent = (student: any) => {
  selectedStudents.value = selectedStudents.value.filter(s => s.id !== student.id);
};

const removeWitness = (witness: any) => {
  selectedWitnesses.value = selectedWitnesses.value.filter(w => w.name !== witness.name);
};

const generateReferenceId = () => {
  const prefix = 'CONF';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}-${timestamp}-${random}`;
};

// Add new state for incident selection
const selectedIncident = ref<string>('');
const showIncidentDropdown = ref(false);

// Get unresolved incidents
const unresolvedIncidents = computed(() => {
  const incidents = incidentReport
    .filter(inc => inc.status === 'NotResolved' && inc.AY === '2024-2025')
    .map(inc => {
      // Get the initial report data
      const initialData = initialReport.find(report => report.reportIDRef === inc.reportID);
      
      return {
        id: inc.incidentDocID,
        reportID: inc.reportID,
        date: new Date(inc.dateOfIncident).toLocaleDateString(),
        students: inc.peopleInvolved,
        summary: inc.narrativeReport.substring(0, 100) + '...',
        witness: initialData?.witness || ''
      };
    });
  
  console.log('Unresolved incidents:', incidents); // For debugging
  return incidents;
});

// Update form validation to require incident selection
const isFormValid = computed(() => {
  return selectedStudents.value.length > 0 && 
         formData.value.date && 
         formData.value.time && 
         selectedIncident.value;
});

// Add new state for confirmation dialog
const showConfirmation = ref(false);
const advisersNotified = ref<string[]>([]);

// Modify handleSubmit
const handleSubmit = () => {
  if (!isFormValid.value) return;

  // Get unique advisers from the selected students' sections
  const uniqueAdvisers = Array.from(new Set(
    selectedStudents.value.map(student => {
      const sectionAdvisor = student.section; // You'll need to get the actual adviser info
      return sectionAdvisor;
    }).filter(Boolean)
  ));

  advisersNotified.value = uniqueAdvisers;
  showConfirmation.value = true;

  // Close confirmation after 3 seconds and submit
  setTimeout(() => {
    showConfirmation.value = false;
    emit('submit', {
      ...formData.value,
      students: selectedStudents.value,
      witnesses: selectedWitnesses.value,
      referenceId: generateReferenceId(),
      scheduledAt: new Date().toISOString(),
      incidentId: selectedIncident.value,
      notifiedAdvisers: uniqueAdvisers
    });
    emit('close');
  }, 3000);
};

const emit = defineEmits(['close', 'submit']);

// Update watchers and refs
watch(() => selectedIncident.value, (newIncidentId) => {
  if (newIncidentId) {
    console.log('Selected incident ID:', newIncidentId); // For debugging
    
    const incident = incidentReport.find(inc => inc.incidentDocID === newIncidentId);
    console.log('Found incident:', incident); // For debugging
    
    if (incident) {
      // Get all enrolled students who have this incident ID
      const involvedStudents = student
        .filter(s => s.isEnrolled && s.incidentDocIDs.includes(newIncidentId))
        .map(s => ({
          id: s.studentId,
          name: `${s.firstName} ${s.lastName}`,
          section: s.sectionID
        }));

      console.log('Found involved students:', involvedStudents); // For debugging
      selectedStudents.value = involvedStudents;

      // Get the initial report for witness info
      const initialReportData = initialReport.find(report => 
        report.reportIDRef === incident.reportID
      );
      console.log('Found initial report:', initialReportData); // For debugging

      if (initialReportData?.witness) {
        const witnessStudent = student.find(s => 
          `${s.firstName} ${s.lastName}`.toLowerCase() === initialReportData.witness.toLowerCase()
        );

        selectedWitnesses.value = [{
          id: witnessStudent?.studentId,
          name: witnessStudent ? `${witnessStudent.firstName} ${witnessStudent.lastName}` : initialReportData.witness,
          isStudent: !!witnessStudent
        }];
        console.log('Set witnesses:', selectedWitnesses.value); // For debugging
      }
    }
  } else {
    selectedStudents.value = [];
    selectedWitnesses.value = [];
  }
});
</script>

<style scoped>
.max-h-[80vh] {
  max-height: 80vh;
}

/* Add styles for the dropdown scrollbar */
.overflow-auto {
  scrollbar-width: thin;
  scrollbar-color: #728B78 #f1f1f1;
}

.overflow-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.overflow-auto::-webkit-scrollbar-thumb {
  background: #728B78;
  border-radius: 3px;
}

.overflow-auto::-webkit-scrollbar-thumb:hover {
  background: #265630;
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>