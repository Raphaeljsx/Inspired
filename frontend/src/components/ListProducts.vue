<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { api } from '@/utils/services'
import { serialize } from '@/utils/helpers'
import productPagination from '@/components/PaginationProducts.vue'
import LoadingPage from '@/components/PageLoading.vue'
import { url_DEV, url_PROD } from '../utils/services'

const products = ref(null)
const productsPerPage = ref(9)
const allProducts = ref(0)

const route = useRoute()

const url = computed(() => {
  const query = serialize(route.query)
  return `/produto?limit=${productsPerPage.value}${query}`
})

function getProducts() {
  products.value = null
  api.get(url.value).then((response) => {
    products.value = response.data.estoque
    allProducts.value = Number(response.headers['x-total-count'])
  })
}

watch(url, () => {
  getProducts()
})

onMounted(() => {
  getProducts()
})
</script>

<template>
  <section class="products-container">
    <transition mode="out-in">
      <div v-if="products && products.length" class="products" key="products">
        <div class="product" v-for="product in products" :key="product.id">
          <router-link :to="{ name: 'produto', params: { id: product.id } }">
            <!-- <img
              class="photo"
              v-if="product.foto"
              :src="url_PROD + product.foto"
              :alt="product.nome"
            /> -->
            <!-- PROD -->
            <!-- <img
              class="photo"
              v-if="product.foto"
              :src="url_DEV + product.foto"
              :alt="product.nome"
            /> -->
            <p class="prize">{{ $filters.currencyBRL(product.preco) }}</p>
            <h2 class="title">
              {{ product.nome.length > 80 ? product.nome.substring(0, 80) + '...' : product.nome }}
            </h2>
            <p class="description">
              {{
                product.descricao.length > 100
                  ? product.descricao.substring(0, 100) + '...'
                  : product.descricao
              }}
            </p>
          </router-link>
        </div>

        <productPagination :allProducts="allProducts" :productsPerPage="productsPerPage" />
      </div>
      <div class="no-results" v-else-if="products && products.length == 0" key="sem-resultados">
        <p>Busca sem resultados. Tente outro termo.</p>
      </div>

      <LoadingPage key="carragando" v-else />
    </transition>
  </section>
</template>

<style>
.products {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  margin: 30px;
}

.title {
  font-size: 1.3rem;
}

.products-container {
  max-width: 1000px;
  margin: 0 auto;
}

.product {
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  padding: 10px;
  background: #fff;
  border-radius: 4px;
  transition: all 0.3s;
}

.description {
  overflow: hidden;
}

.product:hover {
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
  transform: scale(1.1);
  position: relative;
  z-index: 1;
}

.product img {
  border-radius: 4px;
  margin-bottom: 20px;
}

.title {
  margin-bottom: 10px;
}

.prize {
  font-weight: bold;
  color: var(--prize-color);
}

.no-results {
  text-align: center;
}

@media screen and (max-width: 600px) {
  .products {
    grid-template-columns: 1fr;
  }
}
</style>
