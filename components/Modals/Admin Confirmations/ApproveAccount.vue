<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

 const props = defineProps({
   adviser: {
     type: Object,
     required: true
   }
 });

 const emit = defineEmits(['close', 'approve']);

const cancel = () => {
  emit('close');
};

const accept = async () => {
  props.adviser.status = 'inActive';
  emit('approve');
};

</script>

<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 font-century-gothic" >
        <div>
            <div class="flex justify-center items-center h-screen">
                <div class="bg-white w-full h-fit rounded-lg shadow-lg">
                    <div class="flex justify-between items-center px-5 py-3 border-b-2 border-lime-950">
                        <h1 class="text-lg font-bold">Adviser Account Approval</h1>
                        <button @click="cancel" class="text-lg font-bold">X</button>
                    </div>
                    <div class="flex flex-col items-center justify-center">
                        <p class="text-lg pt-8 pb-2 p-5">Are you sure you want to approve this account named <span class="font-bold">{{`${adviser.firstName} ${adviser.lastName}`}}</span> to be part of the system?</p>
                        <p class="text-sm pt-2 p-5">You may assign an advisory role to this account on the Sections page once you approve it</p>
                        <div class="flex justify-center items-center my-7">
                            <button @click="accept" class="bg-red-500 text-white px-10 py-2 rounded-lg">Yes</button>
                            <button @click="cancel" class="bg-green-500 text-white px-10 py-2 rounded-lg ml-5">No</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
  </template>
