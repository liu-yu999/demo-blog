import request from '../utils/request.js'
import qs from 'qs'

function loginAPI (username, password) {
  const data = { username: username, password: password }
  return request.post('/api/login', qs.stringify(data))
}

export default loginAPI
