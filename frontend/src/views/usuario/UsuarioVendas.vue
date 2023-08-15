<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import ProdutoItem from '../../components/ProdutoItem.vue'
import { useAuthStore } from '../../stores/auth'
import { api } from '../../utils/services'

const vendas = ref(null)
const store = useAuthStore()

function getVendas() {
  api.get(`/transacao?vendedor_id=${store.usuario.id}`).then((response) => {
    vendas.value = response.data
  })
}
watch(
  () => store.login,
  () => {
    getVendas()
  }
)
onMounted(() => {
  if (store.login) {
    getVendas()
  }
})
</script>

<template>
  <section>
    <div v-if="vendas">
      <h2>Vendas</h2>
      <div class="produtos-wrapper" v-for="(venda, index) in vendas" :key="index">
        <ProdutoItem v-if="venda.produto" :produto="venda.produto">
          <p class="vendedor"><span>Comprador: </span>{{ venda.comprador.nome }}</p>
        </ProdutoItem>
        <div class="entrega">
          <h3>Entrega:</h3>
          <ul v-if="venda.endereco">
            <li v-for="(value, key) in venda.endereco" :key="key">{{ key }} : {{ value }}</li>
          </ul>
        </div>
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

.entrega {
  display: grid;
  grid-template-columns: minmax(100px, 200px) 1fr;
  gap: 20px;
  margin-bottom: 60px;
}

h2 {
  margin-bottom: 20px;
}

h3 {
  justify-self: end;
  margin: 0;
}
</style>
