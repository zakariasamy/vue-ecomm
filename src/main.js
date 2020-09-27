import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import jQuery from 'jquery'; // Solve $ Problem
window.$= window.jQuery = jQuery;
import 'popper.js';
import 'bootstrap';
import './assets/app.scss';
import {fb}   from './firebase'
require('firebase/firestore')
Vue.config.productionTip = false;

Vue.component('Navbar',require('./components/Navbar.vue').default);
Vue.component('Header',require('./components/Header.vue').default);
Vue.component('Login',require('./components/Login.vue').default);
Vue.component('Products',require('./sections/Products.vue').default);


fb.auth().onAuthStateChanged(function(user) {
  new Vue({
    router,
    render: h => h(App)
  }).$mount("#app");

});

