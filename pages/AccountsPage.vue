<script setup lang="ts">
import AdminSidebar from '@/components/Blocks/AdminSidebar.vue';
import AdminHeader from '@/components/Blocks/AdminHeader.vue';
import AdviserCSVUploadModal from '../components/Modals/AdviserCSVUploadModal.vue';
import { adminStore } from '@/stores/admin'
import { componentNames } from '#build/components';
import { Databases } from '~/library/databases/databases';
import { IFile } from "../library/files/iFile";
import { Result } from '~/library/results/result';

const store = adminStore()
await store.updateAccountsAdvisers();

const handleFileUpload = async (event: any) => {
  const result: Result = await $fetch('/api/file', {
    method: 'POST',
    body: { event }
  })
}

const uploadFile = () => {
  console.log('File ready for upload:', store.accountsFile);
  store.accountsShowUploadModal = false;
  store.accountsFile = null;
}

const acceptRequest = async (adviser: any) => {
  await $fetch('/api/updateAdviser', {
    method: 'POST',
    body: {
      id: adviser.id,
      adviserStatus: 'inactive',
      userStatus: true,
    }
  });
  await store.updateAccountsAdvisers();
}

const rejectRequest = async (adviser: any) => {
  await $fetch('/api/deleteAdminUser', {
    method: 'POST',
    body: {
      userId: adviser.data.userId,
      adviserId: adviser.id
    }
  });
  await store.updateAccountsAdvisers();
}

const filteredAdvisers = () => {
  if (store.accountsSelectedAccount === 'all') {
    return (store.accountsAdvisers.filter((adviser: any) => adviser.data.status !== 'pending')).sort((a: any, b: any) => {
      const order: any = {active: 1, inActive:2};
      return (order[a.data.status] || 3) - (order[b.data.status] || 3)});
  } else if (store.accountsSelectedAccount === 'active') {
    return store.accountsAdvisers.filter((adviser: any) => adviser.data.status === 'active');
  } else if (store.accountsSelectedAccount === 'inactive') {
    return store.accountsAdvisers.filter((adviser: any) => adviser.data.status === 'inActive');
  } else if (store.accountsSelectedAccount === 'pending') {
    return store.accountsAdvisers.filter((adviser: any) => adviser.data.status === 'pending');
  }
}

</script>

<template>
  <div class="flex h-screen">
    <AdminSidebar />

    <div class="flex-grow accounts-page">
      <!--Header-->
      <AdminHeader />
      <div class="flex justify-center p-8">
        <div class="bg-white custom-shadow rounded-lg w-full max-w-4xl">
          <!-- Dropdown Button -->
          <div class="flex justify-start p-4">
            <div class="flex flex-row relative inline-block text-left w-full">
              <div class="w-[30%] mr-4">
                <select
                  class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none"
                  v-model="store.accountsSelectedAccount">
                  <option value="all">All Accounts</option>
                  <option value="active">Active Accounts</option>
                  <option value="inactive">Inactive Accounts</option>
                  <option value="pending">Approval Requests</option>
                </select>
              </div>
              <div>
                <button @click="store.accountsShowUploadModal = true"
                class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none">
                  Upload CSV for Bulk Registration
                </button>
              </div>
            </div>
          </div>

          <!-- Table -->
          <div class="overflow-x-auto overflow-y-auto max-h-96">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-green-700 sticky top-0 z-10">
                <tr>
                  <th scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider w-1/3">
                    Adviser Name
                  </th>
                  <th scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider w-1/3">
                    Faculty ID
                  </th>
                  <th v-if="store.accountsSelectedAccount === 'pending'" scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider w-1/3">
                    Actions
                  </th>
                  <th v-else scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider w-1/3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="adviser in filteredAdvisers()" :key="adviser.data.facultyId">
                  <td class="px-6 py-4 text-sm font-medium text-gray-900 break-words">
                    {{adviser.data.firstName + ' ' + adviser.data.lastName}}
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500 break-words">
                    {{ adviser.data.facultyId }}
                  </td>
                  <td v-if="store.accountsSelectedAccount === 'pending'" class="px-6 py-4 break-words">
                    <button @click="acceptRequest(adviser)"
                      class="px-8 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-500 text-white hover:bg-green-700 mr-2">
                      Accept
                    </button>
                   
                    <button @click="rejectRequest(adviser)"
                      class="px-8 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-500 text-white hover:bg-red-700">
                      Reject
                    </button>
                  </td>
                  <td v-else class="px-6 py-4 break-words">
                    <span :class="[ 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                      adviser.data.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    ]">
                      {{ adviser.data.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Modal for CSV Upload -->
      <AdviserCSVUploadModal
        v-if="store.accountsShowUploadModal"
        @close="store.accountsShowUploadModal = false"
        @upload="uploadFile"
        @file-uploaded="handleFileUpload"
      /> 
    </div>
  </div>
</template>

<style>
</style>

<style scoped>
.outer-container {
  background-color: lightgreen;
  margin: 3rem 5rem;
}

.custom-shadow {
  box-shadow: 0 7px 10px -2px rgba(0, 0, 0, 0.1), 0 4px 8px -2px rgba(0, 0, 0, 0.06);
}

/* Sticky table header styling */
thead th {
  position: sticky;
  top: 0;
  background-color: #1f7a1f;
  /* Dark green background */
  color: white;
  z-index: 1;
  /* Ensure header stays above body rows */
  padding: 0.75rem;
  /* Adjust padding as needed */
  white-space: nowrap;
  /* Prevent header from wrapping */
}

th:first-child {
  width: 35%;
  /* Allocate more space for the first column */
}

th:nth-child(3) {
  width: 25%;
}

th:nth-child(2),
th:nth-child(4) {
  width: 20%;
  /* Adjust remaining columns evenly */
}

/* Wrap content inside table cells */
td {
  word-wrap: break-word;
  white-space: normal;
  /* Allows content to wrap */
  padding: 0.75rem;
  /* Adjust padding as needed */
  font-size: 0.875rem;
  /* Optional: make text smaller */
  color: #4a4a4a;
  /* Text color */
}

.overflow-x-auto {
  max-height: 600px;
  /* Adjust the height as needed */
  overflow-y: auto;
}
</style>



// async function created() {
//     // Fetch advisers when the component is created
//   await fetchAdvisers();
// }
// export default {
//   name: 'AccountsPage',
//   components: {
//     AdminSidebar,
//     AdminHeader,
//     AdviserCSVUploadModal,
//   },
//   data() {
//     return {
//       accountsSelectedAccount: 'all',
//       showUploadModal: false,
//       file: null,
//       store: adminStore(),
//       advisers: [],
//     };
//   },

//   ,

//   computed: {
    
//   },
//   methods: {

//   }
// };