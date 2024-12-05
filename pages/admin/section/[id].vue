<script setup lang="ts">
definePageMeta({
  middleware: ['authenticate-and-authorize-admin', 'admin-section']
});

import AdminSidebar from '~/components/Blocks/AdminSidebar.vue';
import AdminHeader from '~/components/Blocks/AdminHeader.vue';
import SendEmailModal from '~/components/Modals/AdminEmailing/SendEmailModal.vue';
import ConfirmRemoveAdviser from '~/components/Modals/AdminConfirmations/ConfirmRemoveAdviser.vue';
import { useAdminViewStore } from '~/stores/views/adminViewStore';

const showSendEmailModal = ref(false);
const showConfirmRemoveAdviser = ref(false);
const adminViewStore = useAdminViewStore();
await adminViewStore.updateSectionPageData(useRoute().params.id);

// onBeforeMount(async () => {
//     await adminViewStore.updateSectionPageData(useRoute().params.id);
// })

// // console.log(useRoute().params.id);
// // console.log(adminViewStore.sectionSection);
// // console.log(adminViewStore.sectionAdviser);

const viewStudentProfile = (studentId: any) => {
    return navigateTo(`/admin/student/${studentId}`, { replace: true });
}

const viewReport = (reportId: any) => {
    return navigateTo(`/admin/incident/${reportId}`, { replace: true });
}

const getStatusClass = (status: any) => {
    const classes: any = {
        'Resolved': 'text-green-600 font-medium',
        'NotResolved': 'text-yellow-600 font-medium'
    };
    return classes[status] || 'text-gray-600 font-medium';
}

const showSendEmail = () => {
    showSendEmailModal.value = true;
}

const showRemoveAdviser = () => {
    // console.log(showConfirmRemoveAdviser)
    showConfirmRemoveAdviser.value = true;
}

const confirmRemoveAdviser = async () => {
    await $fetch('/api/admin/removeAdviser', {
        method: 'POST',
        body: {
            adviserId: adminViewStore.sectionAdviser.id
        }
    });
    showConfirmRemoveAdviser.value = false;
    return navigateTo('/admin/search', { replace: true });
}

const getSectionReports = () => {
    let reports = adminViewStore.sectionSectionIncidentReports;
    // // Filter by status
    if (adminViewStore.sectionSelectedReportStatus !== 'all') {
        reports = reports.filter((report: any) => report.data.status === adminViewStore.sectionSelectedReportStatus);
    }
    
    // Sort reports based on selection
    switch (adminViewStore.sectionSelectedReportSort) {
        case 'ascDateSort':
            reports = reports.sort((a: any, b: any) => new Date(a.data.dateOfIncident) - new Date(b.data.dateOfIncident));
            break;
        case 'descDateSort':
            reports = reports.sort((a: any, b: any) => new Date(b.data.dateOfIncident) - new Date(a.data.dateOfIncident));
            break;
        case 'repIDSort':
            reports = reports.sort((a: any, b: any) => a.id.localeCompare(b.id));
            break;
        case 'surnameSort':
            // reports = reports.sort((a: any, b: any) => a.data.peopleInvolved - b.data.peopleInvolved);
            break;
    }
    // console.log(reports)

    return reports;
}

const getSectionStudents = () => {
    let students = adminViewStore.sectionSectionStudents;

    // Sort students based on selection
    switch (adminViewStore.sectionSelectedStudentSort) {
        case 'surnameSort':
            students = students.sort((a: any, b: any) => a.data.lastName.localeCompare(b.data.lastName));
            break;
        case 'studentIDSort':
            students = students.sort((a: any, b: any) => a.id.localeCompare(b.id));
            break;
    }

    return students;
}

</script>

