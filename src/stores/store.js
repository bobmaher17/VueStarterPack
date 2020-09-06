import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import products from './products'
import cart from './cart'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        auth,
        products,
        cart
    }  
})

export default store