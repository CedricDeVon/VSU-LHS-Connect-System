<script >
// import { emit } from 'process';
// import ShortDatepicker from '../used-components/ShortDatepicker.vue';
// import DatePickerInput from '../used-components/DatePickerInput.vue';
import { ref, watch, defineEmits } from 'vue';
import { studentAddedStore } from '~/stores/studentAdded';
import UnEnrolledStudents from './UnEnrolledStudents.vue';
import StudentCSVUploadModal from './StudentCSVUploadModal.vue';
import { useAdviserViewStore } from '~/stores/views/adviserViewStore';

  export default{
      name: 'AddStudentForm',
      components: { UnEnrolledStudents, StudentCSVUploadModal},
      props: {
        AdviserId: {
          type: String,
          required: true,
        },
      },

      setup() {
        const emit = defineEmits(['update:modelValue', 'close']);
        const store = studentAddedStore();
        const initPreparation = ref(true);
        const showSingleNewStudentForm = ref(false);
        const showSingleContStudentForm = ref(false);
        const showBulkContStudentForm = ref(false);
        const selectedStudentType = ref('');
        const hoveredStudentType = ref('');
        const selectedAddingType = ref('');
        const hoveredAddingType = ref('');
        const adviserViewStore = useAdviserViewStore();

        const nextClick = () => {
        if (selectedStudentType.value === '' ) {
          alert('Please select a student type and adding type');
          return;
        } 
        else if (selectedAddingType.value === 'singleAdding' && selectedStudentType.value === 'newStudent') {
          showSingleNewStudentForm.value = true;
          initPreparation.value = false;
        }
        else if (selectedStudentType.value === 'continuingStudent') {
          showSingleContStudentForm.value = true;
          initPreparation.value = false;

        }
        else if (selectedAddingType.value === 'bulkAdding' && selectedStudentType.value === 'newStudent') {
          adviserViewStore.studentCSVUpdateModalSuccessBulkContStudentForm = true;
          initPreparation.value = false;
        }
        else {
          alert('Please select a student adding type');
        }
    };

    const handleBack = () => {
      showSingleNewStudentForm.value = false;
      showSingleContStudentForm.value = false;
      adviserViewStore.studentCSVUpdateModalSuccessBulkContStudentForm = false;
      showBulkContStudentForm.value = false;
      initPreparation.value = true;
    };

    const selectStudentType = (box) => {
      selectedStudentType.value = box;
    };

    const hoverStudentType = (box) => {
      hoveredStudentType.value = box;
    };

    const selectAddingType = (box) => {
      selectedAddingType.value = box;
    };

    const hoverAddingType = (box) => {
      hoveredAddingType.value = box;
    };

    const addStudentClick = async () => {
      await adviserViewStore.addNewStudent(store.getAllData());
      await adviserViewStore.updateAdvisoryView();

      handleBack();
      store.resetAllData();
    };

    return {
      emit,
      store,
      initPreparation,
      showSingleNewStudentForm,
      showSingleContStudentForm,
      showBulkContStudentForm,
      selectedStudentType,
      hoveredStudentType,
      selectedAddingType,
      hoveredAddingType,
      nextClick,
      handleBack,
      selectStudentType,
      hoverStudentType,
      selectAddingType,
      hoverAddingType,
      addStudentClick,
      adviserViewStore
    };
  },
};
</script>

