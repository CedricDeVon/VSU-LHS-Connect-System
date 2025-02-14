import { defineStore } from 'pinia'

export const useSignupStore = defineStore('signupStore', () => {
    const username = ref('');
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const firstName = ref('');
    const middleName = ref('');
    const lastName = ref('');
    const hasSuffix = ref(true);
    const suffixName = ref('');
    const birthdate = ref('');
    const facultyIdentificationNumber = ref('');
    const errorMessage = ref('');

    function resetStep1() {
        username.value = '';
        email.value = '';
        password.value = '';
        confirmPassword.value = '';
        errorMessage.value = '';
    }

    function resetStep2() {
        firstName.value = '';
        middleName.value = '';
        lastName.value = '';
        hasSuffix.value = false;
        suffixName.value = '';
        birthdate.value = '';
        facultyIdentificationNumber.value = '';
        errorMessage.value = '';
    }

    function resetAll() {
        resetStep1();
        resetStep2();
    }

    return {
        username,
        email,
        password,
        confirmPassword,
        firstName,
        middleName,
        lastName,
        hasSuffix,
        suffixName,
        birthdate,
        facultyIdentificationNumber,
        errorMessage,
        resetStep1,
        resetStep2,
        resetAll,
    };
});