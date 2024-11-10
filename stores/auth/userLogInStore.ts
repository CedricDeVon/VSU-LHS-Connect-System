import { defineStore } from 'pinia'

export const useUserLogInStore = defineStore('useUserLogInStore', () => {
  const email = ref('');
  const password = ref('');
  const role = ref('');
  const errorMessage = ref('');

  const getAllData = () => {
    return {
      email: email.value,
      password: password.value,
      role: role.value };
  }

  function resetAllData() {
    email.value = '';
    password.value = '';
    role.value = '';
    errorMessage.value = '';
  }

  return { email, password, role, errorMessage, resetAllData, getAllData };
});
