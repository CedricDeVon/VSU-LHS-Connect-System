<template>
    <div class="settings-page min-h-screen bg-[#fffef1] relative">
        <AdviserHeader @notif-click="notifClick" />
        <NotificationModal v-if="showNotification" />

        <!-- Main Content -->
        <div class=" z-10">
            <!-- Academic Year -->
            <div class="m-5 flex justify-between items-center mx-20">
                <h1 class="text-2xl font-bold text-green-900">Academic Year {{ AcademicYear }}</h1>
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
                            <div class="relative group">
                                <div class="w-48 h-48 rounded-full overflow-hidden border-4 border-gray-200">
                                    <img src="~/assets/icons/default-user.png" :alt="User.username"
                                        class="w-full h-full object-cover">
                                </div>
                                <button
                                    class="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                    Change Profile Picture
                                </button>
                            </div>
                        </div>

                        <!-- Right Column - User Details -->
                        <div class="col-span-8 space-y-8">
                            <!-- Account Information Section -->
                            <div class="space-y-6">
                                <h3 class="text-xl font-semibold text-green-800">Login Details</h3>

                                <!-- Username Field -->
                                <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <label class="text-sm text-gray-500">Username</label>
                                        <p class="text-lg text-gray-700">{{ User.username }}</p>
                                    </div>
                                    <button
                                        class="px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                                        Change
                                    </button>
                                </div>

                                <!-- Password Field -->
                                <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <label class="text-sm text-gray-500">Password</label>
                                        <p class="text-lg text-gray-700">•••••••••</p>
                                    </div>
                                    <button
                                        class="px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                                        Change
                                    </button>
                                </div>

                                <!-- Email Field -->
                                <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <label class="text-sm text-gray-500">Email Address</label>
                                        <p class="text-lg text-gray-700">{{ User.emailAdd }}</p>
                                    </div>
                                    <button
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

<script>
import AdviserHeader from "~/components/Blocks/AdviserHeader.vue";
import { student } from "~/data/student";
import { section } from "~/data/section";
import NotificationModal from '~/components/Modals/AdviserNotification/NotificationModal.vue';

export default {
    name: "Settings",
    components: { AdviserHeader, NotificationModal, },
    props: {
        AdviserID: {
            type: String,
            required: true,
            default: "adviserid16" // this should be the adviserID of the logged in user
        },
        AcademicYear: {
            type: String,
            required: true,
            default: "2024-2025" // this should be the current academic year
        },
        User: {
            type: Object,
            required: true,
            default: {
                userId: 'userid16',
                emailAdd: 'sample22-1-01020@vsu.edu.ph',
                username: 'FirstName16',
                password: 'LastName16',
                canAccess: true,
            },
        }
    },
    data() {
        return {
            showNotification: false,
            containWidth: '89%',
            titleWidth: '87%'
        };
    },

    methods: {

        handleRowClick(item) {

        },

        notifClick() {
            this.containWidth = this.containWidth === '89%' ? '70%' : '89%';
            this.titleWidth = this.titleWidth === '87%' ? '68%' : '87%';
            this.showNotification = !this.showNotification;
        },

        logoutClick() {
            this.$router.push('/auth/login');
        },

    },


};
</script>

<style scoped>

.settings-page{
        @apply bg-[#fffef1] min-h-screen;
        background-image: url('~/assets/images/vsu-main-the-search-for-truth-statue.png');
        background-position: 90% 20px;
        background-size: 50% auto;
        background-repeat: no-repeat;
    }

</style>