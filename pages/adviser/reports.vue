<template>
    <div class="reports-page">
        <InitialReportModal
        v-if="adviserViewStore.reportsShowCreateReport"
        :report="reportChosen"
        :adviserId="adviserViewStore.reportsAdviser.id"
        @close ="creationClose"
        />
        <UpdateIncidentalReportModal
        v-if="adviserViewStore.reportsShowIncidentalUpdateReport"
        :report="adviserViewStore.reportsReport"
        @close ="creationClose"
        /> 
        <ViewIncidentalReportModal
        v-if="adviserViewStore.reportsShowViewIncidentalReport"
        :report="adviserViewStore.reportsReport"
        @close ="creationClose"
        /> 
        <NotificationModal v-if="adviserViewStore.notificationShowAdviserModalAnnouncements" />  
        <AdviserHeader @notif-click="notifClick" class="relative z-10"/>
        <div >
            <div class="m-5 flex justify-between items-center mx-20">
                <h1 class="text-2xl font-bold text-green-900">{{ adviserViewStore.getAcademicYear(adviserViewStore.reportsTimeline) }}</h1>
            </div>

            <div class="contain" :style="{ width: adviserViewStore.reportsContainWidth}">
                <div class="title flex justify-center items-center">
                    <h1 class="text-white text-2xl font-bold">
                        {{ adviserViewStore.reportsSelectedSort === 'anecdotal' ? 'Anecdotal Reports' : 'Incident Reports' }}
                    </h1>
                </div>  

                <div class="flex flex-col h-full p-6">
                    <!-- Controls Section -->
                    <div class="flex justify-between items-center mb-6 px-4">
                        <div class="relative">
                            <select v-model="adviserViewStore.reportsSelectedSort"
                                class="appearance-none bg-white border-b-2 border-green-700 px-4 py-2 pr-8 rounded-lg focus:outline-none focus:border-green-800 text-green-900 font-medium">
                                <option value="" disabled selected>Select View</option>
                                <option value="incident">Incident Report</option>
                                <option value="anecdotal">Anecdotal Report</option>
                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-green-700">
                                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 9l-7 7-7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <!-- Reports Table with Fixed Height -->
                    <div class="flex-1 overflow-hidden rounded-lg border border-gray-200">
                        <div class="h-[calc(95vh-300px)] overflow-y-auto">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-green-700 text-white sticky top-0 z-5">
                                    <tr class="bg-green-700 text-white">
                                        <th class="px-6 py-4 text-left text-sm font-semibold w-1/5">Report ID</th>
                                        <th class="px-6 py-4 text-left text-sm font-semibold w-2/5">Student Name</th>
                                        <th class="px-6 py-4 text-left text-sm font-semibold w-1/5">{{adviserViewStore.reportsSelectedSort === 'anecdotal'? 'Last Modified' : 'Date of Incident'}}</th>
                                        <th class="px-6 py-4 text-center text-sm font-semibold w-1/5">Action</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-100">
                                    <template v-if="adviserViewStore.reportsSelectedSort === 'anecdotal'">
                                        <tr v-for="report in getReports()" 
                                            :key="report.id"
                                            class="hover:bg-green-50 transition-colors">
                                            <td class="px-6 py-4 text-sm text-green-900">{{ report.id }}</td>
                                            <td class="px-6 py-4 text-sm font-medium text-green-900">{{ report.data.studentId }}</td>
                                            <td class="px-6 py-4 text-sm text-green-900">{{ report.data.dateOfIncident }}</td>
                                            <td class="px-6 py-4 text-center">
                                                <button @click="viewAnecdotalDetails(report)"
                                                    class="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium bg-yellow-100 text-green-800 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300 transition-colors">
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    </template>
                                    <template v-else>
                                        <tr v-for="report in getReports()" 
                                            :key="report.id"
                                            class="hover:bg-green-50 transition-colors">
                                            <td class="px-6 py-4 text-sm text-green-900">{{ report.id }}</td>
                                            <td class="px-6 py-4 text-sm font-medium text-green-900">{{ report.data.peopleInvolved.join(', ') }}</td>
                                            <td class="px-6 py-4 text-sm text-green-900">{{ report.data.dateOfIncident }}</td>
                                            <td class="px-6 py-4 text-center flex">
                                                <button @click="report.data.isDraft ? editIncidentReport(report) : viewIncidentReport(report)" 
                                                    class="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium"
                                                    :class="report.data.isDraft ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-yellow-100 text-green-800 hover:bg-yellow-200'">
                                                    {{ report.data.isDraft ? 'Edit' : 'View Details' }}
                                                </button>
                                            </td>
                                        </tr>
                                    </template>
                                </tbody>
                            </table>
                        </div>
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
import UpdateIncidentalReportModal from '~/components/Modals/AdviserReport/UpdateIncidentalReportModal.vue';
import ViewIncidentalReportModal from '~/components/Modals/AdviserReport/ViewIncidentalReportModal.vue';
import { useAdviserViewStore } from '~/stores/views/adviserViewStore';
import { UserSecurity } from "~/library/security/userSecurity";

const adviserViewStore = useAdviserViewStore();
await adviserViewStore.updateReports();

const notifClick = () => {
    adviserViewStore.reportsContainWidth = adviserViewStore.reportsContainWidth === '89%' ? '70%': '89%';
    adviserViewStore.reportsTitleWidth = adviserViewStore.reportsTitleWidth === '87%' ? '68%': '87%';
    adviserViewStore.reportsShowNotification = !adviserViewStore.reportsShowNotification;
}

const createReport = () => {
    adviserViewStore.resetReports();
    adviserViewStore.reportsShowCreateReport = true;
}

const editIncidentReport = (report: any) => {
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
    adviserViewStore.reportsShowIncidentalUpdateReport = true;
}

const viewIncidentReport = (report: any) => {
    adviserViewStore.reportsReportChosen = report;
    adviserViewStore.reportsShowViewIncidentalReport = true;
}

const viewAnecdotalDetails = (report: any) => {
    return navigateTo(`/adviser/anecdotal/${report.data.studentId}`, { replace: true })
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
    adviserViewStore.reportsShowIncidentalUpdateReport = false;
    adviserViewStore.reportsShowViewIncidentalReport = false;
    adviserViewStore.reportsReportChosen = {isDraft:true};
}
</script>

<style scoped>
    .reports-page{
        @apply bg-[#fffef1] min-h-screen;
        background-image: url('~/assets/images/vsu-main-the-search-for-truth-statue.png');
        background-position: 90% 20px;
        background-size: 50% auto;
        background-repeat: no-repeat;
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
        @apply absolute left-20 top-40 bg-white/90 rounded-xl shadow-lg;
        height: 75vh;
    }

    .title{
        @apply -mt-8 mx-auto w-[98%] py-3 bg-green-800 rounded-xl;
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
