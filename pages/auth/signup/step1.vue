<script setup lang="ts">

import statueImage from '~/assets/images/asset-search-for-truth.webp';
import { handleBackClick } from '~/composables/navigation';
import { Validators } from '@/library/validators/validators';
import { useSignupStore } from '@/stores/auth/useSignupStore';
import { Benchmarkers } from '@/library/benchmarkers/benchmarkers';

const signupStore = useSignupStore();

const handleNavigatingToLogin = () => {
  try {
    handleBackClick();

  } catch (error: any) {
    alert(error.message);
  }
};

const handleStep1SignUp = async () => {
  try {
    let result = await Validators.usernameValidator.validate(signupStore.username);
    if (!result.isSuccessful) {
      alert(result.error);
      return;
    }
    result = await Validators.emailValidator.validate(signupStore.email);
    if (!result.isSuccessful) {
      alert(result.error);
      return;
    }
    result = await Validators.passwordValidator.validate(signupStore.password);
    if (!result.isSuccessful) {
      alert(result.error);
      return;
    }
    result = await Validators.confirmPasswordValidator.validate({ password: signupStore.password, confirmPassword: signupStore.confirmPassword });
    if (!result.isSuccessful) {
      alert(result.error);
      return;
    }

    navigateTo('/auth/signup/step2', { replace: true })

  } catch (error: any) {
    alert(error.message);
  }
}

</script>

<template>
  <div class="fixed inset-0 flex overflow-hidden">
    <div
      class="animate-statue-entrance fixed right-[5%] top-[20%] z-10 h-screen w-1/2 scale-[1.03] bg-cover bg-left opacity-75 mix-blend-multiply"
      :style="{
        backgroundImage: `url(${statueImage})`,
        backgroundColor: 'transparent',
      }"
    ></div>
    <div class="flex h-screen w-1/2 items-center justify-center bg-left">
      <div class="animate-slide-in w-[380px]">
        <form @submit.prevent="handleStep1SignUp" class="max-h-[90vh] space-y-5 overflow-y-auto rounded-xl bg-white p-8 shadow-md">
          <h2 class="animate-fade-in-delayed mb-8 text-2xl font-semibold text-[#2B5741]">
            Login Details
          </h2>

          <!-- Username Input -->
          <div class="relative transform transition-all duration-300 hover:scale-[1.02]">
            <label class="mb-1 block text-sm text-[#2B5741]">Username</label>
            <input
              type="text"
              v-model="signupStore.username"
              placeholder="Username"
              class="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#2B5741]/20"
              required
            />
            <i class="fas fa-user absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
          </div>

          <!-- Email Input -->
          <div class="relative transform transition-all duration-300 hover:scale-[1.02]">
            <label class="mb-1 block text-sm text-[#2B5741]">Email Address</label>
            <input
              type="email"
              v-model="signupStore.email"
              placeholder="Enter email"
              class="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#2B5741]/20"
              required
            />
            <i
              class="fas fa-envelope absolute right-4 top-[60%] -translate-y-1/2 text-gray-400"
            ></i>
          </div>

          <!-- Password Input -->
          <div class="relative transform transition-all duration-300 hover:scale-[1.02]">
            <input
              type="password"
              v-model="signupStore.password"
              placeholder="Password"
              class="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#2B5741]/20"
              required
            />
            <i class="fas fa-lock absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
          </div>

          <!-- Confirm Password Input -->
          <div class="relative transform transition-all duration-300 hover:scale-[1.02]">
            <input
              type="password"
              v-model="signupStore.confirmPassword"
              placeholder="Confirm Password"
              class="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#2B5741]/20"
              required
            />
            <i class="fas fa-lock absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
          </div>

          <!-- Proceed Button -->
          <button
            type="submit"
            class="w-full rounded-lg bg-[#2B5741] py-3 text-sm uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#1e3d2d]"
          >
            PROCEED
          </button>

          <!-- Divider -->
          <div class="my-2 text-center text-gray-500">OR</div>

          <!-- Back Button -->
          <button
            type="button"
            @click="handleNavigatingToLogin"
            class="w-full rounded-lg bg-[#6B8E76] py-3 text-sm uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#5a7862]"
          >
            BACK
          </button>
        </form>
      </div>
    </div>
    <!-- Right section -->
    <div class="animate-fade-in h-screen w-1/2 bg-right">
      <div class="animate-slide-in-right relative flex h-full flex-col items-center justify-start">
        <!-- Logo Container -->
        <div
          class="animate-fade-in-delayed w-[80%] max-w-[600px] transform rounded-lg bg-[#F5F5F5]/80 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
        >
          <img
            src="@/assets/images/asset-final-logo-1.webp"
            alt="Connect System Logo"
            class="animate-float mx-auto h-auto w-full max-w-[70%] transform transition-all duration-500 hover:scale-[1.05]"
          />
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
