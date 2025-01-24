<script setup lang="ts">
import { createClient } from "@supabase/supabase-js";

const { supabaseUrl, supabaseKey } = useRuntimeConfig().public;
const supabase = createClient(supabaseUrl, supabaseKey);
console.log(supabase);

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
  <div>
    
  </div>
</template>
