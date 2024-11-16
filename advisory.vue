<script setup lang="ts">
import AdviserHeader from "~/components/Blocks/AdviserHeader.vue";
import StudentBasicInfo from "~/components/Modals/StudentBasicInfoByAdviser.vue";
import AddStudentForm from "~/components/Modals/AddStudentForm.vue";
import { useAdviserViewStore } from '~/stores/views/adviserViewStore';

const adviserViewStore = useAdviserViewStore();
adviserViewStore.updateAdvisoryView();

</script>

<template>
    <div class="adviser-page">
        <AdviserHeader/>
       <div >

       <!--<AddStudentForm/>-->
       
            <div>
                <h1 class="AY_Sem text-2xl font-bold">{{adviserViewStore.advisoryAcademicYearAndSemesterMessage}}</h1>
            </div>

                <!--Title of the Content?-->
            <div class="title flex justify-center items-center">
                <div><h1 class="text-white text-2xl font-bold">Current Advisory</h1></div>
            </div>   

            <!--Content of the Page-->
            <div class="contain ">
                <div class="grid grid-cols-10">
                   <div class=" m-10 col-span-4 pt-5 ">
                        <!--Sort/Add student-->
                        <div class="grid-cols-2 pb-5 ml-6" >
                           <select
                               class="mr-8 xl:pr-24 lg:mr-5 lg:pr-2 py-2  border border-b-2 border-t-0 border-r-0 border-l-0 border-gray-400 bg-gray-10 text-black inline-flex whitespace-nowrap font-medium hover:bg-gray-15 focus:outline-none"
                               v-model="adviserViewStore.adviserSelectedSort">
                               <option value="" disabled selected hidden>Sort by</option>
                               <option value="surname">Surname</option>
                               <option value="student_ID">Student ID</option>
                           </select>

                       
                            <button @click="adviserViewStore.addNewStudent" 
                                    class="xl:px-7 py-2 lg:px-2 rounded-lg gray text-white hover:bg-gray-600 focus:outline-none"
                                    aria-label="Add Student">
                                    Add Student
                            </button>    
                        </div>
                        <!--Table of Students-->
                        <div class=" overflow-x-auto overflow-y-auto max-h-96">
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
                                    <tr class ="hover:bg-gray-200 " v-for="student in adviserViewStore.advisoryStudents" :key="student.id" @click="adviserViewStore.studentClick(student)" >
                                        <td class="py-2 px-4 text-center align-middle ">{{ student.id }}</td>
                                        <td class="py-2 px-4 text-center align-middle ">{{ `${student.data.lastName}, ${student.data.firstName} ${student.data.suffix}` }}</td>
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
        width: 89%;
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
        width: 87%;
        height: 6.1%;
        background: #265630;
        border-radius: 15px;
        left: 95px;
        top: 135px;
        z-index: 2;
    }
</style>