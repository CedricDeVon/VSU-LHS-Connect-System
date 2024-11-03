<script setup lang="ts">
import { signInWithEmailAndPassword } from "firebase/auth";
import { toTypedSchema } from '@vee-validate/yup';

const auth = useFirebaseAuth()!;
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(loginSchema),
});

const submit = handleSubmit(async (values) => {
  const loading = useSonner.loading("Error", {
    description: "Please re-check your email and password",
  });

  try {
    await signInWithEmailAndPassword(auth, values.email, values.password);
    useSonner.success("Sign in successful", { id: loading });
    return navigateTo("/AdminDashboard", { replace: true });

  } catch (error: any) {
    useSonner.error("Error", {
      id: loading,
      description: error.message
    });
  }
});
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
      <h1 class="text-2xl font-semibold text-center text-gray-800 mb-6">Log In</h1>
      <form @submit.prevent="submit">
        <fieldset :disabled="isSubmitting">
          <div class="mb-4">
            <label for="email" class="block text-gray-700 mb-1">Email</label>
            <UiVeeInput type="email" id="email" placeholder="Email" required
              class="w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div class="mb-6">
            <label for="password" class="block text-gray-700 mb-1">Password</label>
            <UiVeeInput type="password" id="password" placeholder="Password" required
              class="w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <UiButton type="submit"
            class="w-full bg-blue-500 p-2 text-white rounded-md hover:bg-blue-600 transition duration-300">
            Log In
          </UiButton>
          <div class="text-center mt-4">
            <p class="text-gray-500">OR</p>
            <NuxtLink to="/SignupPage1" class="text-blue-500 hover:underline">Register Here</NuxtLink>
          </div>
        </fieldset>
      </form>
    </div>
  </div>
</template>
