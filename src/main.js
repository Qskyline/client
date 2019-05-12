import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import routerConfig from './router'
import BootstrapVue from 'bootstrap-vue'
import store from './vuex/index'
import VueForm from 'vue-form'
import Meta from 'vue-meta'
import md5 from 'js-md5'
import Qs from 'qs'
import http from './utils/http'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.prototype.md5 = md5;
Vue.prototype.Qs = Qs;

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(Meta);
var options = {
  validators: {
    'confirm': function (value, attrValue, vnode) {
      return value === attrValue;
    }
  },
  inputClasses: {
    valid: 'form-control-success',
    invalid: 'form-control-danger'
  }
};
Vue.use(VueForm, options);
Vue.use(http);

const router = new VueRouter({routes: routerConfig});

new Vue({
  store,
  el: '#app',
  template: '<App/>',
  components: { App },
  router: router
});
