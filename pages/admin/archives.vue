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
                <input
                  v-model="searchQuery"
                  type="search"
                  placeholder="Search students..."
                  class="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
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
                    <button
                      @click="selectYear(year)"
                      class="w-full p-3 text-left rounded-lg transition-colors flex items-center justify-between"
                      :class="[
                        year === selectedYear 
                          ? 'bg-green-50 text-green-700 font-medium' 
                          : 'hover:bg-gray-50 text-gray-600'
                      ]">
                      <span>AY {{ year }}</span>
                      <Icon 
                        v-if="year === selectedYear"
                        name="lucide:check" 
                        class="w-5 h-5" 
                      />
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
                <select
                  v-model="selectedSection"
                  class="w-full rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-200">
                  <option value="">All Sections</option>
                  <option v-for="sec in availableSections" 
                    :key="sec.id" 
                    :value="sec.id">
                    {{ sec.sectionName }} ({{ sec.sectionPopulation }} students)
                  </option>
                </select>

                <!-- Student List with Virtual Scrolling -->
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
              <StudentDetails
                v-if="selectedStudent"
                :student="selectedStudent"
                :section="getCurrentSection"
                @view-anecdotal="viewAnecdotalReport"
                @view-incidents="viewIncidentHistory"
              />
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
                  <iframe 
                    v-if="currentPdfUrl"
                    :src="currentPdfUrl"
                    class="w-full h-full"
                    type="application/pdf"
                  ></iframe>
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
                    <li v-for="incident in studentIncidents" :key="incident.incidentDocID" 
                      class="py-3">
                      <button
                        @click="viewIncidentReport(incident.incidentDocID)"
                        class="w-full text-left group hover:bg-gray-50 rounded-lg p-2 transition-colors"
                      >
                        <div class="flex items-center justify-between">
                          <span class="text-sm font-medium text-gray-900">
                            {{ incident.dateOfIncident }}
                          </span>
                          <Icon 
                            name="lucide:file-text" 
                            class="w-5 h-5 text-gray-400 group-hover:text-green-500"
                          />
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
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { headerImage } from '~/assets/images/sample-header';
import { footer } from '~/assets/images/footer';
import { initialReport } from '~/data/initialReport';
import { adviser } from '~/data/adviser';

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

    // Get student data
    const studentData = student.find(s => s.studentId === studentId);
    if (!studentData) throw new Error('Student not found');

    // Get associated reports
    const associatedReports = report.filter(r => anecdotalData.reportIDs.includes(r.reportID))
      .sort((a, b) => new Date(a.datePrepared) - new Date(b.datePrepared));

    // Generate content array for reports
    const reportsContent = [];
    
    for (const rep of associatedReports) {
      const preparedDate = new Date(rep.datePrepared).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      const incidentDate = new Date(rep.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      reportsContent.push(
        {
          text: preparedDate,
          style: 'subheader',
          margin: [0, 20, 0, 10],
          color: '#1f2937'
        },
        {
          table: {
            widths: ['30%', '70%'],
            headerRows: 0,
            body: [
              ['Date of Incident:', incidentDate],
              ['Purpose:', rep.purpose],
              ['Witnesses:', rep.witnesses.join(', ')],
              ['Place of Incident:', rep.placeOfIncident],
              ['Things Involved:', rep.thingsInvolved]
            ].map(row => [
              { text: row[0], style: 'label', border: [false, false, false, false] },
              { text: row[1], style: 'content', border: [false, false, false, false] }
            ])
          }
        },
        { text: 'Details:', style: 'label', margin: [0, 15, 0, 5] },
        { text: rep.details, style: 'content', margin: [30, 0, 30, 15] },
        { text: rep.isReportedByGuidance ? 'Remarks from the Guidance Office:' : 'Adviser\'s Remarks:', 
          style: 'label', margin: [0, 15, 0, 5] },
        { text: rep.remarks, style: 'content', margin: [30, 0, 30, 15] }
      );
    }

    // Create document definition
    const docDefinition = {
      pageMargins: [72, 120, 72, 90],
      header: {
        image: headerImage,
        width: 600,
        height: 100,
        alignment: 'center',
        margin: [0, 10, 0, 0],
      },
      content: [
        { text: 'ANECDOTAL REPORT', style: 'header', margin: [0, 0, 0, 0] },
        {
          table: {
            widths: ['30%', '70%'],
            headerRows: 0,
            body: [
              ['Student Name:', `${studentData.firstName} ${studentData.middleName} ${studentData.lastName}`],
              ['Student ID:', studentData.studentId],
              ['Academic Year:', anecdotalData.AY]
            ].map(row => [
              { text: row[0], style: 'label', border: [false, false, false, false] },
              { text: row[1], style: 'content', border: [false, false, false, false] }
            ])
          }
        },
        ...reportsContent
      ],
      styles: {
        header: { fontSize: 20, bold: true, alignment: 'center' },
        subheader: { fontSize: 15, bold: true },
        label: { bold: true, fontSize: 11, margin: [0, 10, 0, 10] },
        content: { fontSize: 11, margin: [0, 10, 0, 10] }
      },
      footer: {
        image: footer,
        width: 480,
        alignment: 'center',
        margin: [0, 10, 0, 0]
      }
    };

    // Generate and display PDF
    pdfMake.createPdf(docDefinition).getBlob((blob) => {
      const url = URL.createObjectURL(blob);
      currentPdfUrl.value = url;
      pdfModalTitle.value = 'Anecdotal Report';
      isPdfModalOpen.value = true;
    });

  } catch (error) {
    console.error('Error viewing anecdotal report:', error);
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

    // Generate PDF document definition
    const docDefinition = {
      pageMargins: [72, 120, 72, 90],
      header: {
        image: headerImage,
        width: 600,
        height: 100,
        alignment: 'center',
        margin: [0, 10, 0, 0],
      },
      content: [
        { text: reportType.value, style: 'header', margin: [0, 0, 0, 30] },
        {
          table: {
            widths: ['30%', '70%'],
            headerRows: 0,
            body: [
              ['Name of People Involved:', incident.peopleInvolved?.join(', ')],
              ['Witness:', incident.witness],
              ['Date of Incident:', incident.dateOfIncident],
              ['Place of Incident:', incident.placeOfIncident],
              ['Things Involved:', incident.thingsInvolved]
            ].map(row => [
              { text: row[0], style: 'label', border: [false, false, false, false] },
              { text: row[1], style: 'content', border: [false, false, false, false] }
            ])
          }
        },
        { text: 'Narrative Report:', style: 'label', margin: [0, 15, 0, 5] },
        { text: incident.narrativeReport, style: 'content', margin: [30, 0, 30, 10] },
        // ...add other sections like Action Taken, Reason, etc...
      ],
      styles: {
        header: { fontSize: 18, bold: true, alignment: 'center' },
        label: { bold: true, fontSize: 11, margin: [0, 10, 0, 10] },
        content: { fontSize: 11, margin: [0, 10, 0, 10] }
      },
      footer: {
        image: footer,
        width: 480,
        alignment: 'center',
        margin: [0, 10, 0, 0]
      }
    };

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