import { UserSecurity } from "~/library/security/userSecurity";
import { TimeConverters } from "~/library/timeConverters/timeConverters";

export const useAdviserViewStore = defineStore('useAdviserViewStore', () => {
    const advisorySelectedSort = ref('');
    const advisoryStudents = useState('advisoryStudents');
    const advisoryShowStudentInfo = ref(false);
    const advisoryShowAddStudentForm = ref(false);
    const advisoryAcademicYearAndSemesterMessage = ref('');
    const advisoryStudentData = useState('advisoryStudentData');
    const advisoryAddStudentForm = ref(false);
    const advisoryShowNotification = ref(false);

    const homepageSelectedSort = ref('');
    const homepageItems = useState('homepageItems');
    const homepageShowStudentInfo = ref(false);
    const homepageShowAddStudentForm = ref (false);
    const homepageTimeline = useState('homepageTimeline');
    const homepageAdviser = useState('homepageAdviser');
    const homepageUser = useState('homepageUser');
    const homepageAnnouncements = useState('homepageAnnouncements');
    const homepageSection = useState('homepageSection');
    
    const addStudentFormInitPreparation = ref(true);
    const addStudentFormShowSingleNewStudentForm = ref(false);
    const addStudentFormShowSingleContStudentForm = ref(false);
    const addStudentFormShowBulkNewStudentForm = ref(false);
    const addStudentFormShowBulkContStudentForm = ref(false);
    const addStudentFormSelectedStudentType = ref('');
    const addStudentFormHoveredStudentType = ref('');
    const addStudentFormSelectedAddingType = ref('');
    const addStudentFormHoveredAddingType = ref('');

    const reportsIncidentalReports = useState('reportsIncidentalReports');
    const reportsAnecdotalReports = useState('reportsAnecdotalReports');
    const reportsShowIncidentalUpdateReport = ref(false);
    const reportsTimeline = useState('reportsTimeline');
    const reportsReport = useState('reportsReport');
    const reportsReportIsDraft = ref(true);
    const reportsShowCreateReport = ref(false);
    const reportsShowViewIncidentalReport = ref(false);
    const reportsIsDraft = ref(true);
    const reportsShowNotification = ref(false);
    const reportsContainWidth = ref('89%');
    const reportsTitleWidth = ref('87%');
    const reportsSelectedSort = ref('');
    const reportsInitialDocID = ref('');
    const reportsReportIDRef = ref('');
    const reportsReportedBY = ref('');
    const reportsPeopleInvolved = useState('reportsPeopleInvolved');
    const reportsWitness = useState('reportsWitness');
    const reportsDateOfIncident = ref('');
    const reportsPlaceOfIncident = ref('');
    const reportsThingsInvolved = ref('');
    const reportsNarrativeReport = ref('');
    const reportsDateReported = ref((new Date()).toISOString());
    const reportsStatus = ref('Unread');
    const reportsAcademicYear = ref('');
    const reportsAdviser = ref('');

    const settingsShowNotification = ref(false);
    const settingsContainWidth = ref('89%');
    const settingsTitleWidth = ref('87%');
    const settingsUser = useState('settingsUser');
    const settingsTimeline = useState('settingsTimeline');
    const settingsAdviser = useState('settingsAdviser');

    const unEnrolledStudents = useState('unEnrolledStudents');
    const unEnrolledTimeline = useState('unEnrolledTimeline');

    const studentCSVUpdateModalFile = useState('studentCSVUpdateModalFile');
    const studentCSVUpdateModalSuccessMessage = ref('');
    const studentCSVUpdateModalSuccessBulkContStudentForm = ref(false);

    const anecdoteAnecdotalReport = useState('anecdoteAnecdotalReport');
    const anecdoteReports = useState('anecdoteReports');
    const anecdoteStudent = useState('anecdoteStudent');

    const notificationAdminModalAnnouncements = useState('notificationAdminModalAnnouncements');
    const notificationAdviserModalAnnouncements = useState('notificationAdviserModalAnnouncements');
    const notificationShowAdminModalAnnouncements = ref(false);
    const notificationShowAdviserModalAnnouncements = ref(false);
    
    const updateAdviserNotificationModal = async () => {
        await UserSecurity.logInViaToken();
        let user = await getCurrentUser();
        const result: any = await $fetch('/api/announcement/adviser', {
            method: 'POST', body: {
                userId: user.uid
            }
        });
        // console.log(result.data.announcements)

        notificationAdviserModalAnnouncements.value = result.data.announcements || [];
    }

    const updateAnecdote = async (studentId: string) => {
        const result: any = await $fetch('/api/adviser/view/anecdote', {
          method: 'POST', body: {
            studentId
          }
        });
        // console.log(result)
    
        anecdoteStudent.value = result.data.student;
        anecdoteAnecdotalReport.value = result.data.anecdotalReport;
        anecdoteReports.value = result.data.reports || [];
    }
      
    const createManyStudentsViaCSV = async (user: any, file: any) => {
        const result: any = await $fetch('/api/adviser/view/studentCSVUploadModal/createMany', {
            method: 'POST', body: {
                userId: user.uid, file
            }
        });
        
        return result;
    }

    const updateHomePage = async () => {
        await UserSecurity.logInViaToken();
        let user = await getCurrentUser();
        const result: any = await $fetch('/api/adviser/view/homepage', {
            method: 'POST', body: {
                userId: user.uid
            }
        });

        homepageTimeline.value = result.data.timeline;
        homepageAdviser.value = result.data.adviser;
        homepageUser.value = result.data.user;
        homepageSection.value = result.data.section;
        homepageAnnouncements.value = result.data.announcements || [];

        await updateAdviserNotificationModal();
    }

    const updateUnEnrolledStudents = async () => {
        await UserSecurity.logInViaToken();
        const user = await getCurrentUser();
        const result: any = await $fetch('/api/adviser/view/unEnrolledStudents', {
            method: 'POST', body: {
                userId: user.uid
            }
        });

        unEnrolledStudents.value = result.data.students || [];
        unEnrolledTimeline.value = result.data.timeline;
    }

    const enrollStudent = async (student: any) => {
        await UserSecurity.logInViaToken();
        const user = await getCurrentUser();
        const result: any = await $fetch('/api/adviser/view/studentEnrollment/enroll', {
            method: 'POST', body: {
                userId: user.uid,
                studentId: student.id
            }
        });
    }

    const removeStudent = async (student: any) => {
        await UserSecurity.logInViaToken();
        let user = await getCurrentUser();
        const result: any = await $fetch('/api/adviser/view/studentEnrollment/unenroll', {
            method: 'POST', body: {
                userId: user.uid,
                studentId: student.id
            }
        });
    }

    const updateReports = async () => {
        await UserSecurity.logInViaToken();
        let user = await getCurrentUser();
        const result: any = await $fetch('/api/adviser/view/reports', {
            method: 'POST', body: {
                userId: user.uid
            }
        });

        reportsIncidentalReports.value = result.data.incidentalReports || [];
        reportsAnecdotalReports.value = result.data.anecdotalReports || [];
        reportsTimeline.value = result.data.timeline;
        reportsAdviser.value = result.data.adviser;

        await updateAdviserNotificationModal();
    }

    const updateSettings = async () => {
        await UserSecurity.logInViaToken();
        let user = await getCurrentUser();
        const result: any = await $fetch('/api/adviser/view/settings', {
            method: 'POST', body: {
                userId: user.uid
            }
        });

        settingsUser.value = result.data.user;
        settingsTimeline.value = result.data.timeline;
        settingsAdviser.value = result.data.adviser;

        await updateAdviserNotificationModal();
    }

    const resetReports = async () => {
        // const result: any = await $fetch('/api/adviser/view/homepage', {
        //     method: 'POST', body: {}
        // });
    }

    const getGradeAndSection = (section: any) => {
        if (!section) {
          return 'N/A';
        }
  
        const { data }: any = section;
        return `Grade ${data.level} - ${data.name}`;
    }

    const getAcademicYearAndSemester = (timeline: any) => {
        return `Academic Year ${timeline.data.schoolYear} / ${(timeline.data.semester === 1) ? 'First' : 'Second'} Semester`;
    }

    const getAcademicYear = (timeline: any) => {
        return `Academic Year ${timeline.data.schoolYear}`;
    }

    const addNewStudent = async (studentData: any) => {
        await UserSecurity.logInViaToken();
        let user = await getCurrentUser();
        const anecdoteId =  generateAnecdoteId();
        let result: any = await $fetch('/api/anecdote/create', {
            method: 'POST', body: {
                userId: user.uid,
                studentId: studentData.studentId,
                initialId: generateReportId(),
                anecdoteId,
                dateReported: TimeConverters.dateConverter.convert(Date.now()).data,
                data: {}
            }
        });

        result = await $fetch('/api/adviser/view/addStudentForm/createStudent', {
            method: 'POST', body: {
                userId: user.uid,
                studentData,
                anecdoteId
            }
        });
    }

    const studentClick = async (student: any) => {
        advisoryShowStudentInfo.value = !advisoryShowStudentInfo.value;
        if (advisoryShowStudentInfo.value) {
            advisoryStudentData.value = student;
        }
    }
    
    const getFullName = (person: any) => {
        return `${person.data.lastName}, ${person.data.firstName || ''} ${person.data.middleName || ''} ${person.data.suffix || ''}`.trim();
    }

    const updateAdvisoryView = async () => {
        await UserSecurity.logInViaToken();
        let user = await getCurrentUser();
        const result: any = await $fetch('/api/adviser/view/advisory', {
            method: 'POST',
            body: {
                id: user?.uid
            }
        })
        const { students, timeline } = result.data;
        advisoryStudents.value = students || [];
        advisoryAcademicYearAndSemesterMessage.value = `Academic Year ${timeline.schoolYear}`

        await updateAdviserNotificationModal();
    }

    const resetAllData = async () => {
        advisorySelectedSort.value = '';
        advisoryStudents.value = [];
        advisoryShowStudentInfo.value = false;
        advisoryShowAddStudentForm.value = false;
    }

    const generateCaseConferenceId = () => {
        const prefix = 'CONF';
        const timestamp = Date.now().toString().slice(-6);
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `${prefix}-${timestamp}-${random}`;
      };
    
      const generateIncidentId = () => {
        const prefix = 'INC';
        const timestamp = Date.now().toString().slice(-6);
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `${prefix}-${timestamp}-${random}`;
      };
    
      const generateReportId = () => {
        const prefix = 'REP';
        const timestamp = Date.now().toString().slice(-6);
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `${prefix}-${timestamp}-${random}`;
      };
    
      const generateAnecdoteId = () => {
        const prefix = 'ANE';
        const timestamp = Date.now().toString().slice(-6);
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `${prefix}-${timestamp}-${random}`;
      };
      
    return {
        reportsShowViewIncidentalReport,
        reportsShowIncidentalUpdateReport,
        generateCaseConferenceId,
        generateIncidentId,
        generateReportId,
        generateAnecdoteId,
        reportsAdviser,
        removeStudent,
        getAcademicYear,
        notificationShowAdminModalAnnouncements,
        notificationShowAdviserModalAnnouncements,
        updateAdviserNotificationModal,
        notificationAdminModalAnnouncements,
        notificationAdviserModalAnnouncements,
        homepageAnnouncements,
        updateAnecdote,
        anecdoteStudent,
        anecdoteReports,
        anecdoteAnecdotalReport,
        studentCSVUpdateModalSuccessBulkContStudentForm,
        createManyStudentsViaCSV,
        studentCSVUpdateModalFile,
        studentCSVUpdateModalSuccessMessage,
        enrollStudent,
        unEnrolledStudents,
        unEnrolledTimeline,
        updateUnEnrolledStudents,
        advisoryAddStudentForm,
        advisoryShowNotification,    
        advisorySelectedSort,
        advisoryStudents,
        advisoryShowStudentInfo,
        advisoryShowAddStudentForm,
        advisoryAcademicYearAndSemesterMessage,
        advisoryStudentData,        
        homepageSelectedSort,
        homepageItems,
        homepageShowStudentInfo,
        homepageShowAddStudentForm,
        addStudentFormInitPreparation,
        addStudentFormShowSingleNewStudentForm,
        addStudentFormShowSingleContStudentForm,
        addStudentFormShowBulkNewStudentForm,
        addStudentFormShowBulkContStudentForm,
        addStudentFormSelectedStudentType,
        addStudentFormHoveredStudentType,
        addStudentFormSelectedAddingType,
        addStudentFormHoveredAddingType,

        reportsIncidentalReports,
        reportsReport,
        reportsReportIsDraft,
        reportsShowCreateReport,
        reportsIsDraft,
        reportsShowNotification,
        reportsContainWidth,
        reportsTitleWidth,
        reportsSelectedSort,
        reportsInitialDocID,
        reportsReportIDRef,
        reportsReportedBY,
        reportsPeopleInvolved,
        reportsWitness,
        reportsDateOfIncident,
        reportsPlaceOfIncident,
        reportsTimeline,
        reportsThingsInvolved,
        reportsNarrativeReport,
        reportsDateReported,
        reportsStatus,
        reportsAcademicYear,
        reportsAnecdotalReports,

        settingsShowNotification,
        settingsContainWidth,
        settingsTitleWidth,
        settingsUser,
        settingsTimeline,
        settingsAdviser,
        resetAllData,
        addNewStudent,
        studentClick,
        getFullName,
        updateAdvisoryView,
        updateHomePage,
        updateReports,
        resetReports,
        updateSettings,
        getAcademicYearAndSemester,
        homepageTimeline,
        homepageAdviser,
        homepageUser,
        homepageSection,
        getGradeAndSection
    };
})
