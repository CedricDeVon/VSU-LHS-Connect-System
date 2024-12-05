import { useAdviserViewStore } from '~/stores/views/adviserViewStore';

export default defineNuxtRouteMiddleware(async (to, from) => {
      try {
        const adviserViewStore = useAdviserViewStore();
        await adviserViewStore.updateHomePage();

      } catch (error: any) {
        console.error(`Application Error: ${error.message}`);
        return navigateTo('/auth/login');
      }
  });
