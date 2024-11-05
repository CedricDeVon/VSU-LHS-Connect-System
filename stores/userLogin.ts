import { defineStore } from 'pinia'

export const userLoginStore = defineStore('userLoginStore', () => {
  const email = ref('');
  const password = ref('');
  const errorMessage = ref('');

  const getAllData = () => {
    return {
      email: email.value,
      password: password.value };
  }

  function resetAllData() {
    email.value = '';
    password.value = '';
    errorMessage.value = '';
  }

  return { email, password, errorMessage, resetAllData, getAllData };
});
