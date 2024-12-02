<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-4xl mx-4">
      <header class="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
        <h3 class="text-xl font-semibold text-gray-900">Unread Report Submissions</h3>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
          <Icon name="lucide:x" class="h-6 w-6" />
        </button>
      </header>
      
      <main class="p-6 max-h-[70vh] overflow-y-auto">
        <div v-if="reports.length === 0" class="text-center text-gray-500 py-8">
          No unread reports found.
        </div>
        <div v-else v-for="(reps, date) in groupedReports" :key="date" class="mb-8">
          <div class="flex items-center gap-2 mb-4">
            <Icon name="lucide:mail" class="h-5 w-5 text-red-600" />
            <h4 class="text-lg font-semibold text-gray-800">{{ date }}</h4>
          </div>
          <div class="space-y-4">
            <div v-for="report in reps" :key="report.id" 
              class="bg-white p-4 rounded-lg border border-gray-200 hover:border-red-300 transition-colors">
              <div class="flex justify-between items-start gap-4">
                <div class="space-y-2">
                  <p class="text-base font-medium text-gray-900">
                    Students: {{ report.data.peopleInvolved.join(', ') }}
                  </p>
                  <p class="text-sm text-gray-600">
                    Place: {{ report.data.placeOfIncident }}
                  </p>
                  <p class="text-sm text-gray-600">
                    Items Involved: {{ report.data.thingsInvolved }}
                  </p>
                  <p class="text-sm text-gray-500 line-clamp-2">
                    {{ report.data.narrativeReport }}
                  </p>
                </div>
                <button 
                  @click="viewReportDetails(report.id)"
                  class="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer class="p-4 border-t border-gray-200 flex justify-end bg-gray-50">
        <button @click="$emit('close')" 
          class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
          Close
        </button>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  reports: [];
}>();

const emit = defineEmits(['close']);
const router = useRouter();

const viewReportDetails = (reportId: string) => {
  emit('close');
  router.push(`/admin/reports/${reportId}`);
};

const groupedReports = computed(() => {
  return props.reports.reduce((groups: any, report: any) => {
    if (!groups[report.dateFormatted]) {
      groups[report.dateFormatted] = [];
    }
    groups[report.dateFormatted].push(report);
    return groups;
  }, {} as Record<string, []>);
});
</script>

<style scoped>
.max-h-[70vh] {
  max-height: 70vh;
}
</style>