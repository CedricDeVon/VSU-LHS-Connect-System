<script setup lang="ts">
import { Result } from '~/library/results/result';
import { goToPreviousPage } from '~/composables/navigation';
import { UserSecurity } from '~/library/security/userSecurity';
import { useUserSignUpStore } from '~/stores/auth/userSignUpStore';

const userSignUpStore = useUserSignUpStore();

const handleFormSubmit = async () => {  
  const result: Result = await UserSecurity.signUpUserViaStep1(userSignUpStore.getStep1Data());
  if (result.isNotSuccessful) {
    userSignUpStore.errorMessage = result.message;
    return;
  }

  return navigateTo("/auth/signup/step2", { replace: true });
};

const handleGoingBackToPreviousPage = () => {
  goToPreviousPage();
  userSignUpStore.resetAllData();
};

</script>

<template>
  <div class="flex min-h-screen">
    <div class="w-1/2  flex items-center justify-center bg-left">
      <div class="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden signup-outer-container">
        <div class="w-full p-8 bg-amber-50 signup-container">
          <h2 class="text-2xl font-semibold text-green-800 mb-6">Login Details</h2>
          <form @submit.prevent="handleFormSubmit">
            <div class="mb-4">
              <input
                type="text"
                v-model="userSignUpStore.userName"
                placeholder="Enter username"
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div class="mb-4">
              <label class="block text-green-800 mb-1">VSUIHS-Issued Email</label>
              <input
                type="email"
                v-model="userSignUpStore.email"
                placeholder="Enter email"
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div class="mb-4">
              <label class="block text-green-800 mb-1">Password</label>
              <input
                type="password"
                v-model="userSignUpStore.password"
                placeholder="Password"
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div class="mb-6">
              <label class="block text-green-800 mb-1">Confirm Password</label>
              <input
                type="password"
                v-model="userSignUpStore.confirmPassword"
                placeholder="Confirm Password"
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div v-if ="userSignUpStore.errorMessage" class="text-red-500 mb-4">{{ userSignUpStore.errorMessage }}</div>
            <button
              type="handleFormSubmit"
              class="w-full bg-green-800 text-white p-2 rounded-md hover:bg-green-900 transition duration-300 mb-2"
            
            >
              PROCEED
            </button>
            
            <div class="text-center text-gray-500 my-2">OR</div>
            <button
              type="button"
              @click="handleGoingBackToPreviousPage"
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
