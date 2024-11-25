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
                    <button @click="$emit('view-incidents', student.studentId)"
                        class="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg w-full">
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

    <!-- PDF Viewer Modal -->
    <PdfViewer v-if="showPdfViewer" :title="pdfTitle" :pdfUrl="pdfUrl" @close="showPdfViewer = false" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { incidentReport } from '~/data/incident';
import PdfViewer from './PdfViewer.vue';

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
    const incident = incidentReport.find(inc => inc.id === incidentId);
    return incident?.title || 'Incident Report';
};

const getIncidentDate = (incidentId: string) => {
    const incident = incidentReport.find(inc => inc.id === incidentId);
    return incident ? new Date(incident.dateOfIncident).toLocaleDateString() : '';
};
</script>