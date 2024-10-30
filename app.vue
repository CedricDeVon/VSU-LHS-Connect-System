<script setup lang="ts">
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
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
      <NuxtLink to="/login">Go to Login</NuxtLink>
      <!-- <UiVueSonner/> -->
    </NuxtLayout> 
    
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    goToLogin() {
      this.$router.push('/login');
    }
  }
};
</script>