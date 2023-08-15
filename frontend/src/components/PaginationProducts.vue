<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { api } from '../utils/services'

const route = useRoute()
const paginatedData = ref(null)

const currentPage = ref(1)
const totalPages = ref(1)

const props = defineProps({
  productsPerPage: {
    type: Number,
    dafault: 1
  },
  allProducts: {
    type: Number,
    dafault: 1
  }
})

function query(page) {
  return {
    ...route.query,
    page: page
  }
}

const rangedPages = computed(() => {
  const currentPage = props.currentPage
  const range = props.productsPerPage
  const offset = Math.ceil(range / 2)
  const total = totalPags.value
  const pagsArray = []

  for (let i = 1; i <= total; i++) {
    pagsArray.push(i)
  }

  pagsArray.splice(0, currentPage - offset)
  pagsArray.splice(range, total)

  return pagsArray
})

const totalPags = computed(() => {
  const total = props.allProducts / props.productsPerPage
  return total !== Infinity ? Math.ceil(total) : 0
})
</script>

<template>
  <ul v-if="totalPags > 1">
    <router-link :to="{ query: query(query(1)) }"> ← </router-link>
    <li v-for="(page, index) in rangedPages" :key="index">
      <router-link :to="{ query: query(page) }">
        {{ page }}
      </router-link>
    </li>
    <router-link :to="{ query: query(totalPags) }"> → </router-link>
  </ul>
</template>

<style scoped>
ul {
  grid-column: 1 / -1;
  margin: 40px auto 0px auto;
}
li {
  display: inline-block;
}

li a {
  padding: 2px 8px;
  border-radius: 4px;
  margin: 4px;
}

li a.router-link-exact-active,
li a:hover {
  background: var(--cor-secundaria);
  color: #fff;
}
</style>
