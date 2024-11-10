import { useRouter } from 'vue-router';

const goToLogin = (): void => {
  const router = useRouter();
  router.push({ name: 'login' });
};

const goToPreviousPage = (): void => {
  window.history.back();
};

export { goToLogin, goToPreviousPage };