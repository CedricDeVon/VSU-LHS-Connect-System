<template>
  <div class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-center justify-center min-h-screen p-4">
      <!-- Overlay -->
      <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" @click="$emit('close')"></div>

      <!-- Modal -->
      <div class="relative bg-white rounded-lg w-full max-w-2xl p-6 shadow-xl">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-semibold text-gray-900">Assign Section To Adviser</h3>
          <button @click="$emit('close')" class="text-gray-400 hover:text-gray-500">
            <span class="sr-only">Close</span>
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Editable Fields -->
          <div class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div class="form-group">
                  <label class="block text-sm font-medium text-gray-700">Section ID</label>
                  <input type="text" :value="section.id" disabled
                    class="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-600">
                </div>
              </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700">Faculty ID</label>
                <input v-model="formData.facultyId" type="text"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  :class="{ 'border-red-500': errors.facultyId }">
                <p v-if="errors.facultyId" class="mt-1 text-sm text-red-600">{{ errors.facultyId }}</p>
              </div>
              </div>
          </div>
          <!-- Footer -->
          <div class="flex items-center justify-between mt-6 pt-4 border-t">
            <div>
              <!-- Secondary Action -->
              <button type="button" @click="$emit('close')"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200">
                Cancel
              </button>
            </div>
            <div class="flex items-center space-x-3">
              <button type="submit"
                class="px-6 py-2 text-sm font-medium text-white bg-[#265630] border border-transparent rounded-md hover:bg-[#728B78] transition-colors duration-200 flex items-center space-x-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
                <span>Assign</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { TimeConverters } from '~/library/timeConverters/timeConverters';
export default {
  name: 'AssignSectionToAdviser',
  props: {
    section: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      formData: {
        facultyId: '',
        sectionId: this.section.id
      },
      errors: {}
    }
  },

  methods: {
    async handleSubmit() {
      const result = await $fetch('/api/admin/assignSectionToAdviser', {
        method: 'POST',
        body: this.formData
      });
      if (result.isNotSuccessful) {
        alert(result.message)
        this.formData.facultyId = '';
        return;
      }

      this.$emit('handle-submit-close');
      alert('Adviser Successfully Assigned Into A Section');
      this.$emit('close');
      this.formData.facultyId = '';
    },

    handleClose() {
      this.$emit('close');

      this.formData.facultyId = '';
    }
  }
}
</script>