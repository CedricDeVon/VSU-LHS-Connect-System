<script setup lang="ts">
  import statueImage from "~/assets/images/asset-search-for-truth.webp";
  import logo from "~/assets/images/asset-vsulhs-logo.webp";

</script>

<template>
    <div class="relative flex flex-row-reverse min-h-screen bg-[#FFFEF1] overflow-hidden">
        <!-- Background Image -->
        <div class="fixed right-[-10%] top-[25%] h-screen w-1/2 bg-cover bg-left opacity-20 z-10 scale-[.8]
             animate-statue-entrance mix-blend-multiply" :style="{
                backgroundImage: `url(${statueImage})`,
                backgroundColor: 'transparent'
            }"></div>

        <div class="  text-center bg-opacity-100 backdrop-blur-lg p-10 pt-0 w-1/2 rounded-3xl ">

            <div class="flex justify-center">
                <img class="w-48 h-48 rounded-full" :src="logo" alt="VSU-LHS Connect Logo">
            </div>
            <!-- Message Container -->
            <div class="relative z-10 px-4 animate-fade-in">
                <h3 class="text-5xl font-extrabold text-green-900 mb-6 ">VSU-LHS Connect System</h3>
                <p class="text-green-800 text-xl font-semibold ">
                Your Digital Gateway to Effective Guidance Facilitation
                </p>
            </div>


        </div>

        <div class="bg-[#265630]  backdrop-blur-lg w-3/4 pt-20 pb-10 px-16  ">

        <!-- Message Container -->
    <div class="relative z-10  px-4 animate-fade-in ">
        <h3 class=" text-6xl font-extrabold text-yellow-50 mb-20">Welcome to VSU-LHS Connect! </h3>
        <h3 class="text-4xl font-semibold text-yellow-50 mb-16">Your personalized portal to stay connected, collaborate, and enhance the guidance process for your students.</h3>
        <p class="text-yellow-50 text-2xl font-light mb-4">
            This platform is designed to help teachers at VSU-LHS provide more effective and efficient guidance to their students. Stay informed, manage tasks, and collaborate with ease—all in one place!
        </p>
        <NuxtLink to="/auth/login" class=" flex justify-self-center mt-12 inline-block px-8 py-4 bg-green-700 text-white rounded-md shadow-lg hover:bg-green-800 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
        Get Started
        </NuxtLink>
    </div>

    </div>
        
    </div>
</template>
