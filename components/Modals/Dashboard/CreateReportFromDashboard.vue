
<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <!-- Success Alert -->
    <div v-if="showSuccessAlert" 
      class="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center gap-3 shadow-lg animate-fade-in max-w-md">
      <Icon name="lucide:check-circle" class="h-6 w-6 text-green-600" />
      <div>
        <p class="font-medium">Report Created Successfully!</p>
        <p class="text-sm">Report has been submitted for processing.</p>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-lg w-full max-w-4xl mx-4">
      <header class="p-4 border-b border-gray-200 flex justify-between items-center bg-[#265630] text-white">
        <div>
          <h3 class="text-xl font-semibold">Create Initial Report</h3>
          <p class="text-sm opacity-90">Report ID: {{ generateReportId() }}</p>
        </div>
        <button @click="$emit('close')" class="text-white hover:text-gray-200">
          <Icon name="lucide:x" class="h-6 w-6" />
        </button>
      </header>

      <main class="p-6 max-h-[80vh] overflow-y-auto">
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
                <label class="block text-sm font-medium text-gray-700">Adviser Faculty ID</label>
                <input
                  type="text"
                  v-model="formData.reportedBY"
                  class="w-full rounded-lg border-gray-300 focus:border-[#265630] focus:ring focus:ring-[#265630] focus:ring-opacity-50"
                  required
                />
              </div>
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
              <label class="block text-sm font-medium text-gray-700">Witness</label>
              <input
                type="text"
                v-model="formData.witness"
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
          @click="$emit('close')"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
          Cancel
        </button>
        <button
          @click="handleSubmit"
          :disabled="!isFormValid"
          class="px-4 py-2 text-sm font-medium text-white bg-[#265630] rounded-lg hover:bg-[#1a3d21] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
          <Icon name="lucide:check" class="h-4 w-4" />
          Submit Report
        </button>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentUser } from 'vuefire';
import { UserSecurity } from "~/library/security/userSecurity";
import { TimeConverters } from '~/library/timeConverters/timeConverters';
import { useAdminViewStore } from '~/stores/views/adminViewStore';

const adminViewStore = useAdminViewStore();

const studentSearch = ref('');
const selectedStudents = ref<any[]>([]);
const showSuccessAlert = ref(false);

const formData = ref({
  dateOfIncident: '',
  placeOfIncident: '',
  thingsInvolved: '',
  narrativeReport: '',
  reportedBY: '',
  witness: '',
});

// Get enrolled students
const availableStudents = computed(() => {
  return adminViewStore.dashBoardStudents
    .filter((s: any) => s.data.isEnrolled)
    .map((s: any) => ({
      id: s.id,
      name: `${s.data.firstName} ${s.data.lastName}`,
      section: s.data.sectionId
    }));
});

const filteredStudents = computed(() => {
  if (!studentSearch.value) return [];
  const searchTerm = studentSearch.value.toLowerCase();
  const result = availableStudents.value.filter((student: any) => 
    student.name.toLowerCase().includes(searchTerm)
  );
  console.log(result);
  return result;
});

const toggleStudent = (student: any) => {
  const index = selectedStudents.value.findIndex((s: any) => s.id === student.id);
  if (index === -1) {
    selectedStudents.value.push(student);

  } else {
    selectedStudents.value.splice(index, 1);
  }
};

const removeStudent = (student: any) => {
  selectedStudents.value = selectedStudents.value.filter((s: any) => s.id !== student.id);
};

const generateReportId = () => {
  const prefix = 'REP';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}-${timestamp}-${random}`;
};

const isFormValid = computed(() => {
  return selectedStudents.value.length > 0 && 
         formData.value.dateOfIncident && 
         formData.value.placeOfIncident && 
         formData.value.narrativeReport;
});

const handleSubmit = async () => {
  if (!isFormValid.value) return;

  const reportData = {
    ...formData.value,
    peopleInvolved: selectedStudents.value.map((student: any) => {
      return student.name;
    }),
    dateReported: TimeConverters.dateConverter.convert(Date.now()).data,
    status: 'Unread',
    reportIDRef: '',
    isDraft: true,
    academicYear: adminViewStore.dashBoardTimeline.data.schoolYear
  };

  const result = await $fetch('/api/admin/view/createReportFromDashboard', {
    method: 'POST',
    body: {
      reportId: generateReportId(),
      data: reportData
    }
  })
  await adminViewStore.updateDashboard();

  console.log(reportData);

  showSuccessAlert.value = true;
  setTimeout(() => {
    showSuccessAlert.value = false;
    emit('submit', reportData);
    emit('close');
  }, 2000);
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