<template>
    <div class="flex h-screen overflow-hidden">
        <AdminSidebar />
        <div class="general flex-grow overflow-hidden flex flex-col">
            <AdminHeader />
            <div class="flex-1 overflow-auto p-4">
                <section class="flex flex-col bg-amber-50 rounded-2xl min-h-full">
                    <!-- Header -->
                    <h1
                        class="sticky top-0 z-10 mx-auto w-[90%] px-6 py-4 mt-4 text-2xl font-bold text-center text-white rounded-3xl bg-[#728B78]">
                        Section {{ section?.sectionName || 'Details' }}
                    </h1>

                    <div class="flex-1 p-6">
                        <div class="flex gap-6 h-full max-lg:flex-col">
                            <!-- Left Sidebar -->
                            <aside class="w-1/4 min-w-[300px] max-lg:w-full rounded-lg p-6">
                                <div class="flex flex-col items-center space-y-4">
                                    <img :src="adviser?.profilePic || 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNpcmNsZS11c2VyLXJvdW5kIj48cGF0aCBkPSJNMTggMjBhNiA2IDAgMCAwLTEyIDAiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEwIiByPSI0Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48L3N2Zz4='" @error="handleImageError" alt="Profile"
                                        class="w-48 h-48 rounded-full object-cover bg-gray-100" />
                                    <h2 class="text-2xl font-bold text-green-900 text-center">
                                        {{ getAdviserFullName() }}
                                    </h2>
                                    <p class="text-lg text-neutral-700">
                                        Grade {{ section?.sectionLevel }} - {{ section?.sectionName }} Adviser
                                    </p>

                                    <!-- Adviser Details -->
                                    <dl class="w-full space-y-4 text-lg">
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
                                </div>
                            </aside>

                            <!-- Main Content -->
                            <section class="flex-1 bg-white rounded-lg p-6 shadow-lg overflow-hidden">
                                <div class="flex flex-col h-full">
                                    <!-- Reports Header -->
                                    <div class="flex justify-between items-center mb-6">
                                        <h3 class="text-2xl font-bold text-green-900">Section Reports</h3>
                                        <div class="flex gap-4">
                                            <select class="px-4 py-2 border rounded-md">
                                                <option>Date (Descending)</option>
                                                <option>Date (Ascending)</option>
                                            </select>
                                            <select class="px-4 py-2 border rounded-md">
                                                <option>All Status</option>
                                                <option>In Progress</option>
                                                <option>Resolved</option>
                                            </select>
                                        </div>
                                    </div>

                                    <!-- Reports Table -->
                                    <div class="overflow-auto flex-1">
                                        <table class="w-full">
                                            <thead class="bg-neutral-500 text-white">
                                                <tr>
                                                    <th class="p-3 text-left">Report ID</th>
                                                    <th class="p-3 text-left">People Involved</th>
                                                    <th class="p-3 text-left">Date</th>
                                                    <th class="p-3 text-left">Status</th>
                                                    <th class="p-3 text-left">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="report in sectionIncidents" :key="report.incidentDocID"
                                                    class="border-b hover:bg-gray-50">
                                                    <td class="p-3">{{ report.reportID }}</td>
                                                    <td class="p-3">{{ report.peopleInvolved.join(', ') }}</td>
                                                    <td class="p-3">{{ report.dateOfIncident }}</td>
                                                    <td class="p-3">{{ report.status }}</td>
                                                    <td class="p-3">
                                                        <button
                                                            class="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                                                            View Report Details
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
import { section } from '~/data/section.js';
import { student } from '~/data/student.js';
import { adviser } from '~/data/adviser.js';
import { incidentReport } from '~/data/incident.js';
import AdminSidebar from '~/components/Blocks/AdminSidebar.vue';
import AdminHeader from '~/components/Blocks/AdminHeader.vue';

export default {
    name: 'admin-section-details',
    components: {
        AdminSidebar, AdminHeader
    },
    data() {
        return {
            section: null,
            adviser: null,
            sectionIncidents: [],
        };
    },
    created() {
        const sectionId = this.$route.params.id;
        this.section = section.find(sec => String(sec.id) === String(sectionId));
        
        if (!this.section) {
            console.error('Section not found:', sectionId);
            return;
        }
        
        if (this.section.adviserId) {
            this.adviser = adviser.find(adv => adv.id === this.section.adviserId);
        }
        
        this.sectionIncidents = this.getSectionIncidents();
    },
    methods: {
        getAdviserFullName() {
            if (!this.adviser) return 'No Adviser Assigned';
            return `${this.adviser.firstName} ${this.adviser.middleName} ${this.adviser.lastName}${this.adviser.suffix ? ` ${this.adviser.suffix}` : ''}`;
        },
        getSectionIncidents() {
            // Get all incidents where peopleInvolved includes any student from this section
            const sectionStudents = this.section.sectionStudents;
            return incidentReport.filter(report => 
                report.peopleInvolved.some(person => 
                    sectionStudents.includes(person)
                )
            );
        },
        handleImageError(e) {
            // Fallback to a default image if the profile picture fails to load
            e.target.src = 'https://randomuser.me/api/portraits/lego/1.jpg';
        }
    }
};
</script>

<style scoped>
/* Additional styling here */
</style>