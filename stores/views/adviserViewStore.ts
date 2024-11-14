
export const useAdviserViewStore = defineStore('useAdviserViewStore', () => {
    const advisorySelectedSort = ref('');
    const advisoryStudents = useState('advisoryStudents');
    const advisoryShowStudentInfo = ref(false);
    const advisoryShowAddStudentForm = ref(true);
    const advisoryAcademicYearAndSemesterMessage = ref('');
    
    const addNewStudent = async () => {

    }

    const studentClick = async (student: any) => {
        console.log(student)
        advisoryShowStudentInfo.value = true;
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
        resetAllData,
        addNewStudent,
        updateAdvisoryView,
        studentClick
    };
})
