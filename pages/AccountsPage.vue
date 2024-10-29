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
                  v-model="selectedAccount">
                  <option value="all">All Accounts</option>
                  <option value="active">Active Accounts</option>
                  <option value="inactive">Inactive Accounts</option>
                  <option value="pending">Approval Requests</option>
                </select>
              </div>
              <div>
                <button @click="showUploadModal = true"
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
                  <th v-if="selectedAccount === 'pending'" scope="col"
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
                <tr v-for="adviser in filteredAdvisers" :key="adviser.facultyId">
                  <td class="px-6 py-4 text-sm font-medium text-gray-900 break-words">
                    {{ adviser.name }}
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500 break-words">
                    {{ adviser.facultyId }}
                  </td>
                  <td v-if="selectedAccount === 'pending'" class="px-6 py-4 break-words">
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
                      adviser.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    ]">
                      {{ adviser.status }}
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
        v-if="showUploadModal"
        @close="showUploadModal = false"
        @upload="uploadFile"
        @file-uploaded="handleFileUpload"
      /> 
    </div>
  </div>
</template>

<script>
import AdminSidebar from '@/components/Blocks/AdminSidebar.vue';
import AdminHeader from '@/components/Blocks/AdminHeader.vue';
import AdviserCSVUploadModal from '../components/Modals/AdviserCSVUploadModal.vue';

export default {
  name: 'AccountsPage',
  components: {
    AdminSidebar,
    AdminHeader,
    AdviserCSVUploadModal
  },
  data() {
    return {
      selectedAccount: 'all', // Default selected option
      showUploadModal: false,
      file: null,
      // Sample data
      advisers: [
        { name: 'Brooke', facultyId: 'F-02456', advisory: 'Grade 8 Thriller Bark', status: 'Active' },
        { name: 'Trafalgar Law', facultyId: 'F-01789', advisory: null, status: 'Inactive' },
        { name: 'Eustass Kid', facultyId: 'F-0789', advisory: null, status: 'Inactive' },
        { name: 'Nefertari Vivi', facultyId: 'F-0789', advisory: null, status: 'Inactive' },
        { name: 'Cutty Flam', facultyId: 'F-01123', advisory: 'Grade 9 Water 7', status: 'Active' },
        { name: 'Jinbei', facultyId: 'F-00123', advisory: 'Grade 10 Fishman', status: 'Active' },
        { name: 'BrookeBrooke', facultyId: 'F-02456', advisory: 'Grade 8 Thriller Bark', status: 'Pending' },
      ],
    };
  },
  computed: {
    filteredAdvisers() {
      if (this.selectedAccount === 'all') {
        return this.advisers.filter(adviser => adviser.status !== 'Pending');;
      } else if (this.selectedAccount === 'active') {
        return this.advisers.filter(adviser => adviser.status === 'Active');
      } else if (this.selectedAccount === 'inactive') {
        return this.advisers.filter(adviser => adviser.status === 'Inactive');
      } else if (this.selectedAccount === 'pending') {
        return this.advisers.filter(adviser => adviser.status === 'Pending');
      }
    }
  },
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    uploadFile() {
      console.log('File ready for upload:', this.file);
      this.showUploadModal = false;
      this.file = null;
    },
    acceptRequest(adviser) {
      adviser.status = 'Active';
    },
    rejectRequest(adviser) {
      this.advisers = this.advisers.filter(a => a.facultyId !== adviser.facultyId);
    }
  }
};
</script>

<style scoped>
/* (styles remain the same) */
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