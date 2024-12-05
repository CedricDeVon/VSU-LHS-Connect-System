<template>
    <div class="flex h-screen">
        <AdminSidebar />
        <div class="general flex-grow flex flex-col">
            <AdminHeader />
            <main class="flex-1 bg-[#FFFEF1]">
                <!-- Search Section -->
                <div class="p-8 pt-0 general min-h-screen flex flex-col w-full">
                    <div class="rounded-lg p-6 mb-6">
                        <h2 class="text-2xl font-bold text-[#265630] mb-4">Search Incident Reports</h2>
                        <div class="flex gap-4 mb-6">
                            <input 
                                type="text" 
                                v-model="adminViewStore.incidentalSearchQuery"
                                @input="handleSearch"
                                placeholder="Search by Report ID, Student Name, or Date..."
                                class="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#265630]"
                            />
                            <!-- Sort Dropdown -->
                            <select 
                                v-model="adminViewStore.incidentalSelectedSort"
                                class="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#265630]"
                            >
                                <option value="">Sort By</option>
                                <option value="ascDate">Date (Ascending)</option>
                                <option value="descDate">Date (Descending)</option>
                                <option value="reportID">Report ID</option>
                                <option value="studentName">Student Name</option>
                            </select>
                            <!-- Status Filter -->
                            <select 
                                v-model="adminViewStore.incidentalStatusFilter"
                                class="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#265630]"
                            >
                                <option value="all">All Status</option>
                                <option value="Resolved">Resolved</option>
                                <option value="NotResolved">Not Resolved</option>
                            </select>
                        </div>

                        <!-- Results Section -->
                        <div v-if="adminViewStore.incidentalSearchResults?.length > 0" class="border rounded-lg" style="height: calc(100vh - 280px);">
                            <div class="relative h-full">
                                <!-- Fixed Header -->
                                <table class="w-full">
                                    <thead class="bg-[#728B78] text-white sticky top-0 z-10">
                                        <tr>
                                            <th class="p-3 text-center w-[20%]">Report ID</th>
                                            <th class="p-3 text-center w-[35%]">Student Name</th>
                                            <th class="p-3 text-center w-[25%]">Date oF Incident</th>
                                            <th class="p-3 text-center w-[20%]">Status</th>
                                        </tr>
                                    </thead>
                                </table>

                                <!-- Scrollable Body -->
                                <div class="overflow-y-auto h-full" style="max-height: calc(100vh - 330px);">
                                    <table class="w-full">
                                        <tbody>
                                            <tr v-for="report in handleSearch()" 
                                                :key="report.id"
                                                @click="viewReport(report.id)"
                                                class="border-b hover:bg-[#FFFAD3] cursor-pointer transition-colors">
                                                <td class="p-4 text-center w-[20%]">{{ report.id }}</td>
                                                <td class="p-4 text-center w-[35%]">
                                                    {{ getStudentNamesFromReport(report.data.peopleInvolved) }}
                                                </td>
                                                <td class="p-4 text-center w-[25%]">{{ report.data.dateOfIncident }}</td>
                                                <td class="p-4 text-center w-[20%]">
                                                    <span :class="getStatusClass(report.data.status)">
                                                        {{ report.data.status }}
                                                    </span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <!-- No Results Message -->
                        <div v-else-if="adminViewStore.incidentalSearchQuery" class="text-gray-500 text-center text-xl font-regular">
                            <p class="text-gray-500">No incident reports found matching your search.</p>
                        </div>

                        <!-- Initial State Message -->
                        <div v-else class="text-gray-500 text-center text-xl font-regular">
                            <p class="text-gray-500">Enter search terms to find incident reports.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup lang='ts'>
definePageMeta({
  middleware: ['authenticate-and-authorize-admin']
});

import { defineComponent } from 'vue';
import AdminSidebar from '~/components/Blocks/AdminSidebar.vue';
import AdminHeader from '~/components/Blocks/AdminHeader.vue';
import { useAdminViewStore } from '~/stores/views/adminViewStore';
const adminViewStore = useAdminViewStore();
await adminViewStore.updateIncidental();
await adminViewStore.updateSidebar();

// onBeforeMount(async () => {
//     await adminViewStore.updateIncidental();
// })

function handleSearch() {
    let results = adminViewStore.incidentalIncidentalReports;

    // Filter by search query
    if (adminViewStore.incidentalSearchQuery) {
        const query = adminViewStore.incidentalSearchQuery.toLowerCase();
        results = results.filter((report: any) => {
            const studentNames = getStudentNamesFromReport(report.data.peopleInvolved).toLowerCase();
            return report.id.toLowerCase().includes(query) ||
                    studentNames.includes(query) ||
                    report.data.dateOfIncident.toLowerCase().includes(query);
        });
    }

    // Filter by status
    if (adminViewStore.incidentalStatusFilter !== 'all') {
        results = results.filter((report: any) => report.data.status === adminViewStore.incidentalStatusFilter);
    }
    // Sort results
    switch (adminViewStore.incidentalSelectedSort) {
        case 'ascDate':
            results = results.sort((a: any, b: any) => new Date(a.data.dateOfIncident) - new Date(b.data.dateOfIncident));
            break;
        case 'descDate':
            results = results.sort((a: any, b: any) => new Date(b.data.dateOfIncident) - new Date(a.data.dateOfIncident));
            break;
        case 'reportID':
            results = results.sort((a: any, b: any) => a.id.localeCompare(b.id));
            break;
        case 'studentName':
            results = results.sort((a: any, b: any) => {
                const nameA = getStudentNamesFromReport(a.data.peopleInvolved);
                const nameB = getStudentNamesFromReport(b.data.peopleInvolved);
                return nameA.localeCompare(nameB);
            });
            break;
        default:
            break;
    }

    // console.log(results)
    adminViewStore.incidentalSearchResults = results;
    return results;
}

function getStudentNamesFromReport(involvedStudents: any) {
    if (!involvedStudents) return '';
    const studentFullNames = involvedStudents.map((firstName: any) => {
        const student = findStudentByFirstName(firstName);
        if (student) {
            return `${student.data.lastName}, ${student.data.firstName}`;
        }
        return firstName;
    });
    return studentFullNames.join('; ');
}

function findStudentByFirstName(firstName: any) {
    return adminViewStore.incidentalStudents.find((s: any) => s.data.firstName  === firstName);
}

function viewReport(reportId: any) {
    return navigateTo(`/admin/incident/${reportId}`);
}

function getStatusClass(status: any): any {
    return {
        'Resolved': 'text-green-600 font-medium',
        'Unresolved': 'text-yellow-600 font-medium'
    }[status] || 'text-gray-600 font-medium';
}

</script>


<style scoped>
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

table {
    table-layout: fixed;
    border-collapse: separate;
    border-spacing: 0;
}

thead {
    position: sticky;
    top: 0;
    z-index: 10;
}
</style>