<script setup>
const props = defineProps(['produto'])
</script>

<template>
  <div class="produto" v-if="produto">
    <router-link class="produto-img" :to="{ name: 'produto', params: { id: produto.id } }">
      <img
        v-if="produto.foto"
        :src="'https://inspired-database.onrender.com/' + produto.foto"
        :alt="produto.nome"
      />
    </router-link>
    <div class="info">
      <p class="preco">{{ $filters.currencyBRL(produto.preco) }}</p>
      <h2 class="titulo">{{ produto.nome }}</h2>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.produto {
  display: grid;
  grid-template-columns: minmax(100px, 200px) 1fr;
  gap: 20px;
  margin-bottom: 40px;
  position: relative;
}

.info {
  align-self: flex-end;
}

.produto-img {
  border-radius: 4px;
  overflow: hidden;
  height: 130px;
}

.produto-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin-bottom: 20px;
}

.preco {
  color: var(--prize-color);
}

@media screen and (max-width: 600px) {
  .produto {
    grid-template-columns: 1fr;
    grid-gap: 10px;
    margin: 10px;
  }
}
</style>
