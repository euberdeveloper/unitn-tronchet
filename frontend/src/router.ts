import Vue from 'vue';
import Router from 'vue-router';

import Exam from './views/ExamView.vue';
import Login from './views/LoginView.vue';
import NotFound from './views/NotFound.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/exam/:exam',
      name: 'exam',
      props: route => ({ exam: route.params.exam }),
      component: Exam
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      name: 'not-found',
      props: route => ({ url: route.path }),
      component: NotFound
    }
  ]
});
