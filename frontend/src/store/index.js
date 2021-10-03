import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let user = localStorage.getItem('user');
if(!user){
  user = {
    userId: -1,
    firstname: '',
    avatar: '',
    token: null
  }
}else{
  user = JSON.parse(user);
}

const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://127.0.0.1:3000/api',
  headers: {'Authorization': 'Bearer '+ user.token}
});

export default new Vuex.Store({
  state: {
    currentRoute: window.location.pathname,
    status: '',
    user: user,
    profilInfos: {
      id: '',
      email: '',
      firstname: '',
      lastname: '',
      couverture: '',
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
      localStorage.setItem('user', JSON.stringify(user))
      state.user = user
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
        commit;
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
    },
    getProfil: ({commit}, userId) => {
      instance.get(`/user/${userId}`)
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