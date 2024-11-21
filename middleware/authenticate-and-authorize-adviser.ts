import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
    try {
      const jsonWebToken: any = window.localStorage!.getItem('userAuthToken');
      if (jsonWebToken === undefined || jsonWebToken === null) {
        console.log('JWT Not Found');
        return navigateTo('/auth/login');
      }

      let result: any = await $fetch('/api/auth/jsonWebToken/verify', {
        method: 'POST', body: { jsonWebToken }
      })
      
      console.log(result)
      const { role, status, email, password } = result.data.data;
      if (result.isNotSuccessful) {
        console.log('JWT Not Verified');
        return navigateTo('/auth/login');
      }

      if (role !== 'adviser') {
        console.log('User is not an adviser');
        return navigateTo('/auth/login');
      }

      if (status !== 'active') {
        console.log('Adviser is not active');
        return navigateTo('/auth/login');
      }

      await signInWithEmailAndPassword(getAuth(), email, password);
      
    } catch (error: any) {
      console.log(error);
      return navigateTo('/auth/login');
    }
  });