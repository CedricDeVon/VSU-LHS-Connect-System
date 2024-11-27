<template>
    <div class="adviser-page">
        <AdviserHeader @notif-click="notifClick" class="relative z-10" />
            <img class="backPic" src="~/assets/images/vsu-main-the-search-for-truth-statue.png" alt="img">
       
        <div class="min-h-screen">
            <div class="w-full h-full z-0">
                <div class="flex flex-row ">
                    <div class="container ml-5 mx-auto px-4 py-8" :style="{ width: containWidth }">

                        <!-- Hero Section -->
                        <div class="relative mb-3">
                            <div class="bg-gradient-to-r from-[#265630] to-[#728B78] rounded-xl p-8 shadow-lg">
                                <div class="flex justify-between items-center">
                                    <div class="space-y-2">
                                        <p class="text-white/80 text-lg">Welcome back,</p>
                                        <h1 class="text-white text-4xl font-bold tracking-wide">
                                            {{ adviserViewStore.getFullName(adviserViewStore.homepageAdviser) }}!
                                        </h1>
                                    </div>
                                    <div class="text-right">
                                        <div class="bg-white/10 rounded-lg px-6 py-3 backdrop-blur-sm">
                                            <p class="text-white/80 text-sm">Academic Year</p>
                                            <p class="text-white text-2xl font-semibold">{{ adviserViewStore.homepageTimeline.data.schoolYear }}</p>
                                        </div>
                                    </div>
                                </div>
                                <!-- Decorative elements -->
                                <div class="absolute bottom-0 right-0 opacity-10">
                                    <svg width="200" height="100" viewBox="0 0 100 100" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="90" cy="90" r="50" fill="white" />
                                        <circle cx="10" cy="10" r="30" fill="white" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white backdrop-blur-sm z-10 rounded-xl p-8 mb-3 mt-3 shadow-lg opacity-90">
                            <div class="flex flex-row gap-8">
                                <!-- Left Column: Profile Picture -->
                                <div class="flex-shrink-0">
                                    <div class="relative">
                                        <img src="assets/icons/default-user.png" :alt="profilePic"
                                            class="w-48 h-48 rounded-full object-cover shadow-lg border-4 border-[#728B78]/20" />
                                        <div class="absolute -bottom-2 left-0 right-0 text-center">
                                            <span class="bg-[#728B78] text-white px-4 py-1 rounded-full text-sm">
                                                Faculty Adviser
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Right Column: Info Groups -->
                                <div class="flex-grow">
                                    <!-- Header -->
                                    <div class="mb-6">
                                        <h2 class="text-2xl font-bold text-[#265630] mb-1">
                                            {{ adviserViewStore.getFullName(adviserViewStore.homepageAdviser) }}
                                        </h2>
                                        <p class="text-gray-500 text-sm">
                                            Faculty ID: {{ adviserViewStore.homepageAdviser.data.facultyId }}
                                        </p>
                                    </div>

                                    <!-- Info Grid -->
                                    <div class="grid grid-cols-2 gap-x-8 gap-y-4">
                                        <!-- Personal Info Group -->
                                        <div class="space-y-3">
                                            <h3
                                                class="font-semibold text-[#728B78] mb-2 text-sm uppercase tracking-wider">
                                                Personal Information</h3>
                                            <div class="space-y-2">
                                                <div class="flex items-center">
                                                    <span class="text-gray-600 w-24 text-sm">Username</span>
                                                    <span class="font-medium">{{ adviserViewStore.homepageUser.data.username }}</span>
                                                </div>
                                                <div class="flex items-center">
                                                    <span class="text-gray-600 w-24 text-sm">Email</span>
                                                    <span class="font-medium">{{ adviserViewStore.homepageUser.data.email }}</span>
                                                </div>
                                                <div class="flex items-center">
                                                    <span class="text-gray-600 w-24 text-sm">Birth Date</span>
                                                    <span class="font-medium">{{ adviserViewStore.homepageAdviser.data.birthdate }}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Advisory Info Group -->
                                        <div class="space-y-3">
                                            <h3
                                                class="font-semibold text-[#728B78] mb-2 text-sm uppercase tracking-wider">
                                                Advisory Details</h3>
                                            <div class="space-y-2">
                                                <div class="flex items-center">
                                                    <span class="text-gray-600 w-24 text-sm">Section</span>
                                                    <span class="font-medium">Grade {{ adviserViewStore.homepageSection.data.level }}</span>
                                                </div>
                                                <div class="flex items-center">
                                                    <span class="text-gray-600 w-24 text-sm">Class</span>
                                                    <span class="font-medium">{{ adviserViewStore.homepageSection.data.name }}</span>
                                                </div>
                                                <div class="flex items-center">
                                                    <span class="text-gray-600 w-24 text-sm">Population</span>
                                                    <span class="font-medium">{{ adviserViewStore.homepageSection.data.sectionPopulation || 'N/A' }}
                                                        students</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="grid md:grid-cols-2 gap-3">
                            <!-- Students Card -->
                            <div
                                class="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group relative">
                                <!-- Header (adjusted positioning and styling) -->
                                <div class="absolute inset-x-4 -top-6">
                                    <div
                                        class="bg-gradient-to-r from-[#265630] to-[#728B78] rounded-xl p-4 shadow-md transform group-hover:-translate-y-1 transition-transform duration-300">
                                        <div class="flex items-center justify-center space-x-3">
                                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor"
                                                viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                            <h2 class="text-white text-xl font-bold">Students</h2>
                                        </div>
                                    </div>
                                </div>

                                <!-- Card Content (adjusted margins) -->
                                <div class="flex flex-col h-full pt-8">
                                    <!-- Content -->
                                    <div class="flex-grow space-y-4 relative z-20">
                                        <p class="text-[#265630] text-lg text-center leading-relaxed">
                                            Manage your Students' Profiles and Assess for Necessary Guidance
                                        </p>
                                        <div class="flex justify-center pt-4">
                                            <NuxtLink 
                                                to="/adviser/advisory"
                                                class="bg-gradient-to-r from-[#265630] to-[#728B78] hover:from-[#728B78] hover:to-[#265630] text-white rounded-full py-3 px-8 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg w-2/3 flex items-center justify-center space-x-2 cursor-pointer"
                                            >
                                                <span>View Student Profiles</span>
                                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                                                </svg>
                                            </NuxtLink>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Reports Card -->
                            <div
                                class="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group relative">
                                <!-- Header (adjusted positioning and styling) -->
                                <div class="absolute inset-x-4 -top-6">
                                    <div
                                        class="bg-gradient-to-r from-[#265630] to-[#728B78] rounded-xl p-4 shadow-md transform group-hover:-translate-y-1 transition-transform duration-300">
                                        <div class="flex items-center justify-center space-x-3">
                                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor"
                                                viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            <h2 class="text-white text-xl font-bold">Reports</h2>
                                        </div>
                                    </div>
                                </div>

                                <!-- Card Content (adjusted margins) -->
                                <div class="flex flex-col h-full pt-8">
                                    <!-- Content -->
                                    <div class="flex-grow space-y-4 relative z-20">
                                        <p class="text-[#265630] text-lg text-center leading-relaxed">
                                            Submit and Review Behavioral Reports for Students in this Section
                                        </p>
                                        <div class="flex justify-center pt-4">
                                            <NuxtLink 
                                                to="/adviser/reports"
                                                class="bg-gradient-to-r from-[#265630] to-[#728B78] hover:from-[#728B78] hover:to-[#265630] text-white rounded-full py-3 px-8 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg w-2/3 flex items-center justify-center space-x-2 cursor-pointer"
                                            >
                                                <span>View Reports</span>
                                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                                                </svg>
                                            </NuxtLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="floating-chip ">
                        <div class="mb-6 h-50">
                            <div class="bg-[#265630] opacity-90% rounded-xl p-4 -mt-8 shadow-lg">
                                <h1 class="text-white text-xl font-semibold tracking-wide text-center">
                                    Notifications & Announcements
                                </h1>
                            </div>
                            <div class="overflow-y-auto max-h-[500px] pr-2 mt-4">
                                <!-- <div v-for="(notification, index) in activeNotifications" :key="index"
                                    class="bg-white rounded-xl p-4 mb-4 shadow-md transition-all duration-200 hover:shadow-lg"
                                    :class="{
                                        'border-r-4 border-[#265630] bg-gradient-to-r from-[#e1fde7] to-white': notification.isNew,
                                        'hover:-translate-y-1': true
                                    }">
                                    <div class="flex items-center justify-between mb-2">
                                        <h2 class="text-[#265630] font-semibold text-lg">
                                            {{ notification.announcementTitle }}
                                        </h2>
                                        <span v-if="notification.isNew"
                                            class="bg-[#265630] text-white text-xs px-2 py-1 rounded-full">
                                            New
                                        </span>
                                    </div>
                                    <p class="text-sm text-gray-600 mb-2">{{ notification.announcementContent }}</p>
                                    <div
                                        class="flex items-center justify-between text-xs text-gray-500 mt-2 pt-2 border-t border-gray-100">
                                        <span>{{ notification.announcementBy }}</span>
                                        <span>{{ formatDate(notification.announcementDate) }}</span>
                                    </div>
                                </div> -->
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
import StudentBasicInfo from "~/components/Modals/Advisory/StudentBasicInfoByAdviser.vue";
import AddStudentForm from "~/components/Modals/Advisory/AddStudentForm.vue";
import NotificationModal from '~/components/Modals/AdviserNotification/NotificationModal.vue';
import { useAdviserViewStore } from "~/stores/views/adviserViewStore";

