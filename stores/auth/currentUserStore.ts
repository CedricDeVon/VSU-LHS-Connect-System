import { defineStore } from 'pinia'

export const useCurrentUserStore = defineStore('useCurrentUserStore', () => {
  const email = ref('');
  const password = ref('');

  const getAllData = () => {
    return {
      email: email.value,
      password: password.value };
  }

  function resetAllData() {
    email.value = '';
    password.value = '';
  }

  return { email, password, resetAllData, getAllData };
});
