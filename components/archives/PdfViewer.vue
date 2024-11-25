
<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div class="bg-white rounded-lg w-11/12 h-[90vh] flex flex-col">
      <!-- Header -->
      <div class="p-4 border-b flex justify-between items-center">
        <div>
          <h3 class="text-lg font-semibold">{{ title }}</h3>
          <p class="text-sm text-gray-500">Archive Document (View Only)</p>
        </div>
        <button @click="$emit('close')" class="p-2 hover:bg-gray-100 rounded-lg">
          <Icon name="lucide:x" class="w-5 h-5" />
        </button>
      </div>
      
      <!-- PDF Viewer -->
      <div class="flex-1 bg-gray-100 p-4 overflow-hidden">
        <iframe
          :src="pdfUrl"
          class="w-full h-full rounded-lg border shadow-sm"
          type="application/pdf"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: String,
  pdfUrl: String,
});

defineEmits(['close']);
</script>