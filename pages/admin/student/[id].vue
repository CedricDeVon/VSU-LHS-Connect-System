<script>
import { defineComponent } from 'vue';
import { student } from '~/data/student.js';
import { section } from '~/data/section.js';
import AdminSidebar from '~/components/Blocks/AdminSidebar.vue';
import AdminHeader from '~/components/Blocks/AdminHeader.vue';

export default defineComponent({
    name: 'StudentInformation',
    components: {
        AdminSidebar,
        AdminHeader
    },
    data() {
        return {
            studentData: null,
            studentSection: null,
            selectedSort: '',
            allSectionStudents: [] // To store all students from the section
        }
    },
    created() {
        // Get student ID from route params
        const studentId = this.$route.params.id;

        // Find student data
        this.studentData = student.find(s => s.studentId === studentId);

        // Find student's section
        if (this.studentData) {
            this.studentSection = section.find(sec =>
                sec.sectionStudents.includes(this.studentData.studentId)
            );
            
            // Get all students from the same section
            if (this.studentSection) {
                this.allSectionStudents = this.studentSection.sectionStudents.map(id => 
                    student.find(s => s.studentId === id)
                ).filter(s => s !== null);
            }
        }
    },
    computed: {
        sortedStudents() {
            let sorted = [...this.allSectionStudents];
            
            switch (this.selectedSort) {
                case 'surname':
                    sorted.sort((a, b) => a.lastName.localeCompare(b.lastName));
                    break;
                case 'studentID':
                    sorted.sort((a, b) => a.studentId.localeCompare(b.studentId));
                    break;
            }
            
            return sorted;
        }
    },
    methods: {
        getFullName(student) {
            return `${student.lastName}, ${student.firstName} ${student.middleName || ''}`.trim();
        },
        viewStudent(studentId) {
            if (studentId !== this.studentData.studentId) {
                this.$router.push(`/admin/student/${studentId}`);
            }
        }
    }
});
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
                            <div class="mb-4 flex items-center">
                                <select 
                                    v-model="selectedSort"
                                    class="mr-4 px-10 py-2 border-b-2 border-gray-400 bg-transparent text-black font-medium focus:outline-none">
                                    <option value="" disabled selected>Sort by</option>
                                    <option value="surname">Surname</option>
                                    <option value="studentID">Student ID</option>
                                </select>
                            </div>

                            <!-- Student Table -->
                            <div class  ="overflow-auto max-h-[80%] border border-green-900 text-opacity-50 transition-all duration-300 rounded-lg">
                                <table class="min-w-full">
                                    <thead class="sticky top-0">
                                        <tr class="bg-[#728B78] text-white">
                                            <th class="px-6 py-3 rounded-l-md text-center">Student ID</th>
                                            <th class="px-6 py-3 rounded-r-md text-center">Student Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="student in sortedStudents" 
                                            :key="student.studentId"
                                            @click="viewStudent(student.studentId)"
                                            :class="[
                                                'hover:bg-gray-100 cursor-pointer',
                                                student.studentId === studentData?.studentId ? 'bg-green-50' : ''
                                            ]">
                                            <td class="px-6 py-3">{{ student.studentId }}</td>
                                            <td class="px-6 py-3">{{ getFullName(student) }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <!-- Right Column - Student Details -->
                        <div class="col-span-6 overflow-y-auto">
                            <div v-if="studentData" class="flex flex-col items-center ">
                                <h2 class="text-3xl font-bold text-green-900 mb-6">Basic Information</h2>
                                
                                <img :src="studentData.profilePic || 'default-profile.jpg'"
                                     alt="Student profile"
                                     class="w-48 h-48 rounded-full object-cover shadow-md mb-4"/>
                                
                                <h3 class="text-2xl font-bold mb-2">{{ studentData.firstName }} {{ studentData.lastName }}</h3>
                                <p class="text-lg mb-6">ID NO: {{ studentData.studentId }}</p>

                                <!-- Student Details -->
                                <div class="w-full max-w-md space-y-3 overflow-y-auto max-h-[%]">
                                    <div class="flex justify-between">
                                        <span class="font-semibold">Grade & Section:</span>
                                        <span>{{ studentSection?.sectionName || 'N/A' }}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="font-semibold">Age:</span>
                                        <span>{{ studentData.age || 'N/A' }}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="font-semibold">Gender:</span>
                                        <span>{{ studentData.gender || 'N/A' }}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="font-semibold">Address:</span>
                                        <span>{{ studentData.Address || 'N/A' }}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="font-semibold">Contact:</span>
                                        <span>{{ studentData.contactNum || 'N/A' }}</span>
                                    </div>
                                    <button class="bg-[#265630] hover:bg-[#728B78] w-full text-white px-4 py-2 rounded-md">
                                        View Anecdotal Report
                                    </button>
                                    <button class="bg-[#265630] hover:bg-[#728B78] w-full text-white px-4 py-2 rounded-md">
                                        View Incident Report
                                    </button>
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
    </div>
</template>

<style scoped>
.contain {
    height: calc(98vh - 180px); /* Adjust based on your header and title heights */
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
