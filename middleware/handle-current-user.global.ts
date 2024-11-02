export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log("Handle Current User");
  
  const user = await getCurrentUser();
  if (to.fullPath != '/LoginPage' && (user === undefined || user === null)) {
    return navigateTo("/LoginPage", { replace: true });
  }
});
