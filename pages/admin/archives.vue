<template>
  <div class="flex h-screen bg-[#FFFEF1]">
    <AdminSidebar />
    <div class="flex-1 overflow-hidden">
      <AdminHeader />

      <main class="p-8 overflow-y-auto h-[calc(100vh-64px)]">
        <!-- Improved Header with Search and Filters -->
        <div class="mb-8">
          <div class="flex justify-between items-center mb-4">
            <h1 class="text-3xl font-bold text-green-900">Archives</h1>
            <div class="flex items-center gap-4">
              <div class="relative">
                <input v-model="searchQuery" type="search" placeholder="Search students..."
                  class="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200" />
                <Icon name="lucide:search" class="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
              </div>
            </div>
          </div>

          <!-- Archive Stats -->
          <div class="grid grid-cols-4 gap-4 mb-6">
            <div v-for="stat in archiveStats" :key="stat.label"
              class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <p class="text-sm text-gray-600">{{ stat.label }}</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stat.value }}</p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-12 gap-6">
          <!-- Improved Academic Years Panel -->
          <aside class="col-span-3 sticky top-0">
            <div class="bg-white rounded-xl shadow-sm border border-gray-200">
              <div class="p-4 border-b">
                <h2 class="text-lg font-semibold text-gray-900">Academic Years</h2>
                <p class="text-sm text-gray-500">Select an academic year to view records</p>
              </div>
              <nav class="p-2">
                <ul class="space-y-1">
                  <li v-for="year in academicYears" :key="year">
                    <button @click="selectYear(year)"
                      class="w-full p-3 text-left rounded-lg transition-colors flex items-center justify-between"
                      :class="[
                        year === selectedYear
                          ? 'bg-green-50 text-green-700 font-medium'
                          : 'hover:bg-gray-50 text-gray-600'
                      ]">
                      <span>AY {{ year }}</span>
                      <Icon v-if="year === selectedYear" name="lucide:check" class="w-5 h-5" />
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </aside>

          <!-- Improved Section and Students Panel -->
          <section class="col-span-5">
            <div class="bg-white rounded-xl shadow-sm border border-gray-200">
              <div class="p-4 border-b">
                <h2 class="text-lg font-semibold text-gray-900">Sections</h2>
                <p class="text-sm text-gray-500">
                  {{ selectedYear ? `Showing sections for AY ${selectedYear}` : 'Select an academic year' }}
                </p>
              </div>

              <div class="p-4">
                <!-- Section search with dropdown -->
                <div class="mb-4 relative">  <!-- Added relative positioning to parent -->
                  <div class="flex gap-2">
                    <div class="relative flex-1">
                      <input v-model="sectionSearch" type="search" placeholder="Search sections..."
                        class="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200" />
                      <Icon name="lucide:search" class="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                    </div>
                    <div class="relative"> <!-- Added wrapper div with relative positioning -->
                      <button 
                        @click="isDropdownOpen = !isDropdownOpen"
                        class="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                        <span>Sections</span>
                        <Icon :name="isDropdownOpen ? 'lucide:chevron-up' : 'lucide:chevron-down'" class="w-5 h-5" />
                      </button>

                      <!-- Adjusted dropdown position -->
                      <Transition
                        enter-active-class="transition duration-100 ease-out"
                        enter-from-class="transform scale-95 opacity-0"
                        enter-to-class="transform scale-100 opacity-100"
                        leave-active-class="transition duration-75 ease-in"
                        leave-from-class="transform scale-100 opacity-100"
                        leave-to-class="transform scale-95 opacity-0"
                      >
                        <div v-if="isDropdownOpen" 
                          class="absolute right-0 top-full mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                          <div class="max-h-60 overflow-y-auto">
                            <button
                              v-for="section in availableSections"
                              :key="section.id"
                              @click="selectSectionFromDropdown(section)"
                              class="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center justify-between"
                              :class="[
                                selectedSection === section.id 
                                  ? 'bg-green-50 text-green-700' 
                                  : 'text-gray-600'
                              ]"
                            >
                              <span>{{ section.sectionName }}</span>
                              <Icon 
                                v-if="selectedSection === section.id"
                                name="lucide:check" 
                                class="w-5 h-5" 
                              />
                            </button>
                          </div>
                        </div>
                      </Transition>
                    </div>
                  </div>
                </div>

                <!-- Fixed Section List -->
                <div class="border rounded-lg divide-y">
                  <button
                    v-for="section in filteredSections"
                    :key="section.id"
                    @click="selectedSection = section.id"
                    class="w-full p-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
                    :class="[
                      selectedSection === section.id 
                        ? 'bg-green-50 text-green-700' 
                        : 'text-gray-600'
                    ]"
                  >
                    <div class="flex items-center gap-2">
                      <span>{{ section.sectionName }}</span>
                      <span class="text-sm text-gray-500">
                        ({{ section.sectionStudents?.length || 0 }} students)
                      </span>
                    </div>
                    <Icon 
                      v-if="selectedSection === section.id"
                      name="lucide:check" 
                      class="w-5 h-5" 
                    />
                  </button>
                </div>

                <!-- Student list remains unchanged -->
                <div class="mt-4 divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
                  <TransitionGroup 
                    name="list" 
                    tag="div"
                    v-if="filteredStudents.length">
                    <StudentListItem
                      v-for="student in filteredStudents"
                      :key="student.studentId"
                      :student="student"
                      :isSelected="selectedStudent?.studentId === student.studentId"
                      @click="selectStudent(student)"
                    />
                  </TransitionGroup>
                  <div v-else-if="isLoading" class="py-8 text-center text-gray-500">
                    <Icon name="lucide:loader" class="animate-spin w-6 h-6 mx-auto mb-2" />
                    Loading students...
                  </div>
                  <div v-else class="py-8 text-center text-gray-500">
                    No students found
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Improved Student Details Panel -->
          <section class="col-span-4">
            <Transition name="fade" mode="out-in">
              <StudentDetails v-if="selectedStudent" :student="selectedStudent" :section="getCurrentSection"
                @view-anecdotal="viewAnecdotalReport" @view-incidents="viewIncidentHistory" />
              <div v-else class="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                <Icon name="lucide:user" class="w-12 h-12 mx-auto text-gray-400 mb-3" />
                <h3 class="text-lg font-medium text-gray-900 mb-1">No Student Selected</h3>
                <p class="text-gray-500">Select a student to view their details</p>
              </div>
            </Transition>
          </section>
        </div>

        <!-- PDF Viewer Modal -->
        <TransitionRoot :show="isPdfModalOpen" as="template">
          <Dialog as="div" @close="closePdfModal" class="relative z-50">
            <div class="fixed inset-0 bg-black/30" aria-hidden="true" />

            <div class="fixed inset-0 flex items-center justify-center p-4">
              <DialogPanel class="w-full max-w-4xl bg-white rounded-lg shadow-xl">
                <div class="flex items-center justify-between p-4 border-b">
                  <DialogTitle class="text-lg font-semibold text-gray-900">
                    {{ pdfModalTitle }}
                    <span class="ml-2 text-sm text-gray-500">(Archived - Read Only)</span>
                  </DialogTitle>
                  <button @click="closePdfModal" class="text-gray-400 hover:text-gray-500">
                    <Icon name="lucide:x" class="w-5 h-5" />
                  </button>
                </div>
                <div class="h-[80vh]">
                  <iframe v-if="currentPdfUrl" :src="currentPdfUrl" class="w-full h-full"
                    type="application/pdf"></iframe>
                </div>
              </DialogPanel>
            </div>
          </Dialog>
        </TransitionRoot>

        <!-- Incident History Modal -->
        <TransitionRoot :show="isIncidentHistoryOpen" as="template">
          <Dialog as="div" @close="closeIncidentHistory" class="relative z-50">
            <div class="fixed inset-0 bg-black/30" aria-hidden="true" />

            <div class="fixed inset-0 flex items-center justify-center p-4">
              <DialogPanel class="w-full max-w-2xl bg-white rounded-lg shadow-xl">
                <div class="flex items-center justify-between p-4 border-b">
                  <DialogTitle class="text-lg font-semibold text-gray-900">
                    Incident History
                    <span class="ml-2 text-sm text-gray-500">(Archived - Read Only)</span>
                  </DialogTitle>
                  <button @click="closeIncidentHistory" class="text-gray-400 hover:text-gray-500">
                    <Icon name="lucide:x" class="w-5 h-5" />
                  </button>
                </div>
                <div class="p-4 max-h-[70vh] overflow-y-auto">
                  <ul class="divide-y divide-gray-100">
                    <li v-for="incident in studentIncidents" :key="incident.incidentDocID" class="py-3">
                      <button @click="viewIncidentReport(incident.incidentDocID)"
                        class="w-full text-left group hover:bg-gray-50 rounded-lg p-2 transition-colors">
                        <div class="flex items-center justify-between">
                          <span class="text-sm font-medium text-gray-900">
                            {{ incident.dateOfIncident }}
                          </span>
                          <Icon name="lucide:file-text" class="w-5 h-5 text-gray-400 group-hover:text-green-500" />
                        </div>
                        <p class="mt-1 text-sm text-gray-500">{{ incident.purpose }}</p>
                      </button>
                    </li>
                  </ul>
                </div>
              </DialogPanel>
            </div>
          </Dialog>
        </TransitionRoot>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { section } from '~/data/section';
