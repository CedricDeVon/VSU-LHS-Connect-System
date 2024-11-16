
export const useAdviserViewStore = defineStore('useAdviserViewStore', () => {
    const advisorySelectedSort = ref('');
    const advisoryStudents = useState('advisoryStudents');
    const advisoryShowStudentInfo = ref(false);
    const advisoryShowAddStudentForm = ref(false);
    const advisoryAcademicYearAndSemesterMessage = ref('');
    const advisoryStudentData = useState('advisoryStudentData');
    
    const addNewStudent = async () => {
        advisoryShowAddStudentForm.value = true;
    }

    const studentClick = async (student: any) => {
        advisoryShowStudentInfo.value = !advisoryShowStudentInfo.value;
        if (advisoryShowStudentInfo.value) {
            advisoryStudentData.value = student;
        }
    }

    const getStudentFullName = (student: any) => {
        // console.log(student)
        return `${student.data.lastName}, ${student.data.firstName} ${student.data.middleName} ${student.data.suffix}`.trim();
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
        resetAllData,
        addNewStudent,
        updateAdvisoryView,
        studentClick,
        getStudentFullName
    };
})
