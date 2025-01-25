<script>
export default {
  name: 'PageHeader',
  props: {
    academicYear: {
      type: String,
      required: true
    }
  }
}
</script>

<template>
  <div class="relative z-10 px-20 pt-6 pb-4 border-b border-gray-200">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-800">
        Academic Year {{ academicYear }}
      </h1>
      <slot></slot> <!-- For any additional header content -->
    </div>
  </div>
</template>