import { academicYear } from '~/data/academicYear';
import { student } from '~/data/student';
import AdminHeader from '~/components/Blocks/AdminHeader.vue';
import AdminSidebar from '~/components/Blocks/AdminSidebar.vue';

// Components
import StudentListItem from '~/components/archives/StudentListItem.vue';
import StudentDetails from '~/components/archives/StudentDetails.vue';
import { Admin } from '~/data/admin';
import { Dialog, DialogPanel, DialogTitle, TransitionRoot } from '@headlessui/vue';
import { incidentReport } from '~/data/incident';
import { anecdotalReport } from '~/data/anecdotal';

// Add these imports
import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { initialReport } from '~/data/initialReport';
import { adviser } from '~/data/adviser';

// Import the defineIncidentDoc util if it exists, or create a util file if it doesn't
import { defineIncidentDoc, defineAnecdotalDoc } from '~/utils/documentDefinitions';

// Add missing import
import { report } from '~/data/report';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const router = useRouter();

// State management with better initialization
const selectedYear = ref(academicYear[academicYear.length - 1].AY);
const selectedSection = ref('');
const selectedStudent = ref(null);
const isLoading = ref(false);

// Add these state variables
const isPdfModalOpen = ref(false);
const isIncidentHistoryOpen = ref(false);
const currentPdfUrl = ref('');
const pdfModalTitle = ref('');
const studentIncidents = ref([]);

