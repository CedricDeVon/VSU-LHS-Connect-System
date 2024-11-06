import { defineStore } from 'pinia'

export const userSignUpStore = defineStore('userSignUpStore', () => {
    const userName = ref('');
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const errorMessage = ref('');
    const firstName = ref('');
    const middleName = ref('');
    const lastName = ref('');
    const suffix = ref('');
    const hasSuffix = ref(false);
    const birthdate = ref('');
    const facultyId = ref('');
    const gradeLevel = ref('');
    const sectionName = ref('');

    const getUserData = () => {
        return {
            userName: userName.value,
            email: email.value,
            password: password.value,
            confirmPassword: confirmPassword.value
        };
    }

    const getAdviserData = () => {
        return {
            firstName: firstName.value,
            middleName: middleName.value,
            lastName: lastName.value,
            suffix: suffix.value,
            hasSuffix: hasSuffix.value,
            birthdate: birthdate.value,
            facultyId: facultyId.value,
            gradeLevel: parseInt(gradeLevel.value),
            sectionName: sectionName.value
        };
    }

    const getAllData = () => {
        return { ...getUserData(), ...getAdviserData() };
    }

    function resetUserData() {
        userName.value = '';
        email.value = '';
        password.value = '';
        confirmPassword.value = '';
        errorMessage.value = '';
    }

    function resetAdviserData() {
        firstName.value = '';
        middleName.value = '';
        lastName.value = '';
        suffix.value = '';
        hasSuffix.value = false;
        birthdate.value = '';
        facultyId.value = '';
        gradeLevel.value = '';
        sectionName.value = '';
        errorMessage.value = '';
    }
  
    function resetAllData() {
        resetUserData();
        resetAdviserData();
    }
  
    return { userName, email, password, confirmPassword, errorMessage, firstName, middleName, lastName, suffix, hasSuffix, birthdate, facultyId, gradeLevel, sectionName, resetUserData, resetAdviserData, resetAllData, getUserData, getAdviserData, getAllData };
  });
  