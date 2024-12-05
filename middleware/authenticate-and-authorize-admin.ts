import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
      try {
        // console.log('Authenticate Admin Middleware');

        const jsonWebToken: any = useCookie('VSUConnectionSystemUserAuthToken');
        if (jsonWebToken.value === undefined || jsonWebToken.value === null) {
          console.error(`User Isn't Loged-in. Returning To Log-in Page`);
          return navigateTo('/auth/login', { replace: true });
        }
  
        let result: any = await $fetch('/api/auth/jsonWebToken/verify', {
          method: 'POST', body: {
            jsonWebToken: jsonWebToken.value
          }
        })
        if (result.isNotSuccessful) {
          throw new Error(result.message);
        }
        // console.log(result);
        const { role, email, password } = result.data.data;
  
        if (role !== 'admin') {
          console.error('User Isn\'t An Admin. Returning To Log-in Page');
          return navigateTo('/auth/login', { replace: true });
        }
  
        await signInWithEmailAndPassword(getAuth(), email, password);
        
      } catch (error: any) {
        console.error(`Application Error: ${error.message}`);
        return navigateTo('/auth/login', { replace: true });
      }
  });