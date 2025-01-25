<script setup lang="ts">
import { ref, onMounted } from 'vue';
import statueImage from '~/assets/images/asset-search-for-truth.webp';
const showSuffixInput = ref(false);
// const birthdate = ref<Date | null>(null);

const goBack = () => {
    return navigateTo("/auth/signup/step1", { replace: true });
};

onMounted(() => {
    // Any additional setup logic
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
                <form class="bg-white p-8 rounded-xl shadow-md space-y-5 max-h-[90vh] overflow-y-auto mb-8">
                    <h2 class="text-[#2B5741] text-2xl font-semibold mb-8 animate-fade-in-delayed">Personal Details</h2>

                    <!-- First Name -->
                    <div class="relative transform transition-all duration-300 hover:scale-[1.02]">
                        <label class="block text-[#2B5741] text-sm mb-1">First Name</label>
                        <input type="text" placeholder="Enter first name" class="w-full py-3 px-4 border border-gray-200 rounded-lg text-sm bg-white
                     transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-[#2B5741]/20" required />
                    </div>

                    <!-- Middle Name -->
                    <div class="relative transform transition-all duration-300 hover:scale-[1.02]">
                        <label class="block text-[#2B5741] text-sm mb-1">Middle Name</label>
                        <input type="text" placeholder="Enter middle name" class="w-full py-3 px-4 border border-gray-200 rounded-lg text-sm bg-white
                     transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-[#2B5741]/20" />
                    </div>

                    <!-- Last Name -->
                    <div class="relative transform transition-all duration-300 hover:scale-[1.02]">
                        <label class="block text-[#2B5741] text-sm mb-1">Last Name</label>
                        <input type="text" placeholder="Enter last name" class="w-full py-3 px-4 border border-gray-200 rounded-lg text-sm bg-white
                     transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-[#2B5741]/20" required />
                    </div>

                    <!-- Combined Suffix Checkbox and Input -->
                    <div class="flex items-center space-x-4">
                        <div class="flex items-center space-x-2">
                            <input type="checkbox" v-model="showSuffixInput" class="h-4 w-4 text-[#2B5741] border-gray-200 rounded 
                       focus:ring-[#2B5741] transition-all duration-300" />
                            <label class="text-[#2B5741] text-sm">Add Suffix</label>
                        </div>

                        <!-- Suffix Input (Conditional) -->
                        <div v-if="showSuffixInput"
                            class="flex-1 transform transition-all duration-300 hover:scale-[1.02] animate-fade-in">
                            <input type="text" placeholder="e.g., Jr., Sr." class="w-full py-3 px-4 border border-gray-200 rounded-lg text-sm bg-white
                       transition-all duration-300
                       focus:outline-none focus:ring-2 focus:ring-[#2B5741]/20" />
                        </div>
                    </div>

                    <!-- Birthdate -->
                    <div class="relative transform transition-all duration-300 hover:scale-[1.02]">
                        <label class="block text-[#2B5741] text-sm mb-1">Birthdate</label>
                        <input type="date" v-model="birthdate" placeholder="Select birthdate" class="w-full py-3 px-4 border border-gray-200 rounded-lg text-sm bg-white
                             transition-all duration-300
                             focus:outline-none focus:ring-2 focus:ring-[#2B5741]/20" />

                    </div>

                    <!-- Faculty ID -->
                    <div class="relative transform transition-all duration-300 hover:scale-[1.02]">
                        <label class="block text-[#2B5741] text-sm mb-1">Faculty Identification Number (If
                            Applicable)</label>
                        <input type="text" placeholder="Enter faculty ID" class="w-full py-3 px-4 border border-gray-200 rounded-lg text-sm bg-white
                     transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-[#2B5741]/20" required />
                    </div>
                </form>

                <!-- Proceed Button -->
                <button type="submit" @click="navigateTo('/auth/signup/success', { replace: true });" class="w-full py-3 bg-[#2B5741] text-white rounded-lg text-sm uppercase tracking-wider
                   transform transition-all duration-300
                   hover:bg-[#1e3d2d] hover:scale-[1.02] hover:shadow-lg
                   active:scale-95">
                    SUBMIT
                </button>

                <!-- Divider -->
                <div class="text-center text-gray-500 my-2">OR</div>

                <!-- Back Button -->
                <button type="button" @click="goBack" class="w-full py-3 bg-[#6B8E76] text-white rounded-lg text-sm uppercase tracking-wider
                   transform transition-all duration-300
                   hover:bg-[#5a7862] hover:scale-[1.02] hover:shadow-lg
                   active:scale-95">
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
                    <img src="@/assets/images/asset-final-logo-1.webp" alt="Connect System Logo" class="w-full max-w-[70%] h-auto mx-auto transform transition-all duration-500 
                   hover:scale-[1.05] animate-float">
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
