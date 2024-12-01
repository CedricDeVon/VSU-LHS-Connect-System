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
                v-model="selectedAccount"
                  :disabled="add">
                <option value="all">All Accounts</option>
                <option value="active">Active Accounts</option>
                <option value="inactive">Inactive Accounts</option>
                <option value="pending">Approval Requests</option>
              </select>

              <button @click="showUploadModal = true"
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
                    {{ selectedAccount === 'pending' ? 'Actions' : 'Status' }}
                  </th>
                  <th v-if="add && selectedAccount === 'inactive'" scope="col"
                  class="px-10 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-1/3">
                  Action
                  </th>   
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="adviser in filteredAdvisers" :key="adviser.facultyId" 
                    class="hover:bg-gray-50 transition-colors">
                  <td class="px-6 py-4">
                    <div class="text-sm font-medium text-gray-900">{{adviser.firstName+ ' '+ adviser.lastName}}</div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-sm text-gray-500">{{ adviser.facultyId }}</div>
                  </td>
                  <td class="px-6 py-4">
                    <div v-if="selectedAccount === 'pending'" class="flex gap-2">
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
                        adviser.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      ]">
                        <span class="w-1.5 h-1.5 rounded-full mr-1.5"
                              :class="adviser.status === 'active' ? 'bg-green-600' : 'bg-red-600'">
                        </span>
                        {{ adviser.status }}
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

      <!-- Modals -->
      <AdviserCSVUploadModal v-if="showUploadModal" @close="showUploadModal = false" @upload="uploadFile" @file-uploaded="handleFileUpload" />
      <ApprovedAccountModal v-if="showApprovalModal" @close="showApprovalModal = false" :approvedEmail="propAdviser.email" :adviserName="propAdviser.name" :adviserID="propAdviser.facultyId" :adviserSection="propAdviser.section"/>
      <ConfirmAddAdviser v-if="showConfirmAdd" :adviser="pendingAdviser" @close="cancelAddToSection" @add="confirmAddToSection" :sectionId="this.$route.query.sectionId"/>
    </div>
  </div>
</template>

<script>
import AdminSidebar from '@/components/Blocks/AdminSidebar.vue';
import AdminHeader from '@/components/Blocks/AdminHeader.vue';
import AdviserCSVUploadModal from '../../components/Modals/AdviserCSVUploadModal.vue';
import { getAdvisers } from '~/data/adviser';
import { section } from '~/data/section';
import {users} from '~/data/user';
import ApprovedAccountModal from '~/components/Modals/AdminEmailing/ApprovedAccountModal.vue';
import ConfirmAddAdviser from '~/components/Modals/ConfirmAddAdviser.vue';
 


