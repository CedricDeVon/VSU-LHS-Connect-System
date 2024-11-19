<!-- pages/pdf-viewer.vue -->

<template>
  <div>
    <h2>PDF Viewer</h2>
    <button @click="generatePdf">Generate PDF</button>
    <div v-if="pdfUrl">
      <h3>Generated PDF:</h3>
      <iframe :src="pdfUrl" width="100%" height="600px"></iframe>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const pdfUrl = ref('');

const generatePdf = async () => {
  try {
    const response = await fetch('/api/generate-pdf', { method: 'GET' });
    if (response.ok) {
      const pdfBlob = await response.blob();
      pdfUrl.value = URL.createObjectURL(pdfBlob);
    } else {
      console.error('Failed to generate PDF');
    }
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};
</script>

<style scoped>
button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
