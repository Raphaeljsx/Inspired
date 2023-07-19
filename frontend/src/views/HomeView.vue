<template>
  <div>
    <h1>🖐️Compre ou venda👍</h1>
    <SearchProducts />
    <ListProducts />
  </div>
</template>

<script>
import SearchProducts from "@/components/SearchProducts.vue";
import ListProducts from "@/components/ListProducts.vue";

export default {
  name: "homeView",
  setup() {
    return {};
  },
  components: { SearchProducts, ListProducts },
};
</script>

<style scoped>
h1 {
  font-size: 2rem;
  color: var(--cor-secundaria);
  margin-top: 40px;
  text-align: center;
}
</style>
