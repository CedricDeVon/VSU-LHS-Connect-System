<template>
  <div class="admin-header h-14 w-screen flex items-center">
    <div class="px-5 w-full flex justify-between items-center">
      <div class="flex space-x-4">
        <button @click="goToHomepage" 
          class="button px-7 py-2 rounded-lg focus:outline-none"
          aria-label="Homepage">
          Homepage
        </button>  
        <button @click="goToAdvisory" 
          class="button px-7 py-2 rounded-lg focus:outline-none"
          aria-label="Advisory">
          Advisory
        </button> 
        <button @click="goToReports" 
          class="button px-7 py-2 rounded-lg focus:outline-none"
          aria-label="Reports">
          Reports
        </button> 
      </div>

      <header class="flex justify-end items-center p-4">
        <div class="flex items-center gap-5">
          <!-- Notification Bell -->
          <div class="relative" ref="notificationRef">
            <button @click.stop="toggleNotifications" 
              class="relative hover:scale-110 cursor-pointer focus:outline-none">
              <img src="~/assets/icons/bell.svg" alt="Notifications" class="w-8 object-contain aspect-square" />
              <span v-if="unreadCount > 0"
                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {{ unreadCount }}
              </span>
            </button>

            <!-- Notification Dropdown -->
            <Transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-1"
            >
              <div v-if="showNotifications"
                class="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-xl border border-gray-100 z-101"
                :style="{ maxHeight: 'calc(100vh - 80px)' }">
                <div class="p-4 border-b border-gray-100">
                  <div class="flex justify-between items-center">
                    <h3 class="text-lg font-semibold text-gray-900">Notifications</h3>
                    <button v-if="unreadCount > 0" @click="markAllAsRead"
                      class="text-sm text-green-600 hover:text-green-700 font-medium">
                      Mark all as read
                    </button>
                  </div>
                </div>

                <div class="max-h-[480px] overflow-y-auto">
                  <div v-if="notifications.length === 0" 
                    class="p-8 text-center text-gray-500">
                    <p>No notifications</p>
                  </div>
                  <div v-else>
                    <div v-for="notification in sortedNotifications" :key="notification.announcementId"
                      class="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition-colors"
                      :class="{ 'bg-green-50': notification.isNew }">
                      <div class="flex items-start gap-4">
                        <div class="flex-1 min-w-0">
                          <p class="text-sm font-medium text-gray-900 mb-0.5">{{ notification.announcementTitle }}</p>
                          <p class="text-sm text-gray-600 line-clamp-2">{{ notification.announcementContent }}</p>
                          <p class="text-xs text-gray-500 mt-1">{{ formatTimeAgo(notification.announcementDate) }}</p>
                        </div>
                        <div v-if="notification.isNew" 
                          class="w-2.5 h-2.5 bg-green-500 rounded-full flex-shrink-0"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
          
          <button @click="goToSettings" class="hover:scale-110 cursor-pointer focus:outline-none">
            <img loading="lazy"
            src="~/assets/icons/menu.svg"
            alt="Menu" class="w-8 object-contain aspect-square " />
          </button>
        </div>
      </header>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from 'vue';
import { announcement } from '~/data/announcement';

const showNotifications = ref(false);
const notifications = ref([]);
const unreadCount = ref(0);
const notificationRef = ref(null);

const router = useRouter();

// Add navigation methods
const goToHomepage = () => {
  router.push('/adviser/homepage');
};

const goToAdvisory = () => {
  router.push('/adviser/advisory');
};

const goToReports = () => {
  router.push('/adviser/reports');
};

const goToSettings = () => {
  router.push('/adviser/settings');
};

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value;
  if (showNotifications.value) {
    markAllAsRead();
  }
};

const markAllAsRead = () => {
  notifications.value = notifications.value.map(notif => ({
    ...notif,
    isNew: false
  }));
  updateUnreadCount();
  localStorage.setItem('adviser-notifications', JSON.stringify(notifications.value));
};

const updateUnreadCount = () => {
  unreadCount.value = notifications.value.filter(n => n.isNew).length;
};

const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return 'Just now';
};

const sortedNotifications = computed(() => {
  return [...notifications.value].sort((a, b) => {
    if (a.isNew !== b.isNew) return a.isNew ? -1 : 1;
    return new Date(b.announcementDate).getTime() - new Date(a.announcementDate).getTime();
  });
});

onMounted(() => {
  // Load notifications from announcement data
  notifications.value = announcement
    .filter(notif => notif.isActive)
    .map(notif => ({
      ...notif,
      type: 'announcement'
    }));
  updateUnreadCount();
  
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

const handleClickOutside = (event: Event) => {
  if (notificationRef.value && !notificationRef.value.contains(event.target as Node)) {
    showNotifications.value = false;
  }
};
</script>

<style scoped>
.admin-header{
  font-family: 'Century Gothic', sans-serif;
  background: #265630;
  z-index: 1001;
}

.button{
  font-family: 'Century Gothic', sans-serif;
  font-size: 17px;
  font-weight: 500;
  background-color: #265630;
  color: white;
  border: none;
  cursor: pointer;
}

.button:hover{
  background-color: white;
  color: #265630;
}

/* Add new styles for notifications */
.max-h-[480px] {
  scrollbar-width: thin;
  scrollbar-color: rgba(114, 139, 120, 0.3) transparent;
}

.max-h-[480px]::-webkit-scrollbar {
  width: 4px;
}

.max-h-[480px]::-webkit-scrollbar-track {
  background: transparent;
}

.max-h-[480px]::-webkit-scrollbar-thumb {
  background-color: rgba(114, 139, 120, 0.3);
  border-radius: 4px;
}
</style>
