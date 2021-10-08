import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'

const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://127.0.0.1:3000/api'
});

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    user: JSON.parse(localStorage.getItem('user'))
  },
  mutations: {
    setStatus: function (state, status) {
      state.status = status
    },
    logUser: function (state, user) {
      localStorage.setItem('user', JSON.stringify(user.user))
      localStorage.setItem('token', JSON.stringify(user.token))
    },
    logout: function (state) {
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
    // login: ({commit}, userInfos) => {
    //   commit('setStatus', 'loading')
    //   return new Promise((resolve, reject) => {
    //     instance.post('/user/login', userInfos)
    //     .then(function (response) {
    //       commit('setStatus', '')
    //       commit('logUser', response.data)
    //       resolve(response);
    //     })
    //     .catch(function (error) {
    //       commit('setStatus', 'error_login')
    //       reject(error);
    //     });
    //   })
    // },
    logout: ({commit}, expired) => {
      if(expired) commit('setStatus', 'Session expiré !')
      commit('logout')
      router.push('/login');
    },
    getApi: ({dispatch}, path) => {
      return new Promise((resolve) => {
        instance.get(path, { headers: {'Authorization': `bearer ${JSON.parse(localStorage.getItem('token'))}`} })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          if(error.response.status === 401){
            dispatch('logout', true)
          }
        });
      })
    },
    postApi: ({dispatch}, {path, body}) => {
      return new Promise((resolve, reject) => {
        instance.post(path, body, { headers: {'Authorization': `bearer ${JSON.parse(localStorage.getItem('token'))}`} })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          if(error.response.status === 401){
            dispatch('logout', true)
          }
          reject(error)
        });
      })
    },
    putApi: ({dispatch}, {path, body}) => {
      return new Promise((resolve) => {
        instance.put(path, body, { headers: {'Authorization': `bearer ${JSON.parse(localStorage.getItem('token'))}`} })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          if(error.response.status === 401){
            dispatch('logout', true)
          }
        });
      })
    }
  }
})