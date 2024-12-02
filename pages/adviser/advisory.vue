<template>
    <div class="adviser-page">
            <AdviserHeader @notif-click="notifClick" class="relative z-10" />
            <div >
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

                <div class="grid grid-cols-12">
                   <div class=" m-10 col-span-6 pt-5 ">
                        <!--Sort/Add student-->
                        <div class="grid-cols-2 pb-5 ml-6" >
                           <select
                               class="mr-8 xl:pr-24 lg:mr-5 lg:pr-2 py-2  border border-b-2 border-t-0 border-r-0 border-l-0 border-gray-400 bg-gray-10 text-black inline-flex whitespace-nowrap font-medium hover:bg-gray-15 focus:outline-none"
                               v-model="adviserViewStore.adviserSelectedSort">
                               <option value="" disabled selected hidden>Sort by</option>
                               <option value="surname">Surname</option>
                               <option value="student_ID">Student ID</option>
                           </select>

                       
                            <button @click="showAddStudentForm"
                                    class="xl:px-7 py-2 lg:px-2 rounded-lg gray-button text-white focus:outline-none"
                                    aria-label="Add Student">
                                    Add Student
                            </button>
                        </div>
                        <!--Table of Students-->
                        <div class=" overflow-x-auto overflow-y-auto max-h-96 ">
                            <table class="min-w-full ">
                                <thead class="sticky top-0" >
                                    <tr class=" gray  text-white">
                                        <th 
                                            class="px-6 py-3 rounded-l-md ">
                                            Student ID
                                        </th>
                                        <th 
                                            class="px-6 py-3 rounded-r-md ">
                                            Student Name
                                        </th>
                                    </tr>
                                </thead>
                                <tbody >
                                    <tr class ="hover:bg-gray-200 table-text" v-for="student in getStudents()" :key="student.id" @click="adviserViewStore.studentClick(student)" >
                                        <td class="py-5 px-4 text-center align-middle ">{{ student.id || '' }}</td>
                                        <td class="py-5 px-4 text-center align-middle ">{{ adviserViewStore.getFullName(student) }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>  
                   </div>

                     <!--Student Information-->
                   <div class="col-span-6 pt-10 ">
                    <div v-if="!adviserViewStore.advisoryShowStudentInfo" class="flex justify-center items-center mt-32">
                        <h1 class="text-2xl">Select a student to display their details</h1>
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

// onBeforeMount(async () => {
//     await adviserViewStore.updateAdvisoryView();
// })

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