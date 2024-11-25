<template>
    <div class="general flex h-screen">
      <!-- Sidebar -->
      <AdminSidebar />
  
      <div class="flex-grow dashboard-page">
        <AdminHeader />
        <div class="bg-white mr-32 ml-16 mt-0">
          <h1 class="text-3xl font-bold text-green-900 my-5 ">Account Settings</h1>
          <div class=" grid grid-cols-2 shadow-md">
            <div class="grid col-span-1 p-5 border rounded-md shadow-sm">
              <div class="m-3">Username: <input type="text" class="ml-9 border-2 border-gray-200 rounded-md p-2 w-3/5" /> <button class="mt-4 py-1"><img src="../../assets/icons/pencil.svg" alt="edit"></button></div> 
              <div class="m-3">Password: <input type="password" class="ml-10 border-2 border-gray-200 rounded-md p-2 w-3/5" />  <button class="mt-4 py-1"><img src="../../assets/icons/pencil.svg" alt="edit"></button></div>
              <div class="m-3">First Name: <input type="text" class="ml-8 border-2 border-gray-200 rounded-md p-2 w-3/5" /> <button class="mt-4 py-1"><img src="../../assets/icons/pencil.svg" alt="edit"></button></div>
              <div class="m-3">Middle Name: <input type="text" class="ml-2 border-2 border-gray-200 rounded-md p-2 w-3/5" />  <button class="mt-4 py-1"><img src="../../assets/icons/pencil.svg" alt="edit"></button></div>
              <div class="m-3">Last Name: <input type="text" class="ml-8 border-2 border-gray-200 rounded-md p-2 w-3/5" />  <button class="mt-4 py-1"><img src="../../assets/icons/pencil.svg" alt="edit"></button></div>
            </div>
            <div class=" ">
              <img src="../../assets/icons/default-user.png" alt="Profile Picture" class="pt-5 h-auto w-1/2 flex justify-self-center">
              <div class="flex justify-center items-center m-5">
                <button @click="uploadProfilePicture"
                  class="w-2/5 px-4 py-3 rounded-lg bg-white border-2 border-[#265630] text-[#265630] hover:bg-[#728B78] hover:text-white hover:border-[#728B78] transition-colors duration-200 flex items-center justify-center ">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span>Update Profile Picture</span>
                </button>
              </div>
            </div>
          </div>
          <div class="border-gray-200 my-7">
            <h1 class="text-3xl font-bold text-green-900 ">System Settings</h1>
          </div>
          <div class="border w-1/2 rounded-md shadow-sm ">
            <div class="py-5 mx-5">Reset Academic Year <input type="text" class="mx-8 border-2 border-gray-200 rounded-md p-2 w-1/3" />
              <button @click="uploadProfilePicture"
                  class="w-1/5 px-4 py-3 rounded-lg bg-white border-2 border-[#B52B2B] text-[#B52B2B] hover:bg-[#c97171f1] hover:text-white hover:border-[#728B78] transition-colors duration-200 ">
                  <!-- <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg> -->
                  <span>Reset</span>
                </button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
</template>
<script>
import AdminSidebar from '@/components/Blocks/AdminSidebar.vue';
import AdminHeader from '@/components/Blocks/AdminHeader.vue';
import { Pencil } from 'lucide-vue-next';

export default {
    name: 'SettingsPage',
    components: { AdminSidebar, AdminHeader },


}
</script>