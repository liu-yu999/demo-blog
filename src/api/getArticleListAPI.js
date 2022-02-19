import request from '../utils/request.js'

function getArticleListAPI () {
  // const token = localStorage.getItem('token')
  return request({
    url: '/my/articles/get',
    method: 'GET',
    headers: { Authorization: localStorage.getItem('token') }
  })
}

export default getArticleListAPI
