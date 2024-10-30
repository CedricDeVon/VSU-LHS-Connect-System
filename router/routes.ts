import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from '@/app.vue';
import LoginPage from '@/pages/LoginPage.vue';
import SignupPage1 from '@/pages/SignupPage1.vue'; 
import SignupPage2 from '@/pages/SignupPage2.vue';
import RegistrationSuccessful from '@/pages/RegistrationSuccessful.vue';

const routes = [
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/signup-page-1',
    name: 'SignupPage1',
    component: SignupPage1
  },
  {
    path: '/signup-page-2',
    name: 'SignupPage2',
    component: SignupPage2
  },
  {
    path: '/registration-successful',
    name: 'RegistrationSuccessful',
    component: RegistrationSuccessful
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

const app = createApp(App);
app.use(router);
app.mount('#app');