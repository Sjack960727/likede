import { loginAPI } from '@/api'
export default {
  namespaced: true,
  state: {
    token: null,
    userInfo: {}
  },
  mutations: {
    SET_TOKEN(state, payload) {
      state.token = payload
    },
    SET_USER_INFO(state, payload) {
      state.userInfo = payload
    }
  },
  actions: {
    async loginAction({ commit }, loginDate) {
      const { data } = await loginAPI(loginDate)
      // console.log(data)
      commit('SET_USER_INFO', data)
      commit('SET_TOKEN', data.token)
    }
  }
}
