<script setup lang="ts">
  //import { createClient } from "@supabase/supabase-js";

  // const { VITE_SUPABASE_URL, VITE_SUPABASE_KEY } = useRuntimeConfig().public;
  // const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_KEY);
  // console.log(supabase);

  useHead({
    title: "VSU-LHS Connect System",
    link: [
      {
        rel: "icon",
        type: "image/webp",
        href: "/icon.webp",
      },
    ],
  });
</script>

<template>
  <NuxtPage />
</template>
