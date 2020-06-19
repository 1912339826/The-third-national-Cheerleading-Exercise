<template>
  <div id="app">
    <keep-alive>
     <router-view  v-if="$route.meta.KeepAlive"></router-view>
    </keep-alive>
    <router-view  v-if="!$route.meta.KeepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      
    }
  },
  mounted(){
  }
};
</script>

<style lang="less">
// less外部文件的使用
// @import url("./assets/less/index");
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
