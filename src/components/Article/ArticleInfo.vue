<template >
  <div class="articleInfo-container">
    <div class="art_info" v-for="item in list" :key="item.id">
      <div class="title-box">
        <a :href="'#/article-content/' + item.id" @click="send(item.id)"><h3>{{ item.title }}</h3></a>
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
    <!-- <button @click="show">btn</button> -->
  </div>
</template>

<script>
import getArticleListAPI from '../../api/getArticleListAPI.js'
import bus from '../../eventBus/eventBus.js'
export default {
  data () {
    return {
      list: [],
      article: '',
      searchList: [],
      searchStr: ''
    }
  },
  methods: {
    async getArticleList () {
      const { data: res } = await getArticleListAPI()
      this.list = res.data.filter(item => item.is_delete === 0)
    },
    send (id) {
      this.article = this.list.filter(item => item.id === id)[0]
    },
    updateArtList () {
      this.searchList = this.list.filter(item => item.title.search(this.searchStr) !== -1)
    }
  },
  beforeDestroy () {
    bus.$emit('share', this.article)
    bus.$emit('shareList', [this.list, this.searchStr])
  },
  created () {
    this.getArticleList()
    bus.$on('shareInput', val => {
      this.searchStr = val
      this.updateArtList()
      // console.log(val)
      // console.log(this.searchList)
    })
    bus.$on('shareEva', val => {
      this.list.filter(item => item.id === val[0])[0].agree = val[1]
      this.list.filter(item => item.id === val[0])[0].disagree = val[2]
    })
  }
}
</script>

<style lang="less" scoped>
  .articleInfo-container {
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
