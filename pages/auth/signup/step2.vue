<script setup lang="ts">
import { Result } from '~/library/results/result';
import { goToPreviousPage } from '~/composables/navigation';
import { UserSecurity } from '~/library/security/userSecurity';
import { useUserSignUpStore } from '~/stores/auth/userSignUpStore';
import DatePickerInput from '@/components/used-components/DatePickerInput.vue';

const auth = useFirebaseAuth()!;
const userSignUpStore = useUserSignUpStore();

const handleFormSubmit = async () => {
  const step2Data: any = userSignUpStore.getStep2Data();
  let result: Result = await UserSecurity.signUpUserViaStep2(step2Data);
  if (result.isNotSuccessful) {
    userSignUpStore.errorMessage = result.message;
    return;
  }
  result = await UserSecurity.signUpUser({ auth, ...userSignUpStore.getStep1Data(), ...step2Data });
  if (result.isNotSuccessful) {
    userSignUpStore.errorMessage = result.message;
    return;
  }

  return navigateTo("/auth/signup/success", { replace: true });
};

const handleGoingBackToPreviousPage = () => {
  goToPreviousPage();
  userSignUpStore.resetSet2Data();
};

onMounted(() => {
  userSignUpStore.resetSet2Data();
});
</script>

<template>
  <div class="flex min-h-screen">
    <div class="w-1/2  flex items-center justify-center bg-left">
      <div class="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden signup-outer-container">
        <div class="w-full p-8 bg-amber-50 signup-container">
          <h2 class="text-2xl font-semibold text-green-800 mb-6">Personal Details</h2>
          <form @submit.prevent="handleFormSubmit">
              <div class="mb-4">
                <label class="block text-green-800 mb-1">First Name</label>
                <input type="text" v-model="userSignUpStore.firstName" placeholder="Enter first name"
                  class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <div class="mb-4">
                <label class="block text-green-800 mb-1">Middle Name</label>
                <input type="text" v-model="userSignUpStore.middleName" placeholder="Enter middle name"
                  class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>

              <div class="mb-6">
                <div class="flex items-end space-x-4">
                  <div class="w-3/4">
                    <label class="block text-green-800 mb-1">Last Name</label>
                    <input type="text" v-model="userSignUpStore.lastName" placeholder="Enter last name"
                      class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div>

                  <div class="flex items-center space-x-2">
                    <input type="checkbox" v-model="userSignUpStore.hasSuffix"
                      class="h-4 w-4 text-green-500 border-gray-300 rounded focus:ring-green-500" />
                    <label class="text-green-800">Add Suffix</label>
                  </div>
                </div>

                <div class="flex space-x-4 mt-4">
                  <div v-if="userSignUpStore.hasSuffix" class="w-1/4">
                    <label class="block text-green-800 mb-1">Suffix</label>
                    <input type="text" v-model="userSignUpStore.suffix" placeholder="e.g., Jr., Sr."
                      class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div>

                  <div :class="userSignUpStore.hasSuffix ? 'w-3/4' : 'w-full'">
                    <label class="block text-green-800 mb-1">Birthdate</label>
                    <DatePickerInput v-model="userSignUpStore.birthdate"></DatePickerInput>
                  </div>
                </div>

                <div class="mt-4">
                  <label class="block text-green-800 mb-1">Faculty Identification Number</label>
                  <input type="text" v-model="userSignUpStore.facultyId" placeholder="Enter faculty ID"
                    class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
              </div>
              <div v-if="userSignUpStore.errorMessage" class="text-red-500 mb-4">{{  userSignUpStore.errorMessage }}</div>
            <button type="handleFormSubmit"
              class="w-full bg-green-800 text-white p-2 rounded-md hover:bg-green-900 transition duration-300 mb-2" >
              PROCEED
            </button>
            <div class="text-center text-gray-500 my-2">OR</div>
            <button type="button" @click="handleGoingBackToPreviousPage"
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


  // let result: any = await $fetch('/api/user/signUpSpecifics', {
  //   method: 'POST', body: store.getAdviserData()
  // });

  // if (result.isNotSuccessful) {
  //   store.errorMessage = result.message;
  //   return;
  // }
  // try {
  //   createUserWithEmailAndPassword(auth, store.email, store.password);
  // } catch (error: any) {
  //   store.errorMessage = error.message;
  // }

  // result = await $fetch('/api/user/signUp', { method: 'POST', body: {
  //   id: auth.currentUser?.uid,
  //   ...store.getAllData()
  // }});
  // if (result.isNotSuccessful) {
  //   store.errorMessage = result.message;
  //   return;
  // }
  
  // store.resetAllData();