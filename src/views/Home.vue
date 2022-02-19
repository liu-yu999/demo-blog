<template>
  <div class="home-container">
    <!-- 头部导航栏部分 -->
    <header>
      <NavBar></NavBar>
    </header>
    <!-- 主体内容部分 -->
    <main>
      <!-- 中心内容部分 -->
      <section class="main-content">
        <router-view></router-view>
      </section>
      <!-- 右侧信息部分 -->
      <section class="info-list">
        <Recomm></Recomm>
      </section>
    </main>
  </div>
</template>

<script>
import NavBar from '../components/navBar/NavBar.vue'
import Recomm from '../components/recommend/Recommend.vue'
// import ArticleInfo from '../components/Article/ArticleInfo.vue'
export default {
  components: {
    NavBar,
    Recomm
  }
}
</script>

<style lang="less" scoped>
  .home-container {
    main {
      display: flex;
      .main-content {
        flex: 8;
      }
      .info-list {
        margin-left: 100px;
        margin-top: 20px;
        flex: 4;
      }
    }
  }
</style>
