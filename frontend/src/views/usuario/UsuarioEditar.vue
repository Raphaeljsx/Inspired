<script setup>
import UsuarioForm from '@/components/UsuarioForm.vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { api } from '../../utils/services'

const store = useAuthStore()
const router = useRouter()
function atualizarUsuario() {
  api
    .put(`/usuario/${store.usuario.id}`, store.usuario)
    .then(() => {
      store.getUsuario(store.usuario.email)
      router.push({ name: 'usuario' })
    })
    .catch((error) => {
      console.log(error.response)
    })
}
</script>

<template>
  <section>
    <UsuarioForm>
      <button class="btn" @click.prevent="atualizarUsuario">Atualizar Dados</button>
    </UsuarioForm>
  </section>
</template>

<style scoped></style>
