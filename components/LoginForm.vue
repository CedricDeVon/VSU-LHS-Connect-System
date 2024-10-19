<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
            <h1 class="text-2xl font-semibold text-center text-gray-800 mb-6">Log In</h1>
            <form @submit.prevent="handleSubmit">
                <div class="mb-4">
                    <label class="block text-gray-700 mb-1">Username</label>
                    <input type="email" v-model="email" placeholder="Email"
                        class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 mb-1">Password</label>
                    <input type="password" v-model="password" placeholder="Password"
                        class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <button type="submit"
                    class="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300">
                    Log In
                </button>
                <div class="text-center mt-4">
                    <p class="text-gray-500">OR</p>
                    <a href="#" class="text-sm text-blue-500 hover:underline">Register Here</a>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        handleSubmit() {
            console.log('Email:', this.email);
            console.log('Password:', this.password);
        }
    }
};
</script>