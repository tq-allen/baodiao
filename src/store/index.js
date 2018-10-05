import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [],
    msgList: []
  },
  getters: {
    msgList: state => state.msgList
  },
  mutations: {
    setUser (state, payload) {
      state.users.push({gameName: payload, msg: ''})
    },
    setMsg (state, payload) {
      state.msgList.push(payload)
    }
  }
})
