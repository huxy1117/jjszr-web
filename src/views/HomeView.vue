<template>
  <div class="home">
    <video controls autoplay loop playsinline :style="vedioStyle" preload="auto" width="100%" height="100%" class="video"
      controlslist="noplaybackrate">
      <source src="../assets/test2.mp4">
      <p>对不起，你的浏览器不支持video元素，请点击这里下载最新版本的浏览器</p>
    </video>

    <div class="feedback-box"></div>
    <!-- <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import { toWxLogin } from '@/service/login'

export default {
  name: "HomeView",
  components: {
    // HelloWorld,
  },

  data() {
    return {
      vedioStyle: '',
    }
  },

  mounted() {
    // 跳转登录
    // todo: 登录需放开
    // toWxLogin();
    
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
</style>