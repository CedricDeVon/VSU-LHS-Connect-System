<template>
    <div class="bg-white rounded-xl shadow-sm border border-gray-200">
        <!-- Student Header with Cover -->
        <div class="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-t-xl border-b">
            <div class="flex flex-col items-center">
                <div class="w-24 h-24 bg-white rounded-full ring-4 ring-white shadow-md overflow-hidden">
                    <img v-if="student.profilePic" :src="student.profilePic" :alt="`${student.firstName}'s photo`"
                        class="w-full h-full object-cover" />
                    <div v-else
                        class="w-full h-full flex items-center justify-center bg-green-50 text-green-700 text-xl font-bold">
                        {{ getInitials(student) }}
                    </div>
                </div>
                <h3 class="mt-4 text-xl font-semibold text-gray-900">
                    {{ student.firstName }} {{ student.middleName }} {{ student.lastName }}
                </h3>
                <p class="text-gray-600">{{ section?.sectionName || 'No Section' }}</p>
                <p class="text-sm text-gray-500">ID: {{ student.studentId }}</p>
            </div>
        </div>

        <div class="p-6">
            <!-- Student Information -->
            <div class="grid grid-cols-2 gap-4 mb-6">
                <div v-for="(item, index) in studentDetails" :key="index" class="bg-gray-50 p-3 rounded-lg">
                    <dt class="text-sm text-gray-500">{{ item.label }}</dt>
                    <dd class="text-gray-900 font-medium">{{ item.value }}</dd>
                </div>
            </div>

            <!-- Reports Section -->
            <div class="space-y-4">
                <h4 class="font-medium text-gray-900">Reports & Records</h4>
                <div class="text-xs text-gray-500 mb-3">
                    <Icon name="lucide:info" class="w-4 h-4 inline mr-1" />
                    Archived documents are view-only
                </div>

                <!-- Anecdotal Report -->
                <button v-if="student.anecdotalDocID" @click="$emit('view-anecdotal', student.studentId)"
                    class="w-full flex items-center justify-between p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                    <span class="flex items-center">
                        <Icon name="lucide:file-text" class="w-5 h-5 mr-2" />
                        Anecdotal Report
                    </span>
                    <Icon name="lucide:eye" class="w-5 h-5" />
                </button>

                <!-- Incident Reports List -->
                <div v-if="student.incidentDocIDs?.length" class="border rounded-lg divide-y">
                    <button @click="showIncidentList"
                        class="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg w-full transition-colors">
                        <Icon name="lucide:file-warning" class="w-5 h-5 text-amber-500" />
                        <span>View Incident History</span>
                        <span class="ml-auto text-sm text-gray-500">
                            {{ student.incidentDocIDs?.length || 0 }} records
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Incident List Modal -->
    <TransitionRoot :show="isIncidentListOpen" as="template">
        <Dialog as="div" @close="closeIncidentList" class="relative z-50">
            <div class="fixed inset-0 bg-black/30" aria-hidden="true" />

            <div class="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel class="w-full max-w-2xl bg-white rounded-lg shadow-xl">
                    <div class="flex items-center justify-between p-4 border-b">
                        <DialogTitle class="text-lg font-semibold text-gray-900">
                            Incident History
                            <span class="ml-2 text-sm text-gray-500">(Archived - Read Only)</span>
                        </DialogTitle>
                        <button @click="closeIncidentList" class="text-gray-400 hover:text-gray-500">
                            <Icon name="lucide:x" class="w-5 h-5" />
                        </button>
                    </div>
                    <div class="p-4 max-h-[70vh] overflow-y-auto">
                        <ul class="divide-y divide-gray-100">
                            <li v-for="incident in studentIncidents" :key="incident.incidentDocID" class="py-3">
                                <button @click="viewIncidentDetails(incident)"
                                    class="w-full text-left group hover:bg-gray-50 rounded-lg p-2 transition-colors">
                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center gap-2">
                                            <span class="text-sm font-medium text-gray-900">
                                                {{ formatDate(incident.dateOfIncident) }}
                                            </span>
                                            <span class="px-2 py-1 text-xs rounded-full"
                                                :class="getStatusClass(incident.status)">
                                                {{ incident.status }}
                                            </span>
                                        </div>
                                        <Icon name="lucide:file-text" 
                                            class="w-5 h-5 text-gray-400 group-hover:text-green-500" />
                                    </div>
                                    <p class="mt-1 text-sm text-gray-500 line-clamp-2">
                                        {{ incident.narrativeReport }}
                                    </p>
                                </button>
                            </li>
                        </ul>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    </TransitionRoot>

    <!-- Incident Details Split View Modal -->
    <TransitionRoot :show="isIncidentDetailsOpen" as="template">
        <Dialog as="div" @close="closeIncidentDetails" class="relative z-50">
            <div class="fixed inset-0 bg-black/30" aria-hidden="true" />

            <div class="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel class="w-full max-w-7xl bg-white rounded-lg shadow-xl">
                    <div class="flex items-center justify-between p-4 border-b">
                        <div class="flex items-center gap-3">
                            <button @click="backToIncidentList" 
                                class="text-gray-600 hover:text-gray-900 p-1 rounded-lg hover:bg-gray-100">
                                <Icon name="lucide:arrow-left" class="w-5 h-5" />
                            </button>
                            <DialogTitle class="text-lg font-semibold text-gray-900">
                                Incident Report & Case Conferences
                                <span class="ml-2 text-sm text-gray-500">(Archived - Read Only)</span>
                            </DialogTitle>
                        </div>
                        <button @click="closeIncidentDetails" class="text-gray-400 hover:text-gray-500">
                            <Icon name="lucide:x" class="w-5 h-5" />
                        </button>
                    </div>
                    <div class="flex h-[80vh]">
                        <!-- PDF Viewer Section -->
                        <div class="flex-1 border-r">
                            <div class="flex items-center justify-between p-3 bg-gray-50 border-b">
                                <button v-if="viewingCaseConference" 
                                    @click="switchToIncidentPdf"
                                    class="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                                    <Icon name="lucide:arrow-left" class="w-4 h-4" />
                                    Back to Incident Report
                                </button>
                                <span v-else class="text-sm text-gray-600">Incident Report</span>
                            </div>
                            <iframe v-if="currentPdfUrl" :src="currentPdfUrl" class="w-full h-[calc(80vh-40px)]"></iframe>
                        </div>

                        <!-- Case Conferences Section -->
                        <div class="w-96 flex flex-col">
                            <div class="p-4 border-b bg-gray-50">
                                <h3 class="font-medium text-gray-900">Case Conferences</h3>
                                <p class="text-sm text-gray-500">{{ selectedIncident?.hasCaseConference?.length || 0 }} conferences</p>
                            </div>
                            <div class="flex-1 overflow-y-auto p-4">
                                <div v-if="caseConferences.length" class="space-y-3">
                                    <button v-for="conf in caseConferences" 
                                        :key="conf.caseConDocID"
                                        @click="viewCaseConferencePdf(conf)"
                                        class="w-full bg-white border rounded-lg p-4 hover:border-green-500 hover:shadow-md transition-all text-left group">
                                        <div class="flex justify-between items-start mb-2">
                                            <h4 class="font-medium text-gray-900">
                                                {{ formatDate(conf.conferenceDate) }}
                                            </h4>
                                            <Icon name="lucide:file-text" 
                                                class="w-5 h-5 text-gray-400 group-hover:text-green-600" />
                                        </div>
                                        <dl class="space-y-2 text-sm">
                                            <div>
                                                <dt class="text-gray-500">Circumstance</dt>
                                                <dd class="font-medium text-gray-900">{{ conf.circumstance }}</dd>
                                            </div>
                                            <div>
                                                <dt class="text-gray-500">Remarks</dt>
                                                <dd class="text-gray-700">{{ conf.remarks }}</dd>
                                            </div>
                                        </dl>
                                    </button>
                                </div>
                                <div v-else class="text-center py-8 text-gray-500">
                                    No case conferences found
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    </TransitionRoot>

    <!-- PDF Viewer Modal -->
    <PdfViewer v-if="showPdfViewer" :title="pdfTitle" :pdfUrl="pdfUrl" @close="showPdfViewer = false" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { incidentReport } from '~/data/incident';
