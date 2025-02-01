<script setup lang="ts">
import { ref, defineProps, defineEmits, onMounted } from 'vue';
import { section } from '~/data/section';

const props = defineProps<{
    adviser: {
        firstName: string;
        lastName: string;
    };
    sectionId: string;
}>();

const emit = defineEmits(['close', 'add']);

const sectionData = ref<{ sectionLevel: string; sectionName: string } | undefined>(undefined);

const cancelAdd = () => {
    emit('close');
};

const proceedAdd = async () => {
    console.log('Adding adviser to section');
    emit('add');
};

const getSection = () => {
    sectionData.value = section.find((sec) => sec.id === props.sectionId);
};

onMounted(() => {
    getSection();
});
</script>

 

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
