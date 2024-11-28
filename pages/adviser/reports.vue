<template>
    <div class="reports-page">
        <InitialReportModal
        v-if="adviserViewStore.reportsShowCreateReport"
        :report="reportChosen"
        :adviserId="AdviserID"
        @close ="creationClose"
        /> 
        <NotificationModal v-if="adviserViewStore.notificationShowAdviserModalAnnouncements" />  
        <AdviserHeader @notif-click="notifClick" class="relative z-10"/>
        <div >
            <div class="m-5 flex justify-start ml-20">
                <h1 class="AY_Sem text-2xl font-bold">{{ adviserViewStore.getAcademicYear(adviserViewStore.reportsTimeline) }}</h1>
            </div>
 
            <!--Content of the Page-->
            <div class="contain " :style="{ width: adviserViewStore.reportsContainWidth}">
                 <!--Title of the Content?-->
                <div class="title flex justify-center items-center" :style="{width: adviserViewStore.reportsTitleWidth}">
                    <div><h1 class="text-white text-2xl font-bold">
                        Incident Reports</h1></div>
                </div>   

                <div class=" m-10  py-5 px-20 mx-20  ">
                        <!--Sort/Add student-->
                        <div class="grid-cols-2 pb-5 ml-6" >
                           <select
                               class="mr-8 xl:pr-24 lg:mr-5 lg:pr-2 py-4  border border-b-2 border-t-0 border-r-0 border-l-0 border-gray-400 bg-gray-10 text-black inline-flex whitespace-nowrap font-medium hover:bg-gray-15 focus:outline-none"
                               v-model="adviserViewStore.reportsSelectedSort">
                               <option value="" disabled selected hidden>Select View</option>
                               <option value="incident" >Incident Report</option>
                               <option value="anecdotal">Anecdotal Report</option>
                           </select>

                            <button v-if="adviserViewStore.reportsSelectedSort !== 'anecdotal'" @click="createReport" 
                                    class="xl:px-7 py-2 lg:px-2 rounded-lg gray-button text-white focus:outline-none"
                                    aria-label="ReportIncident">
                                    Report an Incident
                            </button>
                        </div>
                        <!--Table of Reports-->
                        <div class=" overflow-x-auto overflow-y-auto max-h-96">
                            <table class=" min-w-full ">
                                <thead class="sticky top-0" >
                                    <tr class=" gray text-white ">
                                        <th 
                                            class="px-3 py-3 rounded-l-xl w-1/5 ">
                                            Report ID
                                        </th>
                                        <th 
                                            class="px-3 py-3 w-2/5">
                                            Student ID
                                        </th>
                                        <th 
                                            class="px-3 py-3 w-1/5">
                                             Date
                                        </th>
                                        <th 
                                            class="px-3 py-3 rounded-r-xl w-1/5">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody >
                                    <tr class =" hover:bg-gray-200 text " v-for="report in getReports()" :key="report.id"  >
                                        <td class=" py-5 text-center align-middle ">{{ report.id || 'N/A' }}</td>
                                        <td class=" py-5 text-center align-middle ">{{ report.data.studentId || 'N/A' }}</td>
                                        <td class=" py-5 text-center align-middle ">{{ report.data.dateOfIncident || 'N/A' }}</td>
                                        <td class=" py-5 text-center align-middle ">
                                            <button v-if="report.data.isDraft"  @click="editReport(report)" 
                                                    class=" py-2 px-16 rounded-lg yellow-button text-white focus:outline-none"
                                                    aria-label="EditReport">
                                                    Edit
                                            </button>
                                            <button v-else @click="viewDetails(report)" 
                                                    class=" py-2 px-2 rounded-lg yellow-button text-white focus:outline-none"
                                                    aria-label="IncidentDetails">
                                                    View Report Details
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>  
                   </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
definePageMeta({
  middleware: ['authenticate-and-authorize-adviser']
});

import AdviserHeader from "~/components/Blocks/AdviserHeader.vue";
import InitialReportModal from '~/components/Modals/AdviserReport/InitialReportModal.vue';
import NotificationModal from '~/components/Modals/AdviserNotification/NotificationModal.vue';
import { useAdviserViewStore } from '~/stores/views/adviserViewStore';
import { UserSecurity } from "~/library/security/userSecurity";

