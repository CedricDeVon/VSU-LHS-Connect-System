<template>
    <div class="general flex h-screen">
      <!-- Sidebar -->
      <AdminSidebar />
  
      <div class="flex-grow dashboard-page">
        <AdminHeader />
        <div class="bg-transparent mr-32 ml-16 mt-0">
          <h1 class="text-3xl font-bold text-green-900 my-5 ">Account Settings</h1>
          <div class=" grid grid-cols-2 shadow-md">
            <div class="grid col-span-1 p-5 border rounded-md shadow-sm">
              <div class="m-3">Username: <input type="text" class="ml-9 border-2 border-gray-200 rounded-md p-2 w-3/5" 
                :readonly="!isEditing" 
                v-model="username"/> </div> 
              <div class="m-3">Password: <input type="password" class="ml-10 border-2 border-gray-200 rounded-md p-2 w-3/5"
                :readonly="!isEditing"
                v-model="password"/> </div>
              <div class="m-3">First Name: <input type="text" class="ml-8 border-2 border-gray-200 rounded-md p-2 w-3/5" 
                :readonly="!isEditing"
                v-model="firstName"/> </div>
              <div class="m-3">Middle Name: <input type="text" class="ml-2 border-2 border-gray-200 rounded-md p-2 w-3/5" 
                :readonly="!isEditing"
                v-model="middleName"/> </div>
              <div class="m-3">Last Name: <input type="text" class="ml-8 border-2 border-gray-200 rounded-md p-2 w-3/5"
                :readonly="!isEditing" 
                v-model="lastName"/> </div>
                <div v-if="isEditing" class="flex justify-end">
                  <button @click="cancelChanges"
                    class="flex justify-center m-3 w-1/5 px-4 py-3 rounded-lg bg-white border-2 border-[#B52B2B] text-[#B52B2B] hover:bg-[#b15c5cf1] hover:text-white hover:border-[#728B78] transition-colors duration-200 ">
                    <span>Cancel</span>
                  </button>
                  <button @click="saveChanges"
                    class="flex justify-center m-3 w-1/5 px-4 py-3 rounded-lg bg-white border-2 border-[#265630] text-[#265630] hover:bg-[#728B78] hover:text-white hover:border-[#728B78] transition-colors duration-200 ">
                    <span>Save</span>
                  </button>
                </div>
                <div v-else class="flex justify-center">
                  <button @click="edit"
                    class="flex justify-self-end justify-center w-1/5 px-4 py-3 rounded-lg bg-white border-2 border-[#265630] text-[#265630] hover:bg-[#728B78] hover:text-white hover:border-[#728B78] transition-colors duration-200 ">
                    <span>Edit</span>
                  </button>
                </div>
            </div>
            <div class=" shadow-inner rounded-md">
              <img src="../../assets/icons/default-user.png" alt="Profile Picture" class="pt-5 h-auto w-2/5 flex justify-self-center">
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
            <div class="border-gray-200 my-7 ">
              <h1 class="text-3xl font-bold text-green-900 ">System Settings</h1>
            </div>
            <div class="border w-1/2 rounded-md shadow-sm ">
              <div class="py-5 mx-5">Reset Academic Year <input type="text" class="mx-8 border-2 border-gray-200 rounded-md p-2 w-1/3" v-model="academicYear"/>
                <button @click="resetAcademicYear"
                  class="w-1/5 px-4 py-3 rounded-lg bg-white border-2 border-[#B52B2B] text-[#B52B2B] hover:bg-[#b15c5cf1] hover:text-white hover:border-[#728B78] transition-colors duration-200 ">
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

export default {
    name: 'SettingsPage',
    components: { AdminSidebar, AdminHeader },

    setup() {

        const isEditing = ref(false);
        const username = ref('admin');
        const password = ref('password');
        const firstName = ref('Juan');
        const middleName = ref('Dela');
        const lastName = ref('Cruz');
        const academicYear = ref('2024-2025');

        const edit = () => {
            isEditing.value = !isEditing.value;
        };

        const cancelChanges = () => {
            isEditing.value = !isEditing.value;
        };

        const saveChanges = () => {
            isEditing.value = !isEditing.value;
        };

        const uploadProfilePicture = () => {
            alert('Profile picture uploaded');
        };

        return {  
          isEditing,
          edit,
          cancelChanges,
          saveChanges, 
          username, 
          uploadProfilePicture,
          password, 
          firstName,
          middleName,
          lastName,
          academicYear
        };
    },

}
</script>