import axios from 'axios'
const axiosConfig = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
}

const apiRequest = axios.create(axiosConfig)

apiRequest.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

apiRequest.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default apiRequest
