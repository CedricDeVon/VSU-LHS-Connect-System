<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-gray-100 rounded-lg shadow-lg justify-center w-full max-w-md p-6 relative">
      <h2 class="text-xl font-semibold mb-4 text-gray-800">Section Details</h2>
      <label>Grade Level</label>
      <input v-model="sectionLevel" type="text"
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

<script>
export default {
  name: 'AddSectionForm',
  data() {
    return {
      sectionName: '', 
      sectionLevel: '' 
    };
  },
  methods: {
    handleAddSection() {
      this.$emit('add-section', {
        sectionName: this.sectionName || null,
        sectionLevel: this.sectionLevel || null,
        adviserId: null 
      });
      this.sectionName = ''; 
      this.sectionLevel = '';
      this.$emit('close'); 
    }
  }
};
</script>
