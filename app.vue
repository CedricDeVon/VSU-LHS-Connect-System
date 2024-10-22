<script lang="ts" setup>

</script>

<template>
  <div>
      <main>
          <NuxtPage />
          <!--guys this is just trial for me so I'm not sure where to really put this hehe-->
          <div id="app">
            <pdf-generator />
          </div>
          <div id="app">
            <SendEmail />
          </div>
      </main>
  </div>
</template>

<script>

import PdfGenerator from './components/PdfGenerator.vue';

export default {
    components:{
      PdfGenerator,
    },
};

import SendEmail from './components/SendEmail.vue';

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

<script>
export default {
  
};

</script>

<style>

body {
  margin: 0;
  font-family: 'Century Gothic', Arial, sans-serif;
  background-color: #f0f4f8;
}
</style>
