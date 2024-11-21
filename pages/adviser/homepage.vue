<script setup lang='ts'>
definePageMeta({
  middleware: ['authenticate-and-authorize-adviser']
});

import AdviserHeader from "~/components/Blocks/AdviserHeader.vue";
import StudentBasicInfo from "~/components/Modals/StudentBasicInfoByAdviser.vue";
import AddStudentForm from "~/components/Modals/AddStudentForm.vue";
import { useAdviserViewStore } from "~/stores/views/adviserViewStore";

const adviserViewStore = useAdviserViewStore();
await adviserViewStore.updateHomePage();

</script>

<template>
    <div class="adviser-page">
        <AdviserHeader @notif-click="notifClick" />
        <notification-modal v-if="showNotification" />
        <div class="h-screen ">
            <div>
                <h1 class="AY_Sem text-2xl font-bold">{{ adviserViewStore.getAcademicYearAndSemester(adviserViewStore.homepageTimeline) }}</h1>
            </div>
            <div class="w-screen h-full ">
               
                <div class="contain m-16 " :style="{width: containWidth}">
                     <!--Title of the Content?-->
                    <div class="title flex justify-center items-center justify-self-center m-3">
                        <div><h1 class="text-white text-5xl font-bold">Welcome, {{ adviserViewStore.homepageAdviser.data.lastName }}!</h1></div>
                    </div>   
                    <div class="mini-contain h-full flex justify-self-center m-3 ">
                        <div class="black-text w-full grid grid-flow-col auto-rows-fr">
                            <div class="flex flex-col justify-center items-center">
                                <img :src=adviserViewStore.homepageAdviser.data.profilePicture
                                :alt="profilePic"
                                class="w-auto h-3/4 rounded-full object-scale-down "/>
                            </div>
                            <div class=" h-full pt-10 pl-10">
                                <header class=" text-3xl pb-5">{{ adviserViewStore.getGradeAndSection(adviserViewStore.homepageSection) }}</header>
                                <div>
                                    <h2 class="p-1">Username: <span class="black-small">{{ adviserViewStore.homepageUser.data.username }}</span></h2>
                                    <h2 class="p-1">Advisory: <span class="black-small">{{ adviserViewStore.homepageAdviser.data.facultyId }}</span></h2>
                                    <h2 class="p-1">Email Address: <span class="black-small">{{ adviserViewStore.homepageUser.data.email }}</span></h2>
                                </div>
                            </div>
                            <div class=" pt-24">
                                <div>
                                    <h2 class="p-1">Faculty Identification Number: <span class="black-small">{{ adviserViewStore.homepageAdviser.data.facultyId }}</span></h2>
                                    <h2 class="p-1">Birth Date: <span class="black-small">{{ adviserViewStore.homepageAdviser.data.birthdate }}</span></h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="grid grid-flow-col w-full h-full mt-10 mx-10 pr-20 ">
                        <div class="mini-contain2 flex justify-self-center px-5 ">
                            <div class="w-full flex flex-col justify-between h-full">
                                <div class="mini-title flex justify-center items-center mb-3 ">
                                    <div><h1 class="text-white text-2xl font-bold">Students</h1></div>
                                </div>
                                <div class="flex justify-center mt-auto"><h1 class="px-3 text-center text-green ">Manage your Students' Profiles and Assess for Necessary Guidance</h1></div>
                                <div class="flex justify-center mt-auto">
                                    <button @click="goToAdvisory" class="button p-4 px-10 m-3">View Student Profiles</button>
                                </div>   
                            </div>
                        </div>
                        <div class="mini-contain2 flex justify-self-center px-5 ">
                            <div class="w-full flex flex-col justify-between h-full">
                                <div class="mini-title flex justify-center items-center mb-3">
                                    <div><h1 class="text-white text-2xl font-bold">Reports</h1></div>
                                </div>
                                <div class=" flex justify-center mt-auto"><h1 class="px-3 text-center text-green">Submit and Review Behavioral Reports for Students in this Section</h1></div>
                                <div class="flex justify-center mt-auto">
                                    <button @click="goToReports" class="button p-4 px-20 m-3">See Reports</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          
        </div>
        <!--Background Image-->
        <div class="">
            <img class="backPic" src="~/assets/images/vsu-main-the-search-for-truth-statue.png" alt="img" >
        </div>
    </div>
</template>

<style scoped>
    .adviser-page{
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
    position: absolute;
    left: 80px;
    top: 80px;
  
    } 

  .gray {
    background-color: #728B78;
    }

    .contain{
        position:absolute; 
        height: 80%;
        background: transparent;
        border-radius: 15px;
         left: 0px;
        top: 70px; 
        z-index: 1;
    }

    .mini-contain{
       opacity: .92;
        width: 85%;
        max-height: 40%;
        
        background: white;
        border-radius: 15px;
        z-index: 5;
        box-shadow: 2px 7px 26.6px 0px rgba(0, 0, 0, 0.25);
    }

    .mini-contain2{
        opacity: .95;
        width: 80%;
        height: 35%;
        background: white;
        border-radius: 15px;
        z-index: 5;
        box-shadow: 2px 7px 26.6px 0px rgba(0, 0, 0, 0.25);
    }

    .title{
        /* position: absolute; */
        opacity: .95;
        width: 80%;
        height: 15%;
        background: #728B78;
        color: white;
        border-radius: 15px;
        /* left: 95px;
        top: 135px; */
        z-index: 2;
    }

    .mini-title{
        width: 95%;
        height: 25%;
        background: #728B78;
        color: white;
        border-bottom: 5px ridge  #fffef1;
        border-radius: 10px;
        z-index: 2;
        margin-top: -25px;
        margin-left: 13px;
    }

    .button{
        font-family: 'Century Gothic', sans-serif;
        font-size: 17px;
        font-weight: 500;
        background-color:  #728B78;
        color: white;
        border-radius: 30px;
        border: none;
        cursor: pointer;
    }

    .button:hover{
        background-color: #a7a283cc;
    }

    .text-green{
        font-family: 'Century Gothic', sans-serif;
        color: #414E44;
        font-size: 20px;
        font-weight: 500;
    }

    .black-text{
        color: black;
        font-size: 20px;
        font-weight: 600;
        font-family: century-gothic, sans-serif;
    }
    .black-small{
        color: black;
        font-size: 19px;
        font-weight: 500;
        font-family: century-gothic, sans-serif;
    }
</style>