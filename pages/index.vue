<script setup lang="ts">
import * as firestore from 'firebase/firestore';
import { getApp } from 'firebase/app';
import { Chronos } from '~/library/utilities/chronos';
import { Logger } from '~/library/loggers/logger'

const database = firestore.getFirestore(getApp());
console.log(database)

</script>

<template>
  <div>
    <h1>Back-end</h1>
  </div>
</template>
<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
            <h1 class="text-2xl font-semibold text-center text-gray-800 mb-6">Log In</h1>
            <form @submit.prevent="handleSubmit">
                <div class="mb-4">
                    <label for="email" class="block text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        id="email"
                        v-model="email"
                        placeholder="Email"
                        required
                        class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p v-if="emailError" class="text-red-500 text-sm">{{ emailError }}</p>
                </div>
                <div class="mb-6">
                    <label for="password" class="block text-gray-700 mb-1">Password</label>
                    <input
                        type="password"
                        id="password"
                        v-model="password"
                        placeholder="Password"
                        required
                        class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p v-if="passwordError" class="text-red-500 text-sm">{{ passwordError }}</p>
                </div>
                <button
                    type="submit"
                    class="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
                >
                    Log In
                </button>
                <div class="text-center mt-4">
                    <p class="text-gray-500">OR</p>
                    <nuxt-link to="/signup" class="text-blue-500 hover:underline">Register Here</nuxt-link>
                </div>
                <p v-if="loginError" class="text-red-500 text-sm text-center mt-4">{{ loginError }}</p>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            emailError: '',
            passwordError: '',
            loginError: '',
        };
    },
    methods: {
        handleSubmit() {
            this.emailError = '';
            this.passwordError = '';
            this.loginError = '';

            if (!this.email) {
                this.emailError = 'Email is required';
            }
            if (!this.password) {
                this.passwordError = 'Password is required';
            }

            if (!this.emailError && !this.passwordError) {
                console.log('Email:', this.email);
                console.log('Password:', this.password);

                this.loginError = 'Invalid email or password';
            }
        },
    },
};
</script>

<style scoped>
body {
    font-family: Arial, sans-serif;
    background-color: #fffef1;
}

.flex {
    display: flex;
}
.items-center {
    align-items: center;
}
.justify-center {
    justify-content: center;
}
.min-h-screen {
    min-height: 100vh;
}
.bg-gray-100 {
    background-color: #fffef1;
}
.bg-white {
    background-color: #fff;
}
.shadow-md {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.rounded-lg {
    border-radius: 8px;
}
.p-8 {
    padding: 2rem;
}
.max-w-md {
    max-width: 28rem;
}
.w-full {
    width: 100%;
}

.hover\:bg-blue-600:hover {
    background-color: #2563eb;
}

.focus\:ring-2:focus {
    ring-width: 2px;
}
.focus\:ring-blue-500:focus {
    ring-color: #3b82f6;
}
</style>



