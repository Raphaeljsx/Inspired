<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth.js'
const store = useAuthStore()
const router = useRouter()

function deslogar() {
  localStorage.removeItem('user')
  store.deslogarUsuario()
  router.push('/login')
}

onMounted(() => {
  document.title = 'Usuário'
})
</script>

<template>
  <section class="usuario">
    <nav class="sidenav">
      <ul>
        <li>
          <router-link :to="{ name: 'usuario' }"> Produtos </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'compras' }"> Compras </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'vendas' }"> Vendas </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'usuario-editar' }"> Editar </router-link>
        </li>
        <li>
          <button @click="deslogar">Deslogar</button>
        </li>
      </ul>
    </nav>
    <router-view v-slot="{ Component }">
      <transition mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </section>
</template>

<style scoped>
.usuario {
  display: grid;
  grid-template-columns: minmax(140px, 250px) 1fr;
  max-width: 900px;
  margin: 40px auto;
  gap: 30px;
  padding: 20px;
}

.sidenav a,
.sidenav button {
  padding: 10px;
  display: block;
  background: #f4f7fc;
  margin-bottom: 10px;
  border-radius: 4px;
  cursor: pointer;
}

.sidenav a.router-link-exact-active,
.sidenav a:hover,
.sidenav button:hover {
  background: var(--cor-secundaria);
  color: #fff;
}

.sidenav button {
  border: none;
  width: 100%;
  font-size: 1rem;
  text-align: left;
  font-family: var(--font);
}

@media screen and (max-width: 500px) {
  .usuario {
    grid-template-columns: 1fr;
    margin: 0px auto;
  }
}

.v-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}

.v-enter-from {
  transform: translate3d(0, -20px, 0);
}

.v-leave-to {
  transform: translate3d(0, 20px, 0);
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
