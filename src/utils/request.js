import axios from 'axios'
import store from '@/store'
import router from '@/router'
const TimeOut = 3600
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
function IsCheckTimeOut() {
  var currentTime = +Date.now() // 当前时间戳
  var timeStamp = store.getters.tokenTime // 缓存时间戳
  return (currentTime - timeStamp) / 1000 > TimeOut
}

request.interceptors.request.use(config => {
  if (store.getters.token) {
    if (IsCheckTimeOut()) {
      store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('token超时了'))
    }
    config.headers['Authorization'] = `${store.getters.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

export default request
