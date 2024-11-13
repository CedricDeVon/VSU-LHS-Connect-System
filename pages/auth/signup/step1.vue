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
    <!-- Right section -->
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
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes float {

  0%,
  100% {
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
