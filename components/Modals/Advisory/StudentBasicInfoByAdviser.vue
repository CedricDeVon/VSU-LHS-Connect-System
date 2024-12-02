<template>
    <div class=" z-50 flex items-center justify-center ">
        <div class=" p-20 pt-8 w-full ml-10 mr-10">
            <label class="header text-green-900 ">Basic Information</label>
            <!--Student Info Scrollable-->
            <div class=" overflow-x-auto overflow-y-auto max-h-96 pt-5">
               <!--(should be) profile pic-->
                <div class="flex justify-center pb-2">
                    <img :src="adviserViewStore.advisoryStudentData?.data.profilePicture || 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNpcmNsZS11c2VyLXJvdW5kIj48cGF0aCBkPSJNMTggMjBhNiA2IDAgMCAwLTEyIDAiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEwIiByPSI0Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48L3N2Zz4='" alt="profile" class=" h-40 w-auto">
                </div>

                <label class=" name text-green-900 flex justify-center">{{ adviserViewStore.getFullName(adviserViewStore.advisoryStudentData) }}</label>
                <label class="studentID text-green-900 flex justify-center">ID NO: {{ adviserViewStore.advisoryStudentData.id || 'N/A'  }}</label>
                <div class="mt-3">
                        <div class="text-green-900 text-lg pb-2 px-3"><span class="label pr-5">Grade Level & Section:</span><span>{{ adviserViewStore.advisoryStudentData.data.gradeAndSection || 'N/A' }}</span></div>
                        <div class="text-green-900 text-lg pb-2 px-3"><span class="label pr-16">Age:</span><span>{{ adviserViewStore.advisoryStudentData.data.age || 'N/A'  }}</span></div>
                        <div class="text-green-900 text-lg pb-2 px-3"><span class="label pr-5">Birthday:</span><span>{{ adviserViewStore.advisoryStudentData.data.birthDate || 'N/A'  }}</span></div>
                        <div class="text-green-900 text-lg pb-2 px-3"><span class="label pr-5">Gender:</span><span>{{ adviserViewStore.advisoryStudentData.data.gender || 'N/A'  }}</span></div>
                        <div class="text-green-900 text-lg pb-2 px-3"><span class="label pr-5">Address:</span><span>{{ adviserViewStore.advisoryStudentData.data.address || 'N/A'  }}</span></div>
                        <div class="text-green-900 text-lg pb-2 px-3"><span class="label pr-5">Contact Number/s:   </span>   <span>{{ adviserViewStore.advisoryStudentData.data.contactNumber || 'N/A'  }}</span></div>
                </div>

                <!--Buttons-->
                <div v-if="Object.keys(adviserViewStore.advisoryStudentData.data.anecdotalReport).length !== 0" @click="updateAnecdotalReport(adviserViewStore.advisoryStudentData)" class="flex justify-center items-center m-3">
                    <button class=" updateAnecdotal shadow w-9/12 px-10 py-2 rounded-lg gray text-white hover:bg-gray-600 focus:outline-none" aria-label="Update Anecdotal">
                        Anecdotal Report
                    </button>
                </div>
                <div class="flex justify-center m-3">
                    <button @click="createReport" class=" submitComplaint shadow w-9/12 px-10 py-2 rounded-lg gray text-green-900 hover:bg-gray-600 focus:outline-none" aria-label="Submit Complaint">
                        Submit and Report a Complaint
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
        <!-- <adviser-anecdotal v-if="showAnecdotal" :Student="student" @close="showAnecdotal = false"/> -->
        <initial-report-modal v-if="report" @close="report=false" :show="report"/>
        <RemoveStudent v-if="remove" @close="handleRemoveStudent" :student ="adviserViewStore.advisoryStudentData" />
    </div>
</template>

<script setup lang='ts'>
import { useAdviserViewStore } from "~/stores/views/adviserViewStore";
import InitialReportModal from '../AdviserReport/InitialReportModal.vue';
import RemoveStudent from './RemoveStudent.vue';

const report = ref(false);
const remove = ref(false);

const adviserViewStore = useAdviserViewStore();

const updateAnecdotalReport = (student: any) => {
    return navigateTo(`/adviser/anecdotal/${student.id}`);
}

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

.removeStudent{
    font-family: "Inter-Medium", sans-serif;
    font-size: 19px;
    font-weight: 700;
    background-color: #FF6161;
}

.shadow{
    box-shadow: 0px 3px 2px 0px rgba(0, 0, 0, 0.25);
}
</style>