<template>
    <div class="flex h-screen overflow-hidden">
        <AdminSidebar />
        <div class="general flex-grow overflow-hidden flex flex-col">
            <AdminHeader />
            <div class="flex-1 p-4">
                <section class="flex flex-col bg-amber-50 rounded-2xl min-h-screen">
                    <!-- Header -->
                    <h1
                        class="sticky top-0 z-10 mx-auto w-[90%] px-6 py-4 mt-4 text-2xl font-bold text-center text-white rounded-3xl bg-[#728B78]">
                        Section {{ adminViewStore.sectionSection.data.name || 'Details' }}
                    </h1>


                    <div class="flex-1 p-6">
                        <div class="flex gap-6 h-screen max-lg:flex-col">
                            <!-- Left Sidebar -->
                            <aside class="w-1/4 min-w-[300px] max-lg:w-full rounded-lg p-6">
                                <div class="flex flex-col items-center">
                                    <img :src="adminViewStore.sectionAdviser.data.profilePicture || 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNpcmNsZS11c2VyLXJvdW5kIj48cGF0aCBkPSJNMTggMjBhNiA2IDAgMCAwLTEyIDAiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEwIiByPSI0Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48L3N2Zz4='"
                                        @error="handleImageError" alt="Profile"
                                        class="w-48 h-48 rounded-full object-cover bg-gray-100" />
                                    <div class="w-full relative group mt-2">
                                        <h2 class="m-0 text-2xl font-bold text-center text-green-900 px-2 truncate max-w-full">
                                            {{ adminViewStore.getFullName(adminViewStore.sectionAdviser) }}
                                        </h2>
                                        <!-- Tooltip -->
                                        <div class="absolute hidden group-hover:block bg-gray-900/75 text-white text-sm rounded-md py-1 px-2 left-1/2 transform transition-all duration-300 -translate-x-1/2 z-10 whitespace-nowrap">
                                            {{ adminViewStore.getFullName(adminViewStore.sectionAdviser) }}
                                        </div>
                                    </div>
                                    <p class="m-0 text-md text-center text-neutral-700 mt-2 mb-4">
                                        Grade {{ adminViewStore.sectionSection.data.level }} - {{ adminViewStore.sectionSection.data.name }} Adviser
                                    </p>

                                    <!-- Adviser Details -->
                                    <dl class="w-full space-y-3 text-lg">
                                        <div class="flex justify-between">
                                            <dt class="font-bold">Faculty ID:</dt>
                                            <dd>{{ adminViewStore.sectionAdviser.data.facultyId || 'N/A' }}</dd>
                                        </div>
                                        <div class="flex justify-between">
                                            <dt class="font-bold">Status:</dt>
                                            <dd class="capitalize">{{ adminViewStore.sectionAdviser.data.status || 'N/A' }}</dd>
                                        </div>
                                        <div class="flex justify-between">
                                            <dt class="font-bold">Birthdate:</dt>
                                            <dd>{{ adminViewStore.sectionAdviser.data.birthdate || 'N/A' }}</dd>
                                        </div>
                                    </dl>
                                    <button @click="showSendEmail"
                                        class="w-full px-4 py-3 mt-5 text-white bg-green-800 hover:bg-green-900 rounded-md max-md:px-5 max-md:mr-1">
                                        Send an Email
                                    </button>
                                    <button @click="showRemoveAdviser"
                                        class="w-full px-4 py-3 mt-2 text-white bg-red-700 hover:bg-red-800 rounded-md max-md:px-5 max-md:mr-1">
                                        Remove Adviser
                                    </button>
                                </div>
                            </aside>

                            <!-- Main Content -->
                            <div class="flex flex-col w-full">
                                <!-- Select Options -->
                                <div class="w-full">
                                    <select
                                        class="mb-0 inline-flex justify-center w-[30%] rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none"
                                        v-model="adminViewStore.sectionSelectedView">
                                        <option value="" disabled>Select View</option>
                                        <option value="studentView">Students</option>
                                        <option value="reportsView">Incident Reports</option>
                                    </select>

                                    <!-- Student Sort -->
                                    <select v-if="adminViewStore.sectionSelectedView === 'studentView'"
                                        class="mb-0 ml-4 inline-flex justify-center w-[30%] rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none"
                                        v-model="adminViewStore.sectionSelectedStudentSort">
                                        <option value="" disabled>Sort By</option>
                                        <option value="surnameSort">Surname</option>
                                        <option value="studentIDSort">Student ID</option>
                                    </select>

                                    <!-- Report Sort -->
                                    <select v-if="adminViewStore.sectionSelectedView === 'reportsView'"
                                        class="mb-0 ml-4 inline-flex justify-center w-[30%] rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none"
                                        v-model="adminViewStore.sectionSelectedReportSort">
                                        <option value="" disabled>Sort By</option>
                                        <option value="ascDateSort">Date (Ascending)</option>
                                        <option value="descDateSort">Date (Descending)</option>
                                        <option value="repIDSort">Report ID</option>
                                        <option value="surnameSort">Student Surname</option>
                                    </select>

                                    <!-- Report Status Filter -->
                                    <select v-if="adminViewStore.sectionSelectedView === 'reportsView'"
                                        class="mb-0 ml-4 inline-flex justify-center w-[30%] rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none"
                                        v-model="adminViewStore.sectionSelectedReportStatus">
                                        <option value="all">All Status</option>
                                        <option value="Resolved">Resolved</option>
                                        <option value="NotResolved">NotResolved</option>
                                    </select>
                                </div>

                                <!-- Placeholder Message when no view is selected -->
                                <template v-if="!adminViewStore.sectionSelectedView">
                                    <section class="flex-1 rounded-lg p-6">
                                        <div class="flex flex-col h-[60%]">
                                            <div class="flex justify-center items-center h-full">
                                                <p class="text-xl text-gray-500 font-medium">Nothing to show. Select view.</p>
                                            </div>
                                        </div>
                                    </section>
                                </template>

                                <!-- Students View -->
                                <template v-else-if="adminViewStore.sectionSelectedView === 'studentView'">
                                    <section class="flex-1 rounded-lg p-6 ">
                                        <div class="flex flex-col h-[65%] ">
                                            <div
                                                class="flex justify-center items-center mb-6 bg-[#265630] rounded-xl py-3 px-4 ">
                                                <h3 class="text-2xl font-bold text-white">Students</h3>
                                            </div>
                                            <!-- Added fixed height container with overflow -->
                                            <div class="justify-between h-[90%] border border-green-900 rounded-lg overflow-y-auto">
                                                <table class="w-full">
                                                    <thead class="bg-[#728B78] text-white sticky top-0">
                                                        <tr>
                                                            <th class="p-3 text-center w-[30%]">Student ID</th>
                                                            <th class="p-3 text-center w-[40%]">Full Name</th>
                                                            <th class="p-3 text-center w-[30%]">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="student of getSectionStudents()"
                                                            :key="student.id" 
                                                            class="p-10">
                                                            <td class="p-3 text-center w-[30%]">{{ student.id }}</td>
                                                            <td class="p-3 text-center w-[40%] break-words whitespace-normal">
                                                                {{ adminViewStore.getFullName(student) }}
                                                            </td>
                                                            <td class="p-3 text-center w-[30%]">
                                                                <button @click="viewStudentProfile(student.id)"
                                                                    class="font-md px-4 py-1 bg-[#F8F1BA] rounded-lg hover:bg-[#728B78] hover:text-white transition-colors">
                                                                    View Profile
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </section>
                                </template>

                                <!-- Reports View -->
                                <template v-else-if="adminViewStore.sectionSelectedView === 'reportsView'">
                                    <section class="flex-1 rounded-lg p-6">
                                        <div class="flex flex-col h-[60%]">
                                            <div class="flex justify-center items-center mb-6 bg-[#265630] rounded-xl py-3 px-4">
                                                <h3 class="text-2xl font-bold text-white">Reports</h3>
                                            </div>
                                            <div class="justify-between h-[90%] rounded-lg overflow-y-auto">
                                                <table class="w-full">
                                                    <thead class="bg-[#728B78] text-white sticky top-0">
                                                        <tr>
                                                            <th class="p-3 text-center w-[20%]">Report ID</th>
                                                            <th class="p-3 text-center w-[35%]">People Involved</th>
                                                            <th class="p-3 text-center w-[25%]">Date of Incident</th>
                                                            <th class="p-3 text-center w-[20%]">Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="report of getSectionReports()" 
                                                            :key="report.id"
                                                            @click="viewReport(report.id)"
                                                            class="border-b hover:bg-[#FFFAD3] cursor-pointer transition-colors">
                                                            <td class="p-4 text-center break-words whitespace-normal">{{ report.id }}</td>
                                                            <td class="p-4 text-center break-words whitespace-normal">
                                                                {{ report.data.peopleInvolved.join(', ') }}
                                                            </td>
                                                            <td class="p-4 text-center break-words whitespace-normal">{{ report.data.dateOfIncident }}</td>
                                                            <td class="p-4 text-center">
                                                                <span :class="getStatusClass(report.data.status)">
                                                                    {{ report.data.status }}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </section>
                                </template>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
            <SendEmailModal v-if="showSendEmailModal" 
            :initialEmail="toSendEmail" 
            @close="showSendEmailModal = false" 
            />

            <ConfirmRemoveAdviser v-if="showConfirmRemoveAdviser"
            :adviser="adminViewStore.sectionAdviser"
            :section="adminViewStore.sectionSection"
            @close="showConfirmRemoveAdviser = false"
            @remove="confirmRemoveAdviser" />

    </div>
</template>

<style scoped>
.table-container {
    overflow-x: auto;
}

/* For Webkit browsers (Chrome, Safari) */
::-webkit-scrollbar {
    width: 8px;  /* width of the scrollbar */
}

::-webkit-scrollbar-track {
    background: #f1f1f1;  /* color of the track */
    border-radius: 10px;
}

::-webkit-scrollbar-thumb {
    background: #728B78;  /* color of the scroll thumb */
    border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
    background: #265630;  /* color when hovering */
}

* {
    scrollbar-width: thin;
    scrollbar-color: #728B78 #f1f1f1;
}
</style>