// Add these state variables
const reportType = ref('INCIDENT REPORT');
const receivedBy = computed(() =>
  `${(Admin.firstName).toUpperCase()} ${(Admin.middleName).charAt(0).toUpperCase() + '.'} ${(Admin.lastName).toUpperCase()}`
);
const reportedBy = ref('');

// Computed properties with error handling
const academicYears = computed(() => {
  try {
    return academicYear.map(ay => ay.AY).sort((a, b) => b.localeCompare(a));
  } catch (error) {
    console.error('Error computing academic years:', error);
    return [];
  }
});

const availableSections = computed(() => {
  try {
    return section.filter(s => s.sectionSchoolYear === selectedYear.value);
  } catch (error) {
    console.error('Error computing available sections:', error);
    return [];
  }
});

const studentsInSection = computed(() => {
  if (!selectedSection.value) return [];

  try {
    const currentSection = section.find(s => s.id === selectedSection.value);
    if (!currentSection?.sectionStudents) return [];

    return currentSection.sectionStudents
      .map(studentId => student.find(s => s.studentId === studentId))
      .filter(Boolean)
      .sort((a, b) => `${a.lastName}, ${a.firstName}`.localeCompare(`${b.lastName}, ${b.firstName}`));
  } catch (error) {
    console.error('Error computing students in section:', error);
    return [];
  }
});

// Methods with proper error handling
const selectYear = (year: string) => {
  selectedYear.value = year;
  selectedSection.value = '';
  selectedStudent.value = null;
};

const selectStudent = (studentData) => {
  selectedStudent.value = studentData;
};

