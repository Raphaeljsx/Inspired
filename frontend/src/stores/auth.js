import { defineStore } from 'pinia'
import { api } from '@/utils/services'

export const useAuthStore = defineStore('auth', {
  //state --> Propriedades reativas
  state() {
    let storage = JSON.parse(localStorage.getItem('user'))
    return {
      login: storage ? true : false,
      usuario: storage || {
        id: '',
        nome: '',
        email: '',
        senha: '',
        cep: '',
        rua: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: ''
      },
      usuario_produtos: null
    }
  },
  //actions --> Métodos
  actions: {
    updateLogin(payload) {
      this.login = payload
    },
    async updateUsuario(payload) {
      this.usuario = await Object.assign(this.usuario, payload)

      if (!localStorage) {
        localStorage.setItem('user', JSON.stringify(this.usuario))
      }
    },

    update_Usuario_Produtos(payload) {
      this.usuario_produtos = payload
    },

    add_usuario_produtos(payload) {
      this.usuario_produtos.unshift(payload)
    },

    getUsuario_produtos(id) {
      api.get(`/produto?usuario_id=${id}`).then((response) => {
        this.update_Usuario_Produtos(response.data.todos)
      })
    },
    async getUsuario() {
      try {
        return await api.get(`/usuario/`).then((response) => {
          this.updateUsuario(response.data)
          this.updateLogin(true)
        })
      } catch (error) {
        console.log(error)
      }
    },
    async criarUsuario(paylod) {
      try {
        return await api.post('/usuario/', paylod)
      } catch (error) {
        console.error('Erro ao criar usuário' + error)
      }
    },

    logarUsuario(payload) {
      return api
        .login({
          email: payload.email,
          senha: payload.senha
        })
        .then((response) => {
          console.log(response)
        })
    },

    deslogarUsuario() {
      try {
        this.updateUsuario({
          id: '',
          nome: '',
          email: '',
          senha: '',
          cep: '',
          rua: '',
          numero: '',
          bairro: '',
          cidade: '',
          estado: ''
        })
        this.updateLogin(false)
      } catch (error) {
        console.error('Erro ao tentar deslogar: ' + error)
      }
    },

    //Setters
    setNome(value) {
      this.usuario.nome = value
    },
    setEmail(value) {
      this.usuario.email = value
    },

    setSenha(value) {
      this.usuario.senha = value
    },
    setCep(value) {
      this.usuario.cep = value
    },
    setRua(value) {
      this.usuario.rua = value
    },
    setNumero(value) {
      this.usuario.numero = value
    },
    setBairro(value) {
      this.usuario.bairro = value
    },
    setCidade(value) {
      this.usuario.cidade = value
    },
    setEstado(value) {
      this.usuario.estado = value
    }
  },
  //getters --> Propriedades computadas
  getters: {
    getNome() {
      return this.usuario.nome
    },
    getEmail() {
      return this.usuario.email
    },
    getSenha() {
      return this.usuario.senha
    },
    getCep() {
      return this.usuario.cep
    },
    getRua() {
      return this.usuario.rua
    },
    getNumero() {
      return this.usuario.numero
    },
    getBairro() {
      return this.usuario.bairro
    },
    getCidade() {
      return this.usuario.cidade
    },
    getEstado() {
      return this.usuario.estado
    }
  }
})
