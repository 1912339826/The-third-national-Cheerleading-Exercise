<template>
  <div id="ActivePage">
    <NavTab />
    <div class="content">
      <img :src="img" alt />
      <button @click="toDataInformation">我要参赛</button>
    </div>
  </div>
</template>

<script>
import NavTab from "../../components/Isnav";
export default {
  name: "ActivePage",
  components: {
    NavTab
  },
  props: {},
  data() {
    return {
      IsfindCurrentActivity: "",
      img: "",
      id: ""
    };
  },
  created() {
    this.findCurrentActivity();
  },
  mounted() {},
  activated() {},
  update() {},
  methods: {
    async findCurrentActivity() {
      let res = await this.$req(window.api.findCurrentActivity, {});
      this.img = res.data.result.pic;
      this.id = res.data.result.id;
    },
    toDataInformation() {
      this.$router.push({ path: "/DataInformation", query: { id: this.id } });
    }
  },
  filters: {},
  computed: {},
  watch: {}
};
</script>

<style lang="less" scoped>
#ActivePage {
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 100%;
      position: relative;
      z-index: -1;
    }
    button {
      position: fixed;
      bottom: 3vh;
      border: none;
      background-color: #09ba07;
      border-radius: 10vw;
      color: #fff;
      font-size: 0.3rem;
      width: 90%;
      height: 12vw;
      z-index: 999;
    }
  }
}
</style>
