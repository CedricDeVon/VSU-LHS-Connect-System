
export default defineNuxtRouteMiddleware(async (to, from) => {
  try {
    const user = await getCurrentUser();
    if (user === null || user === undefined) {
      return navigateTo("/auth/login", { replace: true });
    }
    
    let userData = await $fetch('/api/user/admin', { 
      method: 'POST',
      body: { userId: user.uid }
     })     

    if (userData.data === undefined) {
        console.log('Not an admin')
        return navigateTo("/auth/login", { replace: true });
    }

    userData = await $fetch('/api/user/adviser', { 
        method: 'POST',
        body: { userId: user.uid }
       })
    if (userData.data !== undefined && userData.data.status === false) {
        console.log('An unverified adviser')
        return navigateTo("/auth/signup/success", { replace: true });
    }
    if (userData.data !== undefined && userData.data.status === true) {
        console.log('A verified adviser')
        return navigateTo("/adviser/advisory", { replace: true });
    }
      
  } catch (error: any) {
    console.log(error);
  }
});

