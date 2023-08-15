<script setup>
import { onMounted, ref, watch } from 'vue'
import ProdutoItem from '../../components/ProdutoItem.vue'
import { useAuthStore } from '../../stores/auth'
import { api } from '../../utils/services'

const compras = ref(null)
const store = useAuthStore()

onMounted(() => {
  document.title = 'Usuário | Compras'
})

function getCompras() {
  api.get(`/transacao?comprador_id=${store.usuario.id}`).then((response) => {
    compras.value = response.data
  })
}
watch(
  () => store.login,
  () => {
    getCompras()
  }
)
onMounted(() => {
  if (store.login) {
    getCompras()
  }
})
</script>

<template>
  <section>
    <div v-if="compras">
      <h2>Compras</h2>
      <div class="produtos-wrapper" v-for="(compra, index) in compras" :key="index">
        <ProdutoItem v-if="compra.produto" :produto="compra.produto">
          <p class="vendedor"><span>Vendedor: </span>{{ compra.vendedor.nome }}</p>
        </ProdutoItem>
      </div>
    </div>
  </section>
</template>

<style scoped>
.produtos-wrapper {
  margin-bottom: 40px;
}

.vendedor span {
  color: var(--prize-color);
}

h2 {
  margin-bottom: 20px;
}
</style>
