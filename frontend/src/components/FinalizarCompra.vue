<script setup>
import UsuarioForm from '@/components/UsuarioForm.vue'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { api } from '../utils/services'

const store = useAuthStore()
const router = useRouter()

const props = defineProps(['produto'])

const compra = computed(() => {
  return {
    comprador_id: store.usuario.id,
    vendedor_id: props.produto.usuario_id,
    produto_id: props.produto.id,
    cep: store.usuario.cep,
    rua: store.usuario.rua,
    numero: store.usuario.numero,
    bairro: store.usuario.bairro,
    cidade: store.usuario.cidade,
    estado: store.usuario.estado
  }
})

const getHeaders = () => ({
  Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` || ''
})

function criarTransacao() {
  return api.post('/transacao', compra.value, { headers: getHeaders() }).then(() => {
    api
      .put(`/produto/${props.produto.id}`, { vendido: true }, { headers: getHeaders() })
      .then(() => {
        router.push({ name: 'compras' })
      })
  })
}

async function criarUsuario() {
  try {
    await store.criarUsuario(store.usuario)
    await store.getUsuario(store.usuario.email, store.usuario.senha)
    await criarTransacao()
  } catch (error) {
    console.log(error)
  }
}

function finalizarCompra() {
  if (store.login) {
    criarTransacao()
  } else {
    criarUsuario()
  }
}
</script>

<template>
  <section>
    <h2 class="titulo">Endereço de Envio</h2>
    {{ store.login }}
    <UsuarioForm>
      <button class="btn" @click.prevent="finalizarCompra">Finalizar Compra</button>
    </UsuarioForm>
  </section>
</template>

<style scoped>
.titulo {
  font-size: 2rem;
  margin-top: 40px;
  margin-bottom: 20px;
}

.btn {
  width: 100%;
  background: var(--prize-color);
}
</style>
