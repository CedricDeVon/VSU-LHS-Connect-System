<template>
    <div class="relative flex items-center justify-center min-h-screen bg-gray-100 overflow-hidden">
        <!-- Background Image -->
        <div class="absolute inset-0 flex  opacity-10">
            <img src="@/assets/images/vsu-main-the-search-for-truth-statue.png" alt="Background Image"
                class="w-full h-full object-contain" />
        </div>

        <!-- Message Container -->
        <div class="relative z-10 text-center px-4">
            <h1 class="text-4xl font-extrabold text-green-800 mb-4">Oops! Looks like the page you are looking for does not exist.</h1>
            <p class="text-green-800 text-xl font-medium mb-2">
                Please check the URL or return to the homepage.
            </p>
            <NuxtLink to="AdminDashboard" class="mt-4 inline-block px-6 py-3 bg-green-700 text-white rounded-md hover:bg-green-800">
                Go to Homepage
            </NuxtLink>
        </div>
    </div>
</template>

<script>
export default {
    name: "RegistrationSuccessful",
};
</script>