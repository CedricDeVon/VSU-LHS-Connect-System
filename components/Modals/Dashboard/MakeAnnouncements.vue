<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

    <div v-if="showSuccessAlert"
      class="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center gap-2 shadow-lg animate-fade-in">
      <Icon name="lucide:check-circle" class="h-5 w-5" />
      <span>Announcement posted successfully!</span>
    </div>

    <div class="bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4">
      <header class="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
        <h3 class="text-xl font-semibold text-gray-900">Make Announcement</h3>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
          <Icon name="lucide:x" class="h-6 w-6" />
        </button>
      </header>

      <main class="p-6">
        <form class="space-y-6">
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
            <input id="title" v-model="form.title" type="text"
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              required />
          </div>

          <div>
            <label for="content" class="block text-sm font-medium text-gray-700">Content</label>
            <textarea id="content" v-model="form.content" rows="6"
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              required></textarea>
          </div>

          <!-- Add draft indicator -->
          <div class="flex items-center justify-between text-sm text-gray-500">
            <span v-if="isDraft" class="italic">Saved as draft</span>
            <span v-else-if="autoSaved" class="italic">Auto-saved</span>
            <span v-else>&nbsp;</span>
            <span>Last saved: {{ lastSaved || 'Never' }}</span>
          </div>
        </form>
      </main>

      <footer class="p-4 border-t border-gray-200 bg-gray-50 flex justify-between space-x-3">
        <div>
          <button @click="$emit('close')"
            class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
            Cancel
          </button>
        </div>
        <div>
          <button @click="clearForm" type="button"
            class="px-4 py-2 mr-3 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
            Clear
          </button>
          <button @click="saveDraft"
            class="px-4 py-2 mr-3 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
            Save Draft
          </button>
          <button @click="handleSubmit" :disabled="!form.title || !form.content"
            class="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed">
            Post Announcement
          </button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['close', 'submit', 'save-draft']);
const props = defineProps<{
  existingDraft?: {
    title: string;
    content: string;
    lastSaved?: string;
  }
}>();

const form = ref({
  title: props.existingDraft?.title || '',
  content: props.existingDraft?.content || ''
});

const isDraft = ref(false);
const autoSaved = ref(false);
const lastSaved = ref(props.existingDraft?.lastSaved || '');
const autoSaveTimeout = ref<NodeJS.Timeout | null>(null);

const updateLastSaved = () => {
  lastSaved.value = new Date().toLocaleTimeString();
};

const saveDraft = () => {
  isDraft.value = true;
  autoSaved.value = false;
  updateLastSaved();
  emit('save-draft', {
    ...form.value,
    date: new Date().toISOString(),
    isDraft: true
  });
};

const showSuccessAlert = ref(false);

const handleSubmit = () => {
  if (!form.value.title || !form.value.content) return;

  const announcementData = {
    ...form.value,
    date: new Date().toISOString(),
    isDraft: false
  };

  isDraft.value = false;
  autoSaved.value = false;
  updateLastSaved();

  // Show success alert and emit after delay
  showSuccessAlert.value = true;
  setTimeout(() => {
    emit('submit', announcementData); // Changed from reportData to announcementData
    showSuccessAlert.value = false;
    emit('close');
  }, 2000);
};

const clearForm = () => {
  form.value = {
    title: '',
    content: ''
  };
  isDraft.value = false;
  autoSaved.value = false;
};

// Auto-save functionality
watch([() => form.value.title, () => form.value.content], () => {
  if (autoSaveTimeout.value) {
    clearTimeout(autoSaveTimeout.value);
  }

  autoSaveTimeout.value = setTimeout(() => {
    if (form.value.title || form.value.content) {
      autoSaved.value = true;
      isDraft.value = false;
      updateLastSaved();
      emit('save-draft', {
        ...form.value,
        date: new Date().toISOString(),
        isDraft: true,
        isAutoSave: true
      });
    }
  }, 3000); // Auto-save after 3 seconds of inactivity
});

onBeforeUnmount(() => {
  if (autoSaveTimeout.value) {
    clearTimeout(autoSaveTimeout.value);
  }
});

onMounted(() => {
  if (props.existingDraft) {
    isDraft.value = true;
  }
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
