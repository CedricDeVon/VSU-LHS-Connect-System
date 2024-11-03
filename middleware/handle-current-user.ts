export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = await getCurrentUser();
  if (user === null) {
    return navigateTo("/LoginPage", { replace: true });

  } else {
    
  }
});
