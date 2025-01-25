<script lang="ts" setup>
  import { RangeCalendarGridBody } from "radix-vue";
  import type { RangeCalendarGridBodyProps } from "radix-vue";

  const props = defineProps<RangeCalendarGridBodyProps>();
</script>

<template>
  <RangeCalendarGridBody v-bind="props">
    <slot />
  </RangeCalendarGridBody>
</template>
