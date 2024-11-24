<script setup lang="ts">
import { defineComponent } from 'vue';
import AdminSidebar from '~/components/Blocks/AdminSidebar.vue';
import AdminHeader from '~/components/Blocks/AdminHeader.vue';
import IncidentReportsModal from '~/components/Modals/IncidentReportsModal.vue';
import { useAdminViewStore } from '~/stores/views/adminViewStore';

const adminViewStore = useAdminViewStore();
await adminViewStore.updateStudentPageData(useRoute().params.id);

onBeforeMount(async () => {
})

const sortedStudents = () => {
    let sorted = adminViewStore.studentAllSectionStudents;

    switch (adminViewStore.studentSelectedSort) {
        case 'surname':
            sorted.sort((a: any, b: any) => a.data.lastName.localeCompare(b.data.lastName));
            break;
        case 'studentID':
            sorted.sort((a: any, b: any) => a.id.localeCompare(b.id));
            break;
    }
    
    return sorted;
}

const incidentButtonText = () => {
    const count = adminViewStore.studentStudentData.data.incidentalReports.length || 0;
    return (count > 1) ? `Incident Reports (${count})` : 'Incident Report';
}

const viewStudent = (studentId: any) => {
    if (studentId !== adminViewStore.studentStudentData.id) {
        useRoute().push(`/admin/student/${studentId}`);
    }
}

</script>

<template>
    <div class="flex h-[screen]">
        <AdminSidebar />
        <div class="general flex-grow  flex flex-col">
            <AdminHeader />

            <!-- Main content -->
            <main class="flex-1 bg-[#FFFEF1] p-4 relative">
                <!-- Title Bar -->
                <div class="title flex justify-center items-center bg-[#265630] py-4 rounded-2xl mb-4">
                    <h1 class="text-white text-2xl font-bold">Student Information</h1>
                </div>

                <!-- Main Container -->
                <div class="contain bg-white bg-opacity-90 rounded-2xl h-[calc(60vh - 180px)] shadow-lg p-6">
                    <div class="grid grid-cols-10 gap-6">
                        <!-- Left Column - Student List -->
                        <div class="col-span-4">
                            <div class="mb-4 flex items-start">
                                <select 
                                    v-model="adminViewStore.studentSelectedSort"
                                    class="mr-4 px-10 py-2 border-b-2 border-gray-400 bg-transparent text-black font-medium focus:outline-none">
                                    <option value="" disabled selected>Sort by</option>
                                    <option value="surname">Surname</option>
                                    <option value="studentID">Student ID</option>
                                </select>
                            </div>

                            <!-- Student Table -->
                            <div
                                class="overflow-auto max-h-[60%] text-opacity-50 transition-all duration-300 rounded-lg">
                                <table class="min-w-full">
                                    <thead class="sticky top-0">
                                        <tr class="bg-[#728B78] text-white">
                                            <th class="px-6 py-3 rounded-l-md text-center">Student ID</th>
                                            <th class="px-6 py-3 rounded-r-md text-center">Student Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="student in sortedStudents()" 
                                            :key="student.id"
                                            @click="viewStudent(student.id)"
                                            :class="[
                                                'hover:bg-gray-100 cursor-pointer',
                                                student.id === adminViewStore.studentStudentData?.id ? 'bg-green-50' : ''
                                            ]">
                                            <td class="px-6 py-3">{{ student.id }}</td>
                                            <td class="px-6 py-3">{{ adminViewStore.getFullName(student) }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <!-- Right Column - Student Details -->
                        <div class="border border-green-900 col-span-6 overflow-y-auto max-h-[calc(93vh-180px)] rounded-2xl border-opacity-50 p-6">
                            <div v-if="adminViewStore.studentStudentData" class="flex flex-col items-center">
                                <h2 class="text-3xl font-bold text-green-900 mb-6">Basic Information</h2>
                                
                                <img :src="adminViewStore.studentStudentData?.data.profilePicture || 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNpcmNsZS11c2VyLXJvdW5kIj48cGF0aCBkPSJNMTggMjBhNiA2IDAgMCAwLTEyIDAiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEwIiByPSI0Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48L3N2Zz4='"
                                     alt="Student profile"
                                     class="w-48 h-48 rounded-full object-cover shadow-md mb-4"/>
                                
                                <h3 class="text-2xl font-bold mb-2">{{ adminViewStore.getFullName(adminViewStore.studentStudentData) }}</h3>
                                <p class="text-lg mb-6">ID NO: {{ adminViewStore.studentStudentData.id }}</p>

                                <!-- Student Details -->
                                <div class="w-full max-w-md space-y-3">
                                    <div class="flex justify-between">
                                        <span class="font-semibold">Grade & Section:</span>
                                        <span>{{ adminViewStore.getGradeAndSection() || 'N/A' }}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="font-semibold">Age:</span>
                                        <span>{{ adminViewStore.studentStudentData.data.age || 'N/A' }}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="font-semibold">Gender:</span>
                                        <span>{{ adminViewStore.studentStudentData.data.gender || 'N/A' }}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="font-semibold">Address:</span>
                                        <span>{{ adminViewStore.studentStudentData.data.address || 'N/A' }}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="font-semibold">Contact:</span>
                                        <span>{{ adminViewStore.studentStudentData.data.contactNumber || 'N/A' }}</span>
                                    </div>

                                    <!-- Buttons with adjusted margins -->
                                    <div class="space-y-2 mt-4">
                                        <!-- Secondary Action -->
                                        <button @click="viewAnecdotalReport"
                                            class="bg-[#728B78] hover:bg-[#536757] w-full text-white px-4 py-2 rounded-md transition-colors">
                                            View Anecdotal Report
                                        </button>

                                        <!-- Warning/Alert Action - Only show if student has incidents -->
                                        <button v-if="adminViewStore.studentStudentData.data.incidentalReports.length" 
                                                @click="adminViewStore.studentShowIncidentModal = true"
                                                class="bg-[#9B2C2C] hover:bg-[#7B1D1D] w-full text-white px-4 py-2 rounded-md transition-colors">
                                            {{ incidentButtonText() }}
                                        </button>
                                        <button @click="createIncidentReport"
                                            class="w-full px-4 py-2 rounded-md bg-[#265630] hover:bg-[#728B78] text-white transition-colors duration-200 flex items-center justify-center space-x-2">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M12 4v16m8-8H4" />
                                            </svg>
                                            <span>Create Incident Report</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="flex justify-center items-center h-full">
                                <h2 class="text-2xl text-gray-500">Select a student to display their details</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
        <div>
            <IncidentReportsModal 
            :show="adminViewStore.studentShowIncidentModal"
            :student-data="adminViewStore.studentStudentData"
            @close="adminViewStore.studentShowIncidentModal = false" />
        </div>
    </div>
</template>

<style scoped>
.body {
    background: #FFFEF1;
}

.contain {
    height: calc(98vh - 180px);
    /* Adjust based on your header and title heights */
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
