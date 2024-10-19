<template>
  <div>
    <!--<NuxtRouteAnnouncer />
    <NuxtWelcome />-->
    <LoginForm/>

  </div>
</template>

<script>
import LoginForm from './components/LoginForm.vue';
import './assets/css/tailwind.css'

export default {
  name: 'App',
  components: {
    LoginForm
  }
}


</script>

