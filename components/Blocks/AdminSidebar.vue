<script setup lang="ts">
import LoginPage from '~/pages/auth/login.vue';
import { Result } from '~/library/results/result';
import { UserSecurity } from '~/library/security/userSecurity';
import { useAdminViewStore } from '~/stores/views/adminViewStore';

const auth = useFirebaseAuth();
const adminViewStore = useAdminViewStore();
// await adminViewStore.updateSidebar();

// onBeforeMount(async () => {
//   await adminViewStore.updateSidebar();
// })

const signOutUser = async () => {
  const result: Result = await UserSecurity.signOutUser(auth);
  return navigateTo('/auth/login', { replace: true });
}

const topNav = [
  { title: "Dashboard", icon: "lucide:home", link: "/admin/dashboard" },
  { title: "Search", icon: "lucide:search", link: "/admin/search" },
  {
    title: "Reports",
    icon: "lucide:bar-chart-3",
    items: [
      { title: "Incident Reports", link: "/admin/incidental" },
      { title: "Anecdotal Reports", link: "/admin/anecdotal" },
    ],
  },
  { title: "Accounts", icon: "lucide:user-cog", link: "/admin/accounts" },
  { title: "Archives", icon: "lucide:folder-dot", link: "/admin/archives" },
];
const bottomNav = [
  {
    title: "Settings",
    icon: "lucide:settings-2",
    link: "/admin/settings",
  },
];
</script>

<template>
  <aside class="sidebar mwa h-screen border-r bg-[#265630] text-white">
    <UiScrollArea class="size-full">
      <div class="flex h-screen flex-col pt-7">
        <NuxtLink to="#" class="flex w-full items-center gap-3 px-5">
          <img src="@/assets/images/vsu-ihs-connect-system-icon-2-greenbg.png">
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
                  <p class="text-sm font-semibold">Admin</p>
                  <p class="text-sm text-white">admin.cs@vsuihs.com</p>
                </div>
              </div>
              <UiTooltip>
                <UiTooltipTrigger as-child>
                  <UiButton :to="LoginPage" class="ml-auto shrink-0 button-hover" size="icon-sm" variant="ghost">
                    <Icon @click="signOutUser" name="lucide:log-out" class="size-4 icon-hover" />
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


<style scoped>
.sidebar {
  width: 300px; /* Fixed width for the sidebar */
  flex-shrink: 0; /* Prevent the sidebar from shrinking */
}
.mwa {
  font-family: "Century Gothic";
}
.hover-icon-color:hover .icon-color {
  color: #265630;
}
</style>