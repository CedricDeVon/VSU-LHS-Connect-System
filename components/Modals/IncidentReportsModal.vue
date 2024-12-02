<template>
    <div v-if="adminViewStore.studentShowIncidentModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 font-century-gothic">
        <div class="bg-[#FFFEF1] rounded-2xl w-[800px] max-h-[90vh] flex flex-col relative" @click.stop>
            <!-- Sticky Header Section -->
            <div class="sticky top-0 z-10">
                <!-- Close button -->
                <button @click="$emit('close')" 
                        class="absolute top-4 right-4 text-white hover:text-gray-200 z-20">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <!-- Title Bar -->
                <div class="bg-[#265630] py-4 rounded-t-2xl">
                    <h1 class="text-white text-2xl font-bold text-center">Student's Incident History</h1>
                </div>
            </div>

            <!-- Scrollable Content -->
            <div class="overflow-y-auto flex-1">
                <!-- Incident Reports List -->
                <div class="p-6 space-y-4">
                    <div v-for="incident in adminViewStore.studentStudentData.data.incidentalReports" 
                         :key="incident.id"
                         class="border border-gray-200 rounded-lg p-4 transition-all duration-200 hover:border-[#265630] hover:shadow-lg hover:bg-white cursor-pointer"
                         @click="viewIncidentDetails(incident.id)">
                        <div class="flex justify-between items-start">
                            <div>
                                <h3 class="text-lg font-bold text-[#265630]">
                                    {{ incident.id }} 
                                    <span :class="incident.data.status === 'Resolved' ? 'text-green-600' : 'text-red-600'">
                                        ({{ incident.data.status }})
                                    </span>
                                </h3>
                                <p class="text-gray-600 italic">{{ new Date().toDateString() }}</p>
                            </div>
                        </div>
                        <p class="mt-2 text-gray-700">
                            <span class="font-semibold">Name of People Involved:</span> 
                            {{ incident.data.peopleInvolved }}
                        </p>
                        <p class="mt-1 text-gray-600 italic text-sm">
                            ({{ incident.data.narrativeReport.substring(0, 100) }}...)
                        </p>
                    </div>
                </div>

                <!-- Back Button -->
                <div class="p-6 pt-0 flex justify-center">
                    <button @click="$emit('close')" 
                            class="bg-[#728B78] hover:bg-[#265630] text-white px-8 py-2 rounded-md transition-colors">
                        Back
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { useAdminViewStore } from '~/stores/views/adminViewStore';

const adminViewStore = useAdminViewStore();

const viewIncidentDetails = (incidentId: any) => {
    useRouter().push(`/admin/incident/${incidentId}`);
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

/* Custom Scrollbar */
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