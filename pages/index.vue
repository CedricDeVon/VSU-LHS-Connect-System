<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

router.replace("/auth/login");
</script>

<template>
  <NuxtPage />
</template>