import { caseConference } from '~/data/caseconference';
import PdfViewer from './PdfViewer.vue';
import { Dialog, DialogPanel, DialogTitle, TransitionRoot } from '@headlessui/vue';
import { defineIncidentDoc, defineCaseConferenceDoc } from '#imports';

const props = defineProps({
    student: {
        type: Object,
        required: true
    },
    section: {
        type: Object,
        default: null
    }
});

defineEmits(['view-anecdotal', 'view-incidents', 'view-incident']);

const studentDetails = computed(() => [
    { label: 'Age', value: props.student.age },
    { label: 'Gender', value: props.student.gender },
    { label: 'Address', value: props.student.address },
    { label: 'Contact Number', value: props.student.contactNum }
]);

const getInitials = (student) => {
    return `${student.firstName[0]}${student.lastName[0]}`;
};

const showPdfViewer = ref(false);
const pdfTitle = ref('');
const pdfUrl = ref('');

// Helper methods for incident details
const getIncidentTitle = (incidentId: string) => {
    const incident = incidentReport.find(inc => inc.incidentDocID === incidentId);
    return incident?.title || 'Incident Report';
};

const getIncidentDate = (incidentId: string) => {
    const incident = incidentReport.find(inc => inc.incidentDocID === incidentId);
    return incident ? new Date(incident.dateOfIncident).toLocaleDateString() : '';
};

