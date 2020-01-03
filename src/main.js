import Vue from 'vue';
import './plugins/vuetify';
import App from '@/App.vue';
import router from '@/router/';
import store from '@/store/';
import firebase from 'firebase';
import 'firebase/firestore';
const fb = require('./firebaseConfig.js');

Vue.config.productionTip = false;

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app');

let app;
fb.auth.onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
  }
});
