
<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import IncidentReports from '@/components/Modals/IncidentReports.vue';
import CreateIncidentReport from '@/components/Modals/Incident Management/CreateIncidentReport.vue';

import { incidentReport } from '~/data/incident.js';

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  studentData: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['close']);
const router = useRouter();

const showIncidentModal = ref(false);
const showCreateIncidentModal = ref(false);

const hasIncidents = computed(() => {
  return props.studentData?.incidentDocIDs?.length > 0;
});

const incidentButtonText = computed(() => {
  const count = props.studentData?.incidentDocIDs?.length || 0;
  return count > 1 ? `Incident Reports (${count})` : 'Incident Report';
});

const handleOverlayClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    emit('close');
  }
};

const viewFullDetails = () => {
  const studentSectionId = props.studentData.sectionID;
  
  if (studentSectionId) {
    emit('close');
    router.push({
      path: `/admin/section/${studentSectionId}`,
      query: { source: 'search' }
    });
  } else {
    alert('Student is not assigned to any section');
  }
};

const viewAnecdotalReport = () => {
  if (props.studentData.anecdotalDocID) {
    emit('close');
    router.push(`/admin/anecdote/${props.studentData.studentId}`);
  } else {
    alert('No anecdotal report available for this student');
  }
};

const createIncidentReport = () => {
  console.log('Opening create incident modal');
  showCreateIncidentModal.value = true;
};

const handleCreateIncident = async (newIncident: any) => {
  try {
    // Update incidentReport array
    incidentReport.push(newIncident);
    localStorage.setItem('incidentReports', JSON.stringify(incidentReport));
    
    // Update student's incidentDocIDs
    const updatedStudent = {
      ...props.studentData,
      incidentDocIDs: [...(props.studentData.incidentDocIDs || []), newIncident.incidentDocID]
    };
    
    // Close modals
    showCreateIncidentModal.value = false;
    emit('close');

    // Navigate to new incident report
    await router.push(`/admin/incident/${newIncident.incidentDocID}`);
  } catch (error) {
    console.error('Error creating incident:', error);
    alert('Failed to create incident report');
  }
};
</script>

