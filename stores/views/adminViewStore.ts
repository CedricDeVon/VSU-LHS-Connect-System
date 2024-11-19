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
  const sectionSections = useState('sectionSections');
  const sectionSectionStudents = useState('sectionSectionStudents');
  const sectionSectionAdvisers = useState('sectionSectionAdvisers');
  const sectionSectionIncidentReports = useState('sectionSectionIncidentReports');

  const studentStudentData = ref(null);
  const studentStudentSection = ref(null);
  const studentSelectedSort = ref('');
  const studentAllSectionStudents = useState('studentAllSectionStudents');
  const studentShowIncidentModal = ref(false);

  const incidentalIncidentalReports = useState('incidentalIncidentalalReports');
  const incidentalStudentData = useState('incidentalStudentData');
  const incidentalReportType = ref('INCIDENTAL REPORT');
  const incidentalReceivedBy = ref('');
  const incidentalReportedBy = ref('');

  const incidentIncidentalReport = useState('incidentIncidentalalReport');
  const incidentStudentData = useState('incidentStudentData');
  
  const anecdotalAnecdotalReports = useState('anecdotalAnecdotalReports');
  const anecdotalStudentData = useState('anecdotalStudentData');

  const anecdoteAnecdotalReport = useState('anecdoteAnecdotalReport');
  const anecdoteStudentData = useState('anecdoteStudentData');

  const settingsUserData = useState('settingsUserData');
  const settingsAdminData = useState('settingsAdminData');

  const updateSettings = async () => {
    const currentUser = await getCurrentUser();
    const result: any = await $fetch('/api/admin/view/settings', {
      method: 'POST', body: {
        userId: currentUser?.uid
      }
    });

    settingsUserData.value = result.data.userData;
    settingsAdminData.value = result.data.adminData;
  }

  const updateAnecdote = async (studentId: string) => {
    const result: any = await $fetch('/api/admin/view/anecdote', {
      method: 'POST', body: {
        studentId
      }
    });

    anecdoteAnecdotalReport.value = result.data.anecdotalReport;
    anecdoteStudentData.value = result.data.studentData;
  }
  
  const updateIncident = async (incidentId: string) => {
    const result: any = await $fetch('/api/admin/view/incident', {
      method: 'POST', body: {
        incidentId
      }
    });

    incidentIncidentalReport.value = result.data.incidentalReport;
    incidentStudentData.value = result.data.studentData;
  }
  
  const updateAnecdotal = async () => {
    const result: any = await $fetch('/api/admin/view/anecdotal', {
      method: 'POST', body: {}
    });

    anecdotalAnecdotalReports.value = result.data.anecdotalReports;
    anecdotalStudentData.value = result.data.students;
  }

  const updateIncidental = async () => {
    const result: any = await $fetch('/api/admin/view/incidental', {
      method: 'POST', body: {}
    });
    
    
    incidentalIncidentalReports.value = result.data.incidentalReports;
    incidentalStudentData.value = result.data.studentData;
  }

  const updateSectionPageData = async (sectionId: string) => {
    const { data }: any = await $fetch('/api/admin/view/section', {
      method: 'POST', body: {
        sectionId
      }
    });
    sectionSection.value = data.section;
    sectionAdviser.value = data.adviser;
    sectionSections.value = data.sections;
    sectionSectionStudents.value = data.sectionStudents;
    sectionSectionAdvisers.value = data.sectionAdvisers;
    sectionSectionIncidentReports.value = data.sectionIncidentReports;
  }

  const updateStudentPageData = async (studentId: string) => {
    const { data }: any = await $fetch('/api/admin/view/student', {
      method: 'POST', body: {
        studentId
      }
    });
    // console.log(data.studentData)
    studentStudentData.value = data.studentData;
    studentStudentSection.value = data.studentSection;
    studentAllSectionStudents.value = data.allSectionStudents;
  }
  
  const getFullName = (person: any) => {
    return `${person.data.lastName}, ${person.data.firstName} ${person.data.middleName} ${person.data.suffix}`.trim();
  }

  const getGradeAndSection = () => {
      if (!studentStudentSection.value) {
        return 'N/A';
      }

      const { data }: any = studentStudentSection.value;
      return `Grade ${data.level}, ${data.name}`;
  }

  const studentGetGradeAndSection = (student: any) => {
    return (student.data.section) ? `Grade ${student.data.section.data.level}, ${student.data.section.data.name}` : 'N/A';
  }
  
  const resetAdviserAccountsCSVFileInputData = async (message: string) => {
    accountsMessage.value = message;
    accountsFile.value = null;
    accountsMessage.value = '';
  }

  const updateAll = async () => {
    const currentUser = await getCurrentUser();
    const { data }: any = await $fetch('/api/admin/view', {
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
    const { data }: any = await $fetch('/api/admin/view/search', {
      method: 'POST'
    });
    searchSections.value = data.sections;
    searchStudents.value = data.students;
    searchAdvisers.value = data.advisers;
  };

  const updateDashboard = async () => {
    const currentUser = await getCurrentUser();
    const { data }: any = await $fetch('/api/admin/view/dashboard', {
        method: 'POST', body: { email: currentUser?.email, id: currentUser?.uid }
    });
    
    adminName.value = data.user.data.username;
    adminEmail.value = data.user.data.email;
    dashBoardReportsCount.value = data.reportsCount;
    dashBoardStudentsCount.value = data.studentsCount;
    dashBoardAccountApprovalsCount.value = data.approvalsCount;
  };

  const updateAccountsAdvisers = async () => {
    const { data }: any = await $fetch('/api/admin/view/accounts', {
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
    sectionSections.value = [];
    sectionSectionStudents.value = [];
    sectionSectionAdvisers.value = [];
    sectionSectionIncidentReports.value = [];
  
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
    sectionSectionIncidentReports,
    studentStudentData,
    studentStudentSection,
    studentSelectedSort,
    studentGetGradeAndSection,
    studentAllSectionStudents,
    studentShowIncidentModal,
    sectionSectionAdvisers,
    updateStudentPageData,
    updateSectionPageData,
    getFullName,
    getGradeAndSection,
    incidentalIncidentalReports,
    incidentalReportType,
    incidentalReceivedBy,
    incidentalReportedBy,    
    anecdotalAnecdotalReports,
    anecdotalStudentData,
    incidentIncidentalReport,
    incidentStudentData,
    anecdoteAnecdotalReport,
    anecdoteStudentData,
    updateSettings,
    updateAnecdote,
    updateIncident,
    updateAnecdotal,
    updateIncidental,
  };
});
