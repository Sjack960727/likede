import { loginAPI, getUserInfo } from '@/api'
export default {
  namespaced: true,
  state: {
    token: null,
    userId: null,
    userInfo: {}
  },
  mutations: {
    SET_TOKEN(state, payload) {
      state.token = payload
    },
    SET_USER_ID(state, payload) {
      state.userId = payload
    },
    SET_USER_INFO(state, payload) {
      state.userInfo = payload
    }
  },
  actions: {
    async loginAction({ commit }, loginDate) {
      const { data } = await loginAPI(loginDate)
      console.log(data)
      commit('SET_USER_ID', data.userId)
      commit('SET_TOKEN', data.token)
      commit('SET_USER_INFO', data)
    },
    async getUserInfo(context) {
      const res = await getUserInfo(context.state.userId)
      console.log(res)
    }
  }
}
