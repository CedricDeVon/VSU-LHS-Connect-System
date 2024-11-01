<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
      <h1 class="text-2xl font-semibold text-center text-gray-800 mb-6">Log In</h1>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="email" class="block text-gray-700 mb-1">Email</label>
          <input type="email" id="email" v-model="email" placeholder="Email" required
            class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <p v-if="emailError" class="text-red-500 text-sm">{{ emailError }}</p>
        </div>
        <div class="mb-6">
          <label for="password" class="block text-gray-700 mb-1">Password</label>
          <input type="password" id="password" v-model="password" placeholder="Password" required
            class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <button type="submit"
          class="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300">
          Log In
        </button>
        <div class="text-center mt-4">
          <p class="text-gray-500">OR</p>
          <NuxtLink to="/SignupPage1" class="text-blue-500 hover:underline">Register Here</NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      emailError: ''
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