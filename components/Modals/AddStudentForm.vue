<template>
    <div class="fixed inset-0 z-50 flex justify-center bg-black bg-opacity-70">
        <div class=" z-50 w-2/5 mt-14" >
            <!-- Header -->
            <div class=" header p-1 rounded-lg">
                Add Student to Advisory
            </div>
            <!--initial Body -->
            <div class="body flex justify-self-center rounded-b-lg">
              <div v-if="!doneInitPreparation" class="p-5 pt-10 w-full">
               
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

                 <div class="pt-5">
                  <label>Type of Adding Student/s:</label>
                  <div class="flex justify-center pt-3">
                    <div class="selection-box rounded-lg m-1 p-2" :class="{selected: selectedAddingType === 'singleAdding'}"
                      @click ="selectAddingType('singleAdding')"
                      @mousehover = "hoverAddingType('singleAdding')"
                      @mouseleave="hoverAdding('')">
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
                    <button class=" button3 px-8 py-2 m-2 rounded-lg  focus:outline-none" aria-label="Cancel">
                      Cancel
                    </button>
                    <button @click ="nextClick" class=" button2 px-11 py-2 m-2 rounded-lg focus:outline-none" aria-label="Next">
                      Next
                    </button>
                  </div>
              </div>
              
              <!--Body if singleAdding of new student-->
              <div v-if ="doneInitPreparation && selectedAddingType === 'singleAdding'" class=" body2 flex justify-center h-full w-full">
                <div class=" w-11/12">

                  <div class="flex justify-center">
                    <h1>Picture ni nga div</h1>
                  </div>

                  <div>
                    <div class="p-4 pb-0 ">
                      <div class="pb-1">Student ID:</div>
                      <label>
                        <input type="text" class="input px-2 py-1 rounded-sm w-1/2" placeholder="Enter Student ID">
                      </label>
                    </div>
                    <div class="p-4 ">
                      <div class="pb-1">Student's Full Name: </div>
                      <label>
                        <input type="text" class=" inputName px-2 py-1 rounded-sm " placeholder="Enter First Name">
                        <input type="text" class=" inputName px-2 py-1 rounded-sm  ml-2" placeholder="Enter Middle Name">
                        <input type="text" class=" inputName px-2 py-1 rounded-sm w-2/6 ml-2" placeholder="Enter Last Name">
                      </label>
                    </div>
                  </div>

                  <div class="p-4">
                    <label>Birtdate:<DatePickerInput v-model="student.birthDate" class="input "></DatePickerInput></label><label>Sex at Birth:<input class=" input w-1/4 mx-1 px-2 py-1" placeholder="Choose Gender"/></label>
                  </div>
                </div>
              </div>

                  <div>

                  </div>

            </div>
        </div>
    </div>
</template>



<script >
import DatePickerInput from '~/components/used-components/DatePickerInput.vue';

  export default{
      name: 'AddStudentForm',
      components: {DatePickerInput},
      data() {
        return {

          doneInitPreparation: false,
          selectedStudentType:'',
          hoveredStudentType:'',
          selectedAddingType:'',
          hoveredAddingType:'',
          student: {
            studentId: '',
            firstName: '',
            lastName: '',
            middleName: '',
            suffix: '',
            gender: '',
            Address: '',
            contactNum: '',
            isEnrolled: true,
            incidentDocIDs: [],
            birthDate: '',
            profilePic: '',
          },
        };
  },

  methods: {
    nextClick(){
      if(this.selectedStudentType === '' || this.selectedAddingType === ''){
        alert('Please select a student type and adding type');
      }else{
        if(this.selectedAddingType === 'singleAdding'){
          this.doneInitPreparation = true;
        }
        if(this.selectedAddingType === 'bulkAdding'){
          this.doneInitPreparation = true;
        }
      }
    },

    selectStudentType(box){
      this.selectedStudentType = box;
    },
    hoverStudentType(box){
      this.hoveredStudentType = box;
    },
    selectAddingType(box){
      this.selectedAddingType = box;
    },
    hoverAddingType(box){
      this.hoveredAddingType = box;
    },
  },
};
</script>

<style scoped>

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
        font-size: 15px;
        font-weight: 700;
        color:#414E44;
        background-color: white;
        width: 90%;
        height: 80%;
    }
    .body2{
        font-family: "Century Gothic", sans-serif;
        font-size: 15px;
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
        color: #414E44;
        background-color: #FEFFB1;
        border: none;
        cursor: pointer;
    }
    .button2:hover{
        background-color: #f7f898;
    }

    .button3{
        font-family: "Century Gothic", sans-serif;
        font-size: 20px;
        font-weight: 700;
        color: white;
        background-color: #FF6161;
        border: none;
        cursor: pointer;
    }
    .button3:hover{
        background-color: #e75b5b;
    }

    .input{
        font-family: "Century Gothic", sans-serif;
        font-size: 12px;
        font-weight: 300;
        color:#414E44;
        background-color: white;
        border: 1px solid #414E44;
        border-radius: 5px;
    
        
    }
    .inputName{
        font-family: "Century Gothic", sans-serif;
        font-size: 12px;
        font-weight: 300;
        color:#414E44;
        background-color: white;
        width: 32%;
        border: 1px solid #414E44;
    }

</style>