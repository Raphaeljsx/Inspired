<script setup>
import { onMounted, ref } from 'vue'
import { api } from '@/utils/services'
import LoadingPage from '@/components/PageLoading.vue'

const props = defineProps(['id'])
const product = ref(null)

function getProduct() {
  api.get(`/produto/${props.id}`).then((response) => {
    product.value = response.data
  })
}

onMounted(() => {
  getProduct()
})
</script>

<template>
  <section>
    <div v-if="product" class="produto">
      <ul class="fotos" v-if="product.fotos">
        <li v-for="(foto, index) in product.fotos" :key="index">
          <img :src="foto.src" :alt="foto.titulo" />
        </li>
      </ul>
      <div class="info">
        <h1>{{ product.nome }}</h1>
        <p class="preco">{{ $filters.currencyBRL(product.preco) }}</p>
        <p class="descricao">{{ product.descricao }}</p>
        <button class="btn" v-if="product.vendido === 'false'">Comprar</button>
        <button class="btn" v-else disabled>Comprar</button>
      </div>
    </div>
    <LoadingPage v-else />
  </section>
</template>

<style scoped>
.produto {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
  max-width: 900px;
  padding: 60px 20px;
  margin: 0 auto;
}

.preco {
  color: var(--prize-color);
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 40px;
}

.descricao {
  font-size: 1.2rem;
}

.btn {
  margin-top: 60px;
  width: 200px;
}
</style>
