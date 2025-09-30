import { createRouter, createWebHashHistory } from 'vue-router';
import store from './store';

// Page Components
import AuthPage from './pages/AuthPage.vue';
import NotFoundPage from './pages/NotFoundPage.vue';

// Dashboard Components
import Dashboard from './views/Dashboard.vue';
import DashboardIndex from './views/dashboard/Index.vue';
import DashboardSettings from './views/dashboard/Settings.vue';
import DashboardWidget from './views/dashboard/Widget.vue';
import DashboardProfile from './views/dashboard/Profile.vue';
import DashboardNotFound from './components/dashboard/NotFoundPage.vue';

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: AuthPage,
    beforeEnter: (to, from, next) => {
      if (store.getters.isAuthenticated) {
        next('/dashboard');
      } else {
        next();
      }
    },
  },
  {
    path: '/dashboard',
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      if (store.getters.isAuthenticated) {
        next();
      } else {
        next('/auth');
      }
    },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: DashboardIndex,
      },
      {
        path: 'settings',
        name: 'Settings',
        component: DashboardSettings,
      },
      {
        path: 'widget',
        name: 'Widget',
        component: DashboardWidget,
      },
      {
        path: 'profile',
        name: 'Profile',
        component: DashboardProfile,
      },
      {
        path: ':pathMatch(.*)*',
        name: 'DashboardNotFound',
        component: DashboardNotFound,
      },
    ],
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { left: 0, top: 0 };
  },
});

export default router;