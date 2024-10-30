<template>
  <aside class="mwa h-screen w-[300px] border-r bg-[#265630] text-white">
    <UiScrollArea class="size-full">
      <div class="flex h-screen flex-col pt-7">
        <NuxtLink to="#" class="flex w-full items-center gap-3 px-5">
          <img src="@/assets/images/vsu-ihs-connect-system-icon-greenbg.png">
        </NuxtLink>

        <div class="flex h-full grow flex-col px-5 pb-8">
          <div class="mb-10 flex flex-col gap-10">
            <nav class="flex flex-col gap-1">
              <template v-for="(n, i) in topNav" :key="i">
                <UiButton v-if="!n.items" :to="n.link" size="default" variant="ghost" class="justify-start gap-4 px-3 button-hover">
                  <Icon v-if="n.icon" :name="n.icon" class="size-4 icon-hover" />
                  <span>{{ n.title }}</span>
                </UiButton>
                <UiCollapsible v-if="n.items">
                  <UiCollapsibleTrigger as-child>
                    <UiButton size="default" variant="ghost" class="group w-full justify-start gap-4 px-3 button-hover">
                      <Icon v-if="n.icon" :name="n.icon" class="size-4 icon-hover" />
                      <span>{{ n.title }}</span>
                      <Icon name="lucide:chevron-down"
                        class="ml-auto size-4 text-white transition group-data-[state=open]:rotate-180" />
                    </UiButton>
                  </UiCollapsibleTrigger>
                  <UiCollapsibleContent class="flex flex-col gap-1.5 pl-4 pr-2">
                    <template v-for="(item, index) in n.items" :key="index">
                      <UiButton :to="item.link" size="sm" variant="ghost" class="justify-start gap-4 px-3">
                        <span>{{ item.title }}</span>
                      </UiButton>
                    </template>
                  </UiCollapsibleContent>
                </UiCollapsible>
              </template>
            </nav>
            <nav class="mt-auto flex flex-col gap-1">
              <template v-for="(n, i) in bottomNav" :key="i">
                <UiButton v-if="!n.items" :to="n.link" size="default" variant="ghost" class="justify-start gap-4 px-3 button-hover">
                  <Icon v-if="n.icon" :name="n.icon" class="size-4 icon-hover" />
                  <span>{{ n.title }}</span>
                </UiButton>
                <UiCollapsible v-if="n.items">
                  <UiCollapsibleTrigger as-child>
                    <UiButton size="default" variant="ghost" class="group w-full justify-start gap-4 px-3 button-hover">
                      <Icon v-if="n.icon" :name="n.icon" class="size-4 icon-hover" />
                      <span>{{ n.title }}</span>
                      <Icon name="lucide:chevron-down"
                        class="ml-auto size-4 text-white transition group-data-[state=open]:rotate-180" />
                    </UiButton>
                  </UiCollapsibleTrigger>
                  <UiCollapsibleContent class="flex flex-col gap-1.5 pl-4 pr-2">
                    <template v-for="(item, index) in n.items" :key="index">
                      <UiButton :to="item.link" size="sm" variant="ghost" class="justify-start gap-4 px-3">
                        <span>{{ item.title }}</span>
                      </UiButton>
                    </template>
                  </UiCollapsibleContent>
                </UiCollapsible>
              </template>
            </nav>
          </div>

          <div class="mt-auto">
            <UiDivider class="my-6" />
            <div class="flex items-center gap-3 pb-8">
              <div class="flex items-center gap-3">
                <div>
                  <p class="text-sm font-semibold" v-html="user.username" />
                  <p class="text-sm text-white" v-html="user.email" />
                </div>
              </div>
              <UiTooltip>
                <UiTooltipTrigger as-child>
                  <UiButton :to="LoginPage" class="ml-auto shrink-0 button-hover" size="icon-sm" variant="ghost">
                    <Icon name="lucide:log-out" class="size-4 icon-hover" />
                  </UiButton>
                </UiTooltipTrigger>
                <UiTooltipContent side="right" align="center">Logout</UiTooltipContent>
              </UiTooltip>
            </div>
          </div>
        </div>
      </div>
    </UiScrollArea>
  </aside>
</template>


<script lang="ts" setup>

import { useRouter } from 'vue-router';
import LoginPage from '~/pages/LoginPage.vue';

const router = useRouter();

const user = {
  avatar: "https://randomuser.me/api/portraits/med/men/2.jpg",
  username: "Admin",
  email: "admin.cs@vsuihs.com",
};

const topNav = [
  { title: "Dashboard", icon: "lucide:home", link: "AdminDashboard" },
  {
    title: "Reports",
    icon: "lucide:bar-chart-3",
    items: [
      { title: "Incident Reports", link: "#" },
      { title: "Anecdotal Reports", link: "#" },
    ],
  },
  { title: "Students", icon: "lucide:users", link: "#" },
  { title: "Accounts", icon: "lucide:user-cog", link: "AccountsPage" },
  { title: "Archives", icon: "lucide:folder-dot", link: "#" },
];
const bottomNav = [
  {
    title: "Settings",
    icon: "lucide:settings-2",
    link: "#",
  },
];

</script>

<style scoped>
.mwa {
  font-family: "Century Gothic";
}
.hover-icon-color:hover .icon-color {
  color: #265630;
}
</style>
