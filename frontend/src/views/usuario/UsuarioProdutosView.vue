<script setup>
import { onMounted, watch } from 'vue'
import ProdutoAdicionar from '../../components/ProdutoAdicionar.vue'
import ProdutoItem from '../../components/ProdutoItem.vue'
import { useAuthStore } from '../../stores/auth'
import { api } from '../../utils/services'

const store = useAuthStore()

function deletarProduto(id) {
  const confirmar = window.confirm('Deseja remover este produto?')

  if (confirmar) {
    api
      .delete(`/produto/${id}`)
      .then(() => {
        store.getUsuario_produtos(store.usuario.id)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

watch(
  () => store.login,
  () => {
    store.getUsuario_produtos(store.usuario.id)
  }
)

onMounted(() => {
  if (store.login) {
    store.getUsuario_produtos(store.usuario.id)
  }

  document.title = 'Usuário'
})
</script>

<template>
  <section>
    <h2>Adicionar Produtos</h2>
    <ProdutoAdicionar />
    <h2>Seus Produtos</h2>
    <TransitionGroup v-if="store.usuario_produtos" name="list" tag="ul">
      <li v-for="(produto, index) in store.usuario_produtos" :key="index">
        <ProdutoItem :produto="produto">
          <p>{{ produto.descricao }}</p>
          <p>status: {{ produto.vendido ? 'Vendido' : 'Em estoque' }}</p>
          <button class="deletar" @click="deletarProduto(produto.id)">excluir produto</button>
        </ProdutoItem>
      </li>
    </TransitionGroup>
  </section>
</template>

<style scoped>
h2 {
  margin-bottom: 20px;
}

.deletar {
  position: absolute;
  top: 0;
  right: 0;
  background: url('../../assets/remove.svg') no-repeat center center;
  height: 24px;
  width: 24px;
  text-indent: -140px;
  overflow: hidden;
  cursor: pointer;
  border: none;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s;
}

.list-enter-from {
  transform: translate3d(-20px, 0, 0);
}

.list-leave-to {
  transform: translate3d(20px, 0, 0);
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
}
</style>
