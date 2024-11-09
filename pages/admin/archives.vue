<template>
    <div class="general flex h-screen">
        <!-- Sidebar -->
        <AdminSidebar />

        <div class="flex-grow dashboard-page">
            <!-- Header -->
            <AdminHeader />

            This is the archives page!!
        </div>
    </div>
</template>
<script>
import AdminSidebar from '@/components/Blocks/AdminSidebar.vue';
import AdminHeader from '@/components/Blocks/AdminHeader.vue';

export default {
    components: { AdminSidebar, AdminHeader },
}
</script>