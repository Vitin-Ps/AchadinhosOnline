import axios from 'axios'

const api = axios.create({
  baseURL: 'http://192.168.100.46:8080/',
})

export default api
