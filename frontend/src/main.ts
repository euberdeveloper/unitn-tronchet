import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

import VueAnalytics from 'vue-analytics';

Vue.use(VueAnalytics, {
  id: 'UA-141587717-1',
  router
});

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
