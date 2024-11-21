import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
    try {
      const jsonWebToken: any = window.localStorage!.getItem('userAuthToken');
      console.log(jsonWebToken);
      
      if (jsonWebToken === undefined || jsonWebToken === null) {
        console.log('JWT Not Found');
        return navigateTo('/auth/login');
      }

      let result: any = await $fetch('/api/auth/jsonWebToken/verify', {
        method: 'POST', body: { jsonWebToken }
      })
      if (result.isNotSuccessful) {
        throw new Error(result.message);
      }
    
      const { role, email, password } = result.data.data;

      if (role !== 'admin') {
        console.log('User is not an admin');
        return navigateTo('/auth/login');
      }

      console.log('ok', email, password)
      await signInWithEmailAndPassword(getAuth(), email, password);
      console.log('done')
      
    } catch (error: any) {
      console.log(error.message);
      return navigateTo('/auth/login');
    }
  });