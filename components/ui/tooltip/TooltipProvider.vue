<script setup lang="ts">
  import { TooltipProvider } from "radix-vue";
</script>

<template>
  <TooltipProvider>
    <slot />
  </TooltipProvider>
</template>
