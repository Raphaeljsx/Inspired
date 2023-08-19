<script setup>
import { reactive, ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { api } from '../utils/services'

const store = useAuthStore()
const storedName = localStorage.getItem('user')
const parsedUser = JSON.parse(storedName)

const produto = reactive({
  nome: '',
  preco: 0,
  foto: null,
  descricao: '',
  vendido: false
})

const fileInput = ref(null)

async function adicionarProduto() {
  const formData = new FormData()
  formData.append('usuario_id', parsedUser.id)
  formData.append('foto', fileInput.value.files[0])
  formData.append('preco', produto.preco)
  formData.append('nome', produto.nome)
  formData.append('descricao', produto.descricao)
  formData.append('vendido', produto.vendido)

  try {
    await api
      .post('/produto', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(() => {
        store.getUsuario_produtos(store.usuario.id)
      })
  } catch (error) {
    console.error('Erro: ' + error)
  }
}

//TODO:Continuar o upload da imagem para o backend
const handleFileUpload = async () => {
  console.log('Arquivo Selecionado', fileInput.value?.files)

  produto.foto = fileInput.value.files[0]
  console.log(produto.foto)
}
</script>

<template>
  <div>
    <form class="adicionar-produto">
      <label for="nome">Nome</label>
      <input
        type="text"
        id="nome"
        name="nome"
        placeholder="Entre com o nome do produto"
        v-model="produto.nome"
      />
      <label for="preco">Preço (R$)</label>
      <input type="number" id="preco" name="preco" v-model="produto.preco" />
      <label for="foto">Foto</label>
      <input type="file" id="foto" name="foto" ref="fileInput" @change="handleFileUpload()" />
      <label for="descricao">Descrição</label>
      <textarea
        id="descricao"
        name="descricao"
        placeholder="Entre com a descrição do produto"
        v-model="produto.descricao"
      />
      <input
        class="btn"
        type="button"
        value="Adicionar Produto"
        @click.prevent="adicionarProduto"
      />
    </form>
  </div>
</template>

<style scoped>
.adicionar-produto {
  display: grid;
  grid-template-columns: 100px, 1fr;
  align-items: center;
  margin-bottom: 60px;
}

.btn {
  grid-column: 2;
}
</style>
