import { useAdminViewStore } from "~/stores/views/adminViewStore";

export default defineNuxtRouteMiddleware(async (to, from) => {
      try {
        const adminViewStore = useAdminViewStore();
        await adminViewStore.updateIncidental();
        await adminViewStore.updateSidebar();

      } catch (error: any) {
        console.error(`Application Error: ${error.message}`);
        return navigateTo('/auth/login');
      }
  });