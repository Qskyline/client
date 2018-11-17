// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import routerConfig from './router'
import VueResource from 'vue-resource'
import BootstrapVue from 'bootstrap-vue'
import store from './vuex/index'
import VueForm from 'vue-form'
import Meta from 'vue-meta'
import _global from './modules/global'

// import VueCookie from 'vue-cookie'

// Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(BootstrapVue)
Vue.use(Meta)
// Vue.use(VueForm)
// Vue.use(VueCookie)

Vue.prototype.GLOBAL = _global

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
}

Vue.use(VueForm, options)

Vue.http.options.emulateJSON = true

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// const router = new VueRouter({routes: routerConfig, hashbang: false, mode: 'history'})
const router = new VueRouter({routes: routerConfig})
Vue.http.options.xhr = { withCredentials: true }

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  template: '<App/>',
  components: { App },
  router: router
})
