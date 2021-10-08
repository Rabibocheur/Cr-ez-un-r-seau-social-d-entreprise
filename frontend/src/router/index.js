import Vue from 'vue'
import VueRouter from 'vue-router'
import VueRouteMiddleware from 'vue-route-middleware'
import auth from './middleware/auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Posts',
    component: () => import('../views/Posts.vue'),
    meta: {
      middleware: auth
    }
  },
  {
    path: '/profile/:uuid',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: {
      middleware: auth
    }
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

router.beforeEach(VueRouteMiddleware());

export default router
