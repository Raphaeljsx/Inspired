<script setup>
import { reactive } from 'vue'
import { useAuthStore } from '../stores/auth'
import { api } from '../utils/services'

const store = useAuthStore()

const produto = reactive({
  nome: '',
  preco: 0,
  fotos: null,
  descricao: '',
  vendido: false
})

function formatarProduto() {
  produto.usuario_id = store.usuario.id
}

async function adicionarProduto() {
  formatarProduto()
  await api.post('/produto', produto).then(() => {
    store.getUsuario_produtos(store.usuario.id)
  })
}
</script>

<template>
  <div>
    <form class="adicionar-produto">
      <label for="nome">Nome</label>
      <input
        type="text"
        id="nome"
        name="nome"
        placeholder="Entre com o nome do produto"
        v-model="produto.nome"
      />
      <label for="preco">Preço (R$)</label>
      <input type="number" id="preco" name="preco" v-model="produto.preco" />
      <label for="fotos">Fotos</label>
      <input type="file" id="fotos" name="fotos" ref="fotos" />
      <label for="descricao">Descrição</label>
      <textarea
        id="descricao"
        name="descricao"
        placeholder="Entre com a descrição do produto"
        v-model="produto.descricao"
      />
      <input
        class="btn"
        type="button"
        value="Adicionar Produto"
        @click.prevent="adicionarProduto"
      />
    </form>
  </div>
</template>

<style scoped>
.adicionar-produto {
  display: grid;
  grid-template-columns: 100px, 1fr;
  align-items: center;
  margin-bottom: 60px;
}

.btn {
  grid-column: 2;
}
</style>
