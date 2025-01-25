<script setup>
import { useRouter } from 'vue-router';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseKey);

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and Key are required');
}

const supabase = createClient(supabaseUrl, supabaseKey);

const router = useRouter();

router.replace('/auth/login');
</script>

<template>
  <NuxtPage/>
</template>
