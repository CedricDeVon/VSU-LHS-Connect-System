<script setup lang="ts">
import { Result } from '~/library/results/result';
import { goToPreviousPage } from '~/composables/navigation';
import { UserSecurity } from '~/library/security/userSecurity';
import { useUserSignUpStore } from '~/stores/auth/userSignUpStore';
import DatePickerInput from '@/components/used-components/DatePickerInput.vue';
import statueImage from '~/assets/images/vsu-main-the-search-for-truth-statue.png'

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
  <div class="fixed inset-0 flex overflow-hidden">
    <!-- Statue Background -->
    <div class="fixed right-[5%] top-[20%] h-screen w-1/2 bg-cover bg-left opacity-75 z-10 scale-[1.03]
             animate-statue-entrance mix-blend-multiply" :style="{
              backgroundImage: `url(${statueImage})`,
              backgroundColor: 'transparent'
            }"></div>

    <!-- Left side with form -->
    <div class="w-1/2 flex items-center justify-center bg-left h-screen">
      <div class="w-[480px] animate-slide-in">
        <form @submit.prevent="handleFormSubmit" 
              class="bg-white p-8 rounded-xl shadow-md space-y-5 max-h-[90vh] overflow-y-auto mb-8">
          <h2 class="text-[#2B5741] text-2xl font-semibold mb-8 animate-fade-in-delayed">Personal Details</h2>
          
          <!-- First Name -->
          <div class="relative transform transition-all duration-300 hover:scale-[1.02]">
            <label class="block text-[#2B5741] text-sm mb-1">First Name</label>
            <input 
              type="text" 
              v-model="userSignUpStore.firstName" 
              placeholder="Enter first name"
              class="w-full py-3 px-4 border border-gray-200 rounded-lg text-sm bg-white
                     transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-[#2B5741]/20"
              required 
            />
          </div>

          <!-- Middle Name -->
          <div class="relative transform transition-all duration-300 hover:scale-[1.02]">
            <label class="block text-[#2B5741] text-sm mb-1">Middle Name</label>
            <input 
              type="text" 
              v-model="userSignUpStore.middleName" 
              placeholder="Enter middle name"
              class="w-full py-3 px-4 border border-gray-200 rounded-lg text-sm bg-white
                     transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-[#2B5741]/20"
            />
          </div>

          <!-- Last Name -->
          <div class="relative transform transition-all duration-300 hover:scale-[1.02]">
            <label class="block text-[#2B5741] text-sm mb-1">Last Name</label>
            <input 
              type="text" 
              v-model="userSignUpStore.lastName" 
              placeholder="Enter last name"
              class="w-full py-3 px-4 border border-gray-200 rounded-lg text-sm bg-white
                     transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-[#2B5741]/20"
              required 
            />
          </div>

          <!-- Combined Suffix Checkbox and Input -->
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
              <input 
                type="checkbox" 
                v-model="userSignUpStore.hasSuffix"
                class="h-4 w-4 text-[#2B5741] border-gray-200 rounded 
                       focus:ring-[#2B5741] transition-all duration-300"
              />
              <label class="text-[#2B5741] text-sm">Add Suffix</label>
            </div>

            <!-- Suffix Input (Conditional) - Now inline -->
            <div v-if="userSignUpStore.hasSuffix" 
                 class="flex-1 transform transition-all duration-300 hover:scale-[1.02] animate-fade-in">
              <input 
                type="text" 
                v-model="userSignUpStore.suffix" 
                placeholder="e.g., Jr., Sr."
                class="w-full py-3 px-4 border border-gray-200 rounded-lg text-sm bg-white
                       transition-all duration-300
                       focus:outline-none focus:ring-2 focus:ring-[#2B5741]/20"
              />
            </div>
          </div>

          <!-- Birthdate -->
          <div class="relative transform transition-all duration-300 hover:scale-[1.02]">
            <label class="block text-[#2B5741] text-sm mb-1">Birthdate</label>
            <input v-model="userSignUpStore.birthdate" type="date"
                  class="w-full py-3 px-4 border border-gray-200 rounded-lg text-sm bg-white
                     transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-[#2B5741]/20"/>
          </div>

           <!-- <div class="flex space-x-4 mt-4 mb-6">
                 <div class="w-1/2">
                    <label class="block text-green-800 mb-1">Grade Level</label>
                    <select v-model="store.gradeLevel"
                      class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                      <option value="" disabled>Select Grade Level</option>
                      <option value="7">Grade 7</option>
                      <option value="8">Grade 8</option>
                      <option value="9">Grade 9</option>
                      <option value="10">Grade 10</option>
                    </select>
                  </div>
                  <div class="w-1/2">
                    <label class="block text-green-800 mb-1">Section Name</label>
                    <input type="text" v-model="store.sectionName" placeholder="Enter section name"
                      class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div> 
                </div>-->

          <!-- Faculty ID -->
          <div class="relative transform transition-all duration-300 hover:scale-[1.02]">
            <label class="block text-[#2B5741] text-sm mb-1">Faculty Identification Number</label>
            <input 
              type="text" 
              v-model="userSignUpStore.facultyId" 
              placeholder="Enter faculty ID"
              class="w-full py-3 px-4 border border-gray-200 rounded-lg text-sm bg-white
                     transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-[#2B5741]/20"
              required 
            />
          </div>

          <!-- Error Message -->
          <div v-if="userSignUpStore.errorMessage" 
               class="text-red-500 text-sm animate-shake bg-red-50 p-3 rounded-lg">
            {{ userSignUpStore.errorMessage }}
          </div>

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
            @click="handleGoingBackToPreviousPage"
            class="w-full py-3 bg-[#6B8E76] text-white rounded-lg text-sm uppercase tracking-wider
                   transform transition-all duration-300
                   hover:bg-[#5a7862] hover:scale-[1.02] hover:shadow-lg
                   active:scale-95"
          >
            BACK
          </button>
        </form>
       
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
            src="@/assets/images/final-logo-1.png" 
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
