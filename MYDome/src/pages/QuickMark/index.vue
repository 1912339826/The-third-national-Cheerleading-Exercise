<template>
  <div id="QuickMark">
    <NavTab />
    <nav>请用微信扫描下方二维码，前往微信小程序</nav>
    <div class="box">
      <img :src="img" alt class="isimg" />
    </div>
  </div>
</template>

<script>
import NavTab from "../../components/Isnav";
import { ImagePreview } from "vant";
export default {
  name: "QuickMark",
  components: { NavTab },
  props: {},
  data() {
    return {
      img: "https://img.yzcdn.cn/vant/cat.jpeg",
    };
  },
  created() {
    this.getQrCode()
  },
  mounted() {},
  activated() {},
  update() {},
  methods: {
    async getQrCode() {
      let res = await this.$req(window.api.getQrCode, {
        token: window.localStorage.getItem("accessToken"),
      });
      this.img = res.data.result;
    },
  },
  filters: {},
  computed: {},
  watch: {},
};
</script>

<style lang="less" scoped>
nav {
  font-size: 0.3rem;
  text-align: center;
  padding: 2vw;
}
.box {
  display: flex;
  justify-content: center;
  margin-top: 10vw;
  .isimg {
    width: 90vw;
    height: 90vw;
  }
}
</style>
