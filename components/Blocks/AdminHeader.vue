<script setup lang="ts">
import { signOut } from "firebase/auth";
import { ref, onMounted } from 'vue';

const auth = useFirebaseAuth()!;
const showNotifications = ref(false);
const notifications = ref<Notification[]>([]);
const unreadCount = ref(0);

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  incidentId?: string;
}

const router = useRouter();

const logout = async () => {
  await signOut(auth);
  navigateTo("/LoginPage");
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

// Mock function to simulate receiving new notifications
const simulateNewNotification = () => {
  const newNotification: Notification = {
    id: `notif-${Date.now()}`,
    title: 'New Incident Report',
    message: 'A new incident has been reported by Adviser John Doe',
    timestamp: new Date(),
    read: false,
    incidentId: `incident-${Date.now()}`
  };
  notifications.value.unshift(newNotification);
  updateUnreadCount();
  // Store in localStorage
  localStorage.setItem('admin-notifications', JSON.stringify(notifications.value));
};

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
  
  // Simulate receiving new notifications periodically (for demo purposes)
  setInterval(simulateNewNotification, 300000); // Every 5 minutes
});
</script>

<template>
  <header class="flex justify-between items-center p-4 shadow-sm">
    <!-- Left side - Empty for now or you can add branding -->
    <div></div>
    
    <!-- Right side - Notifications and User Actions -->
    <div class="flex items-center gap-6"> <!-- Increased gap from gap-4 to gap-6 -->
      <!-- Notification Bell -->
      <div class="relative flex items-center"> <!-- Added flex and items-center -->
        <button @click="toggleNotifications" 
          class="relative p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center h-10 w-10"> <!-- Added fixed height/width and centering -->
          <Icon name="mdi:bell-outline" class="w-6 h-6 text-[#265630]" />
          <span v-if="unreadCount > 0"
            class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {{ unreadCount }}
          </span>
        </button>

        <!-- Notification Dropdown -->
        <div v-if="showNotifications"
          class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div class="p-4 border-b border-gray-200">
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-semibold text-gray-900">Notifications</h3>
              <button v-if="unreadCount > 0" @click="markAllAsRead"
                class="text-sm text-[#265630] hover:text-[#728B78]">
                Mark all as read
              </button>
            </div>
          </div>

          <div class="max-h-96 overflow-y-auto">
            <div v-if="notifications.length === 0" class="p-4 text-center text-gray-500">
              No notifications
            </div>
            <div v-else>
              <div v-for="notification in notifications" :key="notification.id"
                @click="handleNotificationClick(notification)"
                class="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
                :class="{ 'bg-blue-50': !notification.read }">
                <div class="flex items-start gap-3">
                  <div class="flex-shrink-0">
                    <div class="w-8 h-8 bg-[#265630] rounded-full flex items-center justify-center">
                      <Icon name="mdi:file-document-outline" class="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900">{{ notification.title }}</p>
                    <p class="text-sm text-gray-600">{{ notification.message }}</p>
                    <p class="text-xs text-gray-500 mt-1">{{ formatTimeAgo(notification.timestamp) }}</p>
                  </div>
                  <div v-if="!notification.read" class="w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- User Profile and Logout -->
      <button @click="logout" 
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
</style>

<!-- extra notification
 src="https://cdn.builder.io/api/v1/image/assets/TEMP/28ac4a43bf80933a5cd7ae9089be6c5d7b9dae50c8259bbef6892eb66f590acf?placeholderIfAbsent=true&apiKey=a61ecd0d5bec4c4f94bc2ce5eda3f7bc"
        alt="User profile" class="w-8 object-contain aspect-square hover:scale-110 cursor-pointer" />
   -->