<script setup lang="ts">
import AdminSidebar from '@/components/Blocks/AdminSidebar.vue';
import AdminHeader from '~/components/Blocks/AdminHeader.vue';

const reportsCount = useState('reportsCount');
const studentsCount = useState('studentsCount');
const accountsCount = useState('accountsCount');

reportsCount.value = studentsCount.value = accountsCount.value = 0;

</script>

<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <AdminSidebar />

    <div class="flex-grow dashboard-page">
      <!-- Header -->
      <AdminHeader />

        <!-- Welcome Section -->
      <section class="welcome-message mt-11">
          <h1 class="text-4xl font-bold text-green-900" >Welcome to your dashboard</h1>
          <hr class="mt-3.5 border-2 border-green-900" />
        </section>

      <!-- Main Dashboard Content -->
      <main class="main-container">
        <section class="mt-10 flex gap-5">
          <article class="flex-col justify-between mt-1">
            <section class="flex gap-10 justify-between">
              <div class="flex flex-row w-[80%] justify-between">
                <div class="flex flex-col items-start gap-5 text-4xl font-bold text-green-900">
                  <div class="flex flex-row items-center gap-10">
                    <img loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/7c60d16a8e36909a44f9f80aa566bf7473375c2826a2dd18236b1b237a36b114?placeholderIfAbsent=true&apiKey=a61ecd0d5bec4c4f94bc2ce5eda3f7bc"
                      alt="Incidents icon" class="w-[30px] object-contain" />
                    <h2> {{ reportsCount }} Reports</h2>
                  </div>
                  <p class="short-description">View reports by class advisers and track report progress.</p>
                </div>
              </div>
              <div class="w-[20%] mt-5 text-white">
              <button class="w-full py-3 rounded-lg bg-728B78 ease" aria-label="View sections">
                View
              </button>
            </div>
            </section>
            <section class="flex gap-10 justify-between">
              <div class="flex flex-row  w-[80%] justify-between">
                <div class="flex flex-col items-start gap-5 text-4xl font-bold text-green-900">
                  <div class="flex flex-row items-center gap-10">
                    <img loading="lazy"
                      src="@/assets/icons/reading-book-dark.png"
                      alt="Incidents icon" class="w-[40px] object-contain" />
                    <h2> {{ studentsCount }} Students</h2>
                  </div>
                  <p class="short-description">Search for a student and view relevant information.</p>
                </div>
              </div>
              <div class="w-[20%] mt-5 text-white">
              <button class="w-full py-3 rounded-lg bg-728B78 ease" aria-label="View sections">
                View
              </button>
            </div>
            </section>
            <section class="flex gap-10 justify-between">
              <div class="flex flex-row w-[80%] justify-between">
                <div class="flex flex-col items-start gap-5 text-4xl font-bold text-green-900">
                  <div class="flex flex-row items-center gap-10">
                    <img loading="lazy"
                      src="@/assets/icons/approved-dark.png"
                      alt="Incidents icon" class="w-[30px] object-contain" />
                    <h2>{{ accountsCount }} Account Approvals</h2>
                  </div>
                  <p class="short-description">See pending account approvals by class advisers and track account status.</p>
                </div>
              </div>
              <div class="w-[20%] mt-5 text-white">
              <button class="w-full py-3 rounded-lg bg-728B78 ease" aria-label="View sections">
                View
              </button>
            </div>
            </section>
          </article>
        </section>
      </main>
    </div>
  </div>
</template>

<style scoped>
.dashboard-page {
  background-color: #FFFEF1;
  font-family: 'Century Gothic', sans-serif;
}

.main-container {
  padding: 0 150px;
  padding-right: 160px;
}

.logout-button {
  background-color: #FFFEF1;
  font-size: 0.875rem;
}

.short-description {
  font-size: 1.3rem;
  font-weight: 500;
  line-height: normal;
  padding-left: 5rem;
  
}

.welcome-message {
  font-weight: 500;
  padding: 0 5rem;
}

h2 {
  font-size: 2rem;
}

section {
  margin-bottom: 4rem;
}

.bg-728B78 {
  background-color: #728B78;
}

.bg-728B78:hover {
  background-color: #556859;
}

</style>