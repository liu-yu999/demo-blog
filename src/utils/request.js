import axios from 'axios'

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
const request = axios.create({
  baseURL: 'http://127.0.0.1:3007',
  headers: {
    'Content-type': 'application/x-www-form-urlencoded'
  }
})

export default request
