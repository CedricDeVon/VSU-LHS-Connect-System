<script setup lang='ts'>
import { Result } from "~/library/results/result";
import { UserSecurity } from "~/library/security/userSecurity";

const auth = useFirebaseAuth();

const signOutUser = async () => {
  const result: Result = await UserSecurity.signOutUser(auth);
  return navigateTo('/auth/login');
}

const goToHomepage = () => {
    return navigateTo('/adviser/homepage');
}

const goToAdvisory = () => {
    return navigateTo('/adviser/advisory');
}

const goToReports = () => {
    return navigateTo('/adviser/reports');
}

const goToSettings = () => {
    return navigateTo('/adviser/settings');
}

const notifClick = () => {
    // $emit('notif-click')
}
</script>

<template>
    <div class = "admin-header h-14 w-screen flex items-center ">

        <div class="px-5 w-full flex justify-between items-center">
            <div class="flex space-x-4">
            <button @click="goToHomepage" 
                    class="button px-7 py-2 rounded-lg focus:outline-none"
                    aria-label="Homepage">
                    Homepage
            </button>  
            <button @click="goToAdvisory" 
                    class="button px-7 py-2 rounded-lg focus:outline-none"
                    aria-label="Advisory">
                    Advisory
            </button> 
            <button @click="goToReports" 
                    class="button px-7 py-2 rounded-lg focus:outline-none"
                    aria-label="Reports">
                    Reports
            </button> 
            </div>

            <button @click="signOutUser" 
                    class=" button px-7 py-2 rounded-lg focus:outline-none"
                    aria-label="Logout">
                    Logout
            </button> 
            <header class="flex justify-end items-center p-4">
            <div class="flex items-center gap-5">
                <button class="hover:scale-110 cursor-pointer focus:outline-none">
                    <img @click="notifClick"
                    src="~/assets/icons/bell.svg"
                    alt="Notifications" class="w-8 object-contain aspect-square " />
                </button>
                
                <button @click="goToSettings" class="hover:scale-110 cursor-pointer focus:outline-none">
                    <img
                    src="~/assets/icons/menu.svg"
                    alt="Menu" class="w-8 object-contain aspect-square " />
                </button>
            </div>
            </header>
        </div>
    </div>
</template>

<style scoped>
.admin-header{
    font-family: 'Century Gothic', sans-serif;
    background: #265630;
    z-index: 50;
}

.button{
    font-family: 'Century Gothic', sans-serif;
    font-size: 17px;
    font-weight: 500;
    background-color: #265630;
    color: white;
    border: none;
    cursor: pointer;
}

.button:hover{
    background-color: white;
    color: #265630;
}
</style>
