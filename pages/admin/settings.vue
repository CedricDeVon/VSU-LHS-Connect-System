<template>
    <div class="general flex h-screen">
      <!-- Sidebar -->
      <AdminSidebar />
      <ConfirmReset v-if="confirmReset" :year="academicYear" @close="confirmReset = !confirmReset" @reset-academic-year="handleReset"/>
      <verification v-if="verify" @close="handleClose" @update="update"/>
      <div class="flex-grow dashboard-page">
        <AdminHeader />
        <div class="bg-transparent mr-14 ml-16 mt-0 overflow-y-auto h-[calc(100vh-64px)] ">
          <h1 class="text-3xl font-bold text-green-900 my-5 ">Account Settings</h1>
          <div class=" grid grid-cols-2 shadow-md">
            <div class="grid col-span-1 p-5 border rounded-md shadow-sm text-sm">
              <div class="m-3 ">Username: <input type="text" class="ml-9 border-2 border-gray-200 rounded-md p-2 w-3/5" 
                :readonly="!isEditing" 
                v-model="username"/> 
              </div> 
              <!-- <div class="m-3">Password: <input :type="passwordInputType" class="ml-10 border-2 border-gray-200 rounded-md p-2 w-3/5"
                :readonly="!isEditing"
                v-model="password"/> 
              </div> -->
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
                    class="flex justify-center m-3 w-1/5 px-4 py-2 rounded-lg bg-white border-2 border-[#B52B2B] text-[#B52B2B] hover:bg-[#b15c5cf1] hover:text-white hover:border-[#728B78] transition-colors duration-200 ">
                    <span>Cancel</span>
                  </button>
                  <button @click="saveChanges"
                    class="flex justify-center m-3 w-1/5 px-4 py-2 rounded-lg bg-white border-2 border-[#265630] text-[#265630] hover:bg-[#728B78] hover:text-white hover:border-[#728B78] transition-colors duration-200 ">
                    <span>Save</span>
                  </button>
                </div>
                <div v-else class="flex justify-center">
                  <button @click="edit"
                    class="flex justify-self-end justify-center  px-7 py-1 rounded-lg bg-white border-2 border-[#265630] text-[#265630] hover:bg-[#728B78] hover:text-white hover:border-[#728B78] transition-colors duration-200 ">
                    <span>Edit</span>
                  </button>
                </div>
            </div>
            <div class=" shadow-inner rounded-md">
              <div class = "profile-container">
                <img :src="profilePicture" alt="Profile Picture" class="profile-picture">
              </div>
              <div class="flex justify-center items-center m-5">
                <button @click="triggerFileInput"
                  class=" px-4 py-1 rounded-lg bg-white border-2 border-[#265630] text-[#265630] hover:bg-[#728B78] hover:text-white hover:border-[#728B78] transition-colors duration-200 flex items-center justify-center ">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span>Update Profile Picture</span>
                </button>
                <input type="file" ref="fileInput" @input="handleFileInput" @change="uploadProfilePicture" class="hidden">
              </div>
            </div>
          </div>
            <div class="border-gray-200 mt-7 mb-2">
              <h1 class="text-3xl font-bold text-green-900 ">System Settings</h1>
            </div>
            <div class="border w-1/2 rounded-md shadow-sm text-sm">
              <div class="py-5 ">Reset Academic Year <input type="text" class="mx-5 border-2 border-gray-200 rounded-md p-2 py-1 w-1/3" v-model="academicYear"/>
                <button @click="resetAcademicYear"
                  class=" px-4 py-1 rounded-lg bg-white border-2 border-[#B52B2B] text-[#B52B2B] hover:bg-[#b15c5cf1] hover:text-white hover:border-[#728B78] transition-colors duration-200 ">
                  <span>Reset</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

</template>

<script>
definePageMeta({
  middleware: ['authenticate-and-authorize-admin', 'admin-settings']
});

import AdminSidebar from '@/components/Blocks/AdminSidebar.vue';
import AdminHeader from '@/components/Blocks/AdminHeader.vue';
import ConfirmReset from '~/components/Modals/AdminSettings/ConfirmReset.vue';
import Verification from '~/components/Modals/AdminSettings/Verification.vue';
import { UserSecurity } from "~/library/security/userSecurity";
import { useAdminViewStore } from '~/stores/views/adminViewStore';

export default {
    name: 'SettingsPage',
    components: { AdminSidebar, AdminHeader, ConfirmReset, Verification },
    props:{
        academicYear: {
            type: String,
            default: '2024-2025',
        },
    },
    async setup(props) {
        const adminViewStore = useAdminViewStore();

        const isEditing = ref(false);
        const username = ref('');
        const password = ref('');
        const firstName = ref('');
        const middleName = ref('');
        const lastName = ref('');
        const academicYear = ref('');
        const confirmReset = ref(false);
        const verify = ref(false);
        const verifyEdit = ref(false);
        const verifyReset = ref(false);
        const profilePicture = ref('');
        const fileInput = ref(null);

        const { handleFileInput, files } = useFileStorage();

        username.value = adminViewStore.settingsUserData.data.username;
        firstName.value = adminViewStore.settingsAdminData.data.firstName;
        middleName.value = adminViewStore.settingsAdminData.data.middleName;
        lastName.value = adminViewStore.settingsAdminData.data.lastName;
        academicYear.value = adminViewStore.settingsTimeline.data.schoolYear;
        profilePicture.value = adminViewStore.settingsAdminData.data.profilePicture;

        const triggerFileInput = () => {
          fileInput.value.click();
        };

        const uploadProfilePicture = async (event) => {
          await UserSecurity.logInViaToken();
          let user = await getCurrentUser();
          const result = await $fetch('/api/admin/updateProfilePhoto', {
            method: 'POST',
              body: {
                userId: user?.uid,
                file: files.value
              }
          })
          profilePicture.value = result.data;
          alert('Profile Picture Updated')
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
            username.value = adminViewStore.settingsUserData.data.username;
            firstName.value = adminViewStore.settingsAdminData.data.firstName;
            middleName.value = adminViewStore.settingsAdminData.data.middleName;
            lastName.value = adminViewStore.settingsAdminData.data.lastName;
            isEditing.value = !isEditing.value;
        };

        const saveChanges = async () => {
            await UserSecurity.logInViaToken();
            let user = await getCurrentUser();
            const result = await $fetch('/api/admin/update', {
              method: 'POST',
                body: {
                  userId: user?.uid,
                  data: {
                    username: username.value,
                    firstName: firstName.value,
                    middleName: middleName.value,
                    lastName: lastName.value
                  }
                }
            })
            await adminViewStore.updateSettings();
            await adminViewStore.updateSidebar();
            isEditing.value = !isEditing.value;
        };

        const resetAcademicYear = () => {
          try{
            if (academicYear.value !== props.academicYear) {
                verify.value = !verify.value;
                verifyReset.value = !verifyReset.value;
              }
              else{
                alert('Academic Year is already set to ' + academicYear.value);
              }
          }catch(error){
            console.error('Error resetting academic year:', error);
          }
            
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
          academicYear,
          handleFileInput,
          files
        };
    },
}
</script>

<style scoped>
.profile-container {
  width: 200px;
  height: auto;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 20px;
}

.profile-picture {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>