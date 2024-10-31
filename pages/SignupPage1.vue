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
              <button
                type="submit"
                class="w-full bg-green-800 text-white p-2 rounded-md hover:bg-green-900 transition duration-300 mb-2"
                @click="goToSignupPage2"
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

  export default {
    name: 'SignupPage1',
    data() {
      return {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      };
    },
    setup() {
    const router = useRouter();

    const goToSignupPage2 = () => {
      router.push({ name: 'SignupPage2' });
    };

    return {
      goToSignupPage2
    };
  },
    methods: {
      handleSubmit() {
        console.log('Username:', this.username);
        console.log('Email:', this.email);
        console.log('Password:', this.password);
        console.log('Confirm Password:', this.confirmPassword);

      },
      goBack() {
        handleBackClick();
      }
    }
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