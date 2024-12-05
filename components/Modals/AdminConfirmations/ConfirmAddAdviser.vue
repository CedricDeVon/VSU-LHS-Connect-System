<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 font-century-gothic" >
        <div>
            <div class="flex justify-center items-center h-screen">
                <div class="bg-white w-full h-fit rounded-lg shadow-lg">
                    <div class="flex justify-between items-center px-5 py-3 border-b-2 border-lime-950">
                        <h1 class="text-lg font-bold">Add Adviser To Section</h1>
                        <button @click="cancelAdd" class="text-lg font-bold">X</button>
                    </div>
                    <div class="flex flex-col items-center justify-center">
                        <p class="text-lg pt-8 p-5">Are you sure you want to add <span class="font-bold">{{`${adviser.firstName} ${adviser.lastName}`}}</span> as an adviser to <span class="font-bold">Grade {{ `${section.sectionLevel} - ${section.sectionName}` }}</span> ?</p>
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


export default {
    props: {
        adviser: {
            type: Object,
            required: true
        },
        sectionId: {
            type: String,
            required: true
        }

    },
    emits: ['close', 'add'],

    data() {
        return {
            section: {}
        };
    },

    methods: {
        cancelAdd() {
            this.$emit('close');
        },

        async proceedAdd() {
            // console.log('Adding adviser to section');
            this.$emit('add');  
        },

        getSection(){
           this.section = section.find((sec)=> sec.id === this.sectionId);
        }
    },

    mounted() {
        this.getSection();
    },
}
</script>

 