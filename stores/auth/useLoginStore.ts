import { defineStore } from 'pinia'

export const useLoginStore = defineStore('loginStore', () => {
  const email = ref('');
  const password = ref('');
  const userRole = ref('');
  const errorMessage = ref('');

  function resetAll() {
    email.value = '';
    password.value = '';
    userRole.value = '';
    errorMessage.value = '';
  }

  return { email, password, userRole, errorMessage, resetAll };
});