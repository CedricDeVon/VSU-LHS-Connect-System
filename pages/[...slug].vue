<script setup lang="ts">
  import statueImage from "~/assets/images/asset-search-for-truth.webp";
</script>

<template>
    <div class="relative flex items-center justify-center min-h-screen bg-gray-100 overflow-hidden">
        <!-- Background Image -->
        <div class="fixed right-[5%] top-[15%] h-screen w-1/2 bg-cover bg-left opacity-50 z-10 scale-[1.03]
             animate-statue-entrance mix-blend-multiply" :style="{
                backgroundImage: `url(${statueImage})`,
                backgroundColor: 'transparent'
            }"></div>

        <!-- Message Container -->
        <div class="relative z-10 text-center px-4 animate-fade-in">
            <h3 class="text-5xl font-extrabold text-green-800 mb-6">Oops! Looks like the page you are looking for does not exist.</h3>
            <p class="text-green-800 text-xl font-semibold mb-4">
            Please check the URL or return to the homepage.
            </p>
            <NuxtLink to="/auth/login" class="mt-4 inline-block px-8 py-4 bg-green-700 text-green rounded-md shadow-lg hover:bg-green-800 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
            Go to Homepage
            </NuxtLink>
        </div>
    </div>
</template>
