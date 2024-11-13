import { defineStore } from 'pinia'

export const studentAddedStore = defineStore('studentAddedStore', () => {
   const studentId = ref('');
    const firstName = ref('');
    const lastName = ref('');
    const middleName = ref('');
    const suffix = ref('');
    const gender = ref('');
    const address = ref('');
    const contactNum = ref('');
    const isEnrolled = ref(true);
    const incidentDocIDs = ref([]);
    const birthDate = ref('');
    const profilePic = ref('');

    // const getUserData = () => {
    //     return {
    //         userName: userName.value,
    //         email: email.value,
    //         password: password.value,
    //         confirmPassword: confirmPassword.value
    //     };
    // }

    // const getAdviserData = () => {
    //     return {
    //         firstName: firstName.value,
    //         middleName: middleName.value,
    //         lastName: lastName.value,
    //         suffix: suffix.value,
    //         hasSuffix: hasSuffix.value,
    //         birthdate: birthdate.value,
    //         facultyId: facultyId.value,
    //         gradeLevel: parseInt(gradeLevel.value),
    //         sectionName: sectionName.value
    //     };
    // }

    // const getAllData = () => {
    //     return { ...getUserData(), ...getAdviserData() };
    // }

    // function resetUserData() {
    //     userName.value = '';
    //     email.value = '';
    //     password.value = '';
    //     confirmPassword.value = '';
    //     errorMessage.value = '';
    // }

    // function resetAdviserData() {
    //     firstName.value = '';
    //     middleName.value = '';
    //     lastName.value = '';
    //     suffix.value = '';
    //     hasSuffix.value = false;
    //     birthdate.value = '';
    //     facultyId.value = '';
    //     gradeLevel.value = '';
    //     sectionName.value = '';
    //     errorMessage.value = '';
    // }
  
    // function resetAllData() {
    //     resetUserData();
    //     resetAdviserData();
    // }
  
    return { 
        studentId,
        firstName,
        lastName,
        middleName,
        suffix,
        gender,
        address,
        contactNum,
        isEnrolled,
        incidentDocIDs,
        birthDate,
        profilePic
    };
  });
  