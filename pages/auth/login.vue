<script setup lang="ts">
import { onMounted } from "vue";

import logoImage from "~/assets/images/asset-final-logo-1.webp";
import statueImage from "~/assets/images/asset-search-for-truth-goal.webp";
import { ClientApis } from '@/library/apis/clientApis';
import { useLoginStore } from '@/stores/auth/useLoginStore';
import { useSignupStore } from '@/stores/auth/useSignupStore';
import { Benchmarkers } from '@/library/benchmarkers/benchmarkers';

const loginStore = useLoginStore();
const signupStore = useSignupStore();

onMounted(() => {
  loginStore.resetAll();
});

const handleLogin = async () => {
  try {
    if (!loginStore.email || !loginStore.password || !loginStore.userRole) {
      alert('Enter your email, password, and select your role');
      return;
    }

    let result = await ClientApis.clientNuxtRestApi.getAuthenticateSupabaseUserViaEmailAndPassword(
      loginStore.email, loginStore.password
    );
    if (!result.isSuccessful) {
      alert(`Login Error: ${result.error.message}`);
      return;
    }

    const logedInUser = await ClientApis.clientNuxtRestApi.getUser();
    if (loginStore.userRole === 'admin') {
      result = await ClientApis.clientNuxtRestApi.readOne(
        'admin', { 'user_id': logedInUser.data.id }, { 'selected-columns': '*' }
      );

    } else if (loginStore.userRole === 'adviser') {
      result = await ClientApis.clientNuxtRestApi.readOne(
        'adviser', { 'user_id': logedInUser.data.id }, { 'selected-columns': '*' }
      );

    } else {
      alert(`Login Error: Invalid User Role`);
      return;
    }

    if (!result.isSuccessful) {
      alert(`Login Error: ${result.error.message}`);
      return;

    } else if (result.data.length === 0) {
      alert(`Login Error: Your ${loginStore.userRole} Account Does Not Exist`);
      return;
    }

    alert('Login Successful, Please Wait');
    loginStore.resetAll();
    signupStore.resetAll();

    if (loginStore.userRole === 'admin') {
      return navigateTo("/admin/dashboard", { replace: true });

    } else if (loginStore.userRole === 'adviser' && result.data[0].status_type !== 'active') {
      return navigateTo("/auth/signup/success", { replace: true });

    } else if (loginStore.userRole === 'adviser' && result.data[0].status_type === 'active') {
      return navigateTo("/adviser/homepage", { replace: true });
    }

  } catch (error: any) {
    alert("Login Error: ", error.message);
  }
};
</script>

<template>
  <div
    class="font-century-gothic animate-fade-in relative flex min-h-screen items-center justify-center bg-[#FFFEF1]"
  >
    <div
      class="animate-statue-entrance fixed right-[5%] top-[20%] z-10 h-screen w-1/2 scale-[1.03] bg-cover bg-left opacity-50"
      :style="{ backgroundImage: `url(${statueImage})` }"
    ></div>

    <div
      class="animate-slide-in relative z-20 mx-auto ml-[15%] mr-[20%] w-full max-w-[380px] rounded-2xl bg-white/80 p-8 shadow-md backdrop-blur-sm"
    >
      <div class="animate-fade-in-delayed -mx-4 -mt-2 mb-8 rounded-lg bg-[#F5F5F5]/80 p-4">
        <img
          :src="logoImage"
          alt="Connect System Logo"
          class="mx-auto h-auto w-full max-w-[310px]"
        />
      </div>

      <h2 class="mb-6 text-lg text-[#6b8e76]">Login</h2>

      <form @submit.prevent="handleLogin">
        <div class="relative mb-5 transform transition-all duration-300 hover:scale-[1.02]">
          <input
            type="text"
            v-model="loginStore.email"
            placeholder="Email"
            class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-3 text-sm transition-all duration-300 focus:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#6b8e76]/20"
            required
          />
          <i class="fas fa-user absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
        </div>

        <div class="relative mb-5 transform transition-all duration-300 hover:scale-[1.02]">
          <input
            type="password"
            v-model="loginStore.password"
            placeholder="Password"
            class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-3 text-sm transition-all duration-300 focus:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#6b8e76]/20"
            required
          />
          <i class="fas fa-lock absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
        </div>

        <div class="relative mb-5 transform transition-all duration-300 hover:scale-[1.02]">
          <select
            v-model="loginStore.userRole"
            class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-3 text-sm transition-all duration-300 focus:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#6b8e76]/20"
            required
          >
            <option value="Select Role" disabled selected>Select Role</option>
            <option value="admin">Admin</option>
            <option value="adviser">Adviser</option>
          </select>
          <i class="fas fa-user-tag absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
        </div>

        <div class="-mt-2 mb-6 text-right">
          <a href="#" class="text-sm text-gray-400 hover:text-gray-600"> Forgot Password? </a>
        </div>

        <button
          type="submit"
          class="w-full transform rounded-lg bg-[#6b8e76] py-3 text-sm uppercase tracking-wider text-white transition-all duration-300 hover:scale-[1.02] hover:bg-[#597363] hover:shadow-lg active:scale-95"
        >
          LOGIN
        </button>

        <div class="my-6 flex items-center">
          <div class="flex-1 border-t border-gray-200"></div>
          <span class="px-4 text-sm text-gray-400">OR</span>
          <div class="flex-1 border-t border-gray-200"></div>
        </div>

        <NuxtLink
          to="/auth/signup/step1"
          class="block text-center text-sm text-[#6b8e76] transition-all duration-300 hover:scale-[1.02] hover:underline"
        >
          Register Here
        </NuxtLink>
      </form>
    </div>
  </div>
</template>

<style scoped>
  /* Custom animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
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

  @keyframes statueEntrance {
    from {
      opacity: 0;
      transform: scale(1.2) translateX(50px);
    }
    to {
      opacity: 0.5;
      transform: scale(1.03) translateX(0);
    }
  }

  /* Animation classes */
  .animate-fade-in {
    animation: fadeIn 1s ease-out;
  }

  .animate-fade-in-delayed {
    animation: fadeIn 1s ease-out 0.5s both;
  }

  .animate-slide-in {
    animation: slideIn 0.8s ease-out;
  }

  .animate-statue-entrance {
    animation: statueEntrance 1.2s ease-out;
  }

  /* Optional: Add smooth transitions for all interactive elements */
  .transition-all {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
  }
</style>
