<template>
    <div class="flex min-h-screen">
      <div class="w-1/2  flex items-center justify-center bg-left">
        <div class="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden signup-outer-container">
          <div class="w-full p-8 bg-amber-50 signup-container">
            <h2 class="text-2xl font-semibold text-green-800 mb-6">Login Details</h2>
            <form @submit.prevent="handleSubmit">
              <div class="mb-4">
                <label class="block text-green-800 mb-1">Username</label>
                <input
                  type="text"
                  v-model="username"
                  placeholder="Enter username"
                  class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div class="mb-4">
                <label class="block text-green-800 mb-1">VSUIHS-Issued Email</label>
                <input
                  type="email"
                  v-model="email"
                  placeholder="Enter email"
                  class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div class="mb-4">
                <label class="block text-green-800 mb-1">Password</label>
                <input
                  type="password"
                  v-model="password"
                  placeholder="Password"
                  class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div class="mb-6">
                <label class="block text-green-800 mb-1">Confirm Password</label>
                <input
                  type="password"
                  v-model="confirmPassword"
                  placeholder="Confirm Password"
                  class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div v-if ="errorMessage" class="text-red-500 mb-4">{{  errorMessage }}</div>
              <button
                type="submit"
                class="w-full bg-green-800 text-white p-2 rounded-md hover:bg-green-900 transition duration-300 mb-2"
              
              >
                PROCEED
              </button>
              
              <div class="text-center text-gray-500 my-2">OR</div>
              <button
                type="button"
                @click="handleBackClick"
                class="w-full bg-green-400 text-white p-2 rounded-md hover:bg-green-500 transition duration-300"
              >
              BACK
              
              </button>
            </form>
          </div>
        </div>
      </div>
      <!-- Right section -->
      <div class="w-1/2 bg-right">

      </div>
    </div>
  </template>
  
  <script>
  import  {useRouter} from 'vue-router';
  import { handleBackClick } from '~/composables/navigation';
  import { usernameAvailable, existingEmail, getUserCount } from '~/data/user';
  import {ref, onMounted} from 'vue';

  export default {
    name: 'SignupPage1',
    setup() {
    const router = useRouter();
    const username = ref('');
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref ('');
    const errorMessage = ref('');

    onMounted(()=>{
      if(typeof window !== 'undefined'){
        username.value = sessionStorage.getItem('username') || '';
        email.value = sessionStorage.getItem('email') || '';
        password.value = sessionStorage.getItem('password') || '';
        confirmPassword.value = sessionStorage.getItem('confirmPassword') || '';
      }
    });

    const goToSignupPage2 = () => {
        router.push({ name: 'SignupPage2' });
    };

    const handleSubmit = () => {
      errorMessage.value = '';

      if(!username.value){
        errorMessage.value = 'Username is required.';
        return;
      }
      if(!email.value){
        errorMessage.value = 'Email Address is required.';
        return;
      }
      if(!password.value){
        errorMessage.value = 'Password is required.';
        return;
      }
      if(password.value !== confirmPassword.value){
        errorMessage.value = 'Password do not match.';
        return;
      }

      if(!usernameAvailable(username.value)){
        errorMessage.value = 'Username already taken.';
        return;
      }
      if(existingEmail(email.value)){
        errorMessage.value = 'Email is already registered.';
        return;
      }
      sessionStorage.setItem('username', username.value);
      sessionStorage.setItem('email', email.value);
      sessionStorage.setItem('password', password.value);
      sessionStorage.setItem('confirmPassword', confirmPassword.value);
      goToSignupPage2() ;
    };

    const goBack = () => {
      handleBackClick();
    };
    return { username, email, password, confirmPassword, goToSignupPage2, handleSubmit, goBack, errorMessage };
  }
    
      /* if (usernameAvailable(this.username) && !existingEmail(this.email)){
        const id = getUserCount();
        const user = {
      userId: `${id+1}`,
      emailAdd: this.email,
      username: this.username,
      password: this.password,
      canAccess: false,*/
      
  };
  </script>
  
  <style scoped>
  .bg-left {
    background-color: #fffef1;
  }
  .bg-right {
    background-color: #f5f5f5;
  }

  .signup-outer-container {
    width: 90%;
  }

  .signup-container {
   padding: 50px;
   background-color: white;
  }

  </style>