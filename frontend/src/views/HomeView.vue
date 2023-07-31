<script setup>
import SearchProducts from '@/components/SearchProducts.vue'
import ListProducts from '@/components/ListProducts.vue'
</script>

<template>
  <div>
    <h1>🖐️Compre ou venda👍</h1>
    <SearchProducts />
    <ListProducts />
  </div>
</template>

<style scoped>
h1 {
  font-size: 2rem;
  color: var(--cor-secundaria);
  margin-top: 40px;
  text-align: center;
  font-weight: bold;
}
</style>
