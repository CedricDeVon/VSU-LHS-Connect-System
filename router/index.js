import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/auth/login'
  },
  // Auth routes
  {
    path: '/auth/login',
    name: 'login',
    component: () => import('@/pages/auth/login.vue')
  },
  {
    path: '/auth/signup/step1',
    name: 'signup-step1',
    component: () => import('@/pages/auth/signup/step1.vue')
  },
  {
    path: '/auth/signup/step2',
    name: 'signup-step2',
    component: () => import('@/pages/auth/signup/step2.vue')
  },
  {
    path: '/auth/signup/success',
    name: 'signup-success',
    component: () => import('@/pages/auth/signup/success.vue')
  },
  // Admin routes
  {
    path: '/admin/dashboard',
    name: 'admin-dashboard',
    component: () => import('@/pages/admin/dashboard.vue')
  },
  {
    path: '/admin/search',
    name: 'admin-search',
    component: () => import('@/pages/admin/search.vue')
  },
  {
    path: '/admin/accounts',
    name: 'admin-accounts',
    component: () => import('@/pages/admin/accounts.vue')
  },
  {
    path: '/admin/archives',
    name: 'admin-archives',
    component: () => import('@/pages/admin/archives.vue')
  },
  {
    path: '/admin/settings',
    name: 'admin-settings',
    component: () => import('@/pages/admin/settings.vue')
  },
  {
    path: '/admin/section/:id',
    name: 'admin-section-details',
    component: () => import('../pages/admin/section/[id].vue')
  },
  {
    path: '/admin/incidental',
    name: 'admin-incidental',
    component: () => import('@/pages/admin/incidental.vue')
  },
  {
    path: '/admin/anecdotal',
    name: 'admin-anecdotal',
    component: () => import('@/pages/admin/anecdotal.vue')
  },
  // 404 route
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/error.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation guard for authentication
router.beforeEach((to, from, next) => {
  const publicPages = ['/auth/login', '/auth/signup/step1', '/auth/signup/step2', '/auth/signup/success'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user'); // Adjust based on your auth logic

  if (authRequired && !loggedIn) {
    return next('/auth/login');
  }
  next();
});

export default router;