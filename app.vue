<script setup lang="ts">
import { createClient } from "@supabase/supabase-js";

const { supabaseUrl, supabaseKey } = useRuntimeConfig().public;
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  console.log(supabase)
  
  const { data } = await supabase.schema('production').from('admin_status').select();
  console.log(data)
}

await test();

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
