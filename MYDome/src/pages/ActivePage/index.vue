<template>
  <div id="ActivePage">
    <NavTab />
    <div class="content">
      <img :src="img" alt />
      <button @click="toDataInformation">我要参赛</button>
    </div>
    <Popup v-model="show" @click-overlay="close">
      <div class="ispopup">
        <nav style="text-align:center;">请选择参赛类型：</nav>
        <div>
          <RadioGroup v-model="radio" direction="horizontal" style="display:flex;justify-content: space-around;">
            <Radio name="1">普通赛场</Radio>
            <Radio name="2">黄金赛场</Radio>
          </RadioGroup>
        </div>
        <div class="button_">
          <Button type="default" @click="close">取消</Button>
          <Button color="#ee0a24" plain @click="QuickMark">确认</Button>
        </div>
      </div>
    </Popup>
  </div>
</template>

<script>
import NavTab from "../../components/Isnav";
import { Radio, RadioGroup, Popup, Button } from "vant";
export default {
  name: "ActivePage",
  components: {
    NavTab,
    Radio,
    RadioGroup,
    Popup,
    Button
  },
  props: {},
  data() {
    return {
      IsfindCurrentActivity: "",
      img: "",
      id: "",
      show: false,
      radio: "1"
    };
  },
  created() {
    this.findCurrentActivity();
  },
  mounted() {},
  activated() {},
  update() {},
  methods: {
    QuickMark(){
      this.close();
      // if(this.radio != "1"){
      //   this.$router.push("/QuickMark")
      // }else{
        this.$router.push({ path: "/DataInformation", query: { id: this.id } });
      // }
    },
    close(){
      this.show = false;
    },
    async findCurrentActivity() {
      let res = await this.$req(window.api.findCurrentActivity, {type:0});
      this.img = res.data.result.pic;
      this.id = res.data.result.id;
    },
    toDataInformation() {
      this.show = true;
    },
  },
  filters: {},
  computed: {},
  watch: {},
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
  .ispopup {
    font-size: 0.3rem;
    width: 90vw;
    height: 40vw;
    border-radius: 10vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 2vw;
  }
  .button_ {
    display: flex;
    justify-content: space-between;
    button {
      width: 50%;
    }
  }
}
</style>
