<template>
  <div id="GoldRanking">
    <NavTab />
    <div class="content">
      <nav>11</nav>
    </div>
  </div>
</template>

<script>
import NavTab from "../../components/Isnav";
export default {
  name: "GoldRanking",
  components: {
    NavTab,
  },
  props: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  activated() {},
  update() {},
  methods: {},
  filters: {},
  computed: {},
  watch: {},
};
</script>

<style lang="less" scoped>
#GoldRanking {
  .content {
    background: url(../../../static/images/GoldRanking.png) no-repeat;
    -moz-background-size: 100% 100%;
    background-size: 100% 100%;
    height: 100vh;
    width: 100vw;
    color: #fff;
  }
  nav {
    font-size: 0.35rem;
    text-align: center;
    height: 6vw;
    line-height: 6vw;
    padding-top: 42vh;
  }
}
</style>
