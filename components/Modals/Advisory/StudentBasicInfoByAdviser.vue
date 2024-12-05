<template>
    <div class="z-50 w-full h-[50%] overflow-y-auto">
        <div class="max-w-3xl mx-auto p-6">           
            <div class="rounded-lg backdrop-blur-sm p-6 space-y-6">
                <!-- Profile Image -->
                <h2 class="text-3xl font-bold text-green-900 top-0 py-4 z-10">Basic Information</h2>
                <div class="flex justify-center">
                    <img :src="adviserViewStore.advisoryStudentData?.data.profilePicture || 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNpcmNsZS11c2VyLXJvdW5kIj48cGF0aCBkPSJNMTggMjBhNiA2IDAgMCAwLTEyIDAiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEwIiByPSI0Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48L3N2Zz4='" alt="profile" class="h-40 w-40 object-cover rounded-full border-4 border-green-100">
                </div>

                <!-- Student Name and ID -->
                <div class="text-center space-y-2">
                    <h3 class="text-2xl font-bold text-green-900">
                        {{ adviserViewStore.getFullName(adviserViewStore.advisoryStudentData) }}
                    </h3>
                    <p class="text-lg text-green-800">ID NO: {{ adviserViewStore.advisoryStudentData.id || 'N/A' }}</p>
                </div>

                <!-- Student Details -->
                <div class="grid gap-4 text-green-900">
                    <div class="info-row">
                        <span class="font-semibold">Grade Level & Section:</span>
                        <span>{{ adviserViewStore.advisoryStudentData.data.gradeAndSection || 'N/A' }}</span>
                    </div>
                    <div class="info-row">
                        <span class="font-semibold">Age:</span>
                        <span>{{ adviserViewStore.advisoryStudentData.data.age || 'N/A' }}</span>
                    </div>
                    <div class="info-row">
                        <span class="font-semibold">Birthday:</span>
                        <span>{{ adviserViewStore.advisoryStudentData.data.birthDate || 'N/A' }}</span>
                    </div>
                    <div class="info-row">
                        <span class="font-semibold">Gender:</span>
                        <span>{{ adviserViewStore.advisoryStudentData.data.gender || 'N/A' }}</span>
                    </div>
                    <div class="info-row">
                        <span class="font-semibold">Address:</span>
                        <span>{{ adviserViewStore.advisoryStudentData.data.address || 'N/A' }}</span>
                    </div>
                    <div class="info-row">
                        <span class="font-semibold">Contact Number/s:</span>
                        <span>{{ adviserViewStore.advisoryStudentData.data.contactNumber || 'N/A' }}</span>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="space-y-3 pt-4">
                    <button @click="viewReport(adviserViewStore.advisoryStudentData)"
                        class="btn btn-primary w-full flex items-center justify-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                            <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"/>
                        </svg>
                        Anecdotal Report
                    </button>
                    <button @click="showReport" 
                        class="btn btn-outline w-full flex items-center justify-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"/>
                        </svg>
                        Report an Incident
                    </button>
                    <button @click="removeStudent" 
                        class="btn btn-text w-full flex items-center justify-center gap-2 text-red-600">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"/>
                        </svg>
                        Remove Student
                    </button>
                </div>
            </div>
        </div>

        <!-- Modals -->
        <initial-report-modal v-if="report" @close="report = false"/>
        <RemoveStudent v-if="remove" @close="handleRemoveStudent" :student="adviserViewStore.advisoryStudentData" :section="adviserViewStore.advisoryStudentData" />
    </div>
</template>

  

<script setup lang='ts'>
import { useAdviserViewStore } from "~/stores/views/adviserViewStore";
import InitialReportModal from '../AdviserReport/InitialReportModal.vue';
import RemoveStudent from './RemoveStudent.vue';

const report = ref(false);
const remove = ref(false);

const adviserViewStore = useAdviserViewStore();

const viewReport = (student: any) => {
    return navigateTo(`/adviser/anecdotal/${student.id}`, { replace: true });
}
 // Define methods
  const showReport = () => {
    report.value = true;
  };
  
const createReport = () => {
    report.value = true;
}

const creationClose = () => {
    remove.value = false;
}

const removeStudent = () => {
    remove.value = true; 
}

const handleRemoveStudent = () => {
    remove.value = false;
}

</script>

<style scoped>
.info-row {
    @apply grid grid-cols-2 gap-4 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors;
}

.btn {
    @apply px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-200 
    focus:outline-none focus:ring-2 focus:ring-offset-2;
}

.btn-primary {
    @apply bg-green-700 text-white hover:bg-green-800 focus:ring-green-500
    shadow-md hover:shadow-lg;
}

.btn-outline {
    @apply border-2 border-green-700 text-green-700 hover:bg-green-50 
    focus:ring-green-500;
}

.btn-text {
    @apply hover:bg-red-50 border border-transparent hover:border-red-200
    focus:ring-red-400;
}
</style>