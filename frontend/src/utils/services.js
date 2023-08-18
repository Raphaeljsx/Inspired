import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://inspired-database.onrender.com'
})

export const api = {
  get(endpoint, options = null) {
    return axiosInstance.get(endpoint, options)
  },
  post(endpoint, body, options = null) {
    return axiosInstance.post(endpoint, body, options)
  },
  put(endpoint, body, options = null) {
    return axiosInstance.put(endpoint, body, options)
  },
  delete(endpoint, options = null) {
    return axiosInstance.delete(endpoint, options)
  }
}

export function fetchCep(cep) {
  return axios.get(`https://viacep.com.br/ws/${cep}/json/`)
}
