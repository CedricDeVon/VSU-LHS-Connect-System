<template>
    <div class="adviser-page">
        <AdviserHeader/>
            <div >
            <AddStudentForm v-if="showAddStudentForm"
            @close="showAddStudentForm = false"
            />
            <div>
                <h1 class="AY_Sem text-2xl font-bold">Academic Year 2024-2025 / First Semester</h1>
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
                               v-model="selectedSort">
                               <option value="" disabled selected hidden>Sort by</option>
                               <option value="surname">Surname</option>
                               <option value="student_ID">Student ID</option>
                           </select>

                       
                            <button @click="addStudent" 
                                    class="xl:px-7 py-2 lg:px-2 rounded-lg gray text-white bg-gray-600 hover:bg-slate-400 focus:outline-none"
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
                                    <tr class ="hover:bg-gray-200 table-text " v-for="(student, index) in students" :key="index" @click="handleRowClick(item)" >
                                        <td class="py-5 px-4 text-center align-middle ">{{ student.studentId }}</td>
                                        <td class="py-5 px-4 text-center align-middle ">{{ `${student.firstName} ${student.lastName}`}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>  
                   </div>

                     <!--Student Information-->
                   <div class="col-span-6 pt-10 ">
                    <div v-if="!showStudentInfo" class="flex justify-center items-center mt-32">
                        <h1 class="text-2xl">Select a student to display their details</h1>
                    </div>
                    
                        <StudentBasicInfo v-if="showStudentInfo"/>
                       
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
    import StudentBasicInfo from "~/components/Modals/StudentBasicInfoByAdviser.vue";
    import AddStudentForm from "~/components/Modals/AddStudentForm.vue";
    import { student } from "~/data/student";
    import { section } from "~/data/section";

    export default {
        name: "Advisory",
        components: {AdviserHeader, StudentBasicInfo, AddStudentForm,},
        props: {
            AdviserID: {
                type: String,
                required: true,
                default: "adviserid16" // this should be the adviserID of the logged in user
            },
            AcademicYear: {
                type: String,
                required: true,
                default: "2024-2025" // this should be the current academic year
            }
        },
        data() {return {
            selectedSort: "",
            students: [],
            showStudentInfo: false,
            showAddStudentForm: false,
            incd: 'incidentID7'
        };},

        methods: {
            addStudent() {
                //this.items.push({ column1: "2022-00000", column2: "New Student" });
                this.showAddStudentForm = true;
            },
            handleRowClick(item) {
                this.showStudentInfo = true;
            },

            fetchStudents(id,ay) {
                const studentIDs = (section.find((sec)=> sec.adviserId === id && sec.sectionSchoolYear === ay)).sectionStudents;
                this.students = student.filter((stdnt) => studentIDs.includes(stdnt.studentId));
            },

            /*handleRowClick(item) {
      // Handle row click event
      console.log('Row clicked:', item);
    }*/

        },

        mounted() {
            this.fetchStudents(this.AdviserID, this.AcademicYear);
        }
        
  };
</script>
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

    .table-text{
        font-size: 16px;
        font-weight: 500;
        color: #265630;
    }
</style>