import request from '../utils/request.js'
import qs from 'qs'

function registerAPI (username, password, checkpwd, email) {
  const data = { username: username, password: password, checkpwd: checkpwd, email: email }
  return request.post('/api/register', qs.stringify(data))
}

export default registerAPI
