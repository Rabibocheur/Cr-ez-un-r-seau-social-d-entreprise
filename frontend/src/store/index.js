import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'
import posts from './posts'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    status: '',
    snackbar: false,
    user: JSON.parse(localStorage.getItem('user'))
  },
  mutations: {
    SET_STATUS: function (state, status) {
      state.status = status
    },
    SET_SNACKBAR: function(state, snackbar){
      state.snackbar = snackbar
    },
    LOG_USER: function (state, user) {
      localStorage.setItem('user', JSON.stringify(user.user))
      localStorage.setItem('token', JSON.stringify(user.token))
      state.user = JSON.parse(localStorage.getItem("user"));
      router.push('/');
    },
    LOGOUT_USER: function (state) {
      localStorage.clear();
      state.user = {}
    }
  },
  actions: {
    logout: ({commit}, expired) => {
      if(expired) commit('SET_STATUS', 'Session expiré !')
      commit('LOGOUT_USER')
      router.push('/login');
    },
  },
  modules: {
    posts,
  }
})

export default store