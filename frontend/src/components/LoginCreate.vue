<script setup>
import UsuarioForm from '@/components/UsuarioForm.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const store = useAuthStore()
const router = useRouter()
const criar = ref(false)

async function criarUsuario() {
  await store.criarUsuario(store.usuario)
  await store.getUsuario(store.usuario.email)
  router.push({ name: 'usuario' })
}
</script>

<template>
  <section>
    <h2>Crie a sua conta</h2>
    <transition mode="out-in">
      <button v-if="!criar" class="btn" @click.prevent="criar = true">Criar Conta</button>
      <UsuarioForm v-else>
        <button class="btn btn-form" @click.prevent="criarUsuario">Criar Usuário</button>
      </UsuarioForm>
    </transition>
  </section>
</template>

<style scoped>
h2 {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 10px;
}

.btn {
  min-width: 300px;
  margin: 0 auto;
}

.btn-form {
  max-width: 100%;
}
</style>
