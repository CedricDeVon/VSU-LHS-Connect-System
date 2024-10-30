<template>
    <div class="flex w-full items-center justify-center">
      <UiDatepicker v-model="date">
        <template #default="{ togglePopover }">
          <UiButton
            variant="outline"
            :class="[!date && 'text-muted-foreground', 'w-[260px] justify-start text-left']"
            @click="togglePopover"
          >
            <Icon name="lucide:calendar" class="h-4 w-4" />
            {{ date ? format(date, "MMMM dd, yyyy") : "Select a date" }}
          </UiButton>
        </template>
      </UiDatepicker>
    </div>
  </template>
  
  <script lang="ts" setup>
    import { addDays, format } from "date-fns";
    import {ref, watch, defineEmits} from 'vue';

    const date = ref<string | null>(null);
    const emit = defineEmits(['input']);

    watch(date,(newValue)=> {
      emit('input', newValue);
    });
  
  </script>
  