<template>
    <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 font-century-gothic" @click="handleOverlayClick">
        <div class="bg-[#FFFEF1] rounded-2xl w-[600px] max-h-[90vh]  relative" @click.stop>
            <!-- Close button -->
            <button @click="$emit('close')" 
                    class="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <!-- Title Bar -->
            <div class="bg-[#265630] py-4 rounded-t-2xl">
                <h1 class="text-white text-2xl font-bold text-center">Student Information</h1>
            </div>

            <!-- Student Details -->
            <div class="p-6">
                <div v-if="studentData" class="flex flex-col items-center">
                     <img :src="studentData?.profilePic || 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNpcmNsZS11c2VyLXJvdW5kIj48cGF0aCBkPSJNMTggMjBhNiA2IDAgMCAwLTEyIDAiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEwIiByPSI0Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48L3N2Zz4='"
                         :alt="`${studentData.firstName}'s profile`"
                         class="w-32 h-32 rounded-full object-cover mb-4"/>
                    
                    <h2 class="text-2xl font-bold text-green-900 mb-2">
                        {{ `${studentData.firstName} ${studentData.middleName || ''} ${studentData.lastName}` }}
                    </h2>

                    <p class="text-lg mb-6">ID NO: {{ studentData.studentId }}</p>

                    <!-- Student Details Grid - Updated styling -->
                    <div class="w-full space-y-4 bg-gray-50 rounded-lg p-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div class="space-y-4">
                                <div class="flex flex-col">
                                    <span class="text-sm text-gray-500">Gender</span>
                                    <span class="font-medium">{{ studentData.gender || 'N/A' }}</span>
                                </div>
                                <div class="flex flex-col">
                                    <span class="text-sm text-gray-500">Birth Date</span>
                                    <span class="font-medium">{{ studentData.birthDate || 'N/A' }}</span>
                                </div>
                                <div class="flex flex-col">
                                    <span class="text-sm text-gray-500">Age</span>
                                    <span class="font-medium">{{ studentData.age || 'N/A' }}</span>
                                </div>
                            </div>
                            <div class="space-y-4">
                                <div class="flex flex-col">
                                    <span class="text-sm text-gray-500">Address</span>
                                    <span class="font-medium">{{ studentData.address || 'N/A' }}</span>
                                </div>
                                <div class="flex flex-col">
                                    <span class="text-sm text-gray-500">Contact</span>
                                    <span class="font-medium">{{ studentData.contactNum || 'N/A' }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Action Buttons - Updated hierarchy and styling -->
                    <div class="w-full space-y-4 mt-6">
                        <!-- Primary Actions -->
                        <div class="space-y-2">
                            <button @click="viewFullDetails" 
                                    class="w-full px-4 py-3 rounded-md bg-[#265630] hover:bg-[#1a3d21] text-white transition-all duration-200 font-medium flex items-center justify-center space-x-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                                </svg>
                                <span>View Section Details</span>
                            </button>

                            <button @click="createIncidentReport"
                                    class="w-full px-4 py-3 rounded-md border-2 border-[#265630] text-[#265630] hover:bg-[#265630] hover:text-white transition-all duration-200 font-medium flex items-center justify-center space-x-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                                </svg>
                                <span>Create Incident Report</span>
                            </button>
                        </div>

                        <!-- Secondary Actions -->
                        <div class="pt-4 border-t border-gray-200 space-y-2">
                            <!-- Record Actions -->
                            <div :class="[
                                hasIncidents ? 'grid grid-cols-2 gap-3' : 'w-full'
                            ]">
                                <button @click="viewAnecdotalReport"
                                        :class="[
                                            'px-4 py-3 rounded-md bg-[#728B78] hover:bg-[#536757] text-white transition-all duration-200 font-medium flex items-center justify-center space-x-2',
                                            hasIncidents ? '' : 'w-full'
                                        ]">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                    </svg>
                                    <span>Anecdotal Report</span>
                                </button>

                                <!-- View Incidents - Only show if has incidents -->
                                <button v-if="hasIncidents" 
                                        @click="showIncidentModal = true"
                                        class="px-4 py-3 rounded-md bg-white border-2 border-[#728B78] text-[#728B78] hover:bg-[#728B78] hover:text-white transition-all duration-200 font-medium flex items-center justify-center space-x-2">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-.586-1.414l-3.5-3.5a2 2 0 00-1.414-.586h-1"/>
                                    </svg>
                                    <span>{{ incidentButtonText }}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Add Modal -->
    <IncidentReports 
        :show="showIncidentModal"
        :student-data="studentData"
        @close="showIncidentModal = false"
    />

    <!-- Add Create Incident Modal -->
    <CreateIncidentReport 
        v-if="showCreateIncidentModal"
        :show="showCreateIncidentModal"
        :student-info="{
            name: studentData ? `${studentData.firstName} ${studentData.lastName}` : '',
            section: studentData?.sectionID || ''
        }"
        @close="showCreateIncidentModal = false"
        @create="handleCreateIncident"
    />
</template>

<style scoped>
@font-face {
    font-family: 'Century Gothic';
    src: url('/fonts/CenturyGothic.woff2') format('woff2'),
         url('/fonts/CenturyGothic.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

.font-century-gothic {
    font-family: 'Century Gothic', sans-serif;
}

/* Scrollbar styles */
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
}

::-webkit-scrollbar-thumb {
    background: #728B78;
    border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
    background: #265630;
}

* {
    scrollbar-width: thin;
    scrollbar-color: #728B78 #f1f1f1;
}

/* Add new styles */
.grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

button {
  transform: translateY(0);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

button:active {
  transform: translateY(0);
}
</style>