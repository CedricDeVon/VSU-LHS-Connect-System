<template>
    <div class="settings-page min-h-screen bg-[#fffef1] relative">
        <AdviserHeader />
        <NotificationModal v-if="adviserViewStore.notificationShowAdviserModalAnnouncements" />

        <!-- Main Content -->
        <div class=" z-10">
            <!-- Academic Year -->
            <div class="m-5 flex justify-between items-center mx-20">
                <h1 class="text-2xl font-bold text-green-900">{{ adviserViewStore.getAcademicYear(adviserViewStore.settingsTimeline) }}</h1>
            </div>

            <!-- Settings Card -->
            <div class="mx-20 mt-8">
                <div class="bg-white/90 rounded-2xl shadow-xl overflow-hidden">
                    <!-- Header -->
                    <div class="bg-green-700 px-6 py-4">
                        <h2 class="text-2xl font-bold text-white">Account Settings</h2>
                    </div>

                    <!-- Content -->
                    <div class="grid grid-cols-12 gap-8 p-8">
                        <!-- Left Column - Profile Picture -->
                        <div class="col-span-4 flex flex-col items-center space-y-6">
                            <img :src=adviserViewStore.settingsAdviser.data.profilePicture
                                :alt="adviserViewStore.settingsUser.data.username"
                                class="w-auto h-80 rounded-full object-cover mb-4 "/>
                            <input
                            type="file"
                            accept=".png"
                            @input="handleFileInput"
                            @change="updateProfilePicture"
                            class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full shadow-lg"
                            />
                        </div>

                        <!-- Right Column - User Details -->
                        <div class="col-span-8 space-y-8">
                            <!-- Account Information Section -->
                            <div class="space-y-6">
                                <h3 class="text-xl font-semibold text-green-800">Login Details</h3>

                                <!-- Username Field -->
                                <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <label class="text-sm text-gray-500">Username: </label>
                                        <input v-model="adviserViewStore.settingsUser.data.username" type="text" class="w-max bg-transparent col-span-7 text2 flex items-center" />
                                    </div>
                                    <button
                                        @click="updateUsername" 
                                        class="px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                                        Change
                                    </button>
                                </div>

                                <!-- Password Field -->
                                <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <label class="text-sm text-gray-500">Password</label>
                                        <input v-model="password" type="password" class="w-max bg-transparent col-span-7 text2 flex items-center" />
                                    </div>
                                    <button
                                        @click="updatePassword" 
                                        class="px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                                        Change
                                    </button>
                                </div>
                            </div>

                            <!-- Logout Button -->
                            <div class="pt-6 border-t border-gray-200">
                                <button @click="logoutClick"
                                    class="w-full px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
definePageMeta({
  middleware: ['authenticate-and-authorize-adviser']
});

import AdviserHeader from "~/components/Blocks/AdviserHeader.vue";
import NotificationModal from '~/components/Modals/AdviserNotification/NotificationModal.vue';
import { Result } from "~/library/results/result";
import { useAdviserViewStore } from '~/stores/views/adviserViewStore';
import { UserSecurity } from "~/library/security/userSecurity";
import { ParsedFile } from "~/library/files/parsedFile";
import { signOut, updatePassword, signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { Validators } from "~/library/validators/validators";

const { handleFileInput, files } = useFileStorage();

let auth = useFirebaseAuth();
const adviserViewStore = useAdviserViewStore();
await adviserViewStore.updateSettings();
const password = ref('');

const updateProfilePicture = async () => {
    await UserSecurity.logInViaToken();
    let user = await getCurrentUser();
    const result: any = await $fetch('/api/adviser/updateProfilePhoto', {
        method: 'POST',
        body: {
            userId: user?.uid,
            file: files.value
        }
    })
    adviserViewStore.settingsAdviser.data.profilePicture = result.data;
    alert('Profile Picture Updated Successfully')
}

const updateUsername = async () => {
    try {
        await UserSecurity.logInViaToken();
        let user = await getCurrentUser();
        let result = await Validators.userNameValidator.validate(adviserViewStore.settingsUser.data.username);
        if (result.isNotSuccessful) {
            alert(result.message)    
            return;
        }
        await $fetch('/api/user/update', {
            method: 'POST',
            body: {
                userId: user?.uid,
                data: {
                    username: adviserViewStore.settingsUser.data.username
                }
            }
        })
        alert('Username Updated Successfully')

    } catch (error) {
        alert(error.message)
    }
}

const updatePassword = async () => {
    try {
        await UserSecurity.logInViaToken();
        let user = await getCurrentUser();
        let result = await Validators.passwordValidator.validate(password.value);
        if (result.isNotSuccessful) {
            alert(result.message)    
            return;
        }
        result = await UserSecurity.updateUserPassword({
            auth: getAuth(),
            newPassword: password.value
        });
        if (result.isNotSuccessful) {
            alert(result.message)    
            return;
        }

        alert('Password Updated Successfully, Returning back to Log-in page.')
        return navigateTo('/auth/login', { replace: true });
    
    } catch (error) {
        alert(error.message)
    }
}

const logoutClick = async () => {
    const result: Result = await UserSecurity.signOutUser(auth);
    return navigateTo('/auth/login', { replace: true });
}
</script>

<style scoped>
.settings-page{
    @apply bg-[#fffef1] min-h-screen;
    background-image: url('~/assets/images/vsu-main-the-search-for-truth-statue.png');
    background-position: 90% 20px;
    background-size: 50% auto;
    background-repeat: no-repeat;
}

input[type="file"]::file-selector-button {
    color: white;
    background-color: transparent;
    padding: 8px 12px;
    border-radius: 0px;
    margin-right: 10px;
    border: none;
}

input.middle:focus {
    outline-width: 0;
}

input:focus,
select:focus,
textarea:focus,
button:focus {
    outline: none;
}

</style>