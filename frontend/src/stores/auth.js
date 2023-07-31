
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
        }
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
