<template>
  <div id="QuickMark">
    <NavTab />
    <nav>长按识别下方二维码，进入黄金赛事</nav>
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
    width: 70vw;
    height: 70vw;
  }
}
.loading {
  width: 70vw;
  height: 70vw;
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
