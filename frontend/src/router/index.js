import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Produto from '../views/ProdutoView.vue'
import Login from '../views/LoginView.vue'
import usuario from "../views/usuario/UsuarioView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path:'/product/:id',
      name:'product',
      component: Produto,
      props: true
    },
    {
      path:'/login',
      name: 'login',
      component: Login
    },
     {
      path:'/usuario',
      name: 'usuario',
      component: usuario
    }
  ],
  scrollBehavior(){
    return window.scrollTo({ top:0, behavior: 'smooth' }) //scroll to the top of page on every route
  }
})

export default router
