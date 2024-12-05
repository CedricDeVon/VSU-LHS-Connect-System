<template>
  <div class="notification-modal ">
    <!-- Other modal content -->
  
    <div class="floating-chip ">
      <div class="mb-10 max-h-full">
        <div class="bg-white rounded-lg p-5 m-5  ">
          <h1 class="header text-center">Notifications & Announcements</h1>
        </div>
        <div class=" overflow-x-auto overflow-y-auto max-h ">
          <div 
          v-for="notification of getActiveNotifications()"
          :key="notification.id"
          @click="announcementClicked(notification)"
          class="bg-white rounded-lg p-4 m-5  shadow-2xl "
          :class="{' new-announcement ': !notification.data.isRead }"
          >
          <h1 class="subHeader">{{ notification.data.title }}</h1>
          <p class="text-xs font-bold ">{{ notification.data.date }}<span class="text-xs">  : {{ adviserViewStore.getFullName(notification.data.by) }}</span></p> 
          <p class="p-2 px-0">{{ notification.data.content }}</p>
          <p class="text-xs"></p>
          </div> 
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useAdviserViewStore } from '~/stores/views/adviserViewStore';

const user = await getCurrentUser();
const adviserViewStore = useAdviserViewStore();

const announcementClicked = async (notification: any) => {
  const result = await $fetch('/api/announcement/update', {
    method: 'POST',
    body: {
      id: notification.id,
      data: {
        isRead: true
      }
    }
  })

  await adviserViewStore.updateAdviserNotificationModal();
  alert('Notification Read');
}

const getActiveNotifications = () => {
  return adviserViewStore.notificationAdviserModalAnnouncements
  .filter((notification: any) => notification.data.isActive)
  .sort((a: any, b: any) => {
      if (!a.data.isRead && b.data.isRead) {
          return -1;
      } else if (a.data.isRead && !b.data.isRead) {
          return 1;
      } else {
          return new Date(b.data.date) - new Date(a.data.date);
      }
  });
};
</script>
  
  <style scoped>
  .notification-modal {
    position: relative;
    /* Other styles for the modal */
  }
  
  .floating-chip {
    position: fixed;
    top: 10%;
    right: 5px;
    width: 25%;
    height: fit-content;
    max-height: 680px;
    background-color: #F8F1BACC; /* Tailwind yellow-400 */
    color: #265630;
    padding: 10px 10px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    z-index: 1000; /* Ensure it floats above other content */
  }

  .header {
    font-size: 22px;
    font-weight: 600;
    font-family: century-gothic, sans-serif;
  }

  .subHeader {
    font-size: 18px;
    font-weight: 700;
    font-family: century-gothic, sans-serif;
  }
  .max-h {
    max-height: 550px;
    height : 500px;
  }

  .new-announcement {
    border-right: 10px solid #265630;
    /* border-bottom: 13px ridge #fdef87cc; */
    background-color: #e1fde7;
  }
  </style>
  