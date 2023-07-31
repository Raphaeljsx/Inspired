<script setup>
import { onMounted, watch } from 'vue'
import ProdutoAdicionar from '../../components/ProdutoAdicionar.vue'
import ProdutoItem from '../../components/ProdutoItem.vue'
import { useAuthStore } from '../../stores/auth'

const store = useAuthStore()

watch(
  () => store.login,
  () => {
    store.getUsuario_produtos(store.usuario.email)
  }
)

onMounted(() => {
  if (store.login) {
    store.getUsuario_produtos(store.usuario.email)
  }
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
        </ProdutoItem>
      </li>
    </TransitionGroup>
  </section>
</template>

<style scoped>
h2 {
  margin-bottom: 20px;
}
</style>
