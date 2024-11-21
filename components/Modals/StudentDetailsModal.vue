<template>
    <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 font-century-gothic" @click="handleOverlayClick">
        <div class="bg-[#FFFEF1] rounded-2xl w-[600px] max-h-[90vh] overflow-y-auto relative" @click.stop>
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

                    <!-- Student Details Grid -->
                    <div class="w-full space-y-4">
                        <div class="flex justify-between">
                            <span class="font-semibold">Gender:</span>
                            <span>{{ studentData.gender }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="font-semibold">Birth Date:</span>
                            <span>{{ studentData.birthDate }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="font-semibold">Age:</span>
                            <span>{{ studentData.age }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="font-semibold">Address:</span>
                            <span>{{ studentData.address }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="font-semibold">Contact:</span>
                            <span>{{ studentData.contactNum }}</span>
                        </div>

                        <!-- Updated Buttons Section -->
                        <div class="space-y-2 mt-4">
                            <!-- Primary Action -->
                            <button @click="viewFullDetails" 
                                    class="bg-[#265630] hover:bg-[#1a3d21] w-full text-white px-4 py-2 rounded-md transition-colors">
                                View Section
                            </button>

                            <!-- Secondary Action -->
                            <button @click="viewAnecdotalReport" class="bg-[#728B78] hover:bg-[#536757] w-full text-white px-4 py-2 rounded-md transition-colors">
                                View Anecdotal Report
                            </button>

                            <!-- Warning/Alert Action -->
                            <button v-if="hasIncidents" 
                                    @click="showIncidentModal = true"
                                    class="bg-[#9B2C2C] hover:bg-[#7B1D1D] w-full text-white px-4 py-2 rounded-md transition-colors">
                                View {{ incidentButtonText }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Add Modal -->
    <IncidentReportsModal 
        :show="showIncidentModal"
        :student-data="studentData"
        @close="showIncidentModal = false"
    />
</template>

<script>
import { section } from '~/data/section.js';
import IncidentReportsModal from '~/components/Modals/IncidentReportsModal.vue';

console.log('K')

export default {
    name: 'StudentDetailsModal',
    props: {
        show: {
            type: Boolean,
            default: false
        },
        studentData: {
            type: Object,
            required: true
        }
    },
    computed: {
        hasIncidents() {
            return this.studentData?.incidentDocIDs?.length > 0;
        },
        incidentButtonText() {
            const count = this.studentData?.incidentDocIDs?.length || 0;
            return count > 1 ? `Incident Reports (${count})` : 'Incident Report';
        }
    },
    emits: ['close'],
    methods: {
        handleOverlayClick(event) {
            if (event.target === event.currentTarget) {
                this.$emit('close');
            }
        },
        viewFullDetails() {
            const studentSectionId = this.studentData.sectionID;
            
            if (studentSectionId) {
                this.$emit('close');
                this.$router.push({
                    path: `/admin/section/${studentSectionId}`,
                    query: { source: 'search' }
                });
            } else {
                alert('Student is not assigned to any section');
            }
        },
        viewAnecdotalReport() {
            if (this.studentData.anecdotalDocID) {
                this.$emit('close');
                this.$router.push(`/admin/anecdote/${this.studentData.studentId}`);
            } else {
                alert('No anecdotal report available for this student');
            }
        }
    },
    components: {
        IncidentReportsModal
    },
    data() {
        return {
            showIncidentModal: false
        }
    }
}
</script>

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
</style> 