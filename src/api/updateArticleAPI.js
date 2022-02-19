import request from '../utils/request.js'
import qs from 'qs'

export default function updateArticleAPI (id, agree, disagree) {
  const data = { id, agree, disagree }
  return request({
    url: '/my/articles/edit',
    method: 'POST',
    headers: { Authorization: localStorage.getItem('token') },
    data: qs.stringify(data)
  })
}
