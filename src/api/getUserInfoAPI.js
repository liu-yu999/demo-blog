import request from '../utils/request.js'

function getUserInfoAPI () {
  // const token = localStorage.getItem('token')
  return request({
    url: '/my/userInfo',
    method: 'GET',
    headers: { Authorization: localStorage.getItem('token') }
  })
}

export default getUserInfoAPI
