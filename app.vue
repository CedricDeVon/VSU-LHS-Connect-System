

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