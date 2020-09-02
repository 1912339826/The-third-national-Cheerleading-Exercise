<template>
  <div id="GoldRanking">
    <NavTab />
    <div class="content">
      <nav>{{IsgetRank}}</nav>
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
    return {
      IsgetRank: "赛事成绩 关注大会微信公众号进入《黄金赛事圈》成绩查询专区",
    };
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
    font-size: 0.4rem;
    text-align: center;
    height: 6vw;
    line-height: 9vw;
    padding-top: 45vh;
    width: 82vw;
    margin: 0 auto;
    font-weight: 600;
    
  }
}
</style>
