<script setup lang="ts">
import { Result } from "~/library/results/result";
import { UserSecurity } from "~/library/security/userSecurity";
import { signOut } from "firebase/auth";
import { ref, onMounted, computed, onUnmounted } from 'vue';

const auth = useFirebaseAuth()

const signOutUser = async () => {
  const result: Result = await UserSecurity.signOutUser(auth);
  return navigateTo('/auth/login');
}

const showNotifications = ref(false);
const notifications = ref<Notification[]>([]);
const unreadCount = ref(0);
const notificationRef = ref(null);

interface Notification {
  id: string;
  type: 'incident' | 'account' | 'system';  // Added type field
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  incidentId?: string;
}

const router = useRouter();

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value;
  if (showNotifications.value) {
    markAllAsRead();
  }
};

const markAllAsRead = () => {
  notifications.value = notifications.value.map(notif => ({
    ...notif,
    read: true
  }));
  updateUnreadCount();
  // Store in localStorage
  localStorage.setItem('admin-notifications', JSON.stringify(notifications.value));
};

const updateUnreadCount = () => {
  unreadCount.value = notifications.value.filter(n => !n.read).length;
};

const handleNotificationClick = (notification: Notification) => {
  if (notification.incidentId) {
    router.push(`/admin/incident/${notification.incidentId}`);
  }
  notification.read = true;
  updateUnreadCount();
  showNotifications.value = false;
  // Update localStorage
  localStorage.setItem('admin-notifications', JSON.stringify(notifications.value));
};

