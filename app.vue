<template>
  <div>
      <main>
          <NuxtPage />
          <div id="app">
            <pdf-generator />
          </div>
      </main>
  </div>
</template>

<script>
import PdfGenerator from './pages/pdfGenerator.vue';

export default {
    components:{
      PdfGenerator,
    },
};

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  margin: 0;
  font-family: 'Century Gothic', Arial, sans-serif;
  background-color: #f0f4f8;
}
</style>
