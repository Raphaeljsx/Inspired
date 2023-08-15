import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Produto from '../views/ProdutoView.vue'
import Login from '../views/LoginView.vue'
import Usuario from '../views/usuario/UsuarioView.vue'
import UsuarioProdutos from '@/views/usuario/UsuarioProdutosView.vue'
import UsuarioEditar from '@/views/usuario/UsuarioEditar.vue'
import UsuarioVendas from '@/views/usuario/UsuarioVendas.vue'
import UsuarioCompras from '@/views/usuario/UsuarioCompras.vue'
import PageNotFound from '../views/NotFounded.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/:pathMatch(.*)*',
      component: PageNotFound
    },
    {
      path: '/produto/:id',
      name: 'produto',
      component: Produto,
      props: true
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/usuario',
      component: Usuario,
      meta: {
        login: true
      },
      children: [
        {
          path: '',
          name: 'usuario',
          component: UsuarioProdutos
        },
        {
          path: 'compras',
          name: 'compras',
          component: UsuarioCompras
        },
        {
          path: 'vendas',
          name: 'vendas',
          component: UsuarioVendas
        },
        {
          path: 'editar',
          name: 'usuario-editar',
          component: UsuarioEditar
        }
      ]
    }
  ],
  scrollBehavior() {
    return window.scrollTo({ top: 0, behavior: 'smooth' }) //scroll to the top of page on every route
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.login)) {
    if (!window.localStorage.user) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
