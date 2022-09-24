import axios from 'axios'

const request = axios.create({
  baseURL: '/dev',
  timeout: 5000
})

export default request
