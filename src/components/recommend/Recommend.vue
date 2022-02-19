<template>
  <div class="recommend-container">
    <div class="article-recomm">
      <div class="art-hd">文章推荐</div>
      <div class="art-bd">
        <div class="art-body" v-for="item in recoList" :key="item.id">
          <div class="cover_img">
            <img :src="item.cover_img" alt="">
          </div>
          <div class="art-title">
            {{ item.title }}
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import getArticleListAPI from '../../api/getArticleListAPI.js'
export default {
  data () {
    return {
      recoList: []
    }
  },
  methods: {
    async getArticleList () {
      const { data: res } = await getArticleListAPI()
      this.recoList = res.data.filter(item => item.is_delete === 0)
      this.recoList = this.recoList.slice(-3)
    }
  },
  created () {
    this.getArticleList()
  }
}
</script>

<style lang="less" scoped>
  .recommend-container {
    .article-recomm{
      border-radius: 2px;
      border: 1px solid #e8e8ed;
      margin-bottom: 16px;
      margin-right: 30px;
      height: 350px;
      color: #555666;
      font-family: 'Hiragino Sans GB';
      .art-hd {
        height: 45px;
        border-bottom: 1px solid #e8e8ed;
        line-height: 45px;
        padding-left: 20px;
        // text-align: center;
      }
      .art-bd {
        padding: 20px;
        .art-body {
          display: flex;
          overflow: hidden;
          .cover_img {
            flex: 1;
            img {
              width: 100px;
              height: 70px;
            }
          }
          .art-title {
            margin-left: 20px;
            margin-bottom: 20px;
            flex: 4;
            height: 70px;
            font-size: 14px;
            font-weight: 400;
            color: #555666;
            overflow: hidden;
            white-space: normal;
            word-break: break-word;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
          }
        }

      }
    }
  }
</style>
