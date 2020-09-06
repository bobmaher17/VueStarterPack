import POSTauth from 'apiCalls/POSTauth'

export default {
    state: {
        token: '',
        userName: ''
    },

  mutations: {
    setToken(state, token) {
        state.token = token
    },
    setUserName(state, userName) {
        state.userName = userName
    }
  },

  actions: {
    async loginUser({ commit }, formData) {      
        const [res, error] = await POSTauth(formData)

        if (error) {
            return { status: 'error' }
        } else {
            commit('setToken', res.token)
            commit('setUserName', res.userName)
            return { status: 'success' }
        }
    },
  },

  getters: {
    isAuth(state) {
        return Boolean(state.token)
    }
  }
}