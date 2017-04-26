import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  className: 'lightBlue'
}

const mutations = {
  TURN_ON(state) {
    state.className = 'blue'
  },

  TURN_OFF(state) {
    state.className = 'lightBlue'
  }
}

const store = new Vuex.Store({
  state,
  mutations
})

export default store
