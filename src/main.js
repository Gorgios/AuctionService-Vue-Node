import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store"
import axios from "axios"
import io from "socket.io-client"
Vue.config.productionTip = false;
const base = axios.create({
  baseURL: process.env.VUE_APP_BASE_URI ,
  withCredentials: true
});
const gen = axios.create();
const socket = io(process.env.VUE_APP_BASE_URI,{
    autoConnect: false,
    secure: true
});
Vue.prototype.$socket = socket;
Vue.prototype.$http = base;
Vue.prototype.$gen = gen;
Vue.config.productionTip = false;


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