// Update viewAnecdotalReport method
const viewAnecdotalReport = async (studentId: string) => {
  try {
    const anecdotalData = anecdotalReport.find(a => a.studentId === studentId);
    if (!anecdotalData) throw new Error('Anecdotal report not found');

    const studentData = student.find(s => s.studentId === studentId);
    if (!studentData) throw new Error('Student not found');

    const associatedReports = report.filter(r => anecdotalData.reportIDs.includes(r.reportID))
      .sort((a, b) => new Date(a.datePrepared) - new Date(b.datePrepared));

    if (!associatedReports.length) throw new Error('No reports found');

    const docDefinition = defineAnecdotalDoc({
      studentData,
      anecdotalData,
      associatedReports
    });

    pdfMake.createPdf(docDefinition).getBlob((blob) => {
      const url = URL.createObjectURL(blob);
      currentPdfUrl.value = url;
      pdfModalTitle.value = 'Anecdotal Report';
      isPdfModalOpen.value = true;
    });

  } catch (error) {
    console.error('Error viewing anecdotal report:', error);
    alert('Could not load anecdotal report: ' + error.message);
  }
};

const viewIncidentHistory = (studentId: string) => {
  studentIncidents.value = incidentReport.filter(
    inc => inc.peopleInvolved.includes(selectedStudent.value.firstName)
  ).sort((a, b) => new Date(b.dateOfIncident) - new Date(a.dateOfIncident));

  isIncidentHistoryOpen.value = true;
};

// Update viewIncidentReport method
const viewIncidentReport = async (incidentId: string) => {
  try {
    const incident = incidentReport.find(inc => inc.incidentDocID === incidentId);
    if (!incident) throw new Error('Incident not found');

    // Get reporter info
    const initialReportData = initialReport.find(ir => ir.reportIDRef === incident.reportID);
    if (initialReportData) {
      const reporterId = initialReportData.reportedBY;
      const reporterData = adviser.find(adv => adv.id === reporterId);
      if (reporterData) {
        reportedBy.value = `${(reporterData.firstName).toUpperCase()} ${(reporterData.middleName).charAt(0).toUpperCase() + '.'} ${(reporterData.lastName).toUpperCase()}`;
      }
    }

    // Use the shared document definition utility
    const docDefinition = defineIncidentDoc({
      reportType: reportType.value,
      incidentData: incident,
      reportedBy: reportedBy.value,
      receivedBy: receivedBy.value
    });

    // Display PDF in modal
    pdfMake.createPdf(docDefinition).getBlob((blob) => {
      const url = URL.createObjectURL(blob);
      currentPdfUrl.value = url;
      pdfModalTitle.value = 'Incident Report';
      isIncidentHistoryOpen.value = false;
      isPdfModalOpen.value = true;
    });

  } catch (error) {
    console.error('Error viewing incident report:', error);
  }
};

// Update closePdfModal to revoke object URL
const closePdfModal = () => {
  if (currentPdfUrl.value) {
    URL.revokeObjectURL(currentPdfUrl.value);
  }
  isPdfModalOpen.value = false;
  currentPdfUrl.value = '';
};

const closeIncidentHistory = () => {
  isIncidentHistoryOpen.value = false;
  studentIncidents.value = [];
};

// Additional computed properties
const searchQuery = ref('');

const archiveStats = computed(() => [
  {
    label: 'Total Students',
    value: studentsInSection.value.length
  },
  {
    label: 'Total Sections',
    value: availableSections.value.length
  },
  {
    label: 'With Incidents',
    value: studentsInSection.value.filter(s => s.incidentDocIDs?.length).length
  },
  {
    label: 'With Anecdotal',
    value: studentsInSection.value.filter(s => s.anecdotalDocID).length
  }
]);

const filteredStudents = computed(() => {
  if (!searchQuery.value) return studentsInSection.value;

  const query = searchQuery.value.toLowerCase();
  return studentsInSection.value.filter(student =>
    student.firstName.toLowerCase().includes(query) ||
    student.lastName.toLowerCase().includes(query) ||
    student.studentId.toLowerCase().includes(query)
  );
});

const getCurrentSection = computed(() => {
  return availableSections.value.find(s => s.id === selectedSection.value);
});

// Add new state
const sectionSearch = ref('');
const isDropdownOpen = ref(false);

// Add new computed property for filtered sections
const filteredSections = computed(() => {
  if (!sectionSearch.value.trim()) return []; // Return empty array if search is empty
  const searchTerm = sectionSearch.value.toLowerCase();
  return availableSections.value.filter(section => 
    section.sectionName.toLowerCase().includes(searchTerm)
  );
});

// Add new method to handle section selection from dropdown
const selectSectionFromDropdown = (section) => {
  selectedSection.value = section.id;
  isDropdownOpen.value = false;
};

// Lifecycle hooks
onMounted(() => {
  // Any initialization logic
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

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
