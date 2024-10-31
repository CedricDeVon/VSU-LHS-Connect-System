<template>
  <div class="flex min-h-screen">
    <div class="w-1/2  flex items-center justify-center bg-left">
      <div class="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden signup-outer-container">
        <div class="w-full p-8 bg-amber-50 signup-container">
          <h2 class="text-2xl font-semibold text-green-800 mb-6">Personal Details</h2>
          <form @submit.prevent="handleSubmit">
              <div class="mb-4">
                <label class="block text-green-800 mb-1">First Name</label>
                <input type="text" v-model="firstName" placeholder="Enter first name"
                  class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <div class="mb-4">
                <label class="block text-green-800 mb-1">Middle Name</label>
                <input type="text" v-model="middleName" placeholder="Enter middle name"
                  class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>

              <div class="mb-6">
                <div class="flex items-end space-x-4">
                  <div class="w-3/4">
                    <label class="block text-green-800 mb-1">Last Name</label>
                    <input type="text" v-model="lastName" placeholder="Enter last name"
                      class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div>

                  <div class="flex items-center space-x-2">
                    <input type="checkbox" v-model="hasSuffix"
                      class="h-4 w-4 text-green-500 border-gray-300 rounded focus:ring-green-500" />
                    <label class="text-green-800">Add Suffix</label>
                  </div>
                </div>

                <div class="flex space-x-4 mt-4">
                  <div v-if="hasSuffix" class="w-1/4">
                    <label class="block text-green-800 mb-1">Suffix</label>
                    <input type="text" v-model="suffix" placeholder="e.g., Jr., Sr."
                      class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div>

                  <div :class="hasSuffix ? 'w-3/4' : 'w-full'">
                    <label class="block text-green-800 mb-1">Birthdate</label>
                    <DatePickerInput v-model="bdate"></DatePickerInput>
                  </div>
                </div>
                <div class="flex space-x-4 mt-4 mb-6">
                  <div class="w-1/2">
                    <label class="block text-green-800 mb-1">Grade Level</label>
                    <select v-model="gradeLevel"
                      class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                      <option value="" disabled>Select Grade Level</option>
                      <option value="7">Grade 7</option>
                      <option value="8">Grade 8</option>
                      <option value="9">Grade 9</option>
                      <option value="10">Grade 10</option>
                      <option value="10">Grade 11</option>
                      <option value="10">Grade 12</option>
                    </select>
                  </div>

                  <div class="w-1/2">
                    <label class="block text-green-800 mb-1">Section Name</label>
                    <input type="text" v-model="sectionName" placeholder="Enter section name"
                      class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div>
                </div>
              
                <div >
                  <label class="block text-green-800">Faculty Identification Number</label>
                  <input type="text" v-model="facultyID" placeholder="Enter faculty ID"
                    class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
              </div>
         


            <button type="submit"
              class="w-full bg-green-800 text-white p-2 rounded-md hover:bg-green-900 transition duration-300 mb-2" @click="goToRegistrationSuccessPage">
              PROCEED
            </button>
            <div class="text-center text-gray-500 my-2">OR</div>
            <button type="button" @click="handleBackClick"
              class="w-full bg-green-400 text-white p-2 rounded-md hover:bg-green-500 transition duration-300">
              BACK

            </button>
          </form>
        </div>
      </div>
    </div>
    <div class="w-1/2 bg-right">

    </div>
  </div>
</template>

<script>

import { useRouter } from 'vue-router';
import { handleBackClick } from '~/composables/navigation';

import DatePickerInput from '@/components/used-components/DatePickerInput.vue';

export default {
  name: 'SignupPage2',
  components: {
    DatePickerInput
  },
  setup() {
    const router = useRouter();
    const goToRegistrationSuccessPage = () => {
      router.push({ name: 'RegistrationSuccessful' });
    };

    return {
      goToRegistrationSuccessPage
    }
  },
  data() {
    return {
      firstName: '',
      middleName: '',
      lastName: '',
      suffix: '',
      bdate: '',
      facultyID: ''
    };
  },
  methods: {
    handleSubmit() {
      console.log('First Name:', this.firstName);
      console.log('Middle Name:', this.middleName);
      console.log('Last Name:', this.lastName);
      console.log('Suffix:', this.suffix);
      console.log('Birthdate:', this.bdate);
      console.log('Birthdate:', this.facultyID);
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