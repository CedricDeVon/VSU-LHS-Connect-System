<template>
    <div class="general flex h-screen">
      <!-- Sidebar -->
      <AdminSidebar />
      <ConfirmReset v-if="confirmReset" :year="academicYear" @close="confirmReset = !confirmReset" @reset-academic-year="handleReset"/>
      <verification v-if="verify" @close="handleClose" @update="update"/>
      <div class="flex-grow dashboard-page">
        <AdminHeader />
        <div class="bg-transparent mr-32 ml-16 mt-0">
          <h1 class="text-3xl font-bold text-green-900 my-5 ">Account Settings</h1>
          <div class=" grid grid-cols-2 shadow-md">
            <div class="grid col-span-1 p-5 border rounded-md shadow-sm">
              <div class="m-3">Username: <input type="text" class="ml-9 border-2 border-gray-200 rounded-md p-2 w-3/5" 
                :readonly="!isEditing" 
                v-model="username"/> 
              </div> 
              <div class="m-3">Password: <input :type="passwordInputType" class="ml-10 border-2 border-gray-200 rounded-md p-2 w-3/5"
                :readonly="!isEditing"
                v-model="password"/> 
              </div>
              <div class="m-3">First Name: <input type="text" class="ml-8 border-2 border-gray-200 rounded-md p-2 w-3/5" 
                :readonly="!isEditing"
                v-model="firstName"/> 
              </div>
              <div class="m-3">Middle Name: <input type="text" class="ml-2 border-2 border-gray-200 rounded-md p-2 w-3/5" 
                :readonly="!isEditing"
                v-model="middleName"/> 
              </div>
              <div class="m-3">Last Name: <input type="text" class="ml-8 border-2 border-gray-200 rounded-md p-2 w-3/5"
                :readonly="!isEditing" 
                v-model="lastName"/> 
              </div>
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
                <button @click="triggerFileInput"
                  class="w-2/5 px-4 py-3 rounded-lg bg-white border-2 border-[#265630] text-[#265630] hover:bg-[#728B78] hover:text-white hover:border-[#728B78] transition-colors duration-200 flex items-center justify-center ">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span>Update Profile Picture</span>
                </button>
                <input type="file" ref="fileInput" @change="uploadProfilePicture" class="hidden">
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
import ConfirmReset from '~/components/Modals/AdminSettings/ConfirmReset.vue';
import { academicYear } from '~/data/academicYear';
import Verification from '~/components/Modals/AdminSettings/Verification.vue';

export default {
    name: 'SettingsPage',
    components: { AdminSidebar, AdminHeader, ConfirmReset, Verification },

    setup() {

        const isEditing = ref(false);
        const username = ref('admin');
        const password = ref('password');
        const firstName = ref('Juan');
        const middleName = ref('Dela');
        const lastName = ref('Cruz');
        const academicYear = ref('2024-2025');
        const confirmReset = ref(false);
        const verify = ref(false);
        const verifyEdit = ref(false);
        const verifyReset = ref(false);
        const profilePicture = ref('');
        const fileInput = ref(null);

        const triggerFileInput = () => {
          fileInput.value.click();
        };

        
        const uploadProfilePicture = async (event) => {
          const file = event.target.files[0];
          if (file) {
            // Upload the file to your server or database
            // Example: using FormData to send the file via an API request
            const formData = new FormData();
            formData.append('file', file);

            try {
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });

          if (response.ok) {
            const data = await response.json();
            // Assuming the response contains the URL of the uploaded image
            profilePicture.value = data.url;
          } else {
            console.error('Failed to upload the file');
          }
        } catch (error) {
          console.error('Error uploading the file:', error);
        }
      }
    };

    const handleClose = () => {
          verify.value = !verify.value;
          if(verifyEdit.value){
              verifyEdit.value = !verifyEdit.value;
          }
          else if(verifyReset.value){
              verifyReset.value = !verifyReset.value;
          }
        };


        const passwordInputType = computed(() => (isEditing.value ? 'text' : 'password'));


            const update = () => {
              verify.value = !verify.value;
                if(verifyEdit.value){
                    verifyEdit.value = !verifyEdit.value;
                    isEditing.value = !isEditing.value;
                }
                else if(verifyReset.value){
                    verifyReset.value = !verifyReset.value;
                  confirmReset.value = !confirmReset.value;
                }
            };

        const edit = () => {
            verify.value = !verify.value;
            verifyEdit.value = !verifyEdit.value;
        };

        const cancelChanges = () => {
            isEditing.value = !isEditing.value;
        };

        const saveChanges = () => {
            isEditing.value = !isEditing.value;
        };

        // const uploadProfilePicture = () => {
        //     alert('Profile picture uploaded');
        // };

        const resetAcademicYear = () => {
            verify.value = !verify.value;
            verifyReset.value = !verifyReset.value;
        };

        const handleReset = () => {
            academicYear.AY = academicYear.value;
            alert('Academic Year has been reset');
            confirmReset.value = !confirmReset.value;
        };

        return { 
          passwordInputType,
          handleClose,
          fileInput,
          profilePicture,
          triggerFileInput, 
          update,
          verify,
          handleReset,
          confirmReset,
          resetAcademicYear,
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