<template>
    <div class="fixed inset-0 z-50 flex justify-center bg-black bg-opacity-70">
        <div class=" z-50 w-2/5 mt-14 h-fit" >
            <!-- Header -->
            <div class=" header p-4 rounded-lg">
                Add Student to Advisory
            </div>
            <!--initial Body -->
            <div class="body flex justify-self-center rounded-b-lg ">
              <div v-if="initPreparation" class="p-5 pt-10 w-full ">
               
                <div>
                  <label>Type of Student/s:</label>
                  <div class="flex justify-center pt-4">
                    <div class="selection-box rounded-lg m-1 p-2" :class="{selected: selectedStudentType === 'newStudent'}"
                      @click ="selectStudentType('newStudent')"
                      @mousehover = "hoverStudentType('newStudent')"
                      @mouseleave="hoverStudentType('')">
                      New Student
                    </div>
                    <div class="selection-box rounded-lg m-1 p-2" :class="{selected: selectedStudentType === 'continuingStudent'}"
                      @click ="selectStudentType('continuingStudent')"
                      @mousehover = "hoverStudentType('continuingStudent')"
                      @mouseleave="hoverStudentType('')">
                      Continuing Student
                    </div>
                  </div> 
                </div>

                 <div v-if="selectedStudentType === 'newStudent'" class="pt-5">
                  <label>Type of Adding Student/s:</label>
                  <div class="flex justify-center pt-3">
                    <div class="selection-box rounded-lg m-1 p-2" :class="{selected: selectedAddingType === 'singleAdding'}"
                      @click ="selectAddingType('singleAdding')"
                      @mousehover = "hoverAddingType('singleAdding')"
                      @mouseleave="hoverAddingType('')">
                      Individual Adding
                    </div>
                    <div class="selection-box rounded-lg m-1 p-2" :class="{selected: selectedAddingType === 'bulkAdding'}"
                      @click ="selectAddingType('bulkAdding')"
                      @mousehover = "hoverAddingType('bulkAdding')"
                      @mouseleave="hoverAddingType('')">
                      Bulk Adding
                    </div>
                  </div>
                 </div>

                  <div class="flex justify-end mt-14 ">
                    <button @click="$emit('close')" class=" button3 px-8 py-2 m-2 rounded-lg  focus:outline-none" aria-label="Cancel">
                      Cancel
                    </button>
                    <button @click ="nextClick" class=" button2 px-11 py-2 m-2 rounded-lg focus:outline-none" aria-label="Next">
                      Next
                    </button>
                  </div>
              </div>
              
              <!--Body if singleAdding of new student-->
              <div v-if="showSingleNewStudentForm" class=" body2 flex justify-center h-fit w-full">
                <form @submit.prevent="addStudentClick">
                  <div class=" w-11/12 h-fit">

                    <div class="flex justify-center pt-5">
                      <img src="~/assets/icons/default-user.png" alt="user profile" class=" h-52">
                    </div>

                    <div>
                      <div class="p-2 pb-0 ">
                        <div class="pb-1">Student ID:</div>
                        <label>
                          <input v-model="store.studentId" type="text" class="input px-2 py-2 rounded-sm w-1/2 focus outline-green-400 " placeholder="Enter Student ID">
                        </label>
                      </div>
                      <div class="p-2 ">
                        <div class="pb-1">Student's Full Name: </div>
                        <label>
                          <input v-model="store.firstName" type="text" class=" inputName px-2 py-2 rounded-sm focus outline-green-400 " placeholder="Enter First Name">
                          <input v-model="store.lastName" type="text" class=" inputName px-2 py-2 rounded-sm  ml-2 focus outline-green-400" placeholder="Enter Last Name">
                          <input v-model="store.suffix" type="text" class=" input px-2 py-2 rounded-sm w-1/5 ml-2 focus outline-green-400" placeholder="Suffix">
                        </label>
                      </div>
                    </div>

                    <div class="grid grid-flow-col p-2">
                        <label>Birtdate: </label>
                        <UiVeeDatepicker v-model="store.birthDate" placeholder="MM/DD/YYYY"/>     

                        <label class="mx-5">Sex Assigned at Birth:
                        <select
                                class="  lg:mr-5 lg:pr-2 py-2 input border-2 ml-3 border-gray-400 bg-gray-10 text-black inline-flex whitespace-nowrap hover:bg-gray-15 focus:outline-green-400"
                                v-model="store.gender">
                                <option value="" disabled selected hidden>Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                        </select>
                      </label> 
                      
                    
                    </div>
                    <div class="p-1 px-2 pb-0 ">
                      Address:
                      <label>
                        <input v-model="store.address" type="text" class="input px-2 py-2 ml-3 rounded-sm w-2/3 focus outline-green-400 " placeholder="Enter Student Address">
                      </label>
                    </div>
                    <div class=" mt-2 p-1 px-2 pb-0 ">
                      Contact Number/s:
                      <label>
                        <input v-model="store.contactNumber" type="text" class="input px-2 py-2 ml-3 rounded-sm w-1/3 focus outline-green-400" placeholder="Enter Contact Number">
                        <button class="pl-5 wordbutton ">Add +</button>
                      </label>
                    </div>
                    <div class="flex justify-end mt-7 mb-7 ">
                      <button @click ="handleBack" class=" button3 px-8 py-2 m-2 rounded-lg  focus:outline-none" aria-label="Back">
                        Back
                      </button>
                      <button type="addStudentClick" class=" button2 px-11 py-2 m-2 rounded-lg focus:outline-none" aria-label="Add Student">
                        Add Student
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div v-if="showSingleContStudentForm" class="w-full">
                <div class="smallText flex justify-center m-4">
                  <UnEnrolledStudents @close = "$emit('close')"/>
                </div>
               
              </div>
              <div v-if="adviserViewStore.studentCSVUpdateModalSuccessBulkContStudentForm">
                <div class="smallText flex justify-center m-4">
                  <StudentCSVUploadModal @close = "$emit('close')"/>
                </div>

              </div>

            </div>
        </div>
    </div>
