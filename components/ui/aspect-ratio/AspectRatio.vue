<script setup lang="ts">
  import { AspectRatio } from "radix-vue";
  import type { AspectRatioProps } from "radix-vue";

  const props = defineProps<AspectRatioProps>();
</script>

<template>
  <AspectRatio v-bind="props">
    <slot />
  </AspectRatio>
</template>
