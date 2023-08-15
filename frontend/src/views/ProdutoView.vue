<script setup>
import { onMounted, ref } from 'vue'
import { api } from '@/utils/services'
import FinalizarCompra from '../components/FinalizarCompra.vue'
import LoadingPage from '@/components/PageLoading.vue'
import { useAuthStore } from '../stores/auth'

const props = defineProps(['id'])
const produto = ref(null)
const finalizar = ref(false)
const store = useAuthStore()

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
      <div class="fotos" v-if="produto.foto">
        <img :src="'http://localhost:3333/' + produto.foto" :alt="produto.nome" />
      </div>
      <div class="info">
        <h1>{{ produto.nome }}</h1>
        <p class="preco">{{ $filters.currencyBRL(produto.preco) }}</p>
        <p class="descricao">{{ produto.descricao }}</p>
        <transition
          mode="out-in"
          v-if="produto.vendido === false && produto.usuario_id !== store.usuario.id"
        >
          <button class="btn" v-if="!finalizar" @click="finalizar = true">Comprar</button>
          <FinalizarCompra v-else :produto="produto" />
        </transition>
        <button class="btn disabled" v-else disabled>Comprar</button>
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

.btn.disabled {
  background: var(--disabled);
  cursor: default;
}

.btn.disabled:hover {
  transform: scale(1);
}

@media screen and (max-width: 600px) {
  .produto {
    grid-template-columns: 1fr;
  }
}
</style>
