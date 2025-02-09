<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import AdminSidebar from '@/components/Blocks/AdminSidebar.vue';
import AdminHeader from '@/components/Blocks/AdminHeader.vue';
import { anecdotalReport } from '~/data/anecdotal';
import { student } from '~/data/student';
import { section } from '~/data/section';

const searchQuery = ref('');
const selectedSort = ref('');
const searchResults = ref(anecdotalReport);
const router = useRouter();

const handleSearch = () => {
    let results = anecdotalReport;

    // Apply search filter
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        results = results.filter(report => {
            const studentName = getStudentName(report.studentId).toLowerCase();
            const sectionName = getSectionName(report.studentId).toLowerCase();
            return report.anecdotalDocID.toLowerCase().includes(query) ||
                   studentName.includes(query) ||
                   sectionName.includes(query) ||
                   report.AY.toLowerCase().includes(query);
        });
    }

    // Apply sorting
    switch (selectedSort.value) {
        case 'sectionLevel':
            results.sort((a, b) => {
                const sectionA = getSectionLevel(a.studentId);
                const sectionB = getSectionLevel(b.studentId);
                return sectionA - sectionB;
            });
            break;
        case 'studentName':
            results.sort((a, b) => getStudentName(a.studentId).localeCompare(getStudentName(b.studentId)));
            break;
    }

    searchResults.value = results;
};

const viewReport = (anecdotalDocID: string) => {
    const studentWithReport = student.find(s => s.anecdotalDocID === anecdotalDocID);
    if (studentWithReport) {
        router.push(`/admin/anecdotal-report/${studentWithReport.studentId}`);
    } else {
        console.warn('No student found with this anecdotal report');
    }
};

const getStudentName = (studentId: string) => {
    const studentWithReport = student.find(s => s.studentId === studentId);
    return studentWithReport ? `${studentWithReport.lastName}, ${studentWithReport.firstName}` : 'Unknown';
};

const getSectionName = (studentId: string) => {
    const studentWithReport = student.find(s => s.studentId === studentId);
    if (studentWithReport) {
        const studentSection = section.find(sec => sec.id === studentWithReport.sectionID);
        if (studentSection) {
            return `${studentSection.sectionLevel} - ${studentSection.sectionName}`;
        }
    }
    return 'Unknown';
};

const getSectionLevel = (studentId: string) => {
    const studentWithReport = student.find(s => s.studentId === studentId);
    if (studentWithReport) {
        const studentSection = section.find(sec => sec.id === studentWithReport.sectionID);
        if (studentSection) {
            return parseInt(studentSection.sectionLevel, 10);
        }
    }
    return 0;
};

watch([searchQuery, selectedSort], handleSearch);

onMounted(handleSearch);
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
                                <option value="sectionLevel">Section Level</option>
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
                                            <th class="p-3 text-left w-[20%]">Section</th>
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
                                                <td class="p-4 w-[20%]">{{ report.anecdotalDocID }}</td>
                                                <td class="p-4 w-[20%]">{{ getStudentName(report.studentId) }}</td>
                                                <td class="p-4 w-[20%]">{{ getSectionName(report.studentId) }}</td>
                                                <td class="p-4 w-[20%]">{{ report.AY }}</td>
                                                <td class="p-4 w-[20%]">
                                                    <button 
                                                        @click="viewReport(report.anecdotalDocID)"
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