const isIncidentListOpen = ref(false);
const studentIncidents = ref([]);

const showIncidentList = () => {
    studentIncidents.value = incidentReport
        .filter(inc => props.student.incidentDocIDs.includes(inc.incidentDocID))
        .sort((a, b) => new Date(b.dateOfIncident) - new Date(a.dateOfIncident));
    isIncidentListOpen.value = true;
};

const closeIncidentList = () => {
    isIncidentListOpen.value = false;
};

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
};

const getStatusClass = (status) => {
    return {
        'bg-green-100 text-green-700': status === 'Resolved',
        'bg-amber-100 text-amber-700': status === 'NotResolved'
    };
};

const isIncidentDetailsOpen = ref(false);
const selectedIncident = ref(null);
const currentPdfUrl = ref('');
const caseConferences = ref([]);
const viewingCaseConference = ref(false);
const incidentPdfUrl = ref('');

const viewIncidentDetails = async (incident) => {
    selectedIncident.value = incident;
    isIncidentDetailsOpen.value = true;
    viewingCaseConference.value = false;

    // Get case conferences for this incident
    caseConferences.value = caseConference
        .filter(conf => conf.incidentID === incident.incidentDocID)
        .sort((a, b) => new Date(b.conferenceDate) - new Date(a.conferenceDate));

    // Generate PDF for incident report
    const docDefinition = defineIncidentDoc({
        reportType: 'INCIDENT REPORT',
        incidentData: incident,
    });

    // Create and display PDF
    pdfMake.createPdf(docDefinition).getBlob((blob) => {
        currentPdfUrl.value = URL.createObjectURL(blob);
        incidentPdfUrl.value = currentPdfUrl.value; // Store incident PDF URL
    });
};

const viewCaseConferencePdf = (conference) => {
    viewingCaseConference.value = true;
    const docDefinition = defineCaseConferenceDoc({
        studentName: conference.studentName,
        gradeAndSection: conference.gradeAndSection,
        conferenceDate: conference.conferenceDate,
        circumstance: conference.circumstance,
        discussions: conference.discussions,
        agreement: conference.agreement,
        remarks: conference.remarks
    });

    pdfMake.createPdf(docDefinition).getBlob((blob) => {
        if (currentPdfUrl.value !== incidentPdfUrl.value) {
            URL.revokeObjectURL(currentPdfUrl.value);
        }
        currentPdfUrl.value = URL.createObjectURL(blob);
    });
};

const switchToIncidentPdf = () => {
    viewingCaseConference.value = false;
    if (currentPdfUrl.value !== incidentPdfUrl.value) {
        URL.revokeObjectURL(currentPdfUrl.value);
        currentPdfUrl.value = incidentPdfUrl.value;
    }
};

const closeIncidentDetails = () => {
    isIncidentDetailsOpen.value = false;
    selectedIncident.value = null;
    viewingCaseConference.value = false;
    if (currentPdfUrl.value) {
        URL.revokeObjectURL(currentPdfUrl.value);
        currentPdfUrl.value = '';
    }
    if (incidentPdfUrl.value) {
        URL.revokeObjectURL(incidentPdfUrl.value);
        incidentPdfUrl.value = '';
    }
};

const backToIncidentList = () => {
    isIncidentDetailsOpen.value = false;
    if (currentPdfUrl.value) {
        URL.revokeObjectURL(currentPdfUrl.value);
        currentPdfUrl.value = '';
    }
    if (incidentPdfUrl.value) {
        URL.revokeObjectURL(incidentPdfUrl.value);
        incidentPdfUrl.value = '';
    }
    isIncidentListOpen.value = true;
};

const filteredStudents = computed(() => {
  if (!studentSearch.value.trim()) return []; // Return empty array if search is empty
  const searchTerm = studentSearch.value.toLowerCase();
  return availableStudents.value.filter(student => 
    student.name.toLowerCase().includes(searchTerm)
  );
});

</script>