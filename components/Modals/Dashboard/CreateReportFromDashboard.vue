<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <!-- Success Alert - Updated z-index -->
    <div v-if="showSuccessAlert" 
      class="fixed top-4 right-4 bg-green-100 z-[60] border border-green-400 text-green-700 px-4 py-3 rounded flex items-center gap-3 shadow-lg animate-fade-in max-w-md">
      <Icon name="lucide:check-circle" class="h-6 w-6 text-green-600" />
      <div>
        <p class="font-medium">Report Created Successfully!</p>
        <p class="text-sm">Incident report has been created for further investigation.</p>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-lg w-full max-w-4xl mx-4">
      <header class="p-4 border-b border-gray-200 flex justify-between items-center bg-[#265630] text-white">
        <div>
          <h3 class="text-xl font-semibold">Create Initial Report</h3>
          <p class="text-sm opacity-90">Report ID: {{ generatedID }}</p>
        </div>
        <button @click="$emit('close')" class="text-white hover:text-gray-200">
          <Icon name="lucide:x" class="h-6 w-6" />
        </button>
      </header>

      <main class="p-6 max-h-[80vh] overflow-y-auto">
        <!-- Add Report Selection at the top -->
        <div class="mb-6 bg-white p-6 rounded-xl border border-gray-200">
          <h4 class="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Icon name="lucide:file-plus" class="h-5 w-5 text-[#265630]" />
            Select from Adviser Reports
          </h4>
          
          <div class="relative">
            <select
              v-model="selectedReportId"
              @change="handleReportSelection"
              class="w-full rounded-lg border-gray-300 focus:border-[#265630] focus:ring focus:ring-[#265630] focus:ring-opacity-50"
            >
              <option value="">Create New Report</option>
              <option
                v-for="report in unprocessedReports"
                :key="report.initialDocID"
                :value="report.initialDocID"
              >
                {{ formatReportOption(report) }}
              </option>
            </select>
          </div>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Student Selection -->
          <div class="bg-white p-6 rounded-xl border border-gray-200">
            <h4 class="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Icon name="lucide:users" class="h-5 w-5 text-[#265630]" />
              Select Students Involved
            </h4>
            <div class="space-y-4">
              <div class="relative">
                <input
                  type="text"
                  v-model="studentSearch"
                  placeholder="Search students by name..."
                  class="w-full pl-10 pr-4 py-2 rounded-lg border-gray-300 focus:border-[#265630] focus:ring focus:ring-[#265630] focus:ring-opacity-50"
                />
                <Icon name="lucide:search" class="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>

              <!-- Student Search Results -->
              <div v-if="filteredStudents.length > 0" 
                class="border rounded-lg max-h-48 overflow-y-auto">
                <div v-for="student in filteredStudents" 
                  :key="student.id"
                  @click="toggleStudent(student)"
                  class="p-2 hover:bg-gray-50 flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    :checked="selectedStudents.some(s => s.id === student.id)" 
                    class="rounded text-[#265630]"
                  >
                  <span>{{ student.name }} - {{ student.section }}</span>
                </div>
              </div>

              <!-- Selected Students -->
              <div class="flex flex-wrap gap-2">
                <span v-for="student in selectedStudents" :key="student.id"
                  class="px-2 py-1 bg-[#265630] text-white text-sm rounded-full flex items-center gap-1">
                  {{ student.name }}
                  <button @click="removeStudent(student)" class="hover:text-gray-200">
                    <Icon name="lucide:x" class="h-4 w-4" />
                  </button>
                </span>
              </div>
            </div>
          </div>

          <!-- Incident Details -->
          <div class="bg-white p-6 rounded-xl border border-gray-200">
            <h4 class="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Icon name="lucide:file-text" class="h-5 w-5 text-[#265630]" />
              Incident Details
            </h4>
            <div class="grid grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">Date of Incident</label>
                <input
                  type="date"
                  v-model="formData.dateOfIncident"
                  class="w-full rounded-lg border-gray-300 focus:border-[#265630] focus:ring focus:ring-[#265630] focus:ring-opacity-50"
                  required
                />
              </div>
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">Place of Incident</label>
                <input
                  type="text"
                  v-model="formData.placeOfIncident"
                  class="w-full rounded-lg border-gray-300 focus:border-[#265630] focus:ring focus:ring-[#265630] focus:ring-opacity-50"
                  placeholder="Enter location"
                  required
                />
              </div>
            </div>

            <div class="mt-4 space-y-2">
              <label class="block text-sm font-medium text-gray-700">Things Involved</label>
              <input
                type="text"
                v-model="formData.thingsInvolved"
                class="w-full rounded-lg border-gray-300 focus:border-[#265630] focus:ring focus:ring-[#265630] focus:ring-opacity-50"
                placeholder="List items involved"
                required
              />
            </div>

            <div class="mt-4 space-y-2">
              <label class="block text-sm font-medium text-gray-700">Narrative Report</label>
              <textarea
                v-model="formData.narrativeReport"
                rows="4"
                class="w-full rounded-lg border-gray-300 focus:border-[#265630] focus:ring focus:ring-[#265630] focus:ring-opacity-50"
                placeholder="Initial description of the incident"
                required
              ></textarea>
            </div>
          </div>
        </form>
      </main>

      <footer class="p-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
        <button 
          @click="clearForm"
          type="button"
          class="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Clear
        </button>
        <button 
          @click="$emit('close')"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
          Cancel
        </button>
        <button
          @click="handleSubmit"
          :disabled="!isFormValid"
          class="px-4 py-2 text-sm font-medium text-white bg-[#265630] rounded-lg hover:bg-[#1a3d21] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
          <Icon name="lucide:check" class="h-4 w-4" />
          Create Report
        </button>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { student } from '~/data/student';
import { initialReport } from '~/data/initialReport';
import { adviser } from '~/data/adviser';

const generatedID = ref('');
const studentSearch = ref('');
const selectedStudents = ref<any[]>([]);
const showSuccessAlert = ref(false);
const selectedReportId = ref('');

const formData = ref({
  dateOfIncident: '',
  placeOfIncident: '',
  thingsInvolved: '',
  narrativeReport: '',
});

// Get enrolled students
const availableStudents = computed(() => {
  return student
    .filter(s => s.isEnrolled)
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

const unprocessedReports = computed(() => {
  return initialReport.filter(report => 
    report.isDraft && report.status === 'Unread'
  ).sort((a, b) => new Date(b.dateReported).getTime() - new Date(a.dateReported).getTime());
});

const formatReportOption = (report) => {
  const adviser = getAdviserName(report.reportedBY);
  return `${report.dateReported} - ${adviser} - ${report.thingsInvolved}`;
};

const getAdviserName = (adviserId) => {
  const adviserData = adviser.find(a => a.id === adviserId);
  return adviserData ? `${adviserData.firstName} ${adviserData.lastName}` : 'Unknown Adviser';
};

const toggleStudent = (student: any) => {
  const index = selectedStudents.value.findIndex(s => s.id === student.id);
  if (index === -1) {
    selectedStudents.value.push(student);
  } else {
    selectedStudents.value.splice(index, 1);
  }
};

const removeStudent = (student: any) => {
  selectedStudents.value = selectedStudents.value.filter(s => s.id !== student.id);
};

const generateReportId = () => {
  const prefix = 'REP';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}-${timestamp}-${random}`;
};

onMounted(() => {
  generatedID.value = generateReportId();
});

const isFormValid = computed(() => {
  return selectedStudents.value.length > 0 && 
         +new Date(formData.value.dateOfIncident) <= Date.now() && 
         formData.value.placeOfIncident && 
         formData.value.narrativeReport;
});

const handleReportSelection = () => {
  if (!selectedReportId.value) {
    // Clear form if "Create New Report" is selected
    formData.value = {
      dateOfIncident: '',
      placeOfIncident: '',
      thingsInvolved: '',
      narrativeReport: ''
    };
    selectedStudents.value = [];
    return;
  }

  // Find the selected report
  const report = initialReport.find(r => r.initialDocID === selectedReportId.value);
  if (!report) return;

  // Auto-fill form data
  formData.value = {
    dateOfIncident: report.dateOfIncident,
    placeOfIncident: report.placeOfIncident,
    thingsInvolved: report.thingsInvolved,
    narrativeReport: report.narrativeReport
  };

  // Auto-select involved students
  selectedStudents.value = report.peopleInvolved.map(name => {
    const studentData = student.find(s => 
      `${s.firstName} ${s.lastName}` === name ||
      s.firstName === name
    );
    return studentData ? {
      id: studentData.studentId,
      name: `${studentData.firstName} ${studentData.lastName}`,
      section: studentData.sectionID
    } : null;
  }).filter(Boolean);
};

const handleSubmit = () => {
  if (!isFormValid.value) return;

  const reportData = {
    ...formData.value,
    students: selectedStudents.value,
    reportId: generatedID.value,
    reportedAt: new Date().toISOString(),
    initialReportId: selectedReportId.value || null // Include reference to initial report
  };

  selectedStudents.value.forEach(stud => {
      //query through API the student collection Here I am querying in the mock
      const object = student.find((studObj) => (studObj.studentId === stud.id));
      object?.incidentDocIDs.push(generatedID.value);
      console.log('check object student: ', object);
  });

  showSuccessAlert.value = true;
  setTimeout(() => {
    showSuccessAlert.value = false;
    emit('submit', reportData);
    emit('close');
  }, 5000);
};

const clearForm = () => {
  formData.value = {
    dateOfIncident: '',
    placeOfIncident: '',
    thingsInvolved: '',
    narrativeReport: ''
  };
  selectedStudents.value = [];
  selectedReportId.value = '';
  studentSearch.value = '';
};

const emit = defineEmits(['close', 'submit']);
</script>

<style scoped>
.max-h-[80vh] {
  max-height: 80vh;
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