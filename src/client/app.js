import Vue from 'vue'

import Main from '@pages/Main.vue';

import router from './router'

import '@styles/global.sass'

import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)

new Vue({
  el: '#app',
  router,
  render: h => h(Main)
})