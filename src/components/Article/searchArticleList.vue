<template>
  <div class="search-container">
    <div class="art_info" v-for="item in searchList" :key="item.id">
      <div class="title-box">
        <a :href="'#/search-content/' + item.id" @click="send(item.id)"><h3>{{ item.title }}</h3></a>
        <!-- <router-view></router-view> -->
      </div>
      <div class="content-box">
        <div class="left-box">
          <div class="block">
            <el-image :src="item.cover_img"></el-image>
          </div>
        </div>
        <div class="right-box">
          <div class="overview">
            {{ item.content }}
          </div>
          <div class="evaluate">
            <i class="iconfont icon-good"></i>
            <span>{{ item.agree }}</span>&nbsp;&nbsp;
            <i class="iconfont icon-bad"></i>
            <span>{{ item.disagree }}</span>&nbsp;&nbsp;
            <span>作者：{{ item.author_id }}</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import bus from '../../eventBus/eventBus.js'
export default {
  data () {
    return {
      searchList: [],
      searchStr: ''
    }
  },
  methods: {
    send (id) {
      this.searchList = this.searchList.filter(item => item.id === id)[0]
      console.log(this.searchList)
    }
  },
  created () {
    bus.$on('shareList', val => {
      this.searchList = val[0].filter(item => item.title.search(val[1]) !== -1)
    })
  },
  beforeDestroy () {
    bus.$emit('shareSearch', this.searchList)
  }
}
</script>

<style lang="less" scoped>
  .search-container {
    .art_info {
      padding: 10px 0;
      border-bottom: 1px solid #f0f0f2;
      .title-box a {
        text-decoration: none;
        color: #222226;
      }
    h3 {
      font-family: 'Hiragino Sans GB';
      font-weight: 400;
    }
    .content-box {
      display: flex;
      padding: 10px 0;
      .left-box {
        flex: 1;
        margin-right: 15px;
        width: 150px;
        height: 80px;
        /deep/.el-image img {
          width: 150px;
          height: 80px;
        }
      }
      .right-box {
        flex: 5;
        display: flex;
        position: relative;
        flex-direction: column;
        overflow: hidden;
        .overview {
          font-size: 14px;
          font-weight: 400;
          color: #555666;
          overflow: hidden;
          white-space: normal;
          word-break: break-word;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .evaluate {
          position: absolute;
          bottom: 0;
          font-size: 14px;
          font-weight: 400;
          color: #555666;
        }
      }
    }
    }

  }
</style>
