<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-gray-100 rounded-lg shadow-lg justify-center w-full max-w-md p-6 relative">
      <h2 class="text-xl font-semibold mb-4 text-gray-800">Section Details</h2>
      <label>Section Id</label>
      <input v-model="sectionId" type="text"
        class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 mb-5">
      <label>Grade Level</label>
      <input v-model="sectionLevel" type="number" min="7" max="12"
        class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 mb-5">
      <label>Section Name</label>
      <input v-model="sectionName" type="text"
        class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 mb-5">
      <div class="flex justify-end space-x-4">
        <button @click="$emit('close')"
          class="px-4 py-2 rounded-md text-gray-800 bg-gray-200 border border-gray-300 hover:bg-gray-300 hover:text-gray-900 focus:outline-none">
          Cancel
        </button>
        <button @click="handleAddSection"
          class="px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none">
          Enter
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useAdminViewStore } from '~/stores/views/adminViewStore';

export default {
  name: 'AddSectionForm',
  data() {
    return {
      sectionId: '',
      sectionName: '', 
      sectionLevel: '',
      adminViewStore: useAdminViewStore()
    };
  },

  methods: {
    async handleAddSection() {
      const result: any = await $fetch('/api/section/create', {
        method: 'POST',
        body: {
          id: this.sectionId,
          name: this.sectionName,
          level: this.sectionLevel,
      }});
      if (result.isNotSuccessful) {
        window.alert(result.message);
       
      } else {
        this.sectionId = ''; 
        this.sectionName = ''; 
        this.sectionLevel = '';
        this.$emit('close'); 
      }
    }
  }
};
</script>
