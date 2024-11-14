<script setup lang='ts'>
import { Result } from "~/library/results/result";
import { UserSecurity } from "~/library/security/userSecurity";
const auth = useFirebaseAuth();

const signOutUser = async () => {
  const result: Result = await UserSecurity.signOutUser(auth);
  return navigateTo('/auth/login');
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
            
            <div class="flex space-x-4 pr-5">
                <button @click="goToSettings" 
                    class=" button px-7 py-2 rounded-lg focus:outline-none"
                    aria-label="Settings">
                    Settings
            </button> 

            <button @click="signOutUser" 
                    class=" button px-7 py-2 rounded-lg focus:outline-none"
                    aria-label="Logout">
                    Logout
            </button> 
            </div>
           
        
        </div>
    </div>
</template>
<style scoped>
.admin-header{
    font-family: 'Century Gothic', sans-serif;
    background: #265630;
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
