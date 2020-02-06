import Vue from 'vue';
import Router from 'vue-router';

const Exam = () => import('@/views/ExamView.vue');
const Home = () => import('@/views/HomeView.vue');
const Login = () => import('@/views/LoginView.vue');
const NotFound = () => import('@/views/NotFound.vue');

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
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '*',
      name: 'not-found',
      props: route => ({ url: route.path }),
      component: NotFound
    }
  ]
});
