<template>
  <div id="EntryList">
    <NavTab/>
    <table>
      <tr style="background-color: #63b764;height:7vw; line-height:7vw;">
        <th style="width:35%">活动</th>
        <th style="width:35%">日期</th>
        <th style="width:30%">状态</th>
      </tr>
      <tr
        v-for="(item, index) in list"
        :key="index"
        class="list"
        style
        @click="Toranking(item.activityId)"
      >
        <td>
          <div>
            <a href="#">第三届全国啦啦操创意展示大会文化创意视频网络大赛</a>
          </div>
          <div>{{item.cityName}} {{item.activityName}}</div>
        </td>
        <td>{{Todata(item.createTime)}}</td>
        <td>{{status[item.status]}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { Toast } from 'vant';
import NavTab from '../../components/Isnav'
export default {
  name: "EntryList",
  components: {
    NavTab
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
      status: { 0: "未审核", 1: "审核通过", 2: "未通过" }
    };
  },
  created() {
    this.myInfoList();
  },
  mounted() {},
  activated() {},
  update() {},
  methods: {
    async myInfoList() {
      let res = await this.$req(window.api.myInfoList, {});
      this.list = res.data.result;
    },
    Todata(data) {
      let datas = new Date(data);
      let year = datas.getFullYear();
      let month = datas.getMonth()+1;
      month = month < 10 ? `0${month}` : month;
      let getDate = datas.getDate();
      return `${year}-${month}-${getDate}`;
    },
    Toranking(id) {
      
      this.getRank(id)
    },
    // 获取排名
    async getRank(id) {
      let res = await this.$req(window.api.getRank, {
        activityId: id
      });
      if(!res.data.success){
        Toast.fail(res.data.message);
      }else{
        this.$router.push({ path: "/ranking", query: { id: id } });
      }
    }
  },
  filters: {},
  computed: {},
  watch: {}
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
      }
    }
  }
}
</style>
