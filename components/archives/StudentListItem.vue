
<template>
  <button
    class="w-full p-3 text-left hover:bg-gray-50 transition-colors"
    :class="{'bg-green-50': isSelected}"
    @click="$emit('click')">
    <div class="flex items-center space-x-3">
      <div class="flex-1">
        <p class="font-medium">{{ student.lastName }}, {{ student.firstName }}</p>
        <p class="text-sm text-gray-500">ID: {{ student.studentId }}</p>
      </div>
    </div>
  </button>
</template>

<script setup lang="ts">
defineProps({
  student: {
    type: Object,
    required: true
  },
  isSelected: {
    type: Boolean,
    default: false
  }
});
</script>