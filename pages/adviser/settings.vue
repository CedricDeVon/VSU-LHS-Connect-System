<template>
    <div class="adviser-page">
        <AdviserHeader/>
        <div >
            <div>
                <h1 class="AY_Sem text-2xl font-bold">Academic Year 2024-2025 / First Semester</h1>
            </div>

                <!--Title of the Content?-->
            <div class="title flex justify-center items-center">
                <div><h1 class="text-white text-2xl font-bold">Account Settings</h1></div>
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
    import { student } from "~/data/student";
    import { section } from "~/data/section";

    export default {
        name: "Settings",
        components: {AdviserHeader,},
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

        };},

        methods: {

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