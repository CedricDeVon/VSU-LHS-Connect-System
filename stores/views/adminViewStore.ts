import { defineStore } from 'pinia'
import { getCurrentUser } from 'vuefire';
import { Databases } from '~/library/databases/databases';

export const useAdminViewStore = defineStore('useAdminViewStore', () => {
  const adminName = ref('');
  const adminEmail = ref('');

  const dashBoardReportsCount = ref('0');
  const dashBoardStudentsCount = ref('0');
  const dashBoardAccountApprovalsCount = ref('0');

  const accountsSelectedAccount = ref('all');
  const accountsShowUploadModal = ref(false);
  const accountsFile = ref(null);
  const accountsAdvisers = useState('accountsAdvisers');
  const accountsMessage = ref('');

  const searchQuery = ref('');
  const searchDebouncedQuery = ref('');
  const searchSelectedSearch = ref('');
  const searchShowAddSectionForm = ref(false);
  const searchSections = useState('searchSections');
  const searchStudents = useState('searchStudents');
  const searchAdvisers = useState('searchAdvisers');
  const searchSortBy = ref('');

  const sectionSection = ref(null);
  const sectionAdviser = ref(null);
  const sectionSelectedView = ref('');
  const sectionSelectedStudentSort = ref('');
  const sectionSelectedReportSort = ref('');
  const sectionSelectedReportStatus = ref('all');
  const sectionSections = useState('studentSections');
  const sectionSectionStudents = useState('studentSectionStudents');
  const sectionSectionAdviser = useState('studentSectionAdviser');
  const sectionSectionReports = useState('studentSectionReports');

  const studentStudentData = ref(null);
  const studentStudentSection = ref(null);
  const studentSelectedSort = ref('');
  const studentAllSectionStudents = useState('studentAllSectionStudents');
  const studentShowIncidentModal = ref(false);

  const updateSectionPageData = async () => {

  }

  const updateStudentPageData = async (studentId: string) => {
    const { data } = await $fetch('/api/admin/view/student', {
      method: 'POST', body: {
        studentId
      }
    });
    console.log(data)
    studentStudentData.value = data.studentData;
    studentStudentSection.value = data.studentSection;
    studentAllSectionStudents.value = data.allSectionStudents;
  }

  const getFullName = (student: any) => {
    return `${student.data.lastName}, ${student.data.firstName} ${student.data.middleName} ${student.data.suffix}`.trim();
  }

  const getGradeAndSection = () => {
      if (!studentStudentSection.value) {
        return 'N/A';
      }

      const { data } = studentStudentSection.value;
      return `Grade ${data.level}, Section ${data.name}`;
  }
  
  const resetAdviserAccountsCSVFileInputData = async (message: string) => {
    accountsMessage.value = message;
    accountsFile.value = null;
    accountsMessage.value = '';
  }

  const updateAll = async () => {
    const currentUser = await getCurrentUser();
    const { data } = await $fetch('/api/admin/view', {
      method: 'POST', body: { id: currentUser?.uid, email: currentUser?.email }
    });
    adminName.value = data.user.username;
    adminEmail.value = data.user.email;
    dashBoardReportsCount.value = data.reportsCount;
    dashBoardStudentsCount.value = data.studentsCount;
    dashBoardAccountApprovalsCount.value = data.approvalsCount;
    accountsAdvisers.value = data.advisers;
    searchSections.value = data.sections;
    searchStudents.value = data.students;
    searchAdvisers.value = data.advisers;
  };

  const updateSearch = async () => {
    const { data } = await $fetch('/api/admin/view/search', {
      method: 'POST'
    });
    searchSections.value = data.sections;
    searchStudents.value = data.students;
    searchAdvisers.value = data.advisers;
  };

  const updateDashboard = async () => {
    const currentUser = await getCurrentUser();
    const { data } = await $fetch('/api/admin/view/dashboard', {
        method: 'POST', body: { email: currentUser?.email, id: currentUser?.uid }
    });
    
    adminName.value = data.user.username;
    adminEmail.value = data.user.email;
    dashBoardReportsCount.value = data.reportsCount;
    dashBoardStudentsCount.value = data.studentsCount;
    dashBoardAccountApprovalsCount.value = data.approvalsCount;
  };

  const updateAccountsAdvisers = async () => {
    const { data } = await $fetch('/api/admin/view/accounts', {
      method: 'POST'
    });
    accountsAdvisers.value = data.advisers;
  };

  const resetAllData = () => {
    adminName.value = '';
    adminEmail.value = '';

    dashBoardReportsCount.value = '0';
    dashBoardStudentsCount.value = '0';
    dashBoardAccountApprovalsCount.value = '0';

    accountsSelectedAccount.value = 'all';
    accountsShowUploadModal.value = false;
    accountsFile.value = null;
    accountsMessage.value = '';
    accountsAdvisers.value = [];
  
    searchQuery.value = '';
    searchDebouncedQuery.value = '';
    searchSelectedSearch.value = '';
    searchShowAddSectionForm.value = false;
    searchSections.value = [];
    searchStudents.value = [];
    searchAdvisers.value = [];
    searchSortBy.value = '';

    sectionSection.value = null;
    sectionAdviser.value = null;
    sectionSelectedView.value = '';
    sectionSelectedStudentSort.value = '';
    sectionSelectedReportSort.value = '';
    sectionSelectedReportStatus.value = 'all';
    sectionSectionStudents.value = [];
    sectionSectionReports.value = [];
  
    studentStudentData.value = null;
    studentStudentSection.value = null;
    studentSelectedSort.value = '';
    studentAllSectionStudents.value = [];
    studentShowIncidentModal.value = false;
  }

  return {
    adminName,
    adminEmail,
    accountsAdvisers,
    accountsSelectedAccount,
    accountsShowUploadModal,
    accountsFile,
    accountsMessage,
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
    updateAll,
    updateDashboard,
    updateAccountsAdvisers,
    updateSearch,
    resetAllData,
    resetAdviserAccountsCSVFileInputData,
    sectionSection,
    sectionAdviser,
    sectionSelectedView,
    sectionSelectedStudentSort,
    sectionSelectedReportSort,
    sectionSelectedReportStatus,
    sectionSections,
    sectionSectionStudents,
    sectionSectionReports,
    studentStudentData,
    studentStudentSection,
    studentSelectedSort,
    studentAllSectionStudents,
    studentShowIncidentModal,
    sectionSectionAdviser,
    updateStudentPageData,
    updateSectionPageData,
    getFullName,
    getGradeAndSection
  };
});
