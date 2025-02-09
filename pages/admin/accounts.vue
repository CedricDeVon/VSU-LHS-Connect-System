<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AdminSidebar from '@/components/Blocks/AdminSidebar.vue';
import AdminHeader from '@/components/Blocks/AdminHeader.vue';
import AdviserCSVUpload from '../../components/Modals/AdviserCSVUpload.vue';
import ApproveAccount from '~/components/Modals/Admin Confirmations/ApproveAccount.vue';
import ConfirmAddAdviser from '~/components/Modals/Admin Confirmations/ConfirmAddAdviser.vue';
import emailjs from '@emailjs/browser';

import { getAdvisers } from '~/data/adviser';
import { section } from '~/data/section';
import { users } from '~/data/user';

const selectedAccount = ref('all'); // Default selected option
const add = ref(false);
const showUploadModal = ref(false);
const file = ref(null);
const advisers = ref([]);
const showApprovalModal = ref(false);
const propAdviser = ref({
  facultyId: '',
  name: '',
  section: '',
  email: ''
});
const showConfirmAdd = ref(false);
const pendingAdviser = ref({});

const route = useRoute();
const router = useRouter();

watch(showApprovalModal, (newVal) => {
  console.log('showApprovalModal changed:', newVal);
});

onMounted(() => {
  fetchAdvisers();
  const accountType = route.query.accountType;
  if (accountType) {
    selectedAccount.value = accountType as string;
    add.value = true; // this must be disabled after adding or cancelling
  }
  checkPendingRegistrations();
});

const filteredAdvisers = computed(() => {
  if (selectedAccount.value === 'all') {
    return advisers.value.filter(adviser => adviser.status !== 'pending').sort((a, b) => {
      const order = { active: 1, inActive: 2 };
      return (order[a.status] || 3) - (order[b.status] || 3);
    });
  } else if (selectedAccount.value === 'active') {
    return advisers.value.filter(adviser => adviser.status === 'active');
  } else if (selectedAccount.value === 'inactive') {
    return advisers.value.filter(adviser => adviser.status === 'inActive');
  } else if (selectedAccount.value === 'pending') {
    return advisers.value.filter(adviser => adviser.status === 'pending');
  }
});

function fetchAdvisers() {
  advisers.value = getAdvisers(); // Assign the result of getAdvisers to advisers
}

function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement;
  file.value = target.files ? target.files[0] : null;
}

function uploadFile() {
  console.log('File ready for upload:', file.value);
  showUploadModal.value = false;
  file.value = null;
}

function acceptRequest(adviser: any) {
  pendingAdviser.value = adviser;
  showApprovalModal.value = true;
}

function confirmAcceptRequest() {
  showApprovalModal.value = false;
  alert('Adviser account has been approved');
  router.push({ name: 'admin-search', query: { searchType: 'section' } });
  const adminHeader = ref(null);
  if (adminHeader.value) {
    const notifications = JSON.parse(localStorage.getItem('admin-notifications') || '[]');
    const updatedNotifications = notifications.filter(
      (n: any) => !(n.type === 'account' && n.message.includes(pendingAdviser.value.firstName + ' ' + pendingAdviser.value.lastName))
    );
    localStorage.setItem('admin-notifications', JSON.stringify(updatedNotifications));
  }
  pendingAdviser.value = {};
}

function rejectRequest(adviser: any) {
  const adminHeader = ref(null);
  if (adminHeader.value) {
    const notifications = JSON.parse(localStorage.getItem('admin-notifications') || '[]');
    const updatedNotifications = notifications.filter(
      (n: any) => !(n.type === 'account' && n.message.includes(adviser.firstName + ' ' + adviser.lastName))
    );
    localStorage.setItem('admin-notifications', JSON.stringify(updatedNotifications));
  }
  advisers.value = advisers.value.filter(a => a.facultyId !== adviser.facultyId);
}

function selectAdviser(adviser: any) {
  console.log('Adviser selected:', adviser);
}

async function handleNewRegistration(adviser: any) {
  const adminHeader = ref(null);
  if (adminHeader.value) {
    adminHeader.value.createAccountRequestNotification(adviser);
  }
}

function checkPendingRegistrations() {
  const pendingAdvisers = advisers.value.filter(adviser => adviser.status === 'pending');
  if (pendingAdvisers.length > 0) {
    const adminHeader = ref(null);
    if (adminHeader.value) {
      pendingAdvisers.forEach(adviser => {
        adminHeader.value.createAccountRequestNotification(adviser);
      });
    }
  }
}

async function sendEmail(user: any, adviser: any, section: any) {
  try {
    const response = await fetch('/api/approval-email');
    if (!response.ok) {
      throw new Error('Failed to fetch configuration');
    }
    const config = await response.json();
    const templateParams = {
      to_email: user.email,
      adviserName: `${adviser.firstName} ${adviser.lastName}`,
      adviserID: adviser.id,
      adviserSection: `${section.sectionLevel} - ${section.sectionName}`,
    };
    await emailjs.send(
      config.emailServiceId,
      config.emailTemplateId,
      templateParams,
      config.emailPublicKey
    );
    alert('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

function addToSection(adviser: any) {
  pendingAdviser.value = adviser;
  showConfirmAdd.value = true;
}

async function confirmAddToSection() {
  const sectionObj = section.find((sec: any) => sec.id === route.query.sectionId);
  if (sectionObj) {
    sectionObj.adviserId = pendingAdviser.value.id;
    pendingAdviser.value.sectionId = sectionObj.id;
    pendingAdviser.value.status = 'active';
    const userAdviser = users.find((u: any) => u.userId === pendingAdviser.value.userId);
    if (userAdviser) {
      userAdviser.canAccess = true;
      showConfirmAdd.value = false;
      alert('Adviser has been added to the section and email has been sent');
    }
    router.push({ path: `/admin/section/${sectionObj.id}` });
  } else {
    alert('Section not found.');
  }
  add.value = false;
  pendingAdviser.value = {};
}

function cancelAddToSection() {
  showConfirmAdd.value = false;
  pendingAdviser.value = {};
}
</script>

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
        <AdviserCSVUpload v-if="showUploadModal" @close="showUploadModal = false" @upload="uploadFile" @file-uploaded="handleFileUpload" />
        <ApproveAccount v-if="showApprovalModal" @close="showApprovalModal = false" @approve="confirmAcceptRequest" :adviser="pendingAdviser"/>
        <ConfirmAddAdviser v-if="showConfirmAdd" :adviser="pendingAdviser" @close="cancelAddToSection" @add="confirmAddToSection" :sectionId="this.$route.query.sectionId"/>
      </div>
    </div>
  </template>
  
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