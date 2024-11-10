<script setup lang="ts">
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import DatePickerInput from '@/components/used-components/DatePickerInput.vue';
import { userSignUpStore } from '~/stores/auth/userSignUpStore'

const store = userSignUpStore()
const auth = getAuth();

const submit = async () => {  
  let result: any = await $fetch('/api/user/signUpSpecifics', {
    method: 'POST', body: store.getAdviserData()
  });
  if (result.isNotSuccessful) {
    store.errorMessage = result.message;
    return;
  }
  try {
    createUserWithEmailAndPassword(auth, store.email, store.password);
  } catch (error: any) {
    store.errorMessage = error.message;
  }

  result = await $fetch('/api/user/signUp', { method: 'POST', body: {
    id: auth.currentUser?.uid,
    ...store.getAllData()
  }});
  if (result.isNotSuccessful) {
    store.errorMessage = result.message;
    return;
  }
  
  store.resetAllData();
  return navigateTo("/RegistrationSuccessful", { replace: true });
};

const goBack = () => {
  return navigateTo("/SignupPage1", { replace: true });
};

onMounted(() => {
  store.resetAdviserData();
});
</script>

<template>
  <div class="flex min-h-screen">
    <div class="w-1/2  flex items-center justify-center bg-left">
      <div class="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden signup-outer-container">
        <div class="w-full p-8 bg-amber-50 signup-container">
          <h2 class="text-2xl font-semibold text-green-800 mb-6">Personal Details</h2>
          <form @submit.prevent="submit">
              <div class="mb-4">
                <label class="block text-green-800 mb-1">First Name</label>
                <input type="text" v-model="store.firstName" placeholder="Enter first name"
                  class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <div class="mb-4">
                <label class="block text-green-800 mb-1">Middle Name</label>
                <input type="text" v-model="store.middleName" placeholder="Enter middle name"
                  class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>

              <div class="mb-6">
                <div class="flex items-end space-x-4">
                  <div class="w-3/4">
                    <label class="block text-green-800 mb-1">Last Name</label>
                    <input type="text" v-model="store.lastName" placeholder="Enter last name"
                      class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div>

                  <div class="flex items-center space-x-2">
                    <input type="checkbox" v-model="store.hasSuffix"
                      class="h-4 w-4 text-green-500 border-gray-300 rounded focus:ring-green-500" />
                    <label class="text-green-800">Add Suffix</label>
                  </div>
                </div>

                <div class="flex space-x-4 mt-4">
                  <div v-if="store.hasSuffix" class="w-1/4">
                    <label class="block text-green-800 mb-1">Suffix</label>
                    <input type="text" v-model="store.suffix" placeholder="e.g., Jr., Sr."
                      class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div>

                  <div :class="store.hasSuffix ? 'w-3/4' : 'w-full'">
                    <label class="block text-green-800 mb-1">Birthdate</label>
                    <DatePickerInput v-model="store.birthdate"></DatePickerInput>
                  </div>
                </div>
                <div class="flex space-x-4 mt-4 mb-6">
                  <!-- <div class="w-1/2">
                    <label class="block text-green-800 mb-1">Grade Level</label>
                    <select v-model="store.gradeLevel"
                      class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                      <option value="" disabled>Select Grade Level</option>
                      <option value="7">Grade 7</option>
                      <option value="8">Grade 8</option>
                      <option value="9">Grade 9</option>
                      <option value="10">Grade 10</option>
                      <option value="11">Grade 11</option>
                      <option value="12">Grade 12</option>
                    </select>
                  </div>
                  <div class="w-1/2">
                    <label class="block text-green-800 mb-1">Section Name</label>
                    <input type="text" v-model="store.sectionName" placeholder="Enter section name"
                      class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div> -->
                </div>
                <div >
                  <label class="block text-green-800">Faculty Identification Number</label>
                  <input type="text" v-model="store.facultyId" placeholder="Enter faculty ID"
                    class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
              </div>
              <div v-if="store.errorMessage" class="text-red-500 mb-4">{{  store.errorMessage }}</div>
            <button type="submit"
              class="w-full bg-green-800 text-white p-2 rounded-md hover:bg-green-900 transition duration-300 mb-2" >
              PROCEED
            </button>
            <div class="text-center text-gray-500 my-2">OR</div>
            <button type="button" @click="goBack"
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
