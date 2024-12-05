import { useAdviserViewStore } from '~/stores/views/adviserViewStore';

const adviserViewStore = useAdviserViewStore();

export default defineNuxtRouteMiddleware(async (to, from) => {
      try {
        await adviserViewStore.updateAdvisoryView();

      } catch (error: any) {
        console.error(`Application Error: ${error.message}`);
        return navigateTo('/auth/login');
      }
  });
  