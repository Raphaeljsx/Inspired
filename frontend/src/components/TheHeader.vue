<script setup>
import { computed, watch } from 'vue'
import { useAuthStore } from '../stores/auth'

const store = useAuthStore()
const shortsName = computed(() => {
  return store?.usuario?.nome?.split(' ')?.[0] || ''
})

watch(
  () => store.usuario,
  () => {
    store.usuario.nome = null
  }
)
</script>
<template>
  <header>
    <nav>
      <router-link to="/" class="logo"> 1NSPIRED </router-link>
      <router-link v-if="store.usuario.nome" to="/usuario" class="btn">{{
        shortsName
      }}</router-link>
      <router-link v-else to="/login" class="btn"> Vender / Login </router-link>
    </nav>
  </header>
</template>

<style scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  box-shadow: 0 2px 4px rgba(30, 60, 90, 0.1);
}

.logo {
  font-size: 1.35rem;
  font-weight: bolder;
  letter-spacing: 1px;
  color: #65d;
}
</style>
