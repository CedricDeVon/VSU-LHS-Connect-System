import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
    try {
      const jsonWebToken: any = useCookie('VSUConnectionSystemUserAuthToken');
      if (jsonWebToken.value === undefined || jsonWebToken.value === null) {
        console.error(`User has not yet Loged-in. Returning to Log-in Page`);
        return navigateTo('/auth/login');
      }

      let result: any = await $fetch('/api/auth/jsonWebToken/verify', {
        method: 'POST', body: { jsonWebToken: jsonWebToken.value }
      })
      if (result.isNotSuccessful) {
        console.error(result.message);
        return navigateTo('/auth/login');
      }
      
      const { role, status, email, password } = result.data.data;
      if (result.isNotSuccessful) {
        console.error('User is not an Adviser. Returning to Log-in Page');
        return navigateTo('/auth/login');
      }

      if (role !== 'adviser') {
        console.error('User is not an Adviser. Returning to Log-in Page');
        return navigateTo('/auth/login');
      }

      if (status !== 'active') {
        console.error('Adviser is currently inactive. Returning to Log-in Page');
        return navigateTo('/auth/login');
      }

      await signInWithEmailAndPassword(getAuth(), email, password);
      
    } catch (error: any) {
      console.error(`Application Error: ${error.message}`);
      return navigateTo('/auth/login');
    }
  });