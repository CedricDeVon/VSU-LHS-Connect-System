<script setup lang="ts">
import { userLoginStore } from '@/stores/userLogin'

const store = userLoginStore()

const submit = async () => {  
  const result: any = await $fetch('/api/user/login', { method: 'POST', body: store.getData() });
  if (result.isSuccessful) {
    return navigateTo("/AdminDashboard", { replace: true });

  } else {
    store.errorMessage = result.message;
  }
};

onMounted(() => {
  store.reset();
});

</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
      <h1 class="text-2xl font-semibold text-center text-gray-800 mb-6">Log In</h1>
      <form @submit.prevent="submit">
        <div class="mb-4">
            <label for="email" class="block text-gray-700 mb-1">Email</label>
            <input v-model="store.email" type="email" id="email" placeholder="Email" required
              class="w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div class="mb-6">
            <label for="password" class="block text-gray-700 mb-1">Password</label>
            <input v-model="store.password" type="password" id="password" placeholder="Password" required
              class="w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div v-if="store.errorMessage" class="text-red-500 mb-4">{{ store.errorMessage }}</div>
          <button type="submit"
            class="w-full bg-blue-500 p-2 text-white rounded-md hover:bg-blue-600 transition duration-300">
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
