import GETproducts from 'apiCalls/GETproducts'

export default {
    state: {
        products: []
    },

  mutations: {
    setProducts(state, products) {
        state.products = products
    }
  },

  actions: {
    async getProducts({ commit }) {      
        const [res, error] = await GETproducts()

        if (error) {
            return { status: 'error' }
        } else {
            commit('setProducts', res.products)             
            return { status: 'success' }
        }
    },
  }
}