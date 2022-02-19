<template>
  <div class="home-container">
    <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item>
            <img src="../../assets/blog.png" alt="" class="homePageIcon">
          </el-menu-item>
          <el-menu-item index="1">
            <router-link to="/home/article-list">博客列表</router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link to="/home/about-blog">关于博客</router-link>
          </el-menu-item>
          <el-submenu index="3">
            <template slot="title">账号管理</template>
            <el-submenu index="3-1">
              <template slot="title">账号</template>
              <el-menu-item index="3-1-1">
                <router-link to="/home/update">修改账号信息</router-link>
              </el-menu-item>
              <el-menu-item index="3-1-2" @click="logout">退出登录</el-menu-item>
            </el-submenu>
            <!-- <hr /> -->
            <el-submenu index="3-2">
              <template slot="title">管理</template>
              <el-menu-item index="3-2-1">
                <router-link to="/home/article">创建博文</router-link>
              </el-menu-item>
              <el-menu-item index="3-2-2">
                <router-link to="/home/manageblog">管理博客</router-link>
              </el-menu-item>
            </el-submenu>
          </el-submenu>

          <div style="margin-top: 15px;">
            <el-input placeholder="请输入内容" v-model="input2" class="input-search">
              <el-button slot="append" icon="el-icon-search" class="search" @click="search_in"></el-button>
            </el-input>
          </div>
      </el-menu>
  </div>
</template>

<script>
import bus from '../../eventBus/eventBus.js'
export default {
  name: 'Home',
  data () {
    return {
      activeIndex2: '1',
      input2: ''
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      // console.log(key)
      // console.log(keyPath)
    },
    logout () {
      localStorage.removeItem('token')
      this.$router.push('/login')
    },
    search_in () {
      bus.$emit('shareInput', this.input2)
      this.$router.push('/search-list')
    }
  }
}
</script>

<style lang="less" scoped>
  .home-container {
    position: relative;
    a {
      text-decoration: none;
    }
    .homePageIcon {
      width: 45px;
      height: 45px;
    }
    .input-search {
      position: absolute;
      top: 10px;
      right: 30px;
      width: 500px;
    }
  }
</style>
