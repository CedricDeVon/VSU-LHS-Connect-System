import { defineStore } from 'pinia'

export const userLoginStore = defineStore('userLoginStore', () => {
  const email = ref('');
  const password = ref('');
  const errorMessage = ref('');

  function reset() {
    email.value = '';
    password.value = '';
    errorMessage.value = '';
  }

  return { email, password, errorMessage, reset };
});
