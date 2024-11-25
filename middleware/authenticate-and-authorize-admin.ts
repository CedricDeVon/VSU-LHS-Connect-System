import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
      try {
        const jsonWebToken: any = useCookie('VSUConnectionSystemUserAuthToken');

        if (jsonWebToken.value === undefined || jsonWebToken.value === null) {
          console.error(`User has not yet Loged-in. Returning to Log-in Page`);
          return navigateTo('/auth/login');
        }
  
        let result: any = await $fetch('/api/auth/jsonWebToken/verify', {
          method: 'POST', body: {
            jsonWebToken: jsonWebToken.value
          }
        })
        if (result.isNotSuccessful) {
          throw new Error(result.message);
        }
      
        const { role, email, password } = result.data.data;
  
        if (role !== 'admin') {
          console.error('User is not an Admin. Returning to Log-in Page');
          return navigateTo('/auth/login');
        }
  
        await signInWithEmailAndPassword(getAuth(), email, password);
        
      } catch (error: any) {
        console.error(`Application Error: ${error.message}`);
        return navigateTo('/auth/login');
      }
  });