const containWidth = ref('93%');

const adviserViewStore = useAdviserViewStore();
await adviserViewStore.updateHomePage();

onBeforeMount(async () => {
    await adviserViewStore.updateHomePage();
})

const goToAdvisory = () => {
    this.$router.push('/adviser/advisory')
}

const goToReports = () => {
    this.$router.push('/adviser/reports')
}



</script>

<style scoped>
.adviser-page {
    background: #fffef1 url('~/assets/images/vsu-main-the-search-for-truth-statue.png') no-repeat;
    background-position: 90% 20px;
    background-size: 50% auto;
    min-height: 100%;
    position: relative;
    overflow: hidden;
    font-family: 'Inter', sans-serif;
}

.backPic {
    position: absolute;
    width: 50%;
    height: auto;
    border-radius: 0.9375rem;
    left: 50%;
    top: 1.25rem;
    opacity: 0;
}

.floating-chip {
    width: 28%;
    height: fit-content;
    /* height: calc(100vh - 6rem); */
    background-color: rgba(248, 241, 186, 0.75);
    /* Reduced opacity from 0.95 to 0.75 */
    color: #265630;
    padding: 2rem;
    margin-top: 2rem;
    margin-right: 2rem;
    border-radius: 15px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    backdrop-filter: blur(4px);
}

