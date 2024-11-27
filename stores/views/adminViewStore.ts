import { defineStore } from 'pinia'
import { getCurrentUser } from 'vuefire';

export const useAdminViewStore = defineStore('useAdminViewStore', () => {
  const adminName = ref('');
  const adminEmail = ref('');

  const dashBoardReportsCount = ref('0');
  const dashBoardStudentsCount = ref('0');
  const dashBoardAccountApprovalsCount = ref('0');
  const dashBoardIncidentReports = useState('dashBoardIncidentReports');
  const dashBoardInitialReports = useState('dashBoardInitialReports');
  const dashBoardCaseConferences = useState('dashBoardCaseConferences');
  const dashBoardTimeline = useState('dashBoardTimeline');

  const accountsSelectedAccount = ref('all');
  const accountsShowUploadModal = ref(false);
  const accountsFile = ref(null);
  const accountsAdvisers = useState('accountsAdvisers');
  const accountsMessage = ref('');

  const searchQuery = ref('');
  const searchDebouncedQuery = ref('');
  const searchSelectedSearch = ref('');
  const searchSelectedStudent = useState('searchSelectedStudent');
  const searchShowAddSectionForm = ref(false);
  const searchShowStudentDetailsModal = ref(false);
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
  const incidentalStudents = useState('incidentalStudents');
  const incidentalReportType = ref('INCIDENTAL REPORT');
  const incidentalReceivedBy = ref('');
  const incidentalReportedBy = ref('');
  const incidentalSearchQuery = ref('');
  const incidentalSelectedSort = ref('');
  const incidentalStatusFilter = ref('all');
  const incidentalSearchResults = useState('incidentalSearchResults');

  const incidentUser = useState('incidentUser');
  const incidentAdmin = useState('incidentAdmin');
  const incidentStudent = useState('incidentStudent');
  const incidentInitialReport = useState('incidentInitialReport');
  const incidentIncidentReport = useState('incidentIncidentReport');
  
  const anecdotalAnecdotalReports = useState('anecdotalAnecdotalReports');
  const anecdotalAnecdotalStudents = useState('anecdotalAnecdotalStudents');
  const anecdotalAnecdotalSections = useState('anecdotalAnecdotalSections');
  const anecdotalAnecdotalAdvisers = useState('anecdotalAnecdotalAdvisers');

  const anecdoteAnecdotalReport = useState('anecdoteAnecdotalReport');
  const anecdoteAnecdotalReports = useState('anecdoteAnecdotalReports');
  const anecdoteReports = useState('anecdoteReports');
  const anecdoteStudents = useState('anecdoteStudents');
  const anecdoteStudent = useState('anecdoteStudent');

  const settingsUserData = useState('settingsUserData');
  const settingsAdminData = useState('settingsAdminData');
  const settingsAdviserData = useState('settingsAdviserData');

  const caseConferenceCaseConferenceReport = useState('caseConferenceCaseConferenceReport');
  const caseConferenceIncidentReport = useState('caseConferenceIncidentReport');
  const caseConferenceStudent = useState('caseConferenceStudent');
  const caseConferenceSection = useState('caseConferenceSection');

  const getAcademicYearAndSemester = (timeline: any) => {
        return `Academic Year ${timeline.data.schoolYear} / ${(timeline.data.semester === 1) ? 'First' : 'Second'} Semester`;
  }

  const updateCaseConference = async (caseConferenceId: any) => {
    // console.log('D', caseConferenceId);
    const result: any = await $fetch('/api/admin/view/caseConference', {
      method: 'POST', body: {
        caseConferenceId
      }
    });
    // console.log('A ', result);

    caseConferenceCaseConferenceReport.value = result.data.caseConferenceReport;
    caseConferenceIncidentReport.value = result.data.incidentReport;
    caseConferenceStudent.value = result.data.student;
    caseConferenceSection.value = result.data.section;
  }

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

  const updateIncidentAnecdote = async (id: string, data: any, anecdote: any) => {
    
    
  }

  const updateAnecdote = async (studentId: string) => {
    const result: any = await $fetch('/api/admin/view/anecdote', {
      method: 'POST', body: {
        studentId
      }
    });
    // console.log(result)

    anecdoteStudent.value = result.data.student;
    anecdoteAnecdotalReport.value = result.data.anecdotalReport;
    anecdoteReports.value = result.data.reports;
  }
  
  const updateIncident = async (incidentId: string) => {
    const currentUser = await getCurrentUser();
    const result: any = await $fetch('/api/admin/view/incident', {
      method: 'POST', body: {
        incidentId,
        userId: currentUser?.uid
      }
    });

    incidentUser.value = result.data.user;
    incidentAdmin.value = result.data.admin;
    incidentStudent.value = result.data.student;
    incidentIncidentReport.value = result.data.incidentReport;
  }
  
  const updateAnecdotal = async () => {
    const result: any = await $fetch('/api/admin/view/anecdotal', {
      method: 'POST', body: {}
    });

    // console.log(result)
    
    anecdotalAnecdotalReports.value = result.data.anecdotalReports;
    anecdotalAnecdotalStudents.value = result.data.students;
    anecdotalAnecdotalSections.value = result.data.sections;
    anecdotalAnecdotalAdvisers.value = result.data.advisers;
  }

  const updateIncidental = async () => {
    const result: any = await $fetch('/api/admin/view/incidental', {
      method: 'POST', body: {}
    });
    
    incidentalSearchResults.value = [];
    incidentalIncidentalReports.value = result.data.incidentReports;
    incidentalStudents.value = result.data.students;
  }

  const updateSectionPageData = async (sectionId: string) => {
    const result: any = await $fetch('/api/admin/view/section', {
      method: 'POST', body: {
        sectionId
      }
    });
    // console.log(result);
    sectionSection.value = result.data.section;
    sectionAdviser.value = result.data.adviser;
    sectionSections.value = result.data.sections;
    sectionSectionStudents.value = result.data.sectionStudents;
    sectionSectionAdvisers.value = result.data.sectionAdvisers;
    sectionSectionIncidentReports.value = result.data.sectionIncidentReports;
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
    return `${person.data.lastName || ''}, ${person.data.firstName || ''} ${person.data.middleName || ''} ${person.data.suffix || ''}`.trim();
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

  const sectionGetGradeAndSection = (section: any) => {
    return (section.data) ? `Grade ${section.data.level}, ${section.data.name}` : 'N/A';
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

  const updateSidebar = async () => {

  }

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
    console.log('A: ', data);

    adminName.value = data.user.data.username;
    adminEmail.value = data.user.data.email;
    dashBoardIncidentReports.value = data.incidentReports;
    dashBoardInitialReports.value = data.initialReports;
    dashBoardCaseConferences.value = data.caseConferences;
    dashBoardTimeline.value = data.timeline;
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
    updateSidebar,
    getAcademicYearAndSemester,
    dashBoardIncidentReports,
    dashBoardInitialReports,
    dashBoardCaseConferences,
    dashBoardTimeline,
    updateIncidentAnecdote,
    sectionGetGradeAndSection,
    caseConferenceStudent,
    caseConferenceSection,
    updateCaseConference,
    caseConferenceIncidentReport,
    caseConferenceCaseConferenceReport,
    settingsAdviserData,
    searchShowStudentDetailsModal,
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
    searchSelectedStudent,
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
    incidentalSelectedSort,
    incidentalReportType,
    incidentalReceivedBy,
    incidentalReportedBy,
    incidentalSearchQuery,    
    incidentalSearchResults,
    incidentalStatusFilter,
    anecdotalAnecdotalReports,
    anecdotalAnecdotalStudents,
    anecdotalAnecdotalSections,
    incidentIncidentReport,
    incidentalStudents,
    anecdoteAnecdotalReport,
    anecdoteStudent,
    updateSettings,
    updateAnecdote,
    updateIncident,
    updateAnecdotal,
    updateIncidental,
    incidentStudent,
    incidentUser,
    incidentAdmin,
    incidentInitialReport,
    anecdotalAnecdotalAdvisers,
    anecdoteAnecdotalReports,
    anecdoteStudents,
    anecdoteReports
  };
});
