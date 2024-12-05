import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
    try {
      // console.log('Authenticate Adviser Middleware');

      const jsonWebToken: any = useCookie('VSUConnectionSystemUserAuthToken');
      if (jsonWebToken.value === undefined || jsonWebToken.value === null) {
        console.error(`User Isn't Loged-in. Returning To Log-in Page`);
        return navigateTo('/auth/login', { replace: true });
      }

      let result: any = await $fetch('/api/auth/jsonWebToken/verify', {
        method: 'POST', body: { jsonWebToken: jsonWebToken.value }
      })
      if (result.isNotSuccessful) {
        console.error(result.message);
        return navigateTo('/auth/login', { replace: true });
      }
      
      const { role, status, email, password } = result.data.data;
      if (result.isNotSuccessful) {
        console.error('User Isn\'t An Adviser. Returning To Log-in Page');
        return navigateTo('/auth/login', { replace: true });
      }

      if (role !== 'adviser') {
        console.error('User Isn\'t An Adviser. Returning To Log-in Page');
        return navigateTo('/auth/login', { replace: true });
      }

      if (status !== 'active') {
        console.error('Adviser Is Currently Inactive. Returning To Log-in Page');
        return navigateTo('/auth/login', { replace: true });
      }

      await signInWithEmailAndPassword(getAuth(), email, password);
      
    } catch (error: any) {
      console.error(`Application Error: ${error.message}`);
      return navigateTo('/auth/login', { replace: true });
    }
  });