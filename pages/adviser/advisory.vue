<template>
    <div class="adviser-page">
        <AdviserHeader @notif-click="notifClick" class="relative z-10" />
        <div>
            <AddStudentForm v-if="adviserViewStore.advisoryAddStudentForm"
            @close="adviserViewStore.advisoryAddStudentForm = false"
            />

            <NotificationModal v-if="adviserViewStore.notificationShowAdviserModalAnnouncements" />  
            <div class="m-5 flex justify-between items-center mx-20">
                <h1 class="text-2xl font-bold text-green-900">{{adviserViewStore.advisoryAcademicYearAndSemesterMessage}}</h1>
            </div>

            <!--Content of the Page-->
            <div class="contain" :style="{width: containWidth}">

                <div class="title  flex justify-center items-center" :style="{width: titleWidth}">
                    <div><h1 class="text-white text-2xl font-bold">Current Advisory</h1></div>
                </div>   

                <div class="grid grid-cols-12 h-full">
                    <!-- Left Side - Student List -->
                    <div class="col-span-6 flex flex-col p-6">
                        <!-- Controls -->
                        <div class="flex items-center justify-between mb-4 px-2">
                            <select v-model="adviserViewStore.adviserSelectedSort"
                                class="border-b-2 border-gray-400 py-2 bg-transparent text-black font-medium focus:outline-none focus:border-green-700">
                                <option value="" disabled selected>Sort by</option>
                                <option value="surname">Surname</option>
                                <option value="student_ID">Student ID</option>
                            </select>

                            <button @click="showAddStudentForm" 
                                class="px-4 py-2 rounded-lg bg-green-700 text-white hover:bg-green-800 transition-colors">
                                Add Student
                            </button>
                        </div>

                        <!-- Scrollable Table Container -->
                        <div class="overflow-hidden rounded-lg border border-gray-200 bg-white">
                            <div class="h-full">
                                <table class="min-w-full relative">
                                    <thead class="bg-gray-50 sticky top-0 z-10">
                                        <tr>
                                            <th class="px-6 py-3 text-left text-sm font-semibold text-green-900 bg-gray-50">Student ID</th>
                                            <th class="px-6 py-3 text-left text-sm font-semibold text-green-900 bg-gray-50">Student Name</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-gray-200">
                                        <tr v-for="(student, index) in getStudents()" 
                                            :key="index" 
                                            @click="adviserViewStore.studentClick(student)"
                                            class="hover:bg-green-50 cursor-pointer transition-colors">
                                            <td class="px-6 py-4 text-sm text-green-900">{{ student.id }}</td>
                                            <td class="px-6 py-4 text-sm text-green-900">{{ adviserViewStore.getFullName(student) }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                     <!--Student Information-->
                   <div class="col-span-6 p-6">
                        <div v-if="!adviserViewStore.advisoryShowStudentInfo" class="flex justify-center items-center items-center h-full">
                            <h2 class="text-xl text-gray-500">Select a student to display their details</h2>
                        </div>
                        <StudentBasicInfo v-if="adviserViewStore.advisoryShowStudentInfo"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['authenticate-and-authorize-adviser']
});

import AdviserHeader from "~/components/Blocks/AdviserHeader.vue";
import StudentBasicInfo from "~/components/Modals/Advisory/StudentBasicInfoByAdviser.vue";
import AddStudentForm from "~/components/Modals/Advisory/AddStudentForm.vue";
import NotificationModal from '~/components/Modals/AdviserNotification/NotificationModal.vue';
import InitialReportModal from '~/components/Modals/AdviserReport/InitialReportModal.vue';
import { useAdviserViewStore } from '~/stores/views/adviserViewStore';
import { UserSecurity } from "~/library/security/userSecurity";

const containWidth = ref('89%');
const titleWidth = ref('87%');

const adviserViewStore = useAdviserViewStore();
await adviserViewStore.updateAdvisoryView();

function showAddStudentForm() {
    adviserViewStore.advisoryAddStudentForm = !adviserViewStore.advisoryAddStudentForm;
}

function getStudents() {
    const results = adviserViewStore.advisoryStudents;
    if (adviserViewStore.adviserSelectedSort === 'surname') {
      results.sort((a: any, b: any) => a.data.lastName.localeCompare(b.data.lastName));
    
    } else if (adviserViewStore.adviserSelectedSort === 'student_ID') {
      results.sort((a: any, b: any) => a.id.localeCompare(b.id));
    }
    return results;
}

</script>

<style scoped>
.adviser-page {
    @apply min-h-screen bg-[#fffef1] relative;
    background-image: url('~/assets/images/vsu-main-the-search-for-truth-statue.png');
    background-position: 90% 20px;
    background-size: 50% auto;
    background-repeat: no-repeat;
}

.contain {
    @apply absolute left-20 top-40 bg-white/90 rounded-xl shadow-lg;
    height: 75vh;
}

.title {
    @apply -mt-8 mx-auto w-[98%] py-3 bg-green-800 rounded-xl;
}

.AY_Sem {
    color: #000000;
    text-align: center;
    font-size: 25px;
    font-weight: 500;
    position: absolute;
    left: 80px;
    top: 80px;
} 

.gray {
    background-color: #6b7e6f;
}

.gray-button {
    background-color: #728B78;
}

.gray-button:hover {
    background-color: #4a5e4e;
}

.table-text{
    font-size: 16px;
    font-weight: 500;
    color: #265630;
}
</style>