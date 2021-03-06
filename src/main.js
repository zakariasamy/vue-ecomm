import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import jQuery from 'jquery'; // Solve $ Problem
window.$= window.jQuery = jQuery;
import 'popper.js';
import 'bootstrap';
import './assets/app.scss';
import {fb}   from './firebase'
import VueFirestore from 'vue-firestore'
//require('firebase/firestore')
import Swal from 'sweetalert2'
window.Swal = Swal;
import Vue2Filters from 'vue2-filters'
// Vuex
import store from './store'
 
Vue.use(Vue2Filters)

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

window.Toast=Toast

Vue.use(VueFirestore, {
  key: 'id',         // the name of the property. Default is '.key'.
  enumerable: true  //  whether it is enumerable or not. Default is true.
})

Vue.config.productionTip = false;

Vue.component('Navbar',require('./components/Navbar.vue').default);
Vue.component('Header',require('./components/Header.vue').default);
Vue.component('Login',require('./components/Login.vue').default);
Vue.component('Products',require('./sections/Products.vue').default);
Vue.component('Products-list',require('./sections/ProductsList.vue').default);
Vue.component('add-to-cart',require('./components/AddToCart.vue').default);
Vue.component('MiniCart',require('./components/MiniCart.vue').default);



fb.auth().onAuthStateChanged(function(user) {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");

});

