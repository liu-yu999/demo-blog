import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../Login.vue'
import Home from '../views/Home.vue'
import ArticleContent from '../views/ArticleContent.vue'

import searchArtContent from '../views/searchArtContent.vue'
import searchArtList from '../components/Article/searchArticleList.vue'
import ArticleList from '../components/Article/ArticleInfo.vue'
import AboutBlog from '../components/AboutBlog/AboutBlog.vue'
import UpdateInfo from '../components/updateInfo/UpdateInfo.vue'
import Article from '../components/Article/Article.vue'
import ManageBlog from '../components/ManageBlog/ManageBlog.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/article-content/:id', component: ArticleContent },
  { path: '/search-list', component: searchArtList },
  { path: '/search-content/:id', component: searchArtContent },
  {
    path: '/home',
    component: Home,
    children: [
      { path: '', redirect: 'article-list' },
      {
        path: 'article-list',
        component: ArticleList
        // children: [
        //   { path: '', redirect: 'article-content' },
        // ]
      },
      // ,
      { path: 'about-blog', component: AboutBlog },
      { path: 'update', component: UpdateInfo },
      { path: 'article', component: Article },
      { path: 'manageblog', component: ManageBlog }
    ]
  }

]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // console.log(token, to.path)
  if (to.path !== '/login') {
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
