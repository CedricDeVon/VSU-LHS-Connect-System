<script setup lang='ts'>
import { Result } from '~/library/results/result';
import { useAdviserViewStore } from '../../stores/views/adviserViewStore'

const adviserViewStore = useAdviserViewStore();
const { handleFileInput, files } = useFileStorage();

const handleClose = () => {
  adviserViewStore.studentCSVUpdateModalFile = null;
  adviserViewStore.studentCSVUpdateModalSuccessMessage = '';
  adviserViewStore.studentCSVUpdateModalSuccessBulkContStudentForm = false;
  adviserViewStore.advisoryAddStudentForm = false;
}

const uploadFile = async () => {
  const result: any = await adviserViewStore.createManyStudentsViaCSV(files.value);
  console.log(result);
  if (result.isNotSuccessful) {
    adviserViewStore.studentCSVUpdateModalFile = null;
    adviserViewStore.studentCSVUpdateModalSuccessMessage = result.message;
    return;
  }

  await adviserViewStore.updateAdvisoryView();
  adviserViewStore.studentCSVUpdateModalFile = null;
  adviserViewStore.studentCSVUpdateModalSuccessMessage = '';
  adviserViewStore.studentCSVUpdateModalSuccessBulkContStudentForm = false;
  adviserViewStore.advisoryAddStudentForm = false;
}

</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-gray-100 rounded-lg shadow-lg w-full max-w-md p-6 relative">
      <h2 class="text-xl font-semibold mb-4 text-gray-800">Upload CSV File</h2>

      <div class="bg-gray-200 text-gray-800 p-4 rounded-lg mb-4">
        <h3 class="font-semibold mb-2">CSV Format Instructions</h3>
        <p class="text-sm">
          Please ensure your CSV file follows this format:
        </p>
        <ul class="list-disc list-inside text-sm ml-4 mt-2">
          <li><strong>Column 1:</strong> Student ID</li>
          <li><strong>Column 2:</strong> Last Name</li>
          <li><strong>Column 3:</strong> First Name</li>
          <li><strong>Column 4:</strong> Middle Name</li>
          <li><strong>Column 5:</strong> Suffix</li>
          <li><strong>Column 6:</strong> Gender</li>
          <li><strong>Column 7:</strong> Birth Date</li>
          <li><strong>Column 8:</strong> Home Address</li>
          <li><strong>Column 9:</strong> Contact Number</li>
          <li><strong>Column 10:</strong> Adviser ID</li>
          <li><strong>Column 11:</strong> Section ID</li>

        </ul>
        <p class="text-sm mt-2">Only .csv files are accepted.</p>
      </div>

      <input
        type="file"
        accept=".csv"
        @input="handleFileInput"
        class="mb-4 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
      />

      <div class="flex justify-end space-x-4">
        <button
          @click="handleClose"
          class="px-4 py-2 rounded-md text-gray-800 bg-gray-200 border border-gray-300 hover:bg-gray-300 hover:text-gray-900 focus:outline-none">
          Cancel
        </button>
        <button
          @click="uploadFile"
          class="px-4 py-2 rounded-md text-white bg-gray-500 hover:bg-gray-600 focus:outline-none disabled:opacity-50">
          Upload
        </button>
      </div>

      <p v-if="adviserViewStore.studentCSVUpdateModalSuccessMessage" class="text-gray-500 mt-4">{{ adviserViewStore.studentCSVUpdateModalSuccessMessage }}</p>
    </div>
  </div>
</template>

<style scoped>
.bg-opacity-50 {
  background: rgba(0, 0, 0, 0.5);
}
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
input[type="file"]::file-selector-button {
  color: white;
  background-color: rgb(163, 163, 163);
  padding: 8px 12px;
  border-radius: 0px;
  margin-right: 10px;
}
button:hover {
  cursor: pointer;
}
</style>