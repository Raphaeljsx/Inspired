<script setup>
import UsuarioForm from '@/components/UsuarioForm.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { validaEmail } from '@/utils/helpers.js'

const store = useAuthStore()
const router = useRouter()
const criar = ref(false)
const warning = ref(false)

async function criarUsuario() {
  try {
    const emailValido = validaEmail(store.usuario.email)
    if (emailValido) {
      await store.criarUsuario(store.usuario)
      // await store.getUsuario(store.usuario.email, store.usuario.senha)
      await store.getUsuario()
      const user = {
        ...store.usuario
      }

      localStorage.setItem('user', JSON.stringify(user))

      router.push({ name: 'usuario' })
    } else {
      warning.value = true
      console.log('Email invalido')
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <section>
    <h2>Crie a sua conta</h2>
    <transition mode="out-in">
      <div>
        <button v-if="!criar" class="btn" @click.prevent="criar = true">Criar Conta</button>
        <UsuarioForm v-else>
          <button class="btn btn-form" @click.prevent="criarUsuario">Criar Usuário</button>
        </UsuarioForm>
        <p class="invalido" v-if="warning">Entre com um email valido*</p>
      </div>
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

.invalido {
  margin-top: 20px;
  color: red;
  text-align: center;
}
</style>
