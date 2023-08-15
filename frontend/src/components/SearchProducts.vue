<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '../utils/services'
const search = ref('')
const router = useRouter()
const produtoApi = ref(null)
function searchProducts() {
  router.push({ query: { search: `${search.value}` } })
}
</script>

<template>
  <div>
    <form>
      <input name="search" id="search" type="text" v-model="search" placeholder="Buscar.." />
      <input type="submit" id="lupa" value="Buscar" @click.prevent="searchProducts" />
    </form>
  </div>
</template>

<style scoped>
form {
  max-width: 600px;
  margin: 30px auto 60px auto;
  position: relative;
}

#search {
  width: 100%;
  padding: 20px;
  border: none;
}

#search:focus,
#search:hover {
  transform: scale(1.1);
}

#lupa {
  width: 62px;
  height: 62px;
  background: url('../assets/search.svg') no-repeat center;
  text-indent: -150px;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  box-shadow: none;
}
</style>
