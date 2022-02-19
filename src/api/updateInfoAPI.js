import request from '../utils/request.js'
import qs from 'qs'

export default function updateInfoAPI (oldPwd, newPwd) {
  const data = { oldPwd, newPwd }
  return request({
    url: '/my/updatePwd',
    method: 'POST',
    data: qs.stringify(data),
    headers: { Authorization: localStorage.getItem('token') }
  })
}
