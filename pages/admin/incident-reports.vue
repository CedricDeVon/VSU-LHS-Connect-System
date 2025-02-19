<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { incidentReport } from '~/data/incident';
import { student } from '~/data/student';
import AdminSidebar from '@/components/Blocks/AdminSidebar.vue';
import AdminHeader from '@/components/Blocks/AdminHeader.vue';
//import { TooltipProvider } from "radix-vue";

const searchQuery = ref('');
const selectedSort = ref('');
const statusFilter = ref('all');
const searchResults = ref([]);

const router = useRouter();

const handleSearch = () => {
    let results = incidentReport;

    // Filter by search query
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        results = results.filter(report => {
            const studentNames = getStudentNamesFromReport(report.peopleInvolved).toLowerCase();
            return report.reportID.toLowerCase().includes(query) ||
                   studentNames.includes(query) ||
                   report.dateOfIncident.toLowerCase().includes(query);
        });
    }

    // Filter by status
    if (statusFilter.value !== 'all') {
        results = results.filter(report => report.status === statusFilter.value);
    }

    // Sort results
    switch (selectedSort.value) {
        case 'ascDate':
            results.sort((a, b) => new Date(a.dateOfIncident).getTime() - new Date(b.dateOfIncident).getTime());
            break;
        case 'descDate':
            results.sort((a, b) => new Date(b.dateOfIncident).getTime() - new Date(a.dateOfIncident).getTime());
            break;
        case 'reportID':
            results.sort((a, b) => a.reportID.localeCompare(b.reportID));
            break;
        case 'studentName':
            results.sort((a, b) => {
                const nameA = getStudentNamesFromReport(a.peopleInvolved);
                const nameB = getStudentNamesFromReport(b.peopleInvolved);
                return nameA.localeCompare(nameB);
            });
            break;
    }

    searchResults.value = results;
};

const getStudentNamesFromReport = (involvedStudents: string[]) => {
    if (!involvedStudents) return '';
    const studentFullNames = involvedStudents.map(firstName => {
        const student = findStudentByFirstName(firstName);
        if (student) {
            return `${student.lastName}, ${student.firstName}`;
        }
        return firstName;
    });
    return studentFullNames.join('; ');
};

const findStudentByFirstName = (firstName: string) => {
    return student.find(s => s.firstName === firstName);
};

const viewReport = (reportId: string) => {
    router.push(`/admin/incident/${reportId}`);
};

const getStatusClass = (status: string) => {
    return {
        'Resolved': 'text-green-600 font-medium',
        'NotResolved': 'text-yellow-600 font-medium'
    }[status] || 'text-gray-600 font-medium';
};

watch(selectedSort, handleSearch);
watch(statusFilter, handleSearch);
</script>

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
                                    v-model="searchQuery"
                                    @input="handleSearch"
                                    placeholder="Search by Report ID, Student Name, or Date..."
                                    class="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#265630]"
                                />
                                <!-- Sort Dropdown -->
                                <select 
                                    v-model="selectedSort"
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
                                    v-model="statusFilter"
                                    class="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#265630]"
                                >
                                    <option value="all">All Status</option>
                                    <option value="Resolved">Resolved</option>
                                    <option value="NotResolved">Not Resolved</option>
                                </select>
                            </div>

                            <!-- Results Section -->
                            <div v-if="searchResults.length > 0" class="border rounded-lg" style="height: calc(100vh - 280px);">
                                <div class="relative h-full">
                                    <!-- Fixed Header -->
                                    <table class="w-full">
                                        <thead class="bg-[#728B78] text-white sticky top-0 z-10">
                                            <tr>
                                                <th class="p-3 text-center w-[20%]">Report ID</th>
                                                <th class="p-3 text-center w-[35%]">Student Name</th>
                                                <th class="p-3 text-center w-[25%]">Date</th>
                                                <th class="p-3 text-center w-[20%]">Status</th>
                                            </tr>
                                        </thead>
                                    </table>

                                    <!-- Scrollable Body -->
                                    <div class="overflow-y-auto h-full" style="max-height: calc(100vh - 330px);">
                                        <table class="w-full">
                                            <tbody>
                                                <tr v-for="report in searchResults" 
                                                    :key="report.incidentDocID"
                                                    @click="viewReport(report.incidentDocID)"
                                                    class="border-b hover:bg-[#FFFAD3] cursor-pointer transition-colors">
                                                    <td class="p-4 text-center w-[20%]">{{ report.reportID }}</td>
                                                    <td class="p-4 text-center w-[35%]">
                                                        {{ getStudentNamesFromReport(report.peopleInvolved) }}
                                                    </td>
                                                    <td class="p-4 text-center w-[25%]">{{ report.dateOfIncident }}</td>
                                                    <td class="p-4 text-center w-[20%]">
                                                        <span :class="getStatusClass(report.status)">
                                                            {{ report.status }}
                                                        </span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <!-- No Results Message -->
                            <div v-else-if="searchQuery" class="text-gray-500 text-center text-xl font-regular">
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