const formatTimeAgo = (date: Date) => {
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

// Add new notification type helpers
const getNotificationTypeClass = (type: string) => {
  const classes = {
    incident: 'bg-red-500',
    account: 'bg-blue-500',
    system: 'bg-green-500'
  };
  return classes[type] || classes.system;
};

const getNotificationIcon = (type: string) => {
  const icons = {
    incident: 'heroicons:exclamation-circle',
    account: 'heroicons:user-circle',
    system: 'heroicons:bell'
  };
  return icons[type] || icons.system;
};

// Add sorting for notifications
const sortedNotifications = computed(() => {
  return [...notifications.value].sort((a, b) => {
    // Sort by unread first, then by timestamp
    if (a.read !== b.read) return a.read ? 1 : -1;
    return b.timestamp.getTime() - a.timestamp.getTime();
  });
});

// Modified notification creation for pending accounts
const createAccountRequestNotification = (adviser: any) => {
  const newNotification: Notification = {
    id: `notif-${Date.now()}`,
    type: 'account',
    title: 'New Account Request',
    message: `${adviser.firstName} ${adviser.lastName} has requested to register as an adviser.`,
    timestamp: new Date(),
    read: false
  };
  notifications.value.unshift(newNotification);
  updateUnreadCount();
  localStorage.setItem('admin-notifications', JSON.stringify(notifications.value));
};

// Expose the function for use in other components
defineExpose({
  createAccountRequestNotification
});

onMounted(() => {
  // Load notifications from localStorage
  const storedNotifications = localStorage.getItem('admin-notifications');
  if (storedNotifications) {
    notifications.value = JSON.parse(storedNotifications).map((n: any) => ({
      ...n,
      timestamp: new Date(n.timestamp)
    }));
    updateUnreadCount();
  }
  
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

const closeNotifications = () => {
  showNotifications.value = false;
};

const handleClickOutside = (event: Event) => {
  if (notificationRef.value && !notificationRef.value.contains(event.target as Node)) {
    showNotifications.value = false;
  }
};
</script>

<template>
  <header class="flex justify-between items-center p-4 shadow-sm">

    <div></div>
    <div class="flex items-center gap-6"> <!-- Increased gap from gap-4 to gap-6 -->
      <!-- Notification Bell -->
      <div class="relative" ref="notificationRef"> <!-- Added flex and items-center -->
        <button @click.stop="toggleNotifications" 
          class="relative p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center h-10 w-10"
          ref="notificationBell"> <!-- Add ref to the button -->
          <Icon name="mdi:bell-outline" class="w-6 h-6 text-[#265630]" />
          <span v-if="unreadCount > 0"
            class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {{ unreadCount }}
          </span>
        </button>

        <!-- Notification Dropdown - Updated positioning -->
        <Transition
          enter-active-class="transition ease-out duration-200"
          enter-from-class="opacity-0 translate-y-1"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition ease-in duration-150"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 translate-y-1"
        >
          <div v-if="showNotifications"
            class="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-xl border border-gray-100 z-50"
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
            </div>
            <div class="max-h-[480px] overflow-y-auto">
              <div v-if="notifications.length === 0" 
                class="p-8 text-center text-gray-500 flex flex-col items-center">
                <Icon name="heroicons:bell-slash" class="w-12 h-12 text-gray-300 mb-2" />
                <p>No notifications yet</p>
              </div>
              <div v-else>
                <div v-for="notification in sortedNotifications" :key="notification.id"
                  @click="handleNotificationClick(notification)"
                  class="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition-colors"
                  :class="{ 'bg-green-50': !notification.read }">
                  <div class="flex items-start gap-4">
                    <div class="flex-shrink-0">
                      <div class="w-10 h-10 rounded-full flex items-center justify-center"
                        :class="getNotificationTypeClass(notification.type)">
                        <Icon :name="getNotificationIcon(notification.type)" class="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-900 mb-0.5">{{ notification.title }}</p>
                      <p class="text-sm text-gray-600 line-clamp-2">{{ notification.message }}</p>
                      <p class="text-xs text-gray-500 mt-1">{{ formatTimeAgo(notification.timestamp) }}</p>
                    </div>
                    <div v-if="!notification.read" 
                      class="w-2.5 h-2.5 bg-green-500 rounded-full flex-shrink-0"></div>
                  </div>
                </div>
              </div>
            </div>
            </Transition>
          </div>
      </div>

      <!-- User Profile and Logout -->
      <button @click="signOutUser" 
        class="h-10 px-6 text-sm font-medium text-white bg-728B78 hover:bg-[#556859] rounded-lg transition-colors flex items-center justify-center"
        aria-label="Log out">
        Log out
      </button>
    </div>
  </header>
</template>

<style scoped>
.bg-728B78 {
  background-color: #728B78;
}

.bg-728B78:hover {
  background-color: #556859;
}
.logout-button {
  font-size: 0.875rem;
  font-family: 'Century Gothic', sans-serif;
}

/* Custom Scrollbar Styling */
.max-h-96 {
  scrollbar-width: thin; /* For Firefox */
  scrollbar-color: rgba(114, 139, 120, 0.3) rgba(243, 244, 246, 0.5); /* Reduced opacity for Firefox */
}

/* For Webkit browsers (Chrome, Safari, etc) */
.max-h-96::-webkit-scrollbar {
  width: 4px; /* Reduced from 6px to 4px */
}

.max-h-96::-webkit-scrollbar-track {
  background: rgba(243, 244, 246, 0.5);
  border-radius: 8px;
}

.max-h-96::-webkit-scrollbar-thumb {
  background-color: rgba(114, 139, 120, 0.3); /* Reduced opacity */
  border-radius: 8px;
}

.max-h-96::-webkit-scrollbar-thumb:hover {
  background-color: rgba(85, 104, 89, 0.5); /* Slightly more visible on hover */
}

/* Add smooth transition for notification dropdown */
.transform {
  transform: none;
}

.transition-all {
  transition: all 0.2s ease-out;
}

/* Improve scrollbar styling */
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

/* Add new dropdown positioning styles */
.top-full {
  top: calc(100% + 0.25rem);
}

/* Add new transition classes */
.transition {
  transition-property: opacity, transform;
}

.translate-y-1 {
  transform: translateY(0.25rem);
}

.translate-y-0 {
  transform: translateY(0);
}
</style>