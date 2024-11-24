<template>
    <div class="reports-page">
        <InitialReportModal
        v-if="showCreateReport"
        :report="reportChosen"
        @close ="creationClose"
        /> 
        <notification-modal v-if="showNotification"/>
        <AdviserHeader @notif-click="notifClick"/>
        <div >
            <div class="m-5 flex justify-start ml-20">
                <h1 class="AY_Sem text-2xl font-bold">Academic Year {{ AcademicYear }}</h1>
            </div>

                <!--Title of the Content?-->
            <div class="title flex justify-center items-center" :style="{width: titleWidth}">
                <div><h1 class="text-white text-2xl font-bold">Incident Reports</h1></div>
            </div>   

            <!--Content of the Page-->
            <div class="contain " :style="{ width: containWidth}">
                <div class=" m-10  py-5 px-20 mx-20  ">
                        <!--Sort/Add student-->
                        <div class="grid-cols-2 pb-5 ml-6" >
                           <select
                               class="mr-8 xl:pr-24 lg:mr-5 lg:pr-2 py-4  border border-b-2 border-t-0 border-r-0 border-l-0 border-gray-400 bg-gray-10 text-black inline-flex whitespace-nowrap font-medium hover:bg-gray-15 focus:outline-none"
                               v-model="selectedSort">
                               <option value="" disabled selected hidden>Select View</option>
                               <option value="incident" >Incident Report</option>
                               <option value="anecdotal">Anecdotal Report</option>
                           </select>

                       
                            <button v-if="selectedSort !== 'anecdotal'" @click="report" 
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
                                            Student Name
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
                                <tbody v-if="selectedSort === 'anecdotal'" class=" absolute  text-5xl p-9" >Coming Soon...</tbody>
                                <tbody v-else>
                                    <tr class =" hover:bg-gray-200 text " v-for="report in reports" :key="report.reportIDRef"  >
                                        <td class=" py-5 text-center align-middle ">{{ report.reportIDRef }}</td>
                                        <td class=" py-5 text-center align-middle ">{{ `${report.peopleInvolved.join(', ')}` }}</td>
                                        <td class=" py-5 text-center align-middle ">{{ report.dateOfIncident }}</td>
                                        <td class=" py-5 text-center align-middle ">
                                            <button v-if="report.isDraft"  @click="editReport(report)" 
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
        <!--Background Image-->
        <div>
            <img class="backPic" src="~/assets/images/vsu-main-the-search-for-truth-statue.png" alt="img" >
        </div>
    </div>
</template>

<script>
    import AdviserHeader from "~/components/Blocks/AdviserHeader.vue";
    import { initialReport } from "~/data/initialReport";
    import InitialReportModal from '~/components/Modals/InitialReportModal.vue';
    import { adviserReportStore } from "../../stores/adviserReport";
    import NotificationModal from '~/components/Modals/NotificationModal.vue';
   


    export default {
        name: "reports",
        components: {AdviserHeader, InitialReportModal, NotificationModal, },
        props: {
            AdviserID: {
                type: String,
                required: true,
                default: "adviserid1" // this should be the adviserID of the logged in user
            },
            AcademicYear: {
                type: String,
                required: true,
                default: "2024-2025" // this should be the current academic year
            },

        },
        data() {
            return {
            reports: [],
            reportChosen: {isDraft : true},
            showCreateReport:false,
            isDraft:true,
            showNotification:false,
            containWidth:'89%',
            titleWidth:'87%',
            selectedSort:'',
            store: adviserReportStore()

        };},

        methods: {

            handleRowClick(item) {
  
            },

            notifClick(){
                this.containWidth = this.containWidth === '89%' ? '70%': '89%';
                this.titleWidth = this.titleWidth === '87%' ? '68%': '87%';
                this.showNotification = !this.showNotification;
            },

            report(){
                this.store.resetAllData();
                this.showCreateReport =true;
            },

            editReport(rep){
                this.reportChosen = rep;
                this.store.resetAllData();
                    if (rep) {
                    this.store.peopleInvolved = rep.peopleInvolved;
                    this.store.witness = rep.witness;
                    this.store.dateOfIncident = rep.dateOfIncident;
                    this.store.placeOfIncident = rep.placeOfIncident;
                    this.store.thingsInvolved = rep.thingsInvolved;
                    this.store.narrativeReport = rep.narrativeReport;
                }
                this.showCreateReport=true;
            },
            viewDetails(rep){
                this.reportChosen = rep;
                this.showCreateReport=true;
            },

            fetchReports(id, ay) {
                this.reports  = initialReport.filter((rep)=> rep.reportedBY === id && rep.academicYear === ay);
                console.log(this.reports);
            },

            creationClose(){
                this.showCreateReport = false;
                this.reportChosen = {isDraft:true};
            },

            /*handleRowClick(item) {
            // Handle row click event
            console.log('Row clicked:', item);
            }*/

        },

        mounted() {
            this.fetchReports(this.AdviserID, this.AcademicYear);
        }
        
  };
</script>
<style scoped>
    .reports-page{
        background: #fffef1;
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
        background: rgba(255, 255, 255, 0.89);
        border-radius: 15px;
        left: 80px;
        top: 170px;
        z-index: 1;
        box-shadow: 2px 7px 26.6px 0px rgba(0, 0, 0, 0.25);
        
    }

    .title{
        position: absolute;
        height: 6.1%;
        background: #265630;
        border-radius: 15px;
        left: 95px;
        top: 135px;
        z-index: 2;
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