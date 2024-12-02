import { useAdminViewStore } from "~/stores/views/adminViewStore";

export default defineNuxtRouteMiddleware(async (to, from) => {
      try {
        // console.log(useRoute().params)
        const adminViewStore = useAdminViewStore();
        await adminViewStore.updateCaseConference(useRoute().params.conferenceId);
        await adminViewStore.updateSidebar();

      } catch (error: any) {
        console.error(`Application Error: ${error.message}`);
        return navigateTo('/auth/login');
      }
  });