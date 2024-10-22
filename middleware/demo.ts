export default defineNuxtRouteMiddleware((to, from) => {
    console.log("Demo Middleware");
    
    console.log(`${to} - ${from}`);
})
