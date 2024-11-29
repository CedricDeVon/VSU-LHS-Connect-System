<template>
    <div class="general flex h-screen">
      <!-- Sidebar -->
      <AdminSidebar />
  
      <div class="flex-grow dashboard-page">
        <AdminHeader />
        <h1> This is the settings page!!</h1>
      </div>
      
    </div>
</template>
<script>
definePageMeta({
  middleware: ['authenticate-and-authorize-admin']
});

import AdminSidebar from '@/components/Blocks/AdminSidebar.vue';
import AdminHeader from '@/components/Blocks/AdminHeader.vue';

onBeforeMount(async () => {

})

export default {
    name: 'SettingsPage',
    components: { AdminSidebar, AdminHeader },
}
</script>