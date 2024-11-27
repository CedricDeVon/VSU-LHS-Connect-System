<script setup lang="ts">
import { Result } from '~/library/results/result';
import { goToPreviousPage } from '~/composables/navigation';
import { UserSecurity } from '~/library/security/userSecurity';
import { useUserSignUpStore } from '~/stores/auth/userSignUpStore';
import statueImage from '~/assets/images/vsu-main-the-search-for-truth-statue.png';

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
  <div class="fixed inset-0 flex overflow-hidden">
    <div class="fixed right-[5%] top-[20%] h-screen w-1/2 bg-cover bg-left opacity-75 z-10 scale-[1.03]
             animate-statue-entrance mix-blend-multiply" :style="{
              backgroundImage: `url(${statueImage})`,
              backgroundColor: 'transparent'
            }"></div>
    <div class="w-1/2 flex items-center justify-center bg-left h-screen">
      <div class="w-[380px] animate-slide-in">
        <form @submit.prevent="handleFormSubmit" class="bg-white p-8 rounded-xl shadow-md space-y-5 max-h-[90vh] overflow-y-auto">
          <h2 class="text-[#2B5741] text-2xl font-semibold mb-8 animate-fade-in-delayed">Login Details</h2>

          <!-- Username Input -->
          <div class="relative transform transition-all duration-300 hover:scale-[1.02]">
            <label class="block text-[#2B5741] text-sm mb-1">Username</label>
            <input type="text" v-model="userSignUpStore.userName" placeholder="Username" class="w-full py-3 px-4 border border-gray-200 rounded-lg text-sm bg-white
                     transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-[#2B5741]/20" required />
            <i class="fas fa-user absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
          </div>

          <!-- Email Input -->
          <div class="relative transform transition-all duration-300 hover:scale-[1.02]">
            <label class="block text-[#2B5741] text-sm mb-1">VSUIHS-Issued Email</label>
            <input type="email" v-model="userSignUpStore.email" placeholder="Enter email" class="w-full py-3 px-4 border border-gray-200 rounded-lg text-sm bg-white
                     transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-[#2B5741]/20" required />
            <i class="fas fa-envelope absolute right-4 top-[60%] -translate-y-1/2 text-gray-400"></i>
          </div>

          <!-- Password Input -->
          <div class="relative transform transition-all duration-300 hover:scale-[1.02]">
            <input type="password" v-model="userSignUpStore.password" placeholder="Password" class="w-full py-3 px-4 border border-gray-200 rounded-lg text-sm bg-white
                     transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-[#2B5741]/20" required />
            <i class="fas fa-lock absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
          </div>

          <!-- Confirm Password Input -->
          <div class="relative transform transition-all duration-300 hover:scale-[1.02]">
            <input type="password" v-model="userSignUpStore.confirmPassword" placeholder="Confirm Password" class="w-full py-3 px-4 border border-gray-200 rounded-lg text-sm bg-white
                     transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-[#2B5741]/20" required />
            <i class="fas fa-lock absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
          </div>

          <!-- Error Message -->
          <div v-if="userSignUpStore.errorMessage" class="text-red-500 text-sm animate-shake bg-red-50 p-3 rounded-lg">
            {{ userSignUpStore.errorMessage }}
          </div>

          <!-- Proceed Button -->
          <button type="handleFormSubmit" class="w-full py-3 bg-[#2B5741] text-white rounded-lg text-sm uppercase tracking-wider
                   transition-all duration-300 hover:bg-[#1e3d2d]">
            PROCEED
          </button>

          <!-- Divider -->
          <div class="text-center text-gray-500 my-2">OR</div>

          <!-- Back Button -->
          <button type="button" @click="handleGoingBackToPreviousPage" class="w-full py-3 bg-[#6B8E76] text-white rounded-lg text-sm uppercase tracking-wider
                   transition-all duration-300 hover:bg-[#5a7862]">
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
