<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg w-full max-w-4xl mx-4">
        <header class="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <h3 class="text-xl font-semibold text-gray-900">Upcoming Case Conferences</h3>
          <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
            <Icon name="lucide:x" class="h-6 w-6" />
          </button>
        </header>
        
        <main class="p-6 max-h-[70vh] overflow-y-auto">
          <div v-if="conferences.length === 0" class="text-center text-gray-500 py-8">
            No upcoming case conferences scheduled.
          </div>
          <div v-else v-for="(confs, date) in groupedConferences" :key="date" class="mb-8">
            <div class="flex items-center gap-2 mb-4">
              <Icon name="lucide:calendar" class="h-5 w-5 text-green-600" />
              <h4 class="text-lg font-semibold text-gray-800">{{ date }}</h4>
            </div>
            <div class="space-y-4">
              <div v-for="conf in confs" :key="conf.caseConDocID" 
                class="bg-white p-4 rounded-lg border border-gray-200 hover:border-green-300 transition-colors">
                <div class="flex justify-between items-start gap-4">
                  <div class="space-y-2">
                    <p class="text-base font-medium text-gray-900">
                      Student: {{ conf.studentName }}
                    </p>
                    <p class="text-sm text-gray-600">
                      Section: {{ conf.gradeAndSection }}
                    </p>
                    <p class="text-sm text-gray-600">
                      Incident: {{ conf.circumstance }}
                    </p>
                  </div>
                  <button 
                    @click="viewIncidentDetails(conf.incidentID)"
                    class="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
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
  interface Conference {
    caseConDocID: string;
    conferenceDate: string;
    studentName: string;
    circumstance: string;
    gradeAndSection: string;
    incidentID: string;
  }
  
  const props = defineProps<{
    conferences: Conference[];
    unresolvedIncidents: string[]; // Add new prop for unresolved incident IDs
  }>();
  
  const emit = defineEmits(['close']);
  const router = useRouter();
  
  const viewIncidentDetails = (incidentId: string) => {
    emit('close'); // Close modal first
    router.push(`/admin/incident/${incidentId}`); // Navigate to incident details
  };
  
  const groupedConferences = computed(() => {
    // Filter conferences to only include those with unresolved incidents
    const filteredConferences = props.conferences.filter(conf => 
      props.unresolvedIncidents.includes(conf.incidentID)
    );
  
    return filteredConferences.reduce((groups, conference) => {
      if (!groups[conference.conferenceDate]) {
        groups[conference.conferenceDate] = [];
      }
      groups[conference.conferenceDate].push(conference);
      return groups;
    }, {} as Record<string, Conference[]>);
  });
  </script>
  
  <style scoped>
  .max-h-[70vh] {
    max-height: 70vh;
  }
  </style>