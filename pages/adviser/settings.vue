<script setup lang='ts'>
import AdviserHeader from "~/components/Blocks/AdviserHeader.vue";
import { student } from "~/data/student";
import { section } from "~/data/section";
import { useAdviserViewStore } from "~/stores/views/adviserViewStore";

const adviserViewStore = useAdviserViewStore();
await adviserViewStore.updateSettings();

const handleRowClick = (item: any) => {

}

const notifyClick = () => {
    adviserViewStore.settingsContainWidth = (adviserViewStore.settingsContainWidth === '89%') ? '70%': '89%';
    adviserViewStore.settingsTitleWidth = (adviserViewStore.settingsTitleWidth === '87%') ? '68%': '87%';
    adviserViewStore.settingsShowNotification = !adviserViewStore.settingsShowNotification;
}

const logoutClick = () => {
    return navigateTo('/auth/login');
}

</script>

<template>
    <div class="adviser-page">
        <AdviserHeader @notif-click="notifyClick"/>
        <div >
            <div class="m-5 flex justify-start ml-20">
                <h1 class="AY_Sem text-2xl font-bold">{{ adviserViewStore.getAcademicYearAndSemester(adviserViewStore.settingsTimeline) }}</h1>
            </div>

                <!--Title of the Content?-->
            <div class="title flex justify-center items-center" :style="{width: adviserViewStore.settingsTitleWidth}">
                <div><h1 class="text-white text-2xl font-bold">Account Settings</h1></div>
            </div>   

            <!--Content of the Page-->
            <div class="contain " :style="{ width: adviserViewStore.settingsContainWidth}">
                <div class="grid grid-cols-10 h-full">
                   <div class=" m-10 col-span-4 pt-5 ">
                        <div class="grid-cols-2 pb-5 ml-6 flex justify-center" >
                            <img :src="adviserViewStore.settingsUser.data.profilePicture"
                         :alt="adviserViewStore.settingsUser.data.username"
                         class="w-auto h-80 rounded-full object-cover mb-4 "/>
                        </div>  
                        <div class="pb-5 ml-6 flex justify-center " >
                            <button class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full shadow-lg">
                                Change Profile Picture
                            </button>
                        </div>
                   </div>
                   <div class="col-span-6 shadow-lg h-full p-16 pb-20 flex justify-start AY_Sem">
                    <div class="w-full">
                       
                        <div class=" w-full px-16 h-full">
                            <div class="mb-5">
                                Login Details
                            </div> 
                            <div class=" grid grid-cols-12 w-full h-fit border-b-2 border-lime-950 ">
                                <div class="col-span-3 flex justify-start items-center ">
                                    <label class="m-0 text">Username:  </label>
                                </div>
                                <div class=" col-span-7 text2 flex items-center">{{ adviserViewStore.settingsUser.data.username }}</div>
                                <div class="col-span-2 flex justify-end py-2">
                                    <button class="gray-button text-white  py-2 px-4 rounded-md shadow-lg">
                                    Change 
                                </button>
                                </div>
                            </div>

                            <div class=" grid grid-cols-12 w-full h-fit border-b-2 border-lime-950 pt-5 ">
                                <div class="col-span-3 flex justify-start items-center ">
                                    <label class="text m-0">Password  </label>
                                </div>
                                <div class="col-span-2 flex justify-end py-2">
                                    <button class="gray-button text-white  py-2 px-4 rounded-md shadow-lg">
                                        Change 
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class=" flex flex-col mb-5">
                            <button @click="logoutClick" class="logout  text-white  py-2 px-4 rounded-md shadow-lg ">
                                Logout
                            </button>
                        </div>
                    </div>

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
        font-weight: 500;
        color: #265630;
    }

    .text2{
        font-family: Century Gothic, sans-serif;
        font-size: 16px;
        font-weight: 500;
        color: #265630;
    }

    .logout{
        margin-top: 1%;
        margin-right: 10%;
        margin-left: 10%;
        background-color: #728B78;

    }

    .logout:hover{
        background-color: #FF6161;
    }


</style>