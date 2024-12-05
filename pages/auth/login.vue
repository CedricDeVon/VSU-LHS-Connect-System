<script setup lang="ts">

import type { Result } from '~/library/results/result';
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';
import { useAdminViewStore } from '~/stores/views/adminViewStore'
import { useUserLogInStore } from '~/stores/auth/userLogInStore'
import { UserSecurity } from "~/library/security/userSecurity";
import { signInWithEmailAndPassword } from "firebase/auth";
import statueImage from '~/assets/images/vsu-main-the-search-for-truth-statue.png'

const auth = useFirebaseAuth()!;
const adminViewStore = useAdminViewStore();
const userLogInStore = useUserLogInStore();

const handleFormSubmit = async () => {  
  const body: any = userLogInStore.getAllData();
  const result: Result = await UserSecurity.logInUser({ auth, ...body });
  if (result.isNotSuccessful) {
    alert(result.message);
    return;
  }
  
  if (body.role === 'adviser') {
    return navigateTo("/adviser/homepage", { replace: true });

  } else if (body.role === 'admin') {
    return navigateTo("/admin/dashboard", { replace: true });
  }
};

onMounted(() => {
  userLogInStore.resetAllData();
});

</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-[#FFFEF1] relative font-century-gothic 
              animate-fade-in">
    
    <div 
      class="fixed right-[5%] top-[13%] h-screen w-1/2 bg-cover bg-left z-10 opacity-50 scale-[1.03]
             animate-statue-entrance"
      :style="{ backgroundImage: `url(${statueImage})` }"
    ></div>
    
    <div 
      class="relative z-20 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-md 
             w-full max-w-[380px] mx-auto mr-[20%] ml-[15%] 
             animate-slide-in"
    >
      <div class="bg-[#F5F5F5]/80 rounded-lg p-4 -mt-2 -mx-4 mb-8 animate-fade-in-delayed">
        <img 
          src="@/assets/images/final-logo-1.png"
          alt="Connect System Logo" 
          class="w-full max-w-[310px] h-auto mx-auto"
        >
      </div>
      
      <h2 class="text-[#6b8e76] text-lg mb-6">Login</h2>
      
      <form @submit.prevent="handleFormSubmit">
        <div class="relative mb-5 transform transition-all duration-300 hover:scale-[1.02]">
          <input 
            type="text" 
            v-model="userLogInStore.email" 
            placeholder="Email Address" 
            class="w-full py-3 px-3 border border-gray-200 rounded-lg text-sm bg-gray-50 
                   transition-all duration-300
                   focus:outline-none focus:ring-2 focus:ring-[#6b8e76]/20 focus:scale-[1.02]"
            required
          >
          <i class="fas fa-user absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
        </div>
        
        <div class="relative mb-5 transform transition-all duration-300 hover:scale-[1.02]">
          <input 
            type="password" 
            v-model="userLogInStore.password" 
            placeholder="Password" 
            class="w-full py-3 px-3 border border-gray-200 rounded-lg text-sm bg-gray-50 
                   transition-all duration-300
                   focus:outline-none focus:ring-2 focus:ring-[#6b8e76]/20 focus:scale-[1.02]"
            required
          >
          <i class="fas fa-lock absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
        </div>
        
        <div class="text-right -mt-2 mb-6">
          <a href="#" class="text-gray-400 text-sm hover:text-gray-600">
            Forgot Password?
          </a>
        </div>

        <div class="relative mb-5 transform transition-all duration-300 hover:scale-[1.02]">
            <select v-model="userLogInStore.role"
              class="w-full py-3 px-3 border border-gray-200 rounded-lg text-sm bg-gray-50 
                   transition-all duration-300
                   focus:outline-none focus:ring-2 focus:ring-[#6b8e76]/20 focus:scale-[1.02]" required>
              <option value="" selected disabled>Role</option>
              <option value="adviser">Adviser</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        
        <button 
          type="handleFormSubmit" 
          class="w-full py-3 bg-[#6b8e76] text-white rounded-lg text-sm uppercase tracking-wider
                 transform transition-all duration-300
                 hover:bg-[#597363] hover:scale-[1.02] hover:shadow-lg
                 active:scale-95"
        >
          LOGIN
        </button>
        
        <div class="flex items-center my-6">
          <div class="flex-1 border-t border-gray-200"></div>
          <span class="px-4 text-gray-400 text-sm">OR</span>
          <div class="flex-1 border-t border-gray-200"></div>
        </div>
        
        <NuxtLink 
          to="/auth/signup/step1" 
          class="block text-center text-[#6b8e76] text-sm hover:underline transition-all duration-300 hover:scale-[1.02]"
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