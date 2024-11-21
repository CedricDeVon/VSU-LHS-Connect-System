
export const useAdviserViewStore = defineStore('useAdviserViewStore', () => {
    const advisorySelectedSort = ref('');
    const advisoryStudents = useState('advisoryStudents');
    const advisoryShowStudentInfo = ref(false);
    const advisoryShowAddStudentForm = ref(false);
    const advisoryAcademicYearAndSemesterMessage = ref('');
    const advisoryStudentData = useState('advisoryStudentData');

    const homepageSelectedSort = ref('');
    const homepageItems = useState('homepageItems');
    const homepageShowStudentInfo = ref(false);
    const homepageShowAddStudentForm = ref (false);
    const homepageTimeline = useState('homepageTimeline');
    const homepageAdviser = useState('homepageAdviser');
    const homepageUser = useState('homepageUser');
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

    const reportsInitialReports = useState('reportsInitialReports');
    const reportsAnecdotalReports = useState('reportsAnecdotalReports');
    const reportsTimeline = useState('reportsTimeline');
    const reportsReport = useState('reportsReport');
    const reportsReportIsDraft = ref(true);
    const reportsShowCreateReport = ref(false);
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

    const settingsShowNotificaton = ref(false);
    const settingsContainWidth = ref('89%');
    const settingsTitleWidth = ref('87%');
    const settingsUser = useState('settingsUser');
    const settingsTimeline = useState('settingsTimeline');
    const settingsAdviser = useState('settingsAdviser');

    const updateHomePage = async () => {
        const user = await getCurrentUser();
        const result: any = await $fetch('/api/adviser/view/homepage', {
            method: 'POST', body: {
                userId: user.uid
            }
        });

        homepageTimeline.value = result.data.timeline;
        homepageAdviser.value = result.data.adviser;
        homepageUser.value = result.data.user;
        homepageSection.value = result.data.section;
    }

    const updateReports = async () => {
        const user = await getCurrentUser();
        const result: any = await $fetch('/api/adviser/view/reports', {
            method: 'POST', body: {
                userId: user.uid
            }
        });

        console.log(result);
        reportsInitialReports.value = result.data.initialReports;
        reportsAnecdotalReports.value = result.data.anecdotalReports;
        reportsTimeline.value = result.data.timeline;
    }

    const updateSettings = async () => {
        const user = await getCurrentUser();
        const result: any = await $fetch('/api/adviser/view/settings', {
            method: 'POST', body: {
                userId: user.uid
            }
        });

        settingsUser.value = result.data.user;
        settingsTimeline.value = result.data.timeline;
        settingsAdviser.value = result.data.adviser;
    }

    const updateAddStudentForm = async () => {
            
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

    const addNewStudent = async () => {
        advisoryShowAddStudentForm.value = true;
    }

    const studentClick = async (student: any) => {
        advisoryShowStudentInfo.value = !advisoryShowStudentInfo.value;
        if (advisoryShowStudentInfo.value) {
            advisoryStudentData.value = student;
        }
    }

    const getFullName = (person: any) => {
        return `${person.data.lastName}, ${person.data.firstName} ${person.data.middleName} ${person.data.suffix}`.trim();
      }
    
    const updateAdvisoryView = async () => {
        const currentUser = await getCurrentUser();
        const result: any = await $fetch('/api/adviser/view/advisory', {
            method: 'POST',
            body: {
                id: currentUser?.uid
            }
        })
        const { students, timeline } = result.data;
        advisoryStudents.value = students;
        advisoryAcademicYearAndSemesterMessage.value = `Academic Year ${timeline.schoolYear} / ${(timeline.semester === 1) ? "First" : "Second"} Semester`
    }

    const resetAllData = async () => {
        advisorySelectedSort.value = '';
        advisoryStudents.value = [];
        advisoryShowStudentInfo.value = false;
        advisoryShowAddStudentForm.value = false;
    }

    return {
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

        reportsInitialReports,
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

        settingsShowNotificaton,
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
        updateAddStudentForm,
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
