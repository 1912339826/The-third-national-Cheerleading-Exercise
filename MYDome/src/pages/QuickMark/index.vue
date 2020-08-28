<template>
  <div id="QuickMark">
    <NavTab />
    <nav>请用微信扫描下方二维码，前往微信小程序</nav>
    <div class="box">
      <div class="loading" v-if="img_">
        <Loading />
      </div>
      <img :src="img" alt class="isimg" v-if="!img_" />
    </div>
  </div>
</template>

<script>
import NavTab from "../../components/Isnav";
import { ImagePreview, Loading } from "vant";
export default {
  name: "QuickMark",
  components: { NavTab, Loading },
  props: {},
  data() {
    return {
      img: "",
      img_: true,
    };
  },
  created() {
    this.getQrCode();
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
      if (this.img != "") {
        this.img_ = false;
      } else {
        this.img_ = true;
      }
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
.loading {
  width: 90vw;
  height: 90vw;
  display: flex;
  justify-content: center;
  align-items: center;
  /deep/.van-loading.van-loading--circular {
    width: 20vw;
    height: 20vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
