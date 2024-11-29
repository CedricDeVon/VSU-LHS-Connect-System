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
        <div class="bg-[#FFFEF1] rounded-2xl w-[800px] max-h-[90vh] flex flex-col transform">
          <!-- Header -->
          <div class="bg-[#265630] py-4 rounded-t-2xl">
            <h2 class="text-2xl font-bold text-white text-center">Case Conference History</h2>
            <button @click="$emit('close')" 
                    class="absolute top-4 right-4 text-white hover:text-gray-200">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Conference List -->
          <div class="overflow-y-auto p-6">
            <div class="space-y-4">
              <div v-for="conference in sortedConferences" :key="conference.caseConDocID"
                   @click="navigateToConference(conference.caseConDocID)"
                   class="bg-white rounded-lg p-4 border border-gray-200 hover:border-[#265630] transition-all conference-item cursor-pointer">
                <div class="flex justify-between items-start">
                  <div>
                    <h3 class="font-semibold text-[#265630]">
                      {{ formatDate(conference.conferenceDate) }} at {{ conference.time }}
                    </h3>
                    <p class="text-sm text-gray-600">{{ conference.studentName }}</p>
                  </div>
                  <span :class="{
                    'px-2 py-1 text-xs font-medium rounded-full': true,
                    'bg-green-100 text-green-800': conference.status === 'Completed',
                    'bg-yellow-100 text-yellow-800': conference.status === 'Pending',
                    'bg-blue-100 text-blue-800': conference.status === 'In Progress'
                  }">
                    {{ conference.status }}
                  </span>
                </div>
                <div class="mt-4 space-y-2">
                  <div v-if="conference.discussions" class="text-sm">
                    <span class="font-medium text-gray-700">Discussions:</span>
                    <p class="mt-1 text-gray-600">{{ conference.discussions }}</p>
                  </div>
                  <div v-if="conference.agreement" class="text-sm">
                    <span class="font-medium text-gray-700">Agreement:</span>
                    <p class="mt-1 text-gray-600">{{ conference.agreement }}</p>
                  </div>
                  <div v-if="conference.remarks" class="text-sm">
                    <span class="font-medium text-gray-700">Remarks:</span>
                    <p class="mt-1 text-gray-600">{{ conference.remarks }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="p-6 border-t border-gray-200">
            <button @click="$emit('close')" 
                    class="w-full bg-[#728B78] hover:bg-[#265630] text-white px-4 py-2 rounded-md transition-colors">
              Close
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script>
export default {
  name: 'ViewCaseConferencesModal',
  props: {
    conferences: {
      type: Array,
      required: true
    },
    incidentId: {  // Add this prop
      type: String,
      required: true
    }
  },
  computed: {
    sortedConferences() {
      return [...this.conferences].sort((a, b) => 
        new Date(b.conferenceDate) - new Date(a.conferenceDate)
      );
    }
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    navigateToConference(conferenceId) {
      this.$emit('close');
      // Simplified navigation with correct params
      this.$router.push(`/admin/incident/${this.incidentId}/conference/${conferenceId}`);
    }
  }
}
</script>

<style scoped>
/* Add smooth transition for hover effects */
.hover\:border-\[\#265630\]:hover {
  transition: all 0.2s ease;
}

.conference-item {
  transition: all 0.2s ease;
}

.conference-item:hover {
  transform: translateY(-2px);
}

/* Conference list item animations */
.conference-enter-active,
.conference-leave-active {
  transition: all 0.3s ease;
}

.conference-enter-from,
.conference-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>