<template>
    <div class="general flex h-screen">
      <!-- Sidebar -->
      <AdminSidebar />
  
      <div class="flex-grow dashboard-page">
        <AdminHeader />
        <h1 class="text-3xl"> The incident reports page is under construction!!</h1>
      </div>
      
    </div>
</template>
<script>
import AdminSidebar from '@/components/Blocks/AdminSidebar.vue';
import AdminHeader from '@/components/Blocks/AdminHeader.vue';

export default {
    name: 'incidental',
    components: { AdminSidebar, AdminHeader },
}
</script>