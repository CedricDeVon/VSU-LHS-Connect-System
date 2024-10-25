<template>
    <div class="flex w-full items-center justify-center">
      <UiDatepicker v-model="date">
        <template #default="{ inputValue, inputEvents }">
          <UiInput placeholder="DD/MM/YYYY" :value="inputValue" v-on="inputEvents" />
        </template>
      </UiDatepicker>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, watch, defineEmits } from 'vue';
  
  const date = ref();
  const emit = defineEmits(['update:modelValue']);
  
  watch(date, (value) => {
    emit('update:modelValue', value);
  });
  </script>