<template>
    <div class="adviser-page">
        <AdviserHeader @notif-click="notifClick" class="relative z-10" />
            <div >
            <AddStudentForm v-if="showAddStudentForm"
            @close="handleAddedStudent"
            :AdviserID="AdviserID" 
            />

            <div class="m-5 flex justify-between items-center mx-20">
                <h1 class="text-2xl font-bold text-green-900">Academic Year {{ AcademicYear }}</h1>
            </div>         

            <!--Content of the Page-->
            <div class="contain" :style="{width: containWidth}">

                <div class="title flex justify-center items-center">
                    <h1 class="text-white text-2xl font-bold">Current Advisory</h1>
                </div>   

                <div class="grid grid-cols-12 h-full">
                    <!-- Left Side - Student List -->
                    <div class="col-span-6 flex flex-col p-6">
                        <!-- Controls -->
                        <div class="flex items-center justify-between mb-4 px-2">
                            <select v-model="selectedSort"
                                class="border-b-2 border-gray-400 py-2 bg-transparent text-black font-medium focus:outline-none focus:border-green-700">
                                <option value="" disabled selected>Sort by</option>
                                <option value="surname">Surname</option>
                                <option value="student_ID">Student ID</option>
                            </select>

                            <button @click="addStudent" 
                                class="px-4 py-2 rounded-lg bg-green-700 text-white hover:bg-green-800 transition-colors">
                                Add Student
                            </button>
                        </div>

                        <!-- Scrollable Table Container -->
                        <div class="h-[calc(100vh-320px)] overflow-hidden rounded-lg border border-gray-200 bg-white">
                            <div class="h-full overflow-y-auto">
                                <table class="min-w-full relative">
                                    <thead class="bg-gray-50 sticky top-0 z-10">
                                        <tr>
                                            <th class="px-6 py-3 text-left text-sm font-semibold text-green-900 bg-gray-50">Student ID</th>
                                            <th class="px-6 py-3 text-left text-sm font-semibold text-green-900 bg-gray-50">Student Name</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-gray-200">
                                        <tr v-for="(student, index) in students" 
                                            :key="index" 
                                            @click="handleRowClick(student)"
                                            class="hover:bg-green-50 cursor-pointer transition-colors">
                                            <td class="px-6 py-4 text-sm text-green-900">{{ student.studentId }}</td>
                                            <td class="px-6 py-4 text-sm text-green-900">{{ `${student.firstName} ${student.lastName}` }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <!-- Right Side - Student Info -->
                    <div class="col-span-6 p-6">
                        <div v-if="!showStudentInfo" class="flex justify-center items-center h-full">
                            <h2 class="text-xl text-gray-500">Select a student to display their details</h2>
                        </div>
                        <StudentBasicInfo v-if="showStudentInfo" :student="studentInfo" :section="section" @close="removeStudent" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import AdviserHeader from "~/components/Blocks/AdviserHeader.vue";
    import StudentBasicInfo from "~/components/Modals/Advisory/StudentBasicInfoByAdviser.vue";
    import AddStudentForm from "~/components/Modals/Advisory/AddStudentForm.vue";
    import { sectionStore } from "~/stores/section";
    import { student } from "~/data/student";
    import { section } from "~/data/section";
    import InitialReportModal from '~/components/Modals/AdviserReport/InitialReportModal.vue';

    export default {
        name: "Advisory",
        components: {AdviserHeader, StudentBasicInfo, AddStudentForm, InitialReportModal,},
        props: {
            AdviserID: {
                type: String,
                required: true,
                default: "adviserid12" // this should be the adviserID of the logged in user
            },
            AcademicYear: {
                type: String,
                required: true,
                default: "2024-2025" // this should be the current academic year
            },
    
        },

        data() {return {
            selectedSort: "",
            students: [],
            showStudentInfo: false,
            showAddStudentForm: false,
            studentInfo: {},
            section: {},
            containWidth:'89%',
        };},

        setup() {
            const section = sectionStore();
            return { sectionStore };
        },

        methods: {
            addStudent() {
                this.showAddStudentForm = true;
            },

            getSection(){
                this.sectionStore = section.find((sec)=> sec.adviserId === this.AdviserID);
                this.section =  this.sectionStore;
            },

            handleRowClick(student) {
                this.studentInfo = student;
                this.showStudentInfo = true;
            },

            notifClick(){
                this.containWidth = this.containWidth === '89%' ? '70%': '89%';
                this.titleWidth = this.titleWidth === '87%' ? '68%': '87%';
            },

            fetchStudents(id,ay) {
                this.getSection();
                const studentIDs = (section.find((sec)=> sec.adviserId === id && sec.sectionSchoolYear === ay)).sectionStudents;
                
                this.students = student.filter((stdnt) => studentIDs.includes(stdnt.studentId));
            },

            removeStudent(){
                 this.fetchStudents(this.AdviserID, this.AcademicYear);
                this.showStudentInfo = false;
            },

            handleAddedStudent(student){
                this.fetchStudents(this.AdviserID, this.AcademicYear);
                this.showAddStudentForm = false;
            }

        },

        mounted() {
            this.fetchStudents(this.AdviserID, this.AcademicYear);
        }
        
  };
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