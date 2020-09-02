<template>
  <div id="EntryList">
    <NavTab />
    <table>
      <tr style="background-color: #63b764;height:7vw; line-height:7vw;">
        <th style="width:30%">活动</th>
        <th style="width:25%">日期</th>
        <th style="width:20%">状态</th>
        <th style="width:25%">操作</th>
      </tr>
      <tr
        v-for="(item, index) in list"
        :key="index"
        class="list"
        style
        @click="Toranking(item.activityId,item.type)"
      >
        <td style="text-align:justify;padding-left:1w;">
          <div>
            <a href="#">第三届全国啦啦操创意展示大会文化创意视频网络大赛</a>
          </div>
          <div>{{item.cityName}} {{item.activityName}}</div>
        </td>
        <td>{{Todata(item.createTime)}}</td>
        <td>{{status[item.status]}}</td>
        <td class="button_">
          <!-- // 申请开票(黄金赛事) 邮寄地址 下载证书 -->
          <button @click.stop="go_ApplyInvoice">申请开票</button>
          <button @click.stop="mailing_address(item.id)">邮寄地址</button>
          <button
            @click.stop="Download_certificate(item.id,item.type)"
            v-if="!!item.isDownload"
          >下载证书</button>
        </td>
      </tr>
    </table>
    <Popup v-model="show" round :close-on-click-overlay="false">
      <div v-if="show" class="is_dialog">
        <div class="title">请填写邮寄地址：</div>
        <textarea
          name
          id
          style="width:100%;"
          cols="30"
          rows="1"
          placeholder="请填写地址，例如：江苏省 南京市 某某区 某某街道 XXX门牌号"
          v-model="textarea_text"
        ></textarea>
        <div class="bottom">
          <button class="cancel" @click="cancel">取消</button>
          <button class="confirm" @click="confirm()">确定</button>
        </div>
      </div>
    </Popup>
  </div>
</template>

<script>
import { Toast, Dialog, Popup } from "vant";
import NavTab from "../../components/Isnav";
export default {
  name: "EntryList",
  components: {
    NavTab,
    Dialog,
    Popup,
    Toast,
  },
  props: {},
  data() {
    return {
      list: [
        // {
        //   activityId: "",
        //   createTime: 0,
        //   activityName: "",
        //   cityName: "",
        //   status: -1
        // }
      ],
      // 审核状态0未审核1审核通过2未通过
      status: { 0: "未审核", 1: "审核通过", 2: "未通过" },
      show: false,
      textarea_text: "",
      id: "",
    };
  },
  created() {
    this.myInfoList();
  },
  mounted() {},
  activated() {},
  update() {},
  methods: {
    confirm() {
      this.cancel();
      if (this.textarea_text == "") {
        Toast.fail("没有填写！");
      } else {
        this.addAddress();
      }
    },
    async addAddress() {
      let res = await this.$req(window.api.addAddress, {
        infoId: this.id,
        address: this.textarea_text,
      });
      if (res.data.success) {
        Toast.success("成功！");
        this.textarea_text = "";
      } else {
        Toast.fail(res.data.message);
      }
    },

    cancel() {
      this.show = false;
    },
    // 下载证书
    Download_certificate(id, type) {
      this.id = id;
      this.getAdmission(type);
    },
    async getAdmission(type) {
      let res = await this.$req(window.api.getAdmission, {
        type: type,
        infoId: this.id,
      });
      console.log(res);
      window.location.href = res.data;
    },
    // 邮寄地址
    mailing_address(id) {
      this.id = id;
      this.show = true;
    },
    // 去申请发票
    go_ApplyInvoice() {
      this.$router.push({ path: "/ApplyInvoice" });
    },
    async myInfoList() {
      let res = await this.$req(window.api.myInfoList, {});
      this.list = res.data.result;
    },
    Todata(data) {
      let datas = new Date(data);
      let year = datas.getFullYear();
      let month = datas.getMonth() + 1;
      month = month < 10 ? `0${month}` : month;
      let getDate = datas.getDate();
      return `${year}-${month}-${getDate}`;
    },
    Toranking(id, type) {
      this.getRank(id, type);
    },
    // 获取排名
    async getRank(id, type) {
      let res = await this.$req(window.api.getRank, {
        activityId: id,
        type: type,
      });
      if (!res.data.success) {
        Toast.fail(res.data.message);
      } else {
        if (!!type) {
          this.$router.push({ path: "/GoldRanking", query: { id: id } });
        } else {
          this.$router.push({ path: "/ranking", query: { id: id } });
        }
      }
    },
  },
  filters: {},
  computed: {},
  watch: {},
};
</script>
<style lang="less" scoped>
#EntryList {
  height: 100vh;
  background-color: #3ca53d;
  table {
    border-collapse: collapse;
    padding-left: 2vw;
    padding-right: 2vw;
    font-size: 0.3rem;
    text-align: center;
    background-color: #3ca53d;
    width: 100%;
    color: #fff;

    th {
      padding: 0;
      margin: 0;
      border: 0;
    }
    .list {
      height: 30vw;
      border-bottom: 1px solid #9ed29e;
      padding-top: 5vw;
      padding-bottom: 5vw;
      padding-left: 2vw;
      padding-right: 2vw;
      td {
        line-height: 5vw;
        a {
          color: #ffd200;
        }
        button {
          padding: 1vw;
          border: none;
          background-color: #1989fa;
          a {
            color: #ffffff;
          }
          &:nth-child(2) {
            margin-top: 2vw;
            margin-bottom: 2vw;
          }
        }
      }
    }
  }
  /deep/.is_dialog {
    padding: 2vw;
    background-color: #ffffff;
    width: 90vw;
    overflow: hidden;
    .title {
      text-align: center;
      font-size: 0.4rem;
      height: 7vw;
      line-height: 7vw;
    }
    .bottom {
      display: flex;
      justify-content: space-around;
      padding-bottom: 2vw;
      button {
        border-radius: 2vw;
        font-size: 0.3rem;
        height: 13vw;
        width: 45%;
        border: none;
        color: #ffffff;
      }
      .cancel {
        color: #000000;
      }
      .confirm {
        background-color: #07c160;
      }
    }
    textarea {
      resize: none;
      width: 100%;
      height: 20vw;
      font-size: 0.3rem;
    }
  }
}
</style>
