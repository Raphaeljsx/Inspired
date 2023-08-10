<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { fetchCep } from '../utils/services'

const store = useAuthStore()
const route = useRoute()

const mostrarDadosLogin = computed(() => {
  return !store.login || route.name === 'usuario-editar'
})

const nome = computed({
  get: () => store.usuario.nome,
  set: (value) => (store.usuario.nome = value)
})

const email = computed({
  get: () => store.usuario.email,
  set: (value) => (store.usuario.email = value)
})

const senha = computed({
  get: () => store.usuario.senha,
  set: (value) => (store.usuario.senha = value)
})

const cep = computed({
  get: () => store.usuario.cep,
  set: (value) => (store.usuario.cep = value)
})

function preencherCep() {
  const cep = this.cep.replace(/\D/g, '')
  if (cep.length === 8) {
    fetchCep(cep).then((response) => {
      this.rua = response.data.logradouro
      this.bairro = response.data.bairro
      this.cidade = response.data.localidade
      this.estado = response.data.uf
    })
  }
}

const rua = computed({
  get: () => store.usuario.rua,
  set: (value) => (store.usuario.rua = value)
})

const numero = computed({
  get: () => store.usuario.numero,
  set: (value) => (store.usuario.numero = value)
})

const bairro = computed({
  get: () => store.usuario.bairro,
  set: (value) => (store.usuario.bairro = value)
})

const cidade = computed({
  get: () => store.usuario.cidade,
  set: (value) => (store.usuario.cidade = value)
})

const estado = computed({
  get: () => store.usuario.estado,
  set: (value) => (store.usuario.estado = value)
})
</script>

<template>
  <form>
    <div class="usuario" v-if="mostrarDadosLogin">
      <label for="nome">Nome</label>
      <input type="text" name="nome" id="nome" v-model="nome" />

      <label for="email">Email</label>
      <input type="text" name="email" id="createEmail" v-model="email" />

      <label for="senha">Senha</label>
      <input type="password" name="senha" id="createSenha" v-model="senha" />
    </div>

    <label for="cep">Cep</label>
    <input type="text" name="cep" id="cep" v-model="cep" @keyup="preencherCep()" />

    <label for="rua">Rua</label>
    <input type="text" name="rua" id="rua" v-model="rua" />

    <label for="numero">Número</label>
    <input type="text" name="numero" id="numero" v-model="numero" />

    <label for="bairro">Bairro</label>
    <input type="text" name="bairro" id="bairro" v-model="bairro" />

    <label for="cidade">Cidade</label>
    <input type="text" name="cidade" id="cidade" v-model="cidade" />

    <label for="estado">Estado</label>
    <input type="text" name="estado" id="estado" v-model="estado" />

    <div class="button">
      <slot></slot>
    </div>
  </form>
</template>

<style scoped>
form,
.usuario {
  display: grid;
  grid-template-columns: 80px 1fr;
  align-items: center;
}

.usuario {
  grid-column: 1/3;
}

.button {
  grid-column: 2;
  margin-top: 10px;
}
</style>
