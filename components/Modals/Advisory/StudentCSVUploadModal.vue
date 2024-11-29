<template>
  <div class="absolute inset-0">
    <!-- Dark overlay -->
    <div class="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
    
    <!-- Modal content -->
    <div class="relative flex items-center justify-center min-h-full p-4">
      <div class="w-full max-w-2xl bg-white rounded-lg shadow-xl">
        <!-- Header -->
        <div class="bg-green-700 px-6 py-4">
          <h2 class="text-2xl font-bold text-white">Upload Student List</h2>
        </div>

        <div class="p-6 space-y-6">
          <!-- Instructions Card -->
          <div class="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 class="font-semibold text-green-800 mb-3">CSV Format Requirements</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-700">
              <div>
                <p class="font-medium mb-2">Required Columns:</p>
                <ul class="space-y-1 list-disc list-inside">
                  <li>Student ID</li>
                  <li>Last Name</li>
                  <li>First Name</li>
                  <li>Middle Name</li>
                  <li>Suffix</li>
                </ul>
              </div>
              <div>
                <p class="font-medium mb-2">Additional Columns:</p>
                <ul class="space-y-1 list-disc list-inside">
                  <li>Gender</li>
                  <li>Birth Date</li>
                  <li>Home Address</li>
                  <li>Contact Number</li>
                </ul>
              </div>
            </div>
            <div class="mt-4 text-sm text-green-600 bg-green-100 p-2 rounded">
              Note: Only .csv files are accepted. Please ensure all required fields are filled.
            </div>
          </div>

          <!-- File Upload Area -->
          <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              accept=".csv"
              @change="handleFileChange"
              class="hidden"
              id="csvFile"
            />
            <label 
              for="csvFile"
              class="cursor-pointer inline-flex flex-col items-center space-y-2"
            >
              <div class="p-3 rounded-full bg-green-100">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>  
              </div>
              <span class="text-sm font-medium text-gray-600">
                {{ file ? file.name : 'Click to upload CSV file' }}
              </span>
            </label>
          </div>

          <!-- Success Message -->
          <div v-if="successMessage" class="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm">
            {{ successMessage }}
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-end space-x-3">
            <button
              @click="$emit('close')"
              class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              :disabled="!file"
              @click="uploadFile"
              class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StudentCSVUploadModal',
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
/* Remove the fixed positioning styles */
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
input[type="file"]::file-selector-button {
  display: none;
}
button:hover {
  cursor: pointer;
}
</style>