<template>
  <div id="NavTab">
    <nav>
      <div @click="back">返回</div>
      <div>{{title}}</div>
      <div style="opacity: 0;color: #fff;">1</div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: ""
    };
  },
  created() {
    this.title = this.$route.meta.title;
  },
  methods: {
    back() {
      this.$router.back(-1);
    }
  }
};
</script>

<style lang="less" scoped>
#NavTab {
  color: #000;
  text-align: center;
  font-size: 0.3rem;
  padding: 5vw;
  background-color: #ffffff;
  nav {
    height: 5vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>