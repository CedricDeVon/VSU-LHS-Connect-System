<script setup>
  import { createClient } from "@supabase/supabase-js";
  import { useRouter } from "vue-router";
  import { useRuntimeConfig } from "#app";

  const config = useRuntimeConfig();
  const supabaseUrl = config.public.supabaseUrl;
  const supabaseKey = config.public.supabaseKey;

  console.log("Supabase URL:", supabaseUrl);
  console.log("Supabase Key:", supabaseKey);

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase URL and Key are required");
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const router = useRouter();

  router.replace("/auth/login");
</script>

<template>
  <NuxtPage />
</template>
