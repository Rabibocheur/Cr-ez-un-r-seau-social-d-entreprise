import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://127.0.0.1:3000/api'
});

let user = localStorage.getItem('user');
if(!user){
  user = {
    userId: -1,
    token: null
  }
}else{
  user = JSON.parse(user);
  instance.defaults.headers.common['Authorization'] = user.token;
}

export default new Vuex.Store({
  state: {
    currentRoute: window.location.pathname,
    status: '',
    user: user,
    userInfos: {
      email: '',
      firstname: '',
      lastname: '',
      avatar: '',
      bio: ''
    },
    profilInfos: {
      email: '',
      firstname: '',
      lastname: '',
      avatar: '',
      bio: ''
    }
  },
  mutations: {
    updateRoute: function (state, newRoute) {
      state.currentRoute = newRoute
    },
    setStatus: function (state, status) {
      state.status = status
    },
    logUser: function (state, user) {
      instance.defaults.headers.common['Authorization'] = user.token;
      localStorage.setItem('user', JSON.stringify(user))
      state.user = user
    },
    userInfos: function (state, userInfos) {
      state.userInfos = userInfos
    },
    profilInfos: function (state, profilInfos) {
      state.profilInfos = profilInfos
    },
    logout: function (state) {
      state.user = {
        userId: -1,
        token: null
      }
      localStorage.removeItem('user');
    }
  },
  actions: {
    register: ({commit}, userInfos) => {
      commit('setStatus', 'loading')
      return new Promise((resolve, reject) => {
        instance.post('/auth/register', userInfos)
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
        commit;
        instance.post('/auth/login', userInfos)
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
    },
    getUserInfos: ({commit}, userId) => {
      instance.get(`/auth/${userId}`)
      .then(function (response) {
          commit('userInfos', response.data)
      })
      .catch(function (e) {
        if(e.response.status === 401){
          commit('logout')
        }
      });
    },
    getProfilInfos: ({commit}, userId) => {
      instance.get(`/auth/${userId}`)
      .then(function (response) {
          commit('profilInfos', response.data)
      })
      .catch(function (e) {
        if(e.response.status === 401){
          commit('logout')
        }
      });
    }
  }
})