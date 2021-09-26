import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Posts',
    component: () => import('../views/Posts.vue'),
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
