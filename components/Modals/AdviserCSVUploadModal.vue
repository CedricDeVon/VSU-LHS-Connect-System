<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- Backdrop with blur effect -->
    <div class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
    
    <!-- Modal Content -->
    <div class="relative bg-white rounded-xl shadow-xl w-full max-w-md mx-4 transform transition-all">
      <!-- Header -->
      <div class="px-6 py-4 border-b border-gray-100">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold text-gray-800">Upload Adviser List</h2>
          <button @click="$emit('close')" class="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <Icon name="heroicons:x-mark" class="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      <!-- Body -->
      <div class="p-6">
        <!-- Instructions Card -->
        <div class="bg-blue-50 rounded-lg p-4 mb-6">
          <div class="flex items-start">
            <Icon name="heroicons:information-circle" class="w-5 h-5 text-blue-600 mt-0.5" />
            <div class="ml-3">
              <h3 class="text-sm font-medium text-blue-800">CSV Format Requirements</h3>
              <ul class="mt-2 text-sm text-blue-700 space-y-1">
                <li class="flex items-center">
                  <Icon name="heroicons:check-circle" class="w-4 h-4 mr-2 text-blue-600" />
                  Column 1: Adviser Name
                </li>
                <li class="flex items-center">
                  <Icon name="heroicons:check-circle" class="w-4 h-4 mr-2 text-blue-600" />
                  Column 2: Email Address
                </li>
                <li class="flex items-center">
                  <Icon name="heroicons:check-circle" class="w-4 h-4 mr-2 text-blue-600" />
                  Column 3: Department
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- File Upload Area -->
        <div class="relative">
          <input
            type="file"
            accept=".csv"
            @change="handleFileChange"
            class="hidden"
            id="file-upload"
          />
          <label
            for="file-upload"
            class="group flex flex-col items-center justify-center w-full h-32 px-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 transition-colors cursor-pointer"
          >
            <div class="flex flex-col items-center">
              <Icon 
                name="heroicons:cloud-arrow-up" 
                class="w-8 h-8 text-gray-400 group-hover:text-green-500 transition-colors"
              />
              <span class="mt-2 text-sm text-gray-500">
                {{ file ? file.name : 'Click to upload or drag and drop' }}
              </span>
              <span class="text-xs text-gray-400 mt-1">Only .csv files are supported</span>
            </div>
          </label>
        </div>

        <!-- Success Message -->
        <transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <div v-if="successMessage" class="mt-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm">
            {{ successMessage }}
          </div>
        </transition>
      </div>

      <!-- Footer -->
      <div class="px-6 py-4 bg-gray-50 rounded-b-xl border-t border-gray-100">
        <div class="flex justify-end gap-3">
          <button
            @click="$emit('close')"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
          >
            Cancel
          </button>
          <button
            :disabled="!file"
            @click="uploadFile"
            class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AdviserCSVUploadModal',
    data() {
      return {
        file: null,
        successMessage: '',
      };
    },
    methods: {
      handleFileChange(event) {
        this.file = event.target.files[0];
        this.successMessage = '';
      },
      uploadFile() {
        if (this.file) {
          this.$emit('file-uploaded', this.file);
          this.successMessage = 'File uploaded successfully!';
          this.file = null;
          setTimeout(() => {
            this.$emit('close');
          }, 1000);
        }
      },
    },
  };
</script>

<style scoped>
/* Remove all existing styles */
input[type="file"]::file-selector-button {
  display: none;
}

.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}
</style>