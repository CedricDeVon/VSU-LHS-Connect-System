<template>
    <header>
      <UiNavbar sticky class="z-20 border-b bg-primary text-primary-foreground backdrop-blur">
        <UiContainer class="flex h-16 w-full items-center justify-between lg:h-20">
          <div class="flex items-center gap-0">
            <NuxtLink to="/" class="flex items-center gap-3">
              <span>Nuxt Tutorial</span>
            </NuxtLink>
          </div>
          <div class="w-1/2 items-center gap-3 lg:flex">
            <div>Search bar</div>
            <UiButton v-if="!user" to="/login" variant="secondary" size="sm" class="w-20"
              >Log In</UiButton
            >
            <UiButton @click="logout" v-else variant="secondary" size="sm" class="w-20">
              Log out
            </UiButton>
          </div>
        </UiContainer>
      </UiNavbar>
    </header>
  </template>
  
  <script setup lang="ts">
    // import { signOut } from "firebase/auth";
  
    // const user = useCurrentUser();
    // const auth = useFirebaseAuth()!;
    // const logout = async () => {
    //   await signOut(auth);
    //   navigateTo("/");
    // };
  </script>
  