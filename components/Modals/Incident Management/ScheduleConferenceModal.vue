<template>
  <Transition
    enter-active-class="transition ease-out duration-200"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition ease-in duration-150"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 font-century-gothic">
      <Transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enter-to-class="opacity-100 translate-y-0 sm:scale-100"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100 translate-y-0 sm:scale-100"
        leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        <div class="bg-[#F8F9FA] rounded-2xl w-[550px] max-h-[90vh] flex flex-col shadow-xl relative transform">
          <!-- Header -->
          <div class="bg-[#265630] px-8 py-5 rounded-t-2xl flex items-center justify-between border-b border-[#1a3d21]">
            <div>
              <h2 class="text-2xl font-bold text-white tracking-tight">Schedule Case Conference</h2>
              <p class="text-sm text-gray-200 mt-1 tracking-wide">Reference ID: {{ generateReferenceId() }}</p>
            </div>
            <button @click="$emit('close')" 
                    class="text-white hover:text-gray-200 transition-colors p-1">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Form Content -->
          <div class="p-8 overflow-y-auto bg-gradient-to-b from-white to-[#F8F9FA]">
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Conference Details Section -->
              <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
                <div class="flex items-center space-x-2 text-[#265630] mb-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <h3 class="font-bold text-lg">Conference Details</h3>
                </div>
                
                <!-- Date and Time Grid -->
                <div class="grid grid-cols-2 gap-6">
                  <!-- Date Picker -->
                  <div class="space-y-2">
                    <label class="block text-sm font-semibold text-gray-700">Date of Conference</label>
                    <div class="relative">
                      <input 
                        type="date" 
                        v-model="formData.date"
                        class="w-full pl-10 pr-4 py-2.5 rounded-lg border-gray-300 focus:border-[#265630] focus:ring focus:ring-[#265630] focus:ring-opacity-50 shadow-sm"
                        :min="new Date().toISOString().split('T')[0]"
                        required
                      >
                      <span class="absolute left-3 top-3 text-gray-500">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </span>
                    </div>
                  </div>

                  <!-- Time Picker -->
                  <div class="space-y-2">
                    <label class="block text-sm font-semibold text-gray-700">Time</label>
                    <div class="relative">
                      <input 
                        type="time" 
                        v-model="formData.time"
                        class="w-full pl-10 pr-4 py-2.5 rounded-lg border-gray-300 focus:border-[#265630] focus:ring focus:ring-[#265630] focus:ring-opacity-50 shadow-sm"
                        required
                      >
                      <span class="absolute left-3 top-3 text-gray-500">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Notes Section -->
              <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div class="flex items-center space-x-2 text-[#265630] mb-4">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 class="font-bold text-lg">Agenda & Notes</h3>
                </div>
                <textarea
                  v-model="formData.notes"
                  rows="4"
                  class="w-full rounded-lg border-gray-300 focus:border-[#265630] focus:ring focus:ring-[#265630] focus:ring-opacity-50 shadow-sm resize-none"
                  placeholder="Enter meeting agenda, required materials, or any special instructions..."
                ></textarea>
              </div>

              <!-- Actions -->
              <div class="flex gap-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  @click="$emit('close')"
                  class="flex-1 px-4 py-2.5 border-2 border-[#265630] text-[#265630] rounded-lg font-medium hover:bg-[#265630] hover:text-white transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="flex-1 px-4 py-2.5 bg-[#265630] text-white rounded-lg font-medium hover:bg-[#1a3d21] transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Confirm & Notify</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script>
export default {
  name: 'ScheduleConferenceModal',
  data() {
    return {
      formData: {
        date: '',
        time: '',
        notes: ''
      }
    }
  },
  methods: {
    generateReferenceId() {
      const prefix = 'CONF';
      const timestamp = Date.now().toString().slice(-6);
      const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      return `${prefix}-${timestamp}-${random}`;
    },
    handleSubmit() {
      const conferenceData = {
        ...this.formData,
        scheduledAt: new Date().toISOString(),
        status: 'Pending'
      }
      this.$emit('schedule', conferenceData)
    }
  }
}
</script>

<style scoped>
/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #728B78;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #265630;
}

* {
  scrollbar-width: thin;
  scrollbar-color: #728B78 #f1f1f1;
}

/* Override default date/time picker styles */
input[type="date"]::-webkit-calendar-picker-indicator,
input[type="time"]::-webkit-calendar-picker-indicator {
  background: transparent;
  bottom: 0;
  color: transparent;
  cursor: pointer;
  height: auto;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: auto;
}

/* Add these animation classes */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>