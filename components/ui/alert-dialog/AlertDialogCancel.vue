<script setup lang="ts">
  import { buttonVariants } from "~/components/Ui/button";
  import { cn } from "@/lib/utils";
  import { AlertDialogCancel } from "radix-vue";
  import { computed } from "vue";
  import type { AlertDialogCancelProps } from "radix-vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<AlertDialogCancelProps & { class?: HTMLAttributes["class"] }>();

  const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
  });
</script>

<template>
  <AlertDialogCancel
    v-bind="delegatedProps"
    :class="cn(buttonVariants({ variant: 'outline' }), 'mt-2 sm:mt-0', props.class)"
  >
    <slot />
  </AlertDialogCancel>
</template>