export default {
  name: 'AccountsPage',
  components: {
    AdminSidebar,
    AdminHeader,
    AdviserCSVUploadModal,
    ApprovedAccountModal,
    ConfirmAddAdviser
  },
  data() {
    return {
      selectedAccount: 'all', // Default selected option
      add: false,
      showUploadModal: false,
      file: null,
      // Sample data
      advisers: [],
      showApprovalModal: false,
      propAdviser:{
        facultyId: '',
        name: '',
        section: '',
        email: ''
      },
      showConfirmAdd: false,
      pendingAdviser: {}
    
    };
  },
  watch: {
    showApprovalModal(newVal) {
      console.log('showApprovalModal changed:', newVal);
    }
  },

  created() {
    // Fetch advisers when the component is created
    this.fetchAdvisers();
    const accountType = this.$route.query.accountType;
    if (accountType) {
      this.selectedAccount = accountType;
      this.add = true;  //this must be disabled after adding or cancelling
    }
  },

  mounted() {
    // Check for pending registrations on mount
    this.checkPendingRegistrations();
  },

  computed: {
   
    filteredAdvisers() {
      if (this.selectedAccount === 'all') {
        return (this.advisers.filter(adviser => adviser.status !== 'pending')).sort((a,b) => {
          const order = {active: 1, inActive:2};
          return (order[a.status] || 3) - (order[b.status] || 3)});
      } else if (this.selectedAccount === 'active') {
        return this.advisers.filter(adviser => adviser.status === 'active');
      } else if (this.selectedAccount === 'inactive') {
        return this.advisers.filter(adviser => adviser.status === 'inActive');
      } else if (this.selectedAccount === 'pending') {
        return this.advisers.filter(adviser => adviser.status === 'pending');
      }
    }
  },
  methods: {

    fetchAdvisers() {
      this.advisers = getAdvisers(); // Assign the result of getAdvisers to advisers
    },

    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    uploadFile() {
      console.log('File ready for upload:', this.file);
      this.showUploadModal = false;
      this.file = null;
    },
    
    // I think this approval, assigning of adviser to section and the likes should be temporarily store first locally before writng in db
    acceptRequest(adviser) {
      try {
        this.propAdviser.facultyId = adviser.facultyId;
        this.propAdviser.name = adviser.firstName + ' ' + adviser.lastName;
        
          try {
            const id = section.findIndex(s => s.id === adviser.sectionId);
            if (id === -1) {
              throw new Error('Section not found');
              return;
            }
            if(section[id].adviserId !== null && section[id].adviserId !== '' && section[id].adviserId !== undefined){
              alert('Section already has an adviser. You may remove the existing adviser first before assigning a new one.');
              return;
            }
            section[id].adviserId = adviser.id;
            this.propAdviser.section = section[id].sectionName;
          } catch (e) {
            console.log(e);
            alert('Error in finding section');
            return;
          }
          try {
            const id = users.findIndex(u => u.userId === adviser.userId);
            if (id === -1) {
              throw new Error('Email not found');
              return;
            }
            this.propAdviser.email =  users[id].emailAdd;
          } catch (e) {
            console.log(e);
            alert('Error in finding email');
            return;
          }

        }catch (e) {
        console.log(e);
        alert('Error in accepting request');
        return;
      }
      
      // After successful acceptance, update notifications
      const adminHeader = this.$refs.adminHeader;
      if (adminHeader) {
        const notifications = JSON.parse(localStorage.getItem('admin-notifications') || '[]');
        const updatedNotifications = notifications.filter(
          n => !(n.type === 'account' && n.message.includes(adviser.firstName + ' ' + adviser.lastName))
        );
        localStorage.setItem('admin-notifications', JSON.stringify(updatedNotifications));
      }

      this.showApprovalModal = true;
      adviser.status = 'active';

    },
    rejectRequest(adviser) {
      const adminHeader = this.$refs.adminHeader;
      if (adminHeader) {
        const notifications = JSON.parse(localStorage.getItem('admin-notifications') || '[]');
        const updatedNotifications = notifications.filter(
          n => !(n.type === 'account' && n.message.includes(adviser.firstName + ' ' + adviser.lastName))
        );
        localStorage.setItem('admin-notifications', JSON.stringify(updatedNotifications));
      }

      this.advisers = this.advisers.filter(a => a.facultyId !== adviser.facultyId);
    },

    selectAdviser(adviser) {
      // Handle the selection of an adviser
      console.log('Adviser selected:', adviser);
      // You can add further logic here to handle the selection
    },

    async handleNewRegistration(adviser) {
      // Your existing registration logic...
      
      // Get reference to AdminHeader component
      const adminHeader = this.$parent.$refs.adminHeader;
      if (adminHeader) {
        adminHeader.createAccountRequestNotification(adviser);
      }
    },

    checkPendingRegistrations() {
      const pendingAdvisers = this.advisers.filter(adviser => adviser.status === 'pending');
      if (pendingAdvisers.length > 0) {
        // Get reference to AdminHeader component
        const adminHeader = this.$refs.adminHeader;
        if (adminHeader) {
          pendingAdvisers.forEach(adviser => {
            adminHeader.createAccountRequestNotification(adviser);
          });
        }
      }
    },

    addToSection(adviser) {
      this.pendingAdviser = adviser;
      this.showConfirmAdd = true;
    },
    confirmAddToSection() {
      const sectionObj = section.find((sec) => sec.id === this.$route.query.sectionId);
      if (sectionObj) {
        sectionObj.adviserId = this.pendingAdviser.id;
        this.pendingAdviser.sectionId = sectionObj.id;
        this.pendingAdviser.status = 'active';
        this.showConfirmAdd = false;
        this.$router.push({ path: `/admin/section/${sectionObj.id}` });
      } else {
        alert('Section not found.');
      }
      this.add = false;
      this.pendingAdviser = {};
    },
    cancelAddToSection() {
      this.showConfirmAdd = false;
      this.pendingAdviser = {};
    },

  }
};
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