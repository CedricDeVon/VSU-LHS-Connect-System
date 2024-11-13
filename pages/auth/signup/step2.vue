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


          <!-- Faculty ID -->
          <div class="relative transform transition-all duration-300 hover:scale-[1.02]">
            <label class="block text-[#2B5741] text-sm mb-1">Faculty Identification Number</label>
            <input 
              type="text" 
              v-model="store.facultyId" 
              placeholder="Enter faculty ID"
              class="w-full py-3 px-4 border border-gray-200 rounded-lg text-sm bg-white
                     transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-[#2B5741]/20"
              required 
            />
          </div>

          <!-- Error Message -->
          <div v-if="store.errorMessage" 
               class="text-red-500 text-sm animate-shake bg-red-50 p-3 rounded-lg">
            {{ store.errorMessage }}
          </div>
        </form>

          <!-- Proceed Button -->
          <button
            type="submit"
            class="w-full py-3 bg-[#2B5741] text-white rounded-lg text-sm uppercase tracking-wider
                   transform transition-all duration-300
                   hover:bg-[#1e3d2d] hover:scale-[1.02] hover:shadow-lg
                   active:scale-95"
          >
            PROCEED
          </button>

          <!-- Divider -->
          <div class="text-center text-gray-500 my-2">OR</div>

          <!-- Back Button -->
          <button
            type="button"
            @click="goBack"
            class="w-full py-3 bg-[#6B8E76] text-white rounded-lg text-sm uppercase tracking-wider
                   transform transition-all duration-300
                   hover:bg-[#5a7862] hover:scale-[1.02] hover:shadow-lg
                   active:scale-95"
          >
            BACK
          </button>
       
      </div>
    </div>

    <!-- Right section with logo -->
    <div class="w-1/2 bg-right h-screen animate-fade-in">
      <div class="relative h-full flex flex-col items-center justify-start animate-slide-in-right">
        <!-- Logo Container -->
        <div class="bg-[#F5F5F5]/80 backdrop-blur-sm rounded-lg w-[80%] max-w-[600px] 
                    transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg
                    animate-fade-in-delayed">
          <img 
            src="@/assets/images/sample-logo.png" 
            alt="Connect System Logo" 
            class="w-full max-w-[70%] h-auto mx-auto transform transition-all duration-500 
                   hover:scale-[1.05] animate-float"
          >
        </div>
      </div>
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

@keyframes shake {

  0%,
  100% {
    transform: translateX(0);
  }

  25% {
    transform: translateX(-5px);
  }

  75% {
    transform: translateX(5px);
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}

.animate-slide-in {
  animation: slideIn 0.8s ease-out;
}

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

/* Add this to prevent body scrolling */
:root {
  overflow: hidden;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-10px) scale(1.02);
  }
}

.animate-slide-in-right {
  animation: slideInRight 0.8s ease-out;
}

.animate-fade-in {
  animation: fadeIn 1s ease-out;
}

.animate-fade-in-delayed {
  animation: fadeIn 1s ease-out 0.3s both;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
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