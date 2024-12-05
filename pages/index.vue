<script setup lang="ts">

definePageMeta({
  middleware: ['authenticate-and-authorize-admin']
});

navigateTo('/auth/login', { replace: true })

</script>

<template>
  <div>

  </div>
</template>