const adviserViewStore = useAdviserViewStore();
await adviserViewStore.updateReports();

// onBeforeMount(async () => {
//     await adviserViewStore.updateReports();
// })

const notifClick = () => {
    adviserViewStore.reportsContainWidth = adviserViewStore.reportsContainWidth === '89%' ? '70%': '89%';
    adviserViewStore.reportsTitleWidth = adviserViewStore.reportsTitleWidth === '87%' ? '68%': '87%';
    adviserViewStore.reportsShowNotification = !adviserViewStore.reportsShowNotification;
}

const createReport = () => {
    adviserViewStore.resetReports();
    adviserViewStore.reportsShowCreateReport = true;
}

const editReport = (report: any) => {
    adviserViewStore.reportsReportChosen = report;
    adviserViewStore.resetReports();
    if (report) {
        adviserViewStore.reportsPeopleInvolved = report.data.peopleInvolved;
        adviserViewStore.reportsWitness = report.data.witnesses;
        adviserViewStore.reportsDateOfIncident = report.data.dateOfIncident;
        adviserViewStore.reportsPlaceOfIncident = report.data.placeOfIncident;
        adviserViewStore.reportsThingsInvolved = report.data.thingsInvolved;
        adviserViewStore.reportsNarrativeReport = report.data.narrativeReport;
    }
    adviserViewStore.reportsShowCreateReport = true;
}

const viewDetails = (report: any) => {
    adviserViewStore.reportsReportChosen = report;
    adviserViewStore.reportsShowCreateReport = true;
}

const getReports = () => {
    if (adviserViewStore.reportsSelectedSort === 'incident') {
      return adviserViewStore.reportsIncidentalReports;

    } else if (adviserViewStore.reportsSelectedSort === 'anecdotal') {
      return adviserViewStore.reportsAnecdotalReports;
    }
    return [];
}

const creationClose = () => {
    adviserViewStore.reportsShowCreateReport = false;
    adviserViewStore.reportsReportChosen = {isDraft:true};
}
</script>

<style scoped>
    .reports-page{
        background: #fffef1 url('~/assets/images/vsu-main-the-search-for-truth-statue.png') no-repeat;
        background-position: 90% 20px;
        background-size: 50% auto;
        height: 850px;
        position: relative;
        overflow: hidden; 
    }

    .backPic{
        position: absolute;
        width: 50%;
        height: auto;
        border-radius: 15px;
        left: 50%;
        top: 20px;
        z-index: 0;
    }


    .AY_Sem {
    color: #000000;
    text-align: center;
    font-size: 25px;
    font-weight: 500;
   
  
    } 

    .gray-button {
        background-color: #728B78;
        font: Century Gothic, sans-serif;
        font-size: 16px;
        font-weight: 500;

    }
    .gray-button:hover {
        background-color: #4a5e4e;
    }

    .gray {
        background-color: #728B78;
        font: Century Gothic, sans-serif;
    }

    .yellow-button {
        background-color: #F8F1BA;
        font-family: Century Gothic, sans-serif;
        font-size: 14px;
        font-weight: 500;
        color:#56685B;
    }

    .yellow-button:hover {
        background-color: #728B78;
        color: white;
    }


    .contain{
        position:absolute;
        height: 70%;
        background: rgba(255, 255, 255, 0.9);
        border-radius: 15px;
        left: 80px;
        top: 170px;
        z-index: 2;
        box-shadow: 2px 7px 26.6px 0px rgba(0, 0, 0, 0.25);
        
    }

    .title{
        height: 8.8%;
        width: 98%;
        background: rgba(38, 86, 48, 1); /* Using rgba for consistency */
        border-radius: 15px;
        justify-self: center;
        z-index: 2;
        margin-top: -35px;
    }

    .text{
        font-family: Century Gothic, sans-serif;
        font-size: 20px;
        font-weight: 545;
        color: #265630;
    }

    .text2{
        font-family: Century Gothic, sans-serif;
        font-size: 16px;
        font-weight: 500;
        color: #265630;
    }
</style>