</template>

<style scoped>

    .wordbutton{
        font-family: "Century Gothic", sans-serif;
        font-size: 15px;
        font-weight: 500;
        color: #414E44;
        border: none;
        cursor: pointer;
    }
    .wordbutton:hover{
      color:#265630;
      font-weight: 700;
    }

    .header{
        font-family: "Century Gothic", sans-serif;
        font-size: 32px;
        font-weight: 700;
        text-align: center;
        color: white;
        background-color: #728B78;
        width: 100%;
        height: 10%;
    }

    .body{
        font-family: "Century Gothic", sans-serif;
        font-size: 25px;
        font-weight: 700;
        color:#414E44;
        background-color: white;
        width: 90%;
        height: 80%;
    }
    .body2{
        font-family: "Century Gothic", sans-serif;
        font-size: 20px;
        font-weight: 700;
        color:#414E44;
 
    }

    .selection-box{
        font-family: "Century Gothic", sans-serif;
        font-size: 15px;
        font-weight: 600;
        color:#414E44;
        background-color: white;
        width: 90%;
        height: 100%;
        border: 1px solid #728B78;
        display: flex;
        justify-content: center;
        align-items: center;  
        cursor:pointer;
        transition: background-color 0.3s;
    }

    .selection-box:hover{
        background-color: #728B78;
        color: white;
    }
    
    .selection-box.selected{
        background-color: #728B78;
        color: white;
    }

    .button1{
        font-family: "Century Gothic", sans-serif;
        font-size: 20px;
        font-weight: 700;
        color: white;
        background-color: #728B78;
        border: none;
        cursor: pointer;
    }
    .button1:hover{
        background-color: #677c6c;
    }

    .button2{
        font-family: "Century Gothic", sans-serif;
        font-size: 20px;
        font-weight: 700;
        color: white;
        background-color: #728B78;
        border: none;
        cursor: pointer;
    }
    .button2:hover{
        background-color: #265630;
    }

    .button3{
        font-family: "Century Gothic", sans-serif;
        font-size: 20px;
        font-weight: 700;
        color: white;
        background-color: #969696;
        border: none;
        cursor: pointer;
    }
    .button3:hover{
        background-color:#7a7979;
    }

    .input{
        font-family: "Century Gothic", sans-serif;
        font-size: 15px;
        font-weight: 300;
        color:black;
        background-color: white;
        border: 1px solid gray;
        border-radius: 5px;
    
        
    }
    .inputName{
        font-family: "Century Gothic", sans-serif;
        font-size: 15px;
        font-weight: 300;
        color:black;
        background-color: white;
        width: 35%;
        border: 1px solid gray;
    }
    .smallText{
        font-family: "Century Gothic", sans-serif;
        font-size: 17px;
        font-weight: 300;
        color:#414E44;
    }

</style>