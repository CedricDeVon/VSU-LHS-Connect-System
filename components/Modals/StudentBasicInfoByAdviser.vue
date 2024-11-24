<template>
    <div class=" z-50 flex items-center justify-center ">
        <div class=" p-20 pt-8 w-full ml-10 mr-10">
            <label class="header text-green-900 ">Basic Information</label>
            <!--Student Info Scrollable-->
            <div class=" overflow-x-auto overflow-y-auto max-h-96 pt-5">
               <!--(should be) profile pic-->
                <div class="flex justify-center pb-2">
                    <img src="~/assets/images/vsu.png" alt="profile" class=" h-40 w-auto">
                </div>

                <label class=" name text-green-900 flex justify-center">{{ `${student.firstName} ${(student.middleName).charAt(0).toUpperCase()+'.'} ${student.lastName}` }}</label>
                <label class="studentID text-green-900 flex justify-center">ID NO: {{ student.studentId }}</label>
                <div class="mt-3">
                        <div class="text-green-900 text-lg pb-2 px-3"><span class="label pr-5">Grade Level & Section:</span><span>{{ `${section.sectionLevel + ''} ${section.sectionName}` }}</span></div>
                        <div class="text-green-900 text-lg pb-2 px-3"><span class="label pr-16">Age:</span><span>{{ student.age }}</span></div>
                        <div class="text-green-900 text-lg pb-2 px-3"><span class="label pr-5">Birthday:</span><span>{{ student.birthDate }}</span></div>
                        <div class="text-green-900 text-lg pb-2 px-3"><span class="label pr-5">Gender:</span><span>{{ student.gender }}</span></div>
                        <div class="text-green-900 text-lg pb-2 px-3"><span class="label pr-5">Address:</span><span>{{student.address}}</span></div>
                        <div class="text-green-900 text-lg pb-2 px-3"><span class="label pr-5">Contact Number/s:   </span>   <span>{{ student.contactNum}}</span></div>
                </div>

                <!--Buttons-->
                <div class="flex justify-center items-center m-3">
                    <button @click="viewReport(student.anecdotalDocID)"
                     class=" updateAnecdotal shadow w-9/12 px-10 py-2 rounded-lg gray text-white hover:bg-gray-600 focus:outline-none" aria-label="Create Anecdotal">
                         Anecdotal Report
                    </button>
                </div>
                <div class="flex justify-center m-3">
                    <button @click="showReport" class=" submitComplaint shadow w-9/12 px-10 py-2 rounded-lg gray text-green-900 hover:bg-gray-600 focus:outline-none" aria-label="Submit Complaint">
                        Submit and Report a Complaint
                    </button>
                </div>
                <div @click ="removeStudent" class="flex justify-center m-3 ">
                    <button class=" removeStudent shadow w-9/12 px-10 py-2 rounded-lg gray text-white hover:bg-gray-600 focus:outline-none" aria-label="Remove Student">
                        Remove Student
                    </button>
                </div>
            </div>
        </div>
        <!-- <adviser-anecdotal v-if="showAnecdotal" :Student="student" @close="showAnecdotal = false"/> -->
        <initial-report-modal v-if="report" @close="report = false"/>
        <RemoveStudent v-if="remove" @close="handleRemoveStudent" :student ="student" :section="this.section" />
    </div>

</template>

<script>
import InitialReportModal from './InitialReportModal.vue';
import { student } from '~/data/student';
import AdviserAnecdotal from '../../pages/adviser/anecdotal/[id].vue';
import RemoveStudent from './removeStudent.vue';

export default {
  components: { InitialReportModal, AdviserAnecdotal, RemoveStudent },
  name: 'StudentBasicInfo',
  emits: ['close'],
  props: {
    student: {
      type: Object,
      required: true,
    },
    section: {
      type: Object,
      required: true,
      default:{}
    },
  },
  data() {
    return {
        report: false,
        showAnecdotal: false,
        remove: false,

    };
  },
methods: {
    showReport() {
        this.report = true;
    },

    creationClose(){
        this.report = false;
    },

    viewReport(anecdotalDocID) {
            // Find the student with this anecdotal report
            if (anecdotalDocID && anecdotalDocID !== '') {
                this.$router.push(`/adviser/anecdotal/${this.student.studentId}`);
               
            } else {
                alert('No student found with this anecdotal report'); //Create new anecdotal report
            }
        },
    removeStudent(){
        this.remove = true; 
    },
    handleRemoveStudent(){
        this.remove = false;
        this.$emit('close');
    }


},
   

};
</script>

<style scoped>
.header{
    font-family: "Inter-Medium", sans-serif;
    font-size: 32px;
    font-weight: 700;
}

.name{
    font-family: "Inter-Medium", sans-serif;
    font-size: 25px;
    font-weight: 700;
}

.label{
    font-family: "Inter-Medium", sans-serif;
    font-size: 19px;
    font-weight: 700;
}

.updateAnecdotal{
    font-family: "Inter-Medium", sans-serif;
    font-size: 19px;
    font-weight: 700;
    background-color: #728B78;
}

.submitComplaint{
    font-family: "Inter-Medium", sans-serif;
    font-size: 19px;
    font-weight: 700;
    background-color: #FEFFB1;
}

.removeStudent{
    font-family: "Inter-Medium", sans-serif;
    font-size: 19px;
    font-weight: 700;
    background-color: #FF6161;
}

.shadow{
    box-shadow: 0px 3px 2px 0px rgba(0, 0, 0, 0.25);
}

</style>