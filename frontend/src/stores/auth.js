
import { defineStore } from 'pinia'
import { api } from '@/utils/services'

export const useAuthStore = defineStore('auth', {
   //state --> Propriedades reativas
  state(){ 
      return {
        login: false,
        usuario:{
          id:'',
          nome:'',
          email:'',
          senha:'',
          cep:'',
          rua:'',
          numero:'',
          bairro :'',
          cidade:'',
          estado:''
        },
        usuario_produtos: null
      }
    },
  //actions --> Métodos
  actions:{
    updateLogin(payload){
      this.login = payload
    },
     updateUsuario(payload){
      this.usuario = Object.assign(this.usuario, payload)
    },

    update_Usuario_Produtos(payload){
      this.usuario_produtos = payload
    },

    add_usuario_produtos(payload){
      this.usuario_produtos.unshift(payload)
    },

    getUsuario_produtos(payload){
      api.get(`/produto?usuario_id=${payload}`)
        .then(response =>{
          this.update_Usuario_Produtos(response.data)
        })
    },
    getUsuario(payload){
      try {
       return api.get(`/usuario/${payload}`).then(response =>{
         this.updateLogin(true)
         this.updateUsuario(response.data)
      })
      } catch (error) {
        console.log(error);
      }
    },
    criarUsuario(paylod){
      try {
        this.updateUsuario( { id:paylod.email } )
        console.log('Usuario criado com sucesso');
        return api.post('/usuario', paylod)
      } catch (error) {
        console.error('Erro ao criar usuário' + error);
      }
    },

     deslogarUsuario(){
      try {
        this.updateUsuario({
         id:'',
          nome:'',
          email:'',
          senha:'',
          cep:'',
          rua:'',
          numero:'',
          bairro :'',
          cidade:'',
          estado:''
      })

      this.updateLogin(false)
      } catch (error) {
        console.error("Erro ao tentar deslogar: " + error)
      }
    },
   
    //Setters
    setNome(value){
      this.usuario.nome = value
    },
    setEmail(value){
      this.usuario.email = value
    },

    setSenha(value) {
      this.usuario.senha = value;
    },
    setCep(value) {
      this.usuario.cep = value;
    },
    setRua(value) {
      this.usuario.rua = value;
    },
    setNumero(value) {
      this.usuario.numero = value;
    },
    setBairro(value){
      this.usuario.bairro = value;
    },
    setCidade(value) {
      this.usuario.cidade = value;
    },
    setEstado(value) {
      this.usuario.estado = value;
    }
  },
  //getters --> Propriedades computadas
  getters:{
    getNome(){
      return this.usuario.nome
    },
    getEmail(){
      return this.usuario.email
    },
     getSenha() {
      return this.usuario.senha;
    },
    getCep() {
      return this.usuario.cep;
    },
    getRua() {
      return this.usuario.rua;
    },
    getNumero() {
      return this.usuario.numero;
    },
    getBairro() {
      return this.usuario.bairro;
    },
    getCidade() {
      return this.usuario.cidade;
    },
    getEstado() {
      return this.usuario.estado;
    },
  }
})
