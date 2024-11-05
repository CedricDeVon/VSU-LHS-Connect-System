<!-- <script setup lang="ts">
useHead({
    title: "VSU-IHS Connect System",
    link: [
      {
        rel: "icon",
        type: "image/webp",
        href: "/icon.webp",
      },
    ],
  });
</script> -->

<template>
  <div>
    <NuxtLayout>
      <NuxtPage/> 
      <NuxtLink to="/admin/search">Search</NuxtLink>
      <!-- <UiVueSonner/> -->
    </NuxtLayout> 
    <!-- <Error404/> -->
    <!-- <PdfGenerator/> -->
    <!-- <SendEmail/> -->
     <!-- <PendingApprovals/> -->
    
  </div>
</template>

<script>
import PdfGenerator from './components/PdfGenerator.vue';
import SendEmail from './components/SendEmail.vue';

export default {
  name: 'App',
  methods: {
    goToLogin() {
      this.$router.push('/login');
    }
  },
  components: {
    PdfGenerator, SendEmail, 
  }
};
</script>

<style>
.general {
    font-family: "Century Gothic";
    background-color: #FFFEF1;
}
</style>