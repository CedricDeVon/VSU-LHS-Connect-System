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
                        Section {{ section?.sectionName || 'Details' }}
                    </h1>


                    <div class="flex-1 p-6">
                        <div class="flex gap-6 h-screen max-lg:flex-col">
                            <!-- Left Sidebar -->
                            <aside class="w-1/4 min-w-[300px] max-lg:w-full rounded-lg p-6">
                                <div class="flex flex-col items-center">
                                    <img :src="adviser?.profilePic || 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNpcmNsZS11c2VyLXJvdW5kIj48cGF0aCBkPSJNMTggMjBhNiA2IDAgMCAwLTEyIDAiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEwIiByPSI0Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48L3N2Zz4='"
                                        @error="handleImageError" alt="Profile"
                                        class="w-48 h-48 rounded-full object-cover bg-gray-100" />
                                    <div class="w-full relative group mt-2">
                                        <h2 class="m-0 text-2xl font-bold text-center text-green-900 px-2 truncate max-w-full">
                                            {{ getAdviserFullName() }}
                                        </h2>
                                        <!-- Tooltip -->
                                        <div class="absolute hidden group-hover:block bg-gray-900/75 text-white text-sm rounded-md py-1 px-2 left-1/2 transform transition-all duration-300 -translate-x-1/2 z-10 whitespace-nowrap">
                                            {{ getAdviserFullName() }}
                                        </div>
                                    </div>
                                    <p class="m-0 text-md text-center text-neutral-700 mt-2 mb-4">
                                        Grade {{ section?.sectionLevel }} - {{ section?.sectionName }} Adviser
                                    </p>

                                    <!-- Adviser Details -->
                                    <dl class="w-full space-y-3 text-lg">
                                        <div class="flex justify-between">
                                            <dt class="font-bold">Faculty ID:</dt>
                                            <dd>{{ adviser?.facultyId || '-' }}</dd>
                                        </div>
                                        <div class="flex justify-between">
                                            <dt class="font-bold">Status:</dt>
                                            <dd class="capitalize">{{ adviser?.status || '-' }}</dd>
                                        </div>
                                        <div class="flex justify-between">
                                            <dt class="font-bold">Birthdate:</dt>
                                            <dd>{{ adviser?.bdate || '-' }}</dd>
                                        </div>
                                    </dl>
                                    <button @click="sendEmail"
                                        class="w-full px-4 py-3 mt-5 text-white bg-green-800 hover:bg-green-900 rounded-md max-md:px-5 max-md:mr-1">
                                        Send an Email
                                    </button>
                                    <button @click="removeAdviser"
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
                                        v-model="selectedView">
                                        <option value="" disabled>Select View</option>
                                        <option value="studentView">Students</option>
                                        <option value="reportsView">Incident Reports</option>
                                    </select>

                                    <!-- Student Sort -->
                                    <select v-if="selectedView === 'studentView'"
                                        class="mb-0 ml-4 inline-flex justify-center w-[30%] rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none"
                                        v-model="selectedStudentSort">
                                        <option value="" disabled>Sort By</option>
                                        <option value="surnameSort">Surname</option>
                                        <option value="studentIDSort">Student ID</option>
                                    </select>

                                    <!-- Report Sort -->
                                    <select v-if="selectedView === 'reportsView'"
                                        class="mb-0 ml-4 inline-flex justify-center w-[30%] rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none"
                                        v-model="selectedReportSort">
                                        <option value="" disabled>Sort By</option>
                                        <option value="ascDateSort">Date (Ascending)</option>
                                        <option value="descDateSort">Date (Descending)</option>
                                        <option value="repIDSort">Report ID</option>
                                        <option value="surnameSort">Student Surname</option>
                                    </select>

                                    <!-- Report Status Filter -->
                                    <select v-if="selectedView === 'reportsView'"
                                        class="mb-0 ml-4 inline-flex justify-center w-[30%] rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none"
                                        v-model="selectedReportStatus">
                                        <option value="all">All Status</option>
                                        <option value="Resolved">Resolved</option>
                                        <option value="NotResolved">Not Resolved</option>
                                    </select>
                                </div>

                                <!-- Placeholder Message when no view is selected -->
                                <template v-if="!selectedView">
                                    <section class="flex-1 rounded-lg p-6">
                                        <div class="flex flex-col h-[60%]">
                                            <div class="flex justify-center items-center h-full">
                                                <p class="text-xl text-gray-500 font-medium">Nothing to show. Select view.</p>
                                            </div>
                                        </div>
                                    </section>
                                </template>

                                <!-- Students View -->
                                <template v-else-if="selectedView === 'studentView'">
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
                                                        <tr v-for="student in getSectionStudents()"
                                                            :key="student.studentId" 
                                                            class="p-10">
                                                            <td class="p-3 text-center w-[30%]">{{ student.studentId }}</td>
                                                            <td class="p-3 text-center w-[40%] break-words whitespace-normal">
                                                                {{ `${student.lastName}, ${student.firstName} ${student.middleName || ''}`.trim() }}
                                                            </td>
                                                            <td class="p-3 text-center w-[30%]">
                                                                <button @click="viewStudentProfile(student.studentId)"
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
                                <template v-else-if="selectedView === 'reportsView'">
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
                                                            <th class="p-3 text-center w-[35%]">Student Name</th>
                                                            <th class="p-3 text-center w-[25%]">Date</th>
                                                            <th class="p-3 text-center w-[20%]">Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="report in getSectionReports()" 
                                                            :key="report.incidentDocID"
                                                            @click="viewReport(report.incidentDocID)"
                                                            class="border-b hover:bg-[#FFFAD3] cursor-pointer transition-colors">
                                                            <td class="p-4 text-center break-words whitespace-normal">{{ report.reportID }}</td>
                                                            <td class="p-4 text-center break-words whitespace-normal">
                                                                {{ getStudentNamesFromReport(report.peopleInvolved) }}
                                                            </td>
                                                            <td class="p-4 text-center break-words whitespace-normal">{{ report.dateOfIncident }}</td>
                                                            <td class="p-4 text-center">
                                                                <span :class="getStatusClass(report.status)">
                                                                    {{ report.status }}
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
            <SendEmail v-if="showSendEmailModal" 
            :initialEmail="toSendEmail" 
            @close="showSendEmailModal = false" 
            />

            <ConfirmRemoveAdviser v-if="showConfirmRemoveAdviser" :adviser="adviser" :section="section" @close="showConfirmRemoveAdviser = false" @remove="confirmRemoveAdviser" />

    </div>
