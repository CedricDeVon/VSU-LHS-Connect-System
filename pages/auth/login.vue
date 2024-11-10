<script setup lang="ts">
import { signInWithEmailAndPassword } from "firebase/auth";

import type { Result } from '~/library/results/result';
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';
import { useAdminViewStore } from '~/stores/views/adminViewStore'
import { useUserLogInStore } from '~/stores/auth/userLogInStore'
import { UserSecurity } from "~/library/security/userSecurity";

const auth = useFirebaseAuth()!;
const adminViewStore = useAdminViewStore();
const userLogInStore = useUserLogInStore();

const handleFormSubmit = async () => {  
  const body: any = userLogInStore.getAllData();
  const result: Result = await UserSecurity.logInUser({ auth, ...body });
  if (result.isNotSuccessful) {
    userLogInStore.errorMessage = result.message;
    return;
  }
  
  if (body.role === 'adviser') {
    return navigateTo("/adviser/advisory", { replace: true });

  } else if (body.role === 'admin') {
    return navigateTo("/admin/dashboard", { replace: true });
  }
};

onMounted(() => {
  userLogInStore.resetAllData();
});

</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
      <h1 class="text-2xl font-semibold text-center text-gray-800 mb-6">Log In</h1>
      <form @submit.prevent="handleFormSubmit">
        <div class="mb-4">
            <label for="email" class="block text-gray-700 mb-1">Email</label>
            <input v-model="userLogInStore.email" type="email" id="email" placeholder="Email" required
              class="w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div class="mb-6">
            <label for="password" class="block text-gray-700 mb-1">Password</label>
            <input v-model="userLogInStore.password" type="password" id="password" placeholder="Password" required
              class="w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div class="mb-6">
            <label for="role" class="block text-gray-700 mb-1">Role</label>
            <select v-model="userLogInStore.role"
              class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" required>
              <option value="" disabled></option>
              <option value="adviser">Adviser</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div v-if="userLogInStore.errorMessage" class="text-red-500 mb-4">{{ userLogInStore.errorMessage }}</div>
          <button type="handleFormSubmit"
            class="w-full bg-blue-500 p-2 text-white rounded-md hover:bg-blue-600 transition duration-300">
            Log In
          </button>
          <div class="text-center mt-4">
            <p class="text-gray-500">OR</p>
            <NuxtLink to="/auth/signup/step1" class="text-blue-500 hover:underline">Register Here</NuxtLink>
          </div>
      </form>
    </div>
  </div>
</template>
