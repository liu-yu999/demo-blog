<template>
  <div class="searchArtContent-container">
    <!-- 文章主题内容部分 -->
    <section class="search-content">
      <header>
        <h1>{{ article.title }}</h1>
      </header>
      <main>
        <section class="article-info">
          <a href="javascript:;" target="_blank">
            <img src="https://upload.jianshu.io/users/upload_avatars/3236890/76b22d47-ca02-4de7-9821-e8637c0b7954.png?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96/format/webp" alt="">
          </a>
          <div class="art-brif">
            <div class="author_name">{{ article.author_id }}</div>
            <div class="art-eva">
              <span>{{ article.pub_date }}</span>&nbsp;&nbsp;
            </div>
          </div>
        </section>

        <section class="content">
          <p>{{ article.content }}</p>
        </section>

        <section class="evaluate">
          <i class="iconfont icon-good" @click="like"></i>
          <span>{{ agree }}</span>&nbsp;&nbsp;&nbsp;
          <i class="iconfont icon-bad" @click="dislike"></i>
          <span>{{ disagree }}</span>&nbsp;&nbsp;
        </section>
      </main>
    </section>
    <!-- 作者推荐部分 -->
    <section class="aside-content">
      作者推荐
    </section>
  </div>
</template>

<script>
import bus from '../eventBus/eventBus.js'
import updateArticleAPI from '../api/updateArticleAPI.js'
export default {
  data () {
    return {
      article: {},
      agree: 0,
      disagree: 0
    }
  },
  methods: {
    like () {
      this.agree++
      this.updateArt()
      bus.$emit('shareEva', [this.article.id, this.agree, this.disagree])
    },
    dislike () {
      this.disagree++
      this.updateArt()
      bus.$emit('shareEva', [this.article.id, this.agree, this.disagree])
    },
    async updateArt () {
      await updateArticleAPI(this.id, this.agree, this.disagree)
    }
  },
  created () {
    bus.$on('share', val => {
      this.article = val
      this.id = val.id
    })
    bus.$on('shareSearch', val => {
      this.article = val
      this.agree = val.agree
      this.disagree = val.disagree
    })
  },
  beforeDestroy () {
    bus.$off()
  }
}
</script>

<style lang="less" scoped>
  .searchArtContent-container {
    display: flex;
    .search-content {
      flex: 8;
      padding: 0 15px 0;
      .article-info {
        display: flex;
        a {
          flex: 1;
          img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
        }
        .art-brif {
          margin-left: 10px;
          flex: 14;
          .art-eva {
            margin-top: 6px;
            font-size: 14px;
            font-weight: 400;
            color: #555666;
          }
        }
        .evalute {
          font-size: 16px;
          color: #555666;
        }
      }
    }
    .aside-content {
      flex: 4;
      padding: 30px;
    }
  }
</style>
