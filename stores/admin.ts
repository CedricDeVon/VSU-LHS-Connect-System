import { defineStore } from 'pinia'
import { getCurrentUser } from 'vuefire';

export const adminStore = defineStore('admin', () => {
  const adminName = ref('');
  const adminEmail = ref('');

  const dashBoardReportsCount = ref('0');
  const dashBoardStudentsCount = ref('0');
  const dashBoardAccountApprovalsCount = ref('0');

  const accountsSelectedAccount = ref('all');
  const accountsShowUploadModal = ref(false);
  const accountsFile = ref(null);
  const accountsAdvisers = useState('accountsAdvisers');

  const searchQuery = ref('');
  const searchDebouncedQuery = ref('');
  const searchSelectedSearch = ref('');
  const searchShowAddSectionForm = ref(false);
  const searchSections = useState('searchSections');
  const searchStudents = useState('searchStudents');
  const searchAdvisers = useState('searchAdvisers');
  const searchSortBy = ref('');

  const updateSearch = async () => {
    const { sections, students, advisers } = await $fetch('/api/adminSearch', {
      method: 'POST'
    })
    searchSections.value = sections;
    searchStudents.value = students;
    searchAdvisers.value = advisers;
  }

  const getDashboardData = () => {
    return {
        dashBoardReportsCount: dashBoardReportsCount.value,
        dashBoardStudentsCount: dashBoardStudentsCount.value,
        dashBoardAccountApprovalsCount: dashBoardAccountApprovalsCount.value
    };
  }

  const updateDashboard = async () => {
    const currentUser = await getCurrentUser();
    const { user, reportsCount, studentsCount, approvalsCount } = await $fetch('/api/adminDashboard', {
        method: 'POST',
        body: { email: currentUser?.email, id: currentUser?.uid }
    })
    
    adminName.value = user.username;
    adminEmail.value = user.email;
    dashBoardReportsCount.value = reportsCount;
    dashBoardStudentsCount.value = studentsCount;
    dashBoardAccountApprovalsCount.value = approvalsCount;   
  }

  const updateAccountsAdvisers = async () => {
    const { advisers } = await $fetch('/api/accountsAdvisers', {
      method: 'POST'
    })
    accountsAdvisers.value = advisers;
  }

  function resetAllData() {
    adminName.value = '';
    adminEmail.value = '';
    dashBoardReportsCount.value = '0';
    dashBoardStudentsCount.value = '0';
    dashBoardAccountApprovalsCount.value = '0';
    accountsSelectedAccount.value = 'all';
    accountsShowUploadModal.value = false;
    accountsFile.value = null;
    accountsAdvisers.value = [];
  
    searchQuery.value = '';
    searchDebouncedQuery.value = '';
    searchSelectedSearch.value = '';
    searchShowAddSectionForm.value = false;
    searchSections.value = [];
    searchStudents.value = [];
    searchSortBy.value = '';
  }

  return {
    adminName,
    adminEmail,
    accountsAdvisers,
    accountsSelectedAccount,
    accountsShowUploadModal,
    accountsFile,
    searchQuery,
    searchDebouncedQuery,
    searchSelectedSearch,
    searchShowAddSectionForm,
    searchSections,
    searchStudents,
    searchAdvisers,
    searchSortBy,
    dashBoardReportsCount,
    dashBoardStudentsCount,
    dashBoardAccountApprovalsCount,
    updateDashboard,
    updateAccountsAdvisers,
    updateSearch,
    getDashboardData,
    resetAllData,
     };
});
