<script setup>
import { useAuthStore } from '../../stores/auth.js'
const store = useAuthStore()
</script>

<template>
  <div>
    <p>Página do Usuário: {{ store.usuario }}</p>
  </div>
</template>

<style></style>