</template>

<script>
import { section } from '~/data/section.js';
import { student } from '~/data/student.js';
import { adviser } from '~/data/adviser.js';
import { users } from '~/data/user.js';
import { incidentReport } from '~/data/incident.js';
import SendEmail  from '~/components/Modals/AdminEmailing/SendEmailModal.vue';
import AdminSidebar from '~/components/Blocks/AdminSidebar.vue';
import AdminHeader from '~/components/Blocks/AdminHeader.vue';
import ConfirmRemoveAdviser from '~/components/Modals/AdminConfirmations/ConfirmRemoveAdviser.vue';

export default {
    name: 'admin-section-details',
    components: {
        AdminSidebar, AdminHeader, SendEmail, ConfirmRemoveAdviser
    },
    data() {
        return {
            section: null,
            adviser: null,
            selectedView: '',
            selectedStudentSort: '',
            selectedReportSort: '',
            selectedReportStatus: 'all',
            sectionStudents: [],
            sectionReports: [],
            showSendEmailModal: false,
            toSendEmail: '',
            showConfirmRemoveAdviser: false,

        };
    },
    async created() {
        const sectionId = this.$route.params.id;
        this.section = section.find(sec => String(sec.id) === String(sectionId));

        if (!this.section) {
            console.error('Section not found:', sectionId);
            return;
        }

        if (this.section.adviserId) {
            this.adviser = adviser.find(adv => adv.id === this.section.adviserId);
        }
    },
    methods: {
        async sendEmail() {
            this.showSendEmailModal = true;
            const user = await this.getUser(this.adviser.userId);
            console.log('Adviser User:', user);
            this.toSendEmail = user.emailAdd;
            console.log('Sending email to:', this.toSendEmail)
            console.log('Email Modal:', this.showSendEmailModal)
        },

        async getUser(userId) {
            return users.find(u => u.userId === userId);
        },

        getAdviserFullName() {
            if (!this.adviser) return 'No Adviser Assigned';
            return `${this.adviser.firstName} ${this.adviser.middleName} ${this.adviser.lastName}${this.adviser.suffix ? ` ${this.adviser.suffix}` : ''}`;
        },
        getStudent(studentId) {
            return student.find(s => s.studentId === studentId);
        },
        getStudentFullName(studentId) {
            const studentData = this.getStudent(studentId); 
            if (!studentData) return 'Unknown Student';
            return `${studentData.lastName}, ${studentData.firstName} ${studentData.middleName || ''}`.trim();
        },
        viewStudentProfile(studentId) {
            // Navigate to student profile page
            this.$router.push(`/admin/student/${studentId}`);
        },
        viewReport(reportId) {
            console.log('Viewing report:', reportId);
            this.$router.push(`/admin/incident/${reportId}`);
        },
        formatDate(date) {
            return new Date(date).toLocaleDateString()
        },
        getStatusClass(status) {
            return {
                'Resolved': 'text-green-600 font-medium',
                'NotResolved': 'text-yellow-600 font-medium'
            }[status] || 'text-gray-600 font-medium';
        },
        getSectionReports() {
            let reports = incidentReport.filter(report => {
                const reportStudents = report.peopleInvolved || [];
                return this.section?.sectionStudents.some(studentId => {
                    const student = this.getStudent(studentId);
                    return student && reportStudents.includes(student.firstName);
                });
            });

            // Filter by status
            if (this.selectedReportStatus !== 'all') {
                reports = reports.filter(report => report.status === this.selectedReportStatus);
            }

            // Sort reports based on selection
            switch (this.selectedReportSort) {
                case 'ascDateSort':
                    reports.sort((a, b) => new Date(a.dateOfIncident) - new Date(b.dateOfIncident));
                    break;
                case 'descDateSort':
                    reports.sort((a, b) => new Date(b.dateOfIncident) - new Date(a.dateOfIncident));
                    break;
                case 'repIDSort':
                    reports.sort((a, b) => a.reportID.localeCompare(b.reportID));
                    break;
                case 'surnameSort':
                    reports.sort((a, b) => {
                        const studentA = this.findStudentByFirstName(a.peopleInvolved[0]);
                        const studentB = this.findStudentByFirstName(b.peopleInvolved[0]);
                        return studentA?.lastName.localeCompare(studentB?.lastName) || 0;
                    });
                    break;
            }

            return reports;
        },
        getSectionStudents() {
            let students = this.section?.sectionStudents.map(id => this.getStudent(id)) || [];

            // Sort students based on selection
            switch (this.selectedStudentSort) {
                case 'surnameSort':
                    students.sort((a, b) => a.lastName.localeCompare(b.lastName));
                    break;
                case 'studentIDSort':
                    students.sort((a, b) => a.studentId.localeCompare(b.studentId));
                    break;
            }

            return students;
        },
        getStudentNamesFromReport(involvedStudents) {
            if (!involvedStudents) return '';

            // Convert first names to full names with surname first
            const studentFullNames = involvedStudents.map(firstName => {
                const student = this.findStudentByFirstName(firstName);
                if (student) {
                    return `${student.lastName}, ${student.firstName}`;
                }
                return firstName;
            });
            return studentFullNames.join('; ');
        },
        findStudentByFirstName(firstName) {
            return student.find(s => s.firstName === firstName);
        },

        removeAdviser() {
            this.showConfirmRemoveAdviser = true;
           
        },

        confirmRemoveAdviser() {
            try{
                this.section.adviserId = "";
                this.adviser.sectionId = "";
                this.adviser.status = "inActive";
                const userAdviser = users.find(u => u.userId === this.adviser.userId);
                userAdviser.canAccess = false;
                this.$router.push({ path: '/admin/search' });
                this.showConfirmRemoveAdviser = false;
            }catch(err){
                console.error('Error removing adviser:', err);
            }   
            
        },

    },
    watch: {
        // Watch for changes in selectedView and fetch appropriate data
        selectedView: {
            handler: 'fetchSectionData',
            immediate: true
        }
    },
    mounted() {
        console.log('Incident Report Data:', incidentReport);
    }
};
</script>

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