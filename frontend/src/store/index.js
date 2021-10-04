import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'

import instance from '../service/instance'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentRoute: window.location.pathname,
    status: '',
    user: JSON.parse(localStorage.getItem('user'))
  },
  mutations: {
    updateRoute: function (state, newRoute) {
      state.currentRoute = newRoute
    },
    setStatus: function (state, status) {
      state.status = status
    },
    logUser: function (state, user) {
      localStorage.setItem('user', JSON.stringify(user.user))
      localStorage.setItem('token', JSON.stringify(user.token))
    },
    logout: function (state) {
      state.currentRoute = '/login'
      router.push('/login');
      localStorage.clear();
      state.user = {}
    }
  },
  actions: {
    register: ({commit}, userInfos) => {
      commit('setStatus', 'loading')
      return new Promise((resolve, reject) => {
        instance.post('/user/register', userInfos)
        .then(function (response) {
          resolve(response);
          commit('setStatus', 'create')
        })
        .catch(function (error) {
          reject(error);
          commit('setStatus', 'error_created')
        });
      })
    },
    login: ({commit}, userInfos) => {
      commit('setStatus', 'loading')
      return new Promise((resolve, reject) => {
        instance.post('/user/login', userInfos)
        .then(function (response) {
          commit('setStatus', '')
          commit('logUser', response.data)
          resolve(response);
        })
        .catch(function (error) {
          commit('setStatus', 'error_login')
          reject(error);
        });
      })
    }
  }
})