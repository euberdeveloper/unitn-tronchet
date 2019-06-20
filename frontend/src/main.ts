import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

import VueAnalytics from 'vue-analytics';
import './registerServiceWorker';
import i18n from './plugins/i18n';

console.log(i18n);

Vue.use(VueAnalytics, {
  id: 'UA-141587717-1',
  router
});

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App)
}).$mount('#app');
