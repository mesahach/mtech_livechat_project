
import { createRouter, createWebHashHistory } from 'vue-router';
import Home from './pages/TheHomePage.vue';
import DashBoard from './pages/DashBoard.vue';
import DashHome from './components/dashboard/HomePage.vue';
import CreateEvent from './components/dashboard/CreateEvent.vue';
import DashSettings from './components/dashboard/SettingsPage.vue';
import DashNotFound from './components/dashboard/NotFoundPage.vue';
import NotFoundPage from './pages/NotFoundPage.vue';
import Auth from './pages/AuthPage.vue';
import { isLoggedIn } from './plugins/functions';
import EventsToAttend from './components/dashboard/EventsToAttend.vue';
import EventsIHost from './components/dashboard/EventsIHost.vue';
import DiscoverEvents from './components/dashboard/DiscoverEvents.vue';
import ViewEvent from './components/dashboard/ViewEvent.vue';
import ProfilePage from './components/dashboard/ProfilePage.vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', name: 'home', component: Home },
        {
            path: '/auth',
            component: Auth,
            beforeEnter: async (to, from, next) => {
              await isLoggedIn().then((res) => {
                if (res) {
                  next('/dashboard');
                } else {
                  next();
                }
              });
            },
            children: [
                { path: '', name: 'auth', component: Auth }, // fallback default
                { path: 'login', name: 'login', component: Auth },
                { path: 'register', name: 'register', component: Auth },
            ]
        },
        {
          path: '/dashboard',
          component: DashBoard,
          beforeEnter: async (to, from, next) => {
            await isLoggedIn().then((res) => {
              if (res) {
                next();
              } else {
                next('/auth/login');
              }
            });
          },
          children: [
            { path: '',           name: 'dash-home',   component: DashHome },
            { path: 'CreateEvent',      name: 'create-event',  component: CreateEvent, props: true },
            { path: 'settings',   name: 'dash-settings',    component: DashSettings },
            { path: 'EventsToAttend',   name: 'events-to-attend',    component: EventsToAttend },
            { path: 'EventsIHost',   name: 'events-i-host',    component: EventsIHost },
            { path: 'DiscoverEvents',   name: 'discover-events',    component: DiscoverEvents },
            { path: 'ViewEvent/:id',   name: 'ViewEvent',    component: ViewEvent, props: true },
            { path: 'Profile',   name: 'profile',    component: ProfilePage },
            // fallback inside dashboard
            { path: ':pathMatch(.*)*', name: 'dash-404', component: DashNotFound }
          ]
        },
        { path: '/:catchAll(.*)', name: 'notFound', component: NotFoundPage },
    ],
    linkActiveClass: 'active',
    scrollBehavior(_, _2, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      }
      return { left: 0, top: 0, behavior: 'smooth' };
    },
});

export default router;
