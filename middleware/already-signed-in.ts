export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log("Already Signed In Middleware");
  
  const user = await getCurrentUser();
  if (user) {
    return navigateTo("/", { replace: true });
  }
});
