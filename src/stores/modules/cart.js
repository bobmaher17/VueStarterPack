import POSTprocess_payment from 'apiCalls/POSTprocess_payment'

export default {
    state: {
        productsInBasket: []
    },

  mutations: {
    handleProduct(state, { action, selectedProduct }) {
        const addProduct = () => 
            [...state.productsInBasket, selectedProduct]

        const deleteProduct = () => 
            state.productsInBasket.filter(prd => prd.id !== selectedProduct.id)

        state.productsInBasket = action === 'add' ? addProduct() : deleteProduct()
    }
  },

  actions: {
    async processPayment({ state }) {      
        const [res, error] = await POSTprocess_payment(state.productsInBasket)

        if (error) {
            return { status: 'error' }
        } else {            
            return { status: 'success' }
        }
    },
  },

  getters: {
    totalPayment(state) {
        return state.productsInBasket.reduce((a, b) => a.price + b.price)
    }
  }
}