/* Make notification cards more visible against semi-transparent background */
.floating-chip .bg-white {
    background-color: rgba(255, 255, 255, 0.95) !important;
}

/* Make the header more visible */
.floating-chip .bg-[#265630] {
    background-color: rgba(38, 86, 48, 0.95);
}

.header {
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    margin-bottom: 1rem;
}

.subHeader {
    font-size: 1.125rem;
    line-height: 1.5;
    margin-bottom: 0.5rem;
}

.max-h {
    max-height: 550px;
    height: 500px;
}

.new-announcement {
    border-right: 10px solid #265630;
    /* border-bottom: 13px ridge #fdef87cc; */
    background-color: #e1fde7;
}

/* Remove redundant styles that are now handled by Tailwind classes */

/* Add opacity to main content containers */
.bg-white {
    background-color: rgba(255, 255, 255, 0.9) !important;
}

.black-text{
    color: black;
    font-size: 20px;
    font-weight: 600;
    font-family: century-gothic, sans-serif;
}
.black-small{
    color: black;
    font-size: 19px;
    font-weight: 500;
    font-family: century-gothic, sans-serif;
}

/* Custom Scrollbar */
.overflow-y-auto::-webkit-scrollbar {
    width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
    background: rgba(38, 86, 48, 0.3);
    border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: rgba(38, 86, 48, 0.5);
}

/* Add these new styles for better header positioning */
.group {
    margin-top: 2rem;
}

.absolute.inset-x-4.-top-6 {
    z-index: 10;
}

/* Optional: Add a subtle transition for the header hover effect */
.bg-gradient-to-r {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.cursor-pointer {
    cursor: pointer;
    pointer-events: auto;
}

.z-20 {
    z-index: 20;
    position: relative;
}
</style>
