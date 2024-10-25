<template>
    <div class="flex min-h-screen">
      <div class="w-1/2  flex items-center justify-center bg-left">
        <div class="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden signup-outer-container">
          <div class="w-full p-8 bg-amber-50 signup-container">
            <h2 class="text-2xl font-semibold text-green-800 mb-6">Personal Details</h2>
            <form @submit.prevent="handleSubmit">
              <div class="mb-4">
                <label class="block text-green-800 mb-1">First Name</label>
                <input
                  type="text"
                  v-model="firstname"
                  placeholder="Enter first name"
                  class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div class="mb-4">
                <label class="block text-green-800 mb-1">Middle Name</label>
                <input
                  type="text"
                  v-model="middlename"
                  placeholder="Enter middle name"
                  class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div class="mb-4">
                <label class="block text-green-800 mb-1">Last Name</label>
                <input
                  type="text"
                  v-model="lastname"
                  placeholder="Enter last name"
                  class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div class="mb-6">
                <label class="block text-green-800 mb-1">Suffix</label>
                <input
                  type="text"
                  v-model="suffix"
                  placeholder="Confirm Password"
                  class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label class="block text-green-800 mb-1">
                    Birthdate
                </label>
                <DatePickerInput v-model="selectedDate"></DatePickerInput>
              </div>
              <br>
              
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

import DatePickerInput from '@/components/used-components/DatePickerInput.vue';


  export default {
    components: {
       DatePickerInput 
    },
    data() {
      return {
        firstname: '',
        middlename: '',
        lastname: '',
        suffix: '',
        selectedDate: ''
      };
    },
    methods: {
      handleSubmit() {
        console.log('First Name:', this.firstname);
        console.log('Middle Name:', this.middlename);
        console.log('Last Name:', this.lastname);
        console.log('Date:', this.selectedDate);
      },
      goBack() {
        this.$router.push('/');
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