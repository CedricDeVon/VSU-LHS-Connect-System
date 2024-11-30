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

  <script setup>
  import { ref, onMounted } from 'vue';
  import { useSectionStore } from '~/stores/section';
  import AdviserHeader from '~/components/Blocks/AdviserHeader.vue';
  import StudentBasicInfo from '~/components/Modals/Advisory/StudentBasicInfoByAdviser.vue';
  import AddStudentForm from '~/components/Modals/Advisory/AddStudentForm.vue';
  import InitialReportModal from '~/components/Modals/AdviserReport/InitialReportModal.vue';
  import { student } from '~/data/student';
  import { section } from '~/data/section';
  
  // Define props
  const props = defineProps({
    AdviserID: {
      type: String,
      required: true,
      default: 'adviserid12', // this should be the adviserID of the logged in user
    },
    AcademicYear: {
      type: String,
      required: true,
      default: '2024-2025', // this should be the current academic year
    },
  });
  
  // Define reactive state
  const selectedSort = ref('');
  const students = ref([]);
  const showStudentInfo = ref(false);
  const showAddStudentForm = ref(false);
  const studentInfo = ref({});
  const sectionData = ref({});
  const containWidth = ref('89%');
  
  // Access the section store
  const sectionStore = useSectionStore();
  
  // Function to get section data from the store
  const getSection = () => {
    sectionData.value = sectionStore.section;
    console.log('advisory daw bi: ', sectionData.value);
  };
  
  // Function to fetch students
  const fetchStudents = () => {
    getSection();
    // const sectionObj = section.find((sec) => sec.adviserId === id && sec.sectionSchoolYear === ay);
    if (sectionStore) {
      const studentIDs = sectionStore.section.sectionStudents;
      students.value = student.filter((stdnt) => studentIDs.includes(stdnt.studentId));
    }
  };
  
  // Function to handle row click
  const handleRowClick = (student) => {
    studentInfo.value = student;
    showStudentInfo.value = true;
  };
  
  // Function to handle notification click
  const notifClick = () => {
    containWidth.value = containWidth.value === '89%' ? '70%' : '89%';
  };
  
  // Function to add student
  const addStudent = () => {
    showAddStudentForm.value = true;
  };
  
  // Function to remove student
  const removeStudent = () => {
    fetchStudents(props.AdviserID, props.AcademicYear);
    showStudentInfo.value = false;
  };
  
  // Function to handle added student
  const handleAddedStudent = (student) => {
    fetchStudents(props.AdviserID, props.AcademicYear);
    showAddStudentForm.value = false;
  };
  
  // Call fetchStudents on component mount
  onMounted(() => {
    fetchStudents();
  });
  
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