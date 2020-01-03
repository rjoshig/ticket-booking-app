import Vue from 'vue';
import Router from 'vue-router';
import Home from './../views/Home.vue';
// import AppRegisterModal from '@/components/auth/AppRegister.vue';
// import AppSigninModal from '@/components/auth/AppSigninModal.vue';
import SigninForm from '@/views/SigninForm.vue';
import RegistrationForm from '@/views/RegistrationForm.vue';
import AppSettings from '@/components/AppSettings.vue';
import store from '@/store/index';
import RegisterSchedule from '@/components/RegisterSchedule.vue';
import Dashboard from '@/views/Dashboard.vue';
import Schedules from '@/components/AppSchedules.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },

    {
      path: '/register',
      name: 'RegistrationForm',
      component: RegistrationForm
    },
    {
      path: '/signin',
      name: 'SigninForm',
      component: SigninForm
    },
    {
      path: '/registerschedule',
      name: 'RegisterSchedule',
      component: RegisterSchedule
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/schedules',
      name: 'Schedules',
      component: Schedules
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './../views/About.vue')
    },
    {
      path: '/settings',
      name: 'Settings',
      component: AppSettings,
      meta: {
        authRequired: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
    if (!store.state.isAuthenticated) {
      next({
        path: '/signin'
      });
      store.dispatch('userLoginDialogAction', true);
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
