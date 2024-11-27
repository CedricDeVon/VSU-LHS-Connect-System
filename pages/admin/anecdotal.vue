<template>
    <div class="flex h-screen">
        <AdminSidebar />
        <div class="general flex-grow flex flex-col">
            <AdminHeader />
            <main class="flex-1 bg-[#FFFEF1]">
                <!-- Search Section -->
                <div class="p-8 pt-0 general min-h-screen flex flex-col w-full">
                    <div class="rounded-lg p-6 mb-6">
                        <h2 class="text-2xl font-bold text-[#265630] mb-4">Search Anecdotal Reports</h2>
                        <div class="flex gap-4 mb-6">
                            <input 
                                type="text" 
                                v-model="searchQuery"
                                @input="handleSearch"
                                placeholder="Search by Student Name, Purpose, or Date..."
                                class="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#265630]"
                            />
                            <!-- Sort Dropdown -->
                            <select 
                                v-model="selectedSort"
                                class="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#265630]"
                            >
                                <option value="">Sort By</option>
                                <option value="studentName">Student Name</option>
                                <option value="purpose">Purpose</option>
                            </select>
                        </div>

                        <!-- Results Section -->
                        <div v-if="searchResults.length > 0" class="border rounded-lg" style="height: calc(100vh - 280px);">
                            <div class="relative h-full">
                                <!-- Fixed Header -->
                                <table class="w-full">
                                    <thead class="bg-[#728B78] text-white sticky top-0 z-10">
                                        <tr>
                                            <th class="p-3 text-left w-[20%]">Document ID</th>
                                            <th class="p-3 text-left w-[20%]">Student Name</th>
                                            <th class="p-3 text-left w-[20%]">Adviser</th>
                                            <th class="p-3 text-left w-[20%]">Academic Year</th>
                                            <th class="p-3 text-left w-[20%]">Action</th>
                                        </tr>
                                    </thead>
                                </table>

                                <!-- Scrollable Body -->
                                <div class="overflow-y-auto h-full" style="max-height: calc(100vh - 330px);">
                                    <table class="w-full">
                                        <tbody>
                                            <tr v-for="report in searchResults" 
                                                :key="report.anecdotalDocID"
                                                class="border-b hover:bg-[#FFFAD3] cursor-pointer transition-colors">
                                                <td class="p-4 w-[20%]">{{ report.id }}</td>
                                                <td class="p-4 w-[20%]">{{ getStudentName(report.data.studentId) }}</td>
                                                <td class="p-4 w-[20%]">{{ getAdviserName(report.data.adviserId) }}</td>
                                                <td class="p-4 w-[20%]">{{ report.data.schoolYear }}</td>
                                                <td class="p-4 w-[20%]">
                                                    <button 
                                                        @click="viewReport(report.id)"
                                                        class="bg-[#728B78] hover:bg-[#265630] text-white px-4 py-2 rounded-md transition-colors"
                                                    >
                                                        View Details
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <!-- No Results Message -->
                        <div v-else-if="searchQuery" class="text-gray-500 text-center text-xl font-regular">
                            <p class="text-gray-500">No anecdotal reports found matching your search.</p>
                        </div>

                        <!-- Initial State Message -->
                        <div v-else class="text-gray-500 text-center text-xl font-regular">
                            <p class="text-gray-500">Enter search terms to find anecdotal reports.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
definePageMeta({
  middleware: ['authenticate-and-authorize-admin']
});

import AdminSidebar from '@/components/Blocks/AdminSidebar.vue';
import AdminHeader from '@/components/Blocks/AdminHeader.vue';
import { useAdminViewStore } from '~/stores/views/adminViewStore';

export default {
    name: 'admin-anecdotal',
    components: { AdminSidebar, AdminHeader },
    data() {
        return {
            searchQuery: '',
            selectedSort: '',
            searchResults: [],
            adminViewStore: useAdminViewStore()
        };
    },

    async mounted() {
        await this.adminViewStore.updateAnecdotal();
        this.searchResults = this.adminViewStore.anecdotalAnecdotalReports
    },
    
    methods: {
        handleSearch() {
            let results = this.adminViewStore.anecdotalAnecdotalReports;

            // Apply search filter
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                results = results.filter(report => {
                    const studentName = this.getStudentName(report.data.studentId).toLowerCase();
                    const adviserName = this.getAdviserName(report.data.adviserId).toLowerCase();
                    return report.id.toLowerCase().includes(query) ||
                           studentName.includes(query) ||
                           adviserName.includes(query) ||
                           report.data.schoolYear.toLowerCase().includes(query);
                });
            }

            // Apply sorting
            switch (this.selectedSort) {
                case 'ascDate':
                    results.sort((a, b) => new Date(a.data.dateOfIncident) - new Date(b.data.dateOfIncident));
                    break;
                case 'descDate':
                    results.sort((a, b) => new Date(b.data.dateOfIncident) - new Date(a.data.dateOfIncident));
                    break;
                case 'studentName':
                    results.sort((a, b) => this.getStudentName(a.data.studentId).localeCompare(this.getStudentName(b.data.studentId)));
                    break;
                case 'purpose':
                    results.sort((a, b) => a.purpose.localeCompare(b.data.purpose));
                    break;
            }

            this.searchResults = results;
        },

        viewReport(anecdotalDocID) {
            // Find the student with this anecdotal report
            const studentWithReport = this.adminViewStore.anecdotalAnecdotalReports.find(s => s.id === anecdotalDocID);
            if (studentWithReport) {
                this.$router.push(`/admin/anecdote/${studentWithReport.data.studentId}`);
            } else {
                console.warn('No student found with this anecdotal report');
            }
        },
        
        getStudentName(studentId) {
            const studentWithReport = this.adminViewStore.anecdotalAnecdotalStudents.find(s => s.id === studentId);
            return studentWithReport ? `${studentWithReport.data.lastName}, ${studentWithReport.data.firstName}` : 'Unknown';
        },

        getAdviserName(adviserId) {
            const studentWithAdviser = this.adminViewStore.anecdotalAnecdotalAdvisers.find(s => s.id === adviserId);
            return studentWithAdviser ? `${studentWithAdviser.data.lastName}, ${studentWithAdviser.data.firstName}` : 'Unknown';
        }
    },
    watch: {
        searchQuery() {
            this.handleSearch();
        },
        selectedSort() {
            this.handleSearch();
        }
    },
};
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