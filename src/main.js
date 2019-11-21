// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
Vue.prototype.$http = axios;
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);


var arr = ['/index/cart', '/index/my']
var reg = /^\/admin/
router.beforeEach((to, from, next) => {
    if (arr.indexOf(to.path) != -1) {
        if (localStorage.getItem('id')) {
          next()
        } else {
          next('/login')
        }
    } else {
      console.log('else')
      if (reg.test(to.path)) {
        console.log('pc端')
        // 说明访问pc端
        if (localStorage.getItem('uname')) {
          next()
        } else {
          next('/adLogin')
        }
      } else {
        next()
      }
      
    }
})



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
