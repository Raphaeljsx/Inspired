<script setup>
import { onMounted, ref } from 'vue'
import { api } from '@/utils/services'
import FinalizarCompra from '../components/FinalizarCompra.vue'
import LoadingPage from '@/components/PageLoading.vue'

const props = defineProps(['id'])
const produto = ref(null)
const finalizar = ref(false)

function getProduct() {
  api.get(`/produto/${props.id}`).then((response) => {
    produto.value = response.data
  })
}

onMounted(() => {
  getProduct()
})
</script>

<template>
  <section>
    <div v-if="produto" class="produto">
      <ul class="fotos" v-if="produto.fotos">
        <li v-for="(foto, index) in produto.fotos" :key="index">
          <img :src="foto.src" :alt="foto.titulo" />
        </li>
      </ul>
      <div class="info">
        <h1>{{ produto.nome }}</h1>
        <p class="preco">{{ $filters.currencyBRL(produto.preco) }}</p>
        <p class="descricao">{{ produto.descricao }}</p>
        <transition mode="out-in" v-if="produto.vendido === 'false'">
          <button class="btn" v-if="!finalizar" @click="finalizar = true">Comprar</button>
          <FinalizarCompra v-else :produto="produto" />
        </transition>
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
