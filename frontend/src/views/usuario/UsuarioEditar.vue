<script setup>
import UsuarioForm from '@/components/UsuarioForm.vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { api } from '../../utils/services'

const store = useAuthStore()
const router = useRouter()
const storedName = localStorage.getItem('user')
const parsedUser = JSON.parse(storedName)

function atualizarUsuario() {
  api
    .put(`/usuario/${parsedUser.id}`, store.usuario)
    .then(() => {
      store.getUsuario(parsedUser.email)
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
