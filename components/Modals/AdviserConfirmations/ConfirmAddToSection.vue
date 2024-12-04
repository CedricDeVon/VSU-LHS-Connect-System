<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 font-century-gothic" >
        <div>
            <div class="flex justify-center items-center h-screen">
                <div class="bg-white w-full h-fit rounded-lg shadow-lg">
                    <div class="flex justify-between items-center px-5 py-3 border-b-2 border-lime-950">
                        <h1 class="text-lg font-bold">Add Student To Advisory</h1>
                        <button @click="cancelAdd" class="text-lg font-bold">X</button>
                    </div>
                    <div class="flex flex-col items-center justify-center">
                        <p class="text-lg pt-8 p-5">Are you sure you want to add <span class="font-bold">{{`${studentObj.firstName} ${studentObj.lastName}`}}</span> to your Advisory?</p>
                        <div class="flex justify-center items-center my-7">
                            <button @click="proceedAdd" class="bg-red-500 text-white px-10 py-2 rounded-lg">Yes</button>
                            <button @click="cancelAdd" class="bg-green-500 text-white px-10 py-2 rounded-lg ml-5">No</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
  </template>
<script>
import { section } from '~/data/section';
import { student } from '~/data/student';


export default {
    props: {
        studentObj: {
            type: Object,
            required: true
        },
        sectionId: {
            type: String,
            required: true
        }

    },
    emits: ['close', 'add'],

    methods: {
        cancelAdd() {
            this.$emit('close');
        },

        async proceedAdd() {
            console.log('Adding student to section');
            const sec = section.find((sec) => sec.id === this.sectionId);
            
            try{
                if(!sec) {
                alert('Section Error');
                return;
            }

            if(sec.sectionStudents.includes(this.studentObj.studentId)){
                alert('Student already in section');
                return;
            }
            sec.sectionStudents.push(this.studentObj.studentId);
            sec.sectionPopulation = sec.sectionStudents.length.toString();
            const stud = student.find((stdnt) => stdnt.studentId === this.studentObj.studentId);
            if(!stud) {
                alert('Student Record Error');
                return;
            }
            stud.isEnrolled = true;
            stud.sectionID = sec.id;
            alert('Student added to successfully');
            }catch(e){
                alert('Error adding student');
            }
            this.$emit('add');  
        },

    },

}
</script>

 