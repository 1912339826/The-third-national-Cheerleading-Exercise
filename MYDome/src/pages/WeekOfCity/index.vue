<template>
  <div id="WeekOfCity">
    <NavTab />
    <div class="content">
      <nav>
        <span>{{IsgetRank[0].cityName}}</span>
        <span>{{IsgetRank[0].activityName}}</span>
      </nav>
      <section>
        <div class="two">
          <img :src="IsgetRank[0].avatarPic" alt @error="imgError($event)" />
          <div>{{IsgetRank[1].userName}}</div>
        </div>
        <div class="one">
          <img :src="IsgetRank[1].avatarPic" alt @error="imgError($event)" />
          <div>{{IsgetRank[0].userName}}</div>
        </div>
        <div class="three">
          <img :src="IsgetRank[2].avatarPic" alt @error="imgError($event)" />
          <div>{{IsgetRank[2].userName}}</div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import NavTab from "../../components/Isnav";
import { Toast } from "vant";
export default {
  name: "WeekOfCity",
  components: {
    NavTab
  },
  props: {},
  data() {
    return {
      IsgetRank: [
        {
          userName: "XX",
          cityName: "",
          activityName: "第X季第X周",
          avatarPic: "11"
        },
        { userName: "XXXXX2", avatarPic: "11" },
        { userName: "XXXXX3", avatarPic: "11" }
      ]
    };
  },
  created() {
    this.findAchievement();
  },
  mounted() {},
  activated() {},
  update() {},
  methods: {
    // 获取排名
    async getRank() {
      let res = await this.$req(window.api.getRank, {
        activityId: this.$route.query.id
      });
      this.IsgetRank = res.data.result;
      console.log(this.IsgetRank);
    },
    async findAchievement() {
      // 列表参数 赛事类型type 0普通 1黄金 
      let res = await this.$req(window.api.findAchievement, {type:0});
      if (res.data.success) {
        // this.getRank();
         this.IsgetRank = res.data.result;
      } else {
        Toast.fail(res.data.message);
        this.$router.push("/");
      }
    },
    imgError(item) {
      item.target.src = require("../../../static/images/icon_03.png");
    }
  },
  filters: {},
  computed: {},
  watch: {}
};
</script>

<style lang="less" scoped>
#WeekOfCity {
  .content {
    background: url(../../../static/images/ranking.png) no-repeat;
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
    span {
      font-style: italic;
      &:nth-child(2) {
        margin-left: 4.5vw;
      }
    }
  }
  section {
    display: flex;
    font-size: 0.2rem;

    div {
      text-align: center;
    }
    .two {
      width: 26vw;
      margin-left: 9vw;
      margin-top: 14.5vh;
      img {
        position: relative;
        width: 13vw;
        height: 13vw;
        z-index: -1;
        border-radius: 50%;
      }
    }
    .one {
      margin-top: 7vh;
      width: 30vw;
      img {
        position: relative;
        right: -0.4vw;
        width: 16.2vw;
        height: 16.2vw;
        z-index: -1;
        border-radius: 50%;
      }
    }
    .three {
      width: 26vw;
      margin-top: 14.3vh;
      img {
        position: relative;
        right: 0.7vw;
        width: 12.5vw;
        height: 12.5vw;
        margin-bottom: 0.5vw;
        z-index: -1;
        border-radius: 50%;
      }
    }
  }
}
</style>
