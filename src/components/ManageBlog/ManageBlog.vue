<template>
  <div class="manage-container">
    <div class="deleteArt" v-for="item in artList" :key="item.id">
      <div class="title-box">
      <h3>{{ item.title }}</h3>
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
          <span>{{item.agree}}</span>&nbsp;&nbsp;
          <i class="iconfont icon-bad"></i>
          <span>{{item.disagree}}</span>&nbsp;&nbsp;
          <span>作者：{{ item.author_id }}</span>&nbsp;&nbsp;
          <!-- <el-button type="danger" icon="el-icon-delete" circle></el-button> -->
          <button class="del" @click="del(item.id)">删除</button>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import getUserInfoAPI from '../../api/getUserInfoAPI.js'
import deleteArtAPI from '../../api/deleteArtAPI.js'
import getArticleListAPI from '../../api/getArticleListAPI.js'
export default {
  data () {
    return {
      src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      id: 0,
      artList: []
    }
  },
  methods: {
    async getUserInfo () {
      const { data: res } = await getUserInfoAPI()
      this.id = res.data[0].id
      this.getArticleList()
    },
    async delArt (id) {
      await deleteArtAPI(id)
      const { data: res } = await getArticleListAPI()
      // console.log(id)
      this.artList = res.data.filter(item => item.id !== id && item.is_delete === 0 && item.author_id === this.id)
    },
    async getArticleList () {
      const { data: res } = await getArticleListAPI()
      this.artList = res.data.filter(item => item.is_delete === 0 && item.author_id === this.id)
      // console.log(this.artList)
      // console.log(this.id)
    },
    del (id) {
      this.delArt(id)
      // console.log(this.artList)
    },
    getUser () {
      this.$nextTick(function () {
        this.getUserInfo()
      })
    }
  },
  created () {
    this.getUser()
    // this.getArticleList()
  }
}
</script>

<style lang="less" scoped>
  .manage-container {
    padding: 10px 0;
    border-bottom: 1px solid #f0f0f2;
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
        .block {
          width: 100px;
          height: 70px;
          .el-image {
            width: 100%;
            height: 100%;
          }
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
          .del {
            border: 0;
            border-radius: 2px;
            color: #fff;
            background-color: #F56C6C;
          }
        }
      }
    }

  }
</style>
