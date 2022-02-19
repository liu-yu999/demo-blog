import request from '../utils/request.js'
import qs from 'qs'

export default function updateInfoAPI (id) {
  const data = { id }
  return request({
    url: '/my/articles/delete',
    method: 'POST',
    data: qs.stringify(data),
    headers: { Authorization: localStorage.getItem('token') }
  })
}
