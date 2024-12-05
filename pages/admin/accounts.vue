<template>
  <div class="flex h-screen bg-[#FFFEF1]">
    <AdminSidebar />
         
    <div class="flex-grow flex flex-col h-screen overflow-hidden">
      <AdminHeader ref="adminHeader" />
     
      <div class="p-8 flex-1 overflow-hidden">
        <div class="mb-6">
          <h1 class="text-2xl font-bold text-gray-800">Account Management</h1>
          <p class="text-gray-600">Manage adviser accounts and registration requests</p>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-[calc(100%-6rem)]">
          <!-- Controls Section -->
          <div class="p-6 border-b border-gray-100 flex-shrink-0">
            <div class="flex flex-col sm:flex-row gap-4">
              <select
                class="flex-shrink-0 w-full sm:w-64 rounded-lg border border-gray-300 px-4 py-2.5 bg-white text-gray-700 hover:border-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors"
                  v-model="adminViewStore.accountsSelectedAccount">
                  <option value="all">All Accounts</option>
                  <option value="active">Active Accounts</option>
                  <option value="inactive">Inactive Accounts</option>
                  <option value="pending">Approval Requests</option>
                </select>
              
                <button @click="adminViewStore.accountsShowUploadModal = true"
                class="inline-flex items-center justify-center px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors">
                <Icon name="heroicons:cloud-arrow-up" class="w-5 h-5 mr-2" />
                Upload CSV
                </button>
              </div>
            </div>

          <!-- Table Section - Make this scrollable -->
          <div class="flex-1 overflow-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Adviser Name
                  </th>
                  <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Faculty ID
                  </th>
                  <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    {{ adminViewStore.accountsSelectedAccount === 'pending' ? 'Actions' : 'Status' }}
                  </th>
                  <th v-if="add && adminViewStore.accountsSelectedAccount === 'inactive'" scope="col"
                  class="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider w-1/3">
                  Action
                  </th>   
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="adviser in filteredAdvisers()" :key="adviser.id"
                    class="hover:bg-gray-50 transition-colors">
                  <td class="px-6 py-4">
                    <div class="text-sm font-medium text-gray-900">{{ adminViewStore.getFullName(adviser) }}</div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-sm text-gray-500">{{ adviser.data?.facultyId || 'N/A' }}</div>
                  </td>
                  <td class="px-6 py-4">
                    <div v-if="adminViewStore.accountsSelectedAccount  === 'pending'" class="flex gap-2">
                      <button @click="acceptRequest(adviser)"
                        class="px-4 py-1.5 text-xs font-medium rounded-md bg-green-500 text-white hover:bg-green-600 focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition-colors">
                        Accept
                      </button>
                      <button @click="rejectRequest(adviser)"
                        class="px-4 py-1.5 text-xs font-medium rounded-md bg-red-500 text-white hover:bg-red-600 focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-colors">
                        Reject
                      </button>
                    </div>
                    <div v-else>
                      <span :class="[
                        'px-3 py-1 text-xs font-medium rounded-full inline-flex items-center',
                        adviser.data.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      ]">
                        <span class="w-1.5 h-1.5 rounded-full mr-1.5"
                              :class="adviser.data.status === 'active' ? 'bg-green-600' : 'bg-red-600'">
                        </span>
                        {{ adviser.data.status }}
                      </span>
                    </div>
                  </td>
                  <td v-if="add && selectedAccount === 'inactive'" class="px-6 py-4 break-words">
                    <button @click="addToSection(adviser)"
                      class="px-5 py-1 text-xs leading-5 font-semibold rounded-full bg-green-500 text-white hover:bg-green-700 mr-2">
                      Add to Section
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- Modal for CSV Upload -->
      <AdviserCSVUploadModal
        v-if="adminViewStore.accountsShowUploadModal"
        @close="adminViewStore.accountsShowUploadModal = false"
      /> 
      <!-- Modal for Approved Account -->
      <ApproveAccountModal
      v-if="showApprovalModal"
      @close="showApprovalModal = false"
      :approvedEmail="propAdviser.email"
      :adviserName="propAdviser.name"
      :adviserID="propAdviser.facultyId"
        :adviserSection="propAdviser.section"/>
      <!-- <ConfirmAddAdviser v-if="showConfirmAdd" :adviser="pendingAdviser" @close="cancelAddToSection" @add="confirmAddToSection" :sectionId="this.$route.query.sectionId"/> -->
      </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['authenticate-and-authorize-admin']
});

import AdminSidebar from '@/components/Blocks/AdminSidebar.vue';
import AdminHeader from '@/components/Blocks/AdminHeader.vue';
import AdviserCSVUploadModal from '@/components/Modals/AdviserCSVUploadModal.vue';
import ApproveAccountModal from '@/components/Modals/AdminConfirmations/ApproveAccountModal.vue';
import ConfirmAddAdviser from '~/components/Modals/AdminConfirmations/ConfirmAddAdviser.vue';
import { useAdminViewStore } from '~/stores/views/adminViewStore'
import { componentNames } from '#build/components';
import { Databases } from '~/library/databases/databases';
import { Result } from '~/library/results/result';
import { UserSecurity } from '~/library/security/userSecurity';

const auth = useFirebaseAuth();
const adminViewStore = useAdminViewStore()
await adminViewStore.updateAccountsAdvisers();
await adminViewStore.updateSidebar();

// onBeforeMount(async () => {
//   await adminViewStore.updateAccountsAdvisers();
// })

const acceptRequest = async (adviser: any) => {
  const result = await $fetch('/api/adviser/request/accept', {
    method: 'POST', body: { adviserId: adviser.id }
  });
  alert('Account Successfully Approved');
  await adminViewStore.updateAccountsAdvisers();
}

const rejectRequest = async (adviser: any) => {
  const result: Result = await UserSecurity.deleteAdviser(auth, {
    userId: adviser.data.userId, adviserId: adviser.id });
  alert('Account Successfully Rejected');
  await adminViewStore.updateAccountsAdvisers();
}

const filteredAdvisers = () => {
  if (adminViewStore.accountsSelectedAccount === 'all') {
    return (adminViewStore.accountsAdvisers.filter((adviser: any) => adviser.data.status !== 'pending')).sort((a: any, b: any) => {
      const order: any = {active: 1, inActive:2};
      return (order[a.data.status] || 3) - (order[b.data.status] || 3)});
  } else if (adminViewStore.accountsSelectedAccount === 'active') {
    return adminViewStore.accountsAdvisers.filter((adviser: any) => adviser.data.status === 'active');
  } else if (adminViewStore.accountsSelectedAccount === 'inactive') {
    return adminViewStore.accountsAdvisers.filter((adviser: any) => adviser.data.status === 'inActive');
  } else if (adminViewStore.accountsSelectedAccount === 'pending') {
    return adminViewStore.accountsAdvisers.filter((adviser: any) => adviser.data.status === 'pending');
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

table {
  border-collapse: separate;
  border-spacing: 0;
}

thead {
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: rgb(249 250 251); /* bg-gray-50 */
}

th {
  font-weight: 600;
  letter-spacing: 0.05em;
}

tbody tr:last-child td {
  border-bottom: none;
}
</style>