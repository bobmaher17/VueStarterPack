import Vue from 'vue'
import Router from 'vue-router'

//use Vue Router in Vue JS
Vue.use(Router);

//import pages
import ArticlesIndex from '../pages/articles/Index'
import ArticlesCreate from '../pages/articles/Create'
import ArticlesUpdate from '../pages/articles/Update'
// import Index from '../App'
import Welcome from '../pages/Welcome'

const routes = [
      {
        path: '/',
        name: 'index',
        component: Welcome
      },
      {
        path: '/articles',
        name: 'articles',
        component: ArticlesIndex
      },
      {
        path: '/articles-create',
        name: 'articles-create',
        component: ArticlesCreate
      },
      {
        path: '/articles-update/:id',
        name: 'articles-update',
        component: ArticlesUpdate
      }
]

const router = new Router ({
    routes:routes,
    linkActiveClass: 'active'
})

export default router