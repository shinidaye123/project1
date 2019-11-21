import Vue from 'vue'
import Router from 'vue-router'
import index from '../pages/index'
import home from '../pages/home'
import category from '../pages/category'
import cart from '../pages/cart'
import my from '../pages/my'
import detail from '../pages/detail'
import login from '../pages/login'
import register from '../pages/register'
// pc端页面
import admin_index from '../pages/admin/admin_index'
import adminuser from '../pages/admin/adminuser'
import classs from '../pages/admin/class'
import goods from '../pages/admin/goods'
import vip from '../pages/admin/vip'
import banners from '../pages/admin/banners'
import goodsChange from '../pages/admin/goodsChange'
import adminLogin from '../pages/admin/adminLogin'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/index"
    },
    {
      path: "/index",
      redirect: "/index/home",
      component: index,
      children: [
        {
          path: 'home',
          component: home
        },{
          path: 'category',
          component: category
        },{
          path: 'cart',
          component: cart
        },{
          path: 'my',
          component: my
        }
      ]
    },
    {
      path: "/detail",
      component: detail
    },
    {
      path: "/login",
      component: login
    },
    {
      path: "/register",
      component: register
    },
    // pc端的路由
    {
      path: "/admin",
      component: admin_index,
      children: [
        {
          path: "adminuser",
          component: adminuser
        },
        {
          path: "vip",
          component: vip
        },
        {
          path: "goods",
          component: goods
        },
        {
          path: "class",
          component: classs
        },
        {
          path: "banners",
          component: banners
        },
        {
          path: "goodsChange",
          component: goodsChange
        }
      ]
    },
    {
      path: "/adLogin",
      component: adminLogin
    }
  ]
})
