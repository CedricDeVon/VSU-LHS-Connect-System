<script setup lang='ts'>
import AdviserHeader from "~/components/Blocks/AdviserHeader.vue";
import StudentBasicInfo from "~/components/Modals/StudentBasicInfoByAdviser.vue";
import AddStudentForm from "~/components/Modals/AddStudentForm.vue";
import { useAdviserViewStore } from "~/stores/views/adviserViewStore";

const adviserViewStore = useAdviserViewStore();
await adviserViewStore.updateHomePage();

</script>

<template>
    <div class="adviser-page">
        <AdviserHeader/>
        <!-- Unsay Problem diri lodz? -->
        <div>
            <div>
                <h1 class="AY_Sem text-2xl font-bold">{{ adviserViewStore.getAcademicYearAndSemester(adviserViewStore.homepageTimeline) }}</h1>
            </div>

                <!--Title of the Content?-->
            <div class="title flex justify-center items-center">
                <div><h1 class="text-white text-2xl font-bold">Current Advisory</h1></div>
            </div>   

            <!--Content of the Page-->
            <div class="contain mx-auto">
                <div class="grid grid-cols-10">
                   <div class=" m-10 col-span-4 pt-5 ">
                        <!--Sort/Add student-->
                        
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
        width: 900px;
        height: 1200px;
        border-radius: 15px;
        left: 600px;
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
        width: 60%;
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
        width: 57%;
        height: 6.1%;
        background: #728B78;
        color: white;
        border-radius: 15px;
        left: 95px;
        top: 135px;
        z-index: 2;
    }
</style>