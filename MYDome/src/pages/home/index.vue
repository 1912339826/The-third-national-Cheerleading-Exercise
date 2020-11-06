<template>
  <div id="home">
    <img src="../../../static/images/home_top.png" alt class="home_top" />
    <div class="home_content">
      <div class="from">
        <div>
          <!-- &#9660 -->
          <nav>请选择您所在城市</nav>
          <div class="hint">如未显示，请选择所属省下城市就近报名</div>
          <div class="select">
            <select v-model="province" @change="provinceChange" id="province">
              <option
                :value="item"
                v-for="(item, index) in provinceList"
                :key="index"
              >
                {{ item.name }}
              </option>
            </select>
            <select v-model="city" @change="cityhange">
              <option
                :value="item"
                v-for="(item, index) in cityList"
                :key="index"
              >
                {{ item.name }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <nav>请填写您的姓名</nav>
          <input type="text" v-model="name" :disabled="Ismessage" />
        </div>
        <div>
          <nav>请填写您的联系方式</nav>
          <input type="text" v-model="phone" :disabled="Ismessage" />
        </div>
        <div>
          <nav>请输入参赛人数</nav>
          <Stepper
            v-model="count"
            min="1"
            max="8"
            input-width="10vw"
            button-size="8vw"
            :disabled="Ismessage"
          />
        </div>
        <!-- 提示 -->
        <div class="reminder">{{ message }}</div>
        <button @click="submit" v-if="Ismessage">我要参赛</button>
        <button @click="cansai" v-if="!Ismessage">报名</button>
        <div class="query_log" @click="tolist">查询参赛记录 ></div>
      </div>
    </div>
    <img src="../../../static/images/home_cal.png" alt class="home_cal" />
    <div class="activity_rules">
      <div class="content" v-html="html">
        一、活动时间： (一)报名时间：6月6日-7月31日。
        （二）评选时间：活动期间每周五19:00。 二、参与人员：
        个人、家庭、学校、俱乐部、企事业单位、社会团体、社区等可自由组合形式组队参赛。
        三、展示项目： （一）运动类作品（啦啦操动作技术、套路编排等）。
        (二)文化类作品（吉祥物、二次元、美术、音乐、文学、艺术创作、手作等）。
        （三）科技类作品（人工智能、编程、动画设计、视讯等）。
        四、报名及相关要求：
        （一）报名方式及流程：关注大会微信公众号进入报名专区，填写参赛个人信息等。
        (二)拍摄创意视频上传至参赛者自己的抖音账号并同时@大会抖音官方账号及相关活动话题。
        （三）每周评选截至时间前（周五19：00）通过大会微信公众号上传当周参赛抖音视频截图及相关信息。
        五、评选办法：
        活动以周为一个活动周期，截至每周五19：00前上传各自抖音截图，以截图“播放量、转发数、点赞数”三个指标为评比标准。
        六、录取名次与奖励：奖项设置：各地市设每周冠亚季军、赛季前十名；根据评比情况冠军颁发奖章、电子证书；亚军、季军颁发电子证书。设优秀组织奖。
      </div>
      <img
        src="../../../static/images/home_bottom.png"
        alt
        class="home_bottom"
      />
    </div>
  </div>
</template>

<script>
import { Toast, Stepper } from "vant";
export default {
  name: "home",
  components: {
    Stepper,
  },
  props: {},
  data() {
    return {
      provinceList: [],
      province: "",
      cityList: "",
      city: "",
      name: "",
      phone: "",
      message: "",
      html: "",
      Ismessage: false,
      count: 1,
    };
  },
  created() {
    this.cityTree();
    this.findCurrentActivity();
  },
  mounted() {},
  activated() {},
  update() {},
  methods: {
    cansai() {
      if (this.Ismessage) {
        Toast.fail("已报名!");
      } else {
        this.signAdd();
      }
    },
    async checkLogin() {
      let res = await this.$req(window.api.checkLogin, {});
      if (res.data.success) {
        this.name = res.data.result.name;
        this.phone = res.data.result.phone;
        this.count = res.data.result.count;
        this.getParentCity(res.data.result.cityId);
        this.message = "已报名";
        this.Ismessage = true;
      } else {
        this.province = this.provinceList[0];
        this.cityList = this.province.children;
        this.city = this.cityList[0];
      }
    },
    async getParentCity(id) {
      let res = await this.$req(window.api.getParentCity, {
        cityId: id,
      });
      for (let index = 0; index < this.provinceList.length; index++) {
        const element = this.provinceList[index];
        if (res.data.result.parent.id == element.id) {
          this.province = element;
          this.cityList = element.children;
        }
      }
      for (let index = 0; index < this.cityList.length; index++) {
        const element = this.cityList[index];
        if (res.data.result.id == element.id) {
          this.city = element;
        }
      }
    },
    async findCurrentActivity() {
      let res = await this.$req(window.api.findCurrentActivity, { type: 0 });
      this.html = res.data.result.rule;
    },
    async toAuthIndex() {
      let res = await this.$req(window.api.toAuthIndex, {});
    },
    submit() {
      // this.signAdd();

      if (this.Ismessage) {
        this.$router.push("/ActivePage");
      } else {
        Toast.fail("请先报名!");
      }
    },
    async signAdd() {
      let res = await this.$req(window.api.signAdd, {
        name: this.name,
        cityId: this.city.id,
        phone: this.phone,
        type: 0,
        count: this.count,
      });
      let message = res.data.message;
      if (message == "") {
        window.localStorage.setItem("accessToken", res.data.result.token);
        Toast.success("报名成功!");
        this.Ismessage = true;
        this.message = "报名成功！请参赛！";
      } else {
        this.message = message;
      }
    },
    provinceChange() {
      let change = this.province;
      this.cityList = change.children;
      this.city = this.cityList[0];
    },
    cityhange() {},
    tolist() {
      this.$router.push("/EntryList");
    },
    // 资讯类别列表
    async cityTree() {
      let res = await this.$req(window.api.cityTree, {});
      this.provinceList = res.data.result;
      this.province = this.provinceList[0];
      this.cityList = this.province.children;
      this.city = this.cityList[0];
      this.checkLogin();
    },
    // 树结构转换成普通数组
    treeTransArray(tree, key) {
      return tree
        .reduce(function f(con, item) {
          var callee = f;
          con.push(item);
          if (item[key] && item[key].length > 0) {
            item[key].reduce(callee, con);
          }
          return con;
        }, [])
        .map(function (item) {
          item[key] = [];
          return item;
        });
    },
  },
  filters: {},
  computed: {},
  watch: {},
};
</script>

<style lang="less" scoped>
#home {
  background-color: #3ba63e;
  .home_content {
    padding-left: 4vw;
    padding-right: 4vw;
    .from {
      padding-left: 5vw;
      padding-right: 5vw;
      width: 100%;
      border-radius: 5vw;
      background-color: #ffffff;
      nav {
        font-size: 0.3rem;
        font-weight: 700;
        height: 13vw;
        line-height: 12vw;
      }
      .hint {
        font-size: 0.2rem;
        color: rgb(34, 33, 33);
        height: 5vw;
        line-height: 5vw;
      }
      .select {
        display: flex;
        justify-content: space-between;

        select {
          border: 1px solid #dddddd;
          background-color: #fafafa;
          height: 15vw;
          border-radius: 2vw;
          // padding-left: 14%;
          margin: 0;
          font-size: 0.4rem;
          width: 48%;
          text-align: center;
          text-align-last: center;
        }
      }
      input {
        font-size: 0.4rem;
        text-align: center;
        height: 13vw;
        width: 100%;
        border-radius: 2vw;
        border: 1px solid #dddddd;
        background-color: #fafafa;
      }
      button {
        border: none;
        background-color: #09ba07;
        border-radius: 10vw;
        color: #fff;
        font-size: 0.3rem;
        width: 100%;
        height: 12vw;
      }
      .query_log {
        text-align: center;
        color: #2194d3;
        font-size: 0.3rem;
        height: 15vw;
        line-height: 15vw;
      }
      .reminder {
        color: #d50c14;
        font-size: 0.3rem;
        text-align: center;
        height: 5vw;
        line-height: 8vw;
      }
    }
  }
  .home_top,
  .home_bottom,
  .home_cal {
    width: 100%;
  }
  .activity_rules {
    font-size: 0.3rem;
    color: #ffffff;
    position: relative;
    .content {
      position: relative;
      top: 0;
      z-index: 10;
      padding-bottom: 15vw;
      padding-left: 5vw;
      padding-right: 5vw;
      line-height: 7vw;
    }
    .home_bottom {
      position: absolute;
      bottom: 0;
      z-index: 9;
    }
  }
}
</style>
