<script setup>
import UsuarioForm from '@/components/UsuarioForm.vue'
defineProps('produto')
</script>

<template>
  <section>
    <h2 class="titulo">Endereço de Envio</h2>
    <UsuarioForm>
      <button class="btn" @click.prevent="finalizarCompra">Finalizar Compra</button>
    </UsuarioForm>
  </section>
</template>

<style scoped>
.titulo {
  font-size: 2rem;
  text-align: center;
  padding: 40px;
}

.btn {
  width: 100%;
}
</style>
