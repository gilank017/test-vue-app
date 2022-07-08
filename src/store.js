import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

const state = {
  datafood: [
    { title: 'aaa' }
  ]
}
const mutations = {
  updateData(state, updateFood) {
    state.data = updateFood
  }
}

export default new Vuex.Store({
  state,
  mutations,
})