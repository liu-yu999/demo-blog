import request from '../utils/request.js'
import qs from 'qs'

export default function addArticleAPI (title, content) {
  const data = { title, content }
  return request({
    url: '/my/articles/add',
    method: 'POST',
    data: qs.stringify(data),
    headers: { Authorization: localStorage.getItem('token') }
  })
}
