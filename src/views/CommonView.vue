<template>
  <div class="home">
    <!-- 00-富文本 -->
    <div v-if="isRichText" v-html="rtContent" class="ql-editor rt-wrap"></div>
    <!-- 01-视频 -->
    <div v-if="isVedio">
      <video controls autoplay loop playsinline :style="vedioStyle" preload="auto" width="100%" height="100%" class="video"
      controlslist="noplaybackrate">
      <source :src="url">
      <p>对不起，你的浏览器不支持video元素，请点击这里下载最新版本的浏览器</p>
    </video>
    </div>
    <!-- 10-图片 -->
    <div v-if="isPic" >
      <img :src="url" :style="vedioStyle" width="100%" >
    </div>
    <div class="feedback-box"></div>
    <!-- <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <van-popup v-model:show="showError" :close-on-click-overlay="false" :style="{ padding: '10px 20px', 'border-radius': '10px'  }">拉取页面内容失败 {{ errorMsg }}</van-popup>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import { toWxLogin, checkLogin } from '@/service/login'
import { queryPage } from '@/service/api'
import '@/assets/css/quill.core.css'

export default {
  name: "HomeView",
  components: {
    // HelloWorld,
  },

  data() {
    return {
      vedioStyle: '',
      pageType: '', // 00-纯文字 01-视频 10-图片 11-图文
      url: '',
      rtContent: '',
      showError: false,
      errorMsg: '',
    }
  },

  computed: {
    isVedio() {
      return this.pageType === '01';
    },
    isRichText() {
      return this.pageType === '00';
    },
    isPic() {
      return this.pageType === '10';
    },
  },

  async mounted() {
    // 跳转登录
    // todo: 登录需放开
    if (!checkLogin()) {
      toWxLogin();
    }
    await this.initPageDetail();
    if (this.isVedio || this.isPic) {
      const that = this;
      this.handleVedioSize();
      window.onresize = () => {
        return (() => {
          that.handleVedioSize();
        })()
      }
      console.warn('mounted');
      let ele = document.querySelector('.video');
      if (ele) {
        console.warn('ele', ele);
        ele.play();
      }
    }
  },
  methods: {
    handleVedioSize() {
      const { clientWidth, clientHeight } = document.body;
      console.warn('clientWidth: ', clientWidth);
      console.warn('clientHeight: ', clientHeight);
      const [vedioWidth, vedioHeight] = [480, 854];
      const widthToHeight = vedioWidth / vedioHeight;
      if (clientWidth / clientHeight > widthToHeight) {
        // 以clientHeight为基准
        this.vedioStyle = `width: ${clientHeight * vedioWidth / vedioHeight}px; height: ${clientHeight}px;`;
      } else {
        // 以clientWidth为基准
        this.vedioStyle = `width: ${clientWidth}px; height: ${clientWidth * vedioHeight / vedioWidth}px`;
      }
      console.warn('this.vedioStyle', this.vedioStyle);
    },

    async initPageDetail() {
      const { id, t } = this.$route.query;
      const res = await queryPage({
        id: +id,
        sendTime: t,
      });
      console.warn('res', res, res?.retcode);
      if (res?.data?.retcode !== '00') {
        const {errmsg, retcode} = res.data;
        // todo: 报错
        this.showError = true;
        this.errorMsg = (retcode && errmsg) ? `: [${retcode}] ${errmsg}` : '';
        return;
      }

      // 初始化
      try {
        const detail = JSON.parse(res.data.detail);
        console.warn('detail', detail);
        const { type, url, rtContent, title} = detail;
        this.pageType = type;
        this.detail = detail;
        this.rtContent = rtContent;  
        if (title) document.title = title;
        if (detail?.url?.url) this.url = detail.url.url.replace('22.10.193.11', '124.207.4.197:8082')
        console.warn('==detail==', detail, detail.url.url);
      } catch (error) {
        
      }
    }
  },
};
</script>

<style>
body,
html,
.home {
  width: 100%;
  height: 100%;
  margin: 0;
  /* background-color: black; */
}

.home video {
  object-fit: fill;
  object-fit: cover;
}

.feedback-box {
  /* wid */
}

.rt-wrap {
  padding: 10px;
}
</style>