<script setup>
import LoginCreate from '@/components/LoginCreate.vue'
import { useAuthStore } from '@/stores/auth.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const store = useAuthStore()
const router = useRouter()
const warning = ref(false)

const login = {
  email: '',
  senha: ''
}

function logar() {
  store.getUsuario(login.email, login.senha).then(() => {
    if (store.login === true) {
      router.push({ name: 'usuario' })
    } else {
      warning.value = !warning.value
      const campoEmail = document.getElementById('email')
      const campoSenha = document.getElementById('senha')

      campoEmail.classList.add('invalido')
      campoSenha.classList.add('invalido')
    }
  })
}
</script>

<template>
  <section class="login">
    <h1>Login</h1>
    <form action="">
      <label for="email">Email</label>
      <input type="email" name="email" id="email" v-model="login.email" />
      <label for="senha">Senha</label>
      <input type="senha" name="senha" id="senha" v-model="login.senha" />
      <button class="btn" @click.prevent="logar">Entrar</button>
      <p v-if="warning" class="warning">
        *As suas credenciais de login não correspondem a nenhuma conta em nosso sistema.
      </p>
    </form>
    <p class="perdeu">
      <a href="/" target="_blank">Perdeu a senha? Clique aqui.</a>
    </p>
    <LoginCreate />
  </section>
</template>

<style scoped>
.login {
  max-width: 500px;
  margin: 0 auto;
  padding: 0 20px;
}

h1 {
  text-align: center;
  font-size: 2rem;
  margin-top: 40px;
  color: var(--cor-secundaria);
}

form {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 10px;
}

.btn {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.perdeu {
  text-align: center;
  margin: 20px auto 0 auto;
}

.perdeu a:hover {
  color: var(--cor-secundaria);
  text-decoration: underline;
}

p.warning {
  margin-top: 20px;
  text-align: center;
  color: red;
}
</style>
