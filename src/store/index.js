import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentRoute: window.location.pathname
  },
  mutations: {
    updateRoute: function (state, newRoute) {
      state.currentRoute = newRoute
    }
  },
  actions: {
  },
  modules: {
  }
})
