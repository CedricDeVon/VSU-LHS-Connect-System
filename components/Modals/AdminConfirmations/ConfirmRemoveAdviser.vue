<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 font-century-gothic" >
        <div>
            <div class="flex justify-center items-center h-screen">
                <div class="bg-white w-full h-fit rounded-lg shadow-lg">
                    <div class="flex justify-between items-center px-5 py-3 border-b-2 border-lime-950">
                        <h1 class="text-lg font-bold">Remove Adviser from Section</h1>
                        <button @click="cancelRemove" class="text-lg font-bold">X</button>
                    </div>
                    <div class="flex flex-col items-center justify-center">
                        <p class="text-lg pt-8 p-5">Are you sure you want to remove <span class="font-bold">{{`${adviser.firstName} ${adviser.lastName}`}}</span> as an adviser of <span class="font-bold">Grade {{ `${section.sectionLevel} - ${section.sectionName}` }}</span> ?</p>
                        <div class="flex justify-center items-center my-7">
                            <button @click="proceedRemove" class="bg-red-500 text-white px-10 py-2 rounded-lg">Yes</button>
                            <button @click="cancelRemove" class="bg-green-500 text-white px-10 py-2 rounded-lg ml-5">No</button>
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
        section: {
            type: Object,
            required: true
        }

    },
    emits: ['close', 'remove'],

    methods: {
        cancelRemove() {
            this.$emit('close');
        },

        async proceedRemove() {
            this.$emit('remove');  
            alert('Adviser has been removed');
        },

    },

}
</script>

 