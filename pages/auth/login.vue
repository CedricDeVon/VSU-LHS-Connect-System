<script setup lang="ts">
import { userLoginStore } from '@/stores/userLogin'
import { signInWithEmailAndPassword } from "firebase/auth";
import { FailedResult } from '~/library/results/failedResult';
import type { Result } from '~/library/results/result';
import { SuccessfulResult } from '~/library/results/successfulResult';

const store = userLoginStore()
const auth = useFirebaseAuth()!;

const submit = async () => {  
  const body = store.getAllData();
  const apiResult: any = await $fetch('/api/user/logIn', { method: 'POST', body });
  if (!apiResult.isSuccessful) {
    store.errorMessage = apiResult.message;
    return;
  }
  const firebaseResult = await validateUserPassword();
  if (firebaseResult.isNotSuccessful) {
    store.errorMessage = firebaseResult.message;
    return;
  }

  store.resetAllData();
  if (apiResult.isAdmin) { // Admin
    return navigateTo("/admin/dashboard", { replace: true });
  }
  else if (!apiResult.status) { // Unverified Adviser
    return navigateTo("/adviser/pending", { replace: true });
  }
  else { // Verified Adviser
    return navigateTo("/adviser/dashboard", { replace: true });
  }
};



async function validateUserPassword(): Promise<Result> {
  try {
    const userData = store.getAllData();
    await signInWithEmailAndPassword(auth, userData.email, userData.password);
    return new SuccessfulResult();

  } catch (error: any) {
    return new FailedResult('User password does not match');
  }
}

onMounted(() => {
  store.resetAllData();
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
            <NuxtLink to="/auth/register" class="text-blue-500 hover:underline">Register Here</NuxtLink>
          </div>
      </form>
    </div>
  </div>
</template>
