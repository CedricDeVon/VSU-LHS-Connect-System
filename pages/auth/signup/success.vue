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
            <h1 class="text-5xl font-extrabold text-green-800 mb-6">Registration Successful!</h1>
            <p class="text-green-800 text-2xl font-semibold mb-4">
            Your profile has been submitted and is pending approval from the guidance office.
            </p>
            <p class="text-green-800 text-xl">
            You will receive an email notification once your account has been approved.
            <br />
            Please allow up to 24-48 hours for the approval process. Thank you!
            </p>
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
