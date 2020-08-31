<template>
  <div id="ApplyInvoice">
    <NavTab />
    <!-- 开票类型 个人、身份证号  邮箱   企业、名称、税号   邮箱 -->
    <Field
      readonly
      clickable
      name="picker"
      :value="value"
      label="开票类型"
      placeholder="请选择开票类型"
      @click="show = true"
    />

    <template v-if="value=='个人'">
      <Field name="name" v-model="personage.name" label="姓名" placeholder="请填写姓名" />
      <Field
        name="ID_number"
        type="number"
        v-model="personage.ID_number"
        label="身份证号"
        placeholder="请填写身份证号"
      />
      <Field name="e-mail" v-model="personage.E_mail" type="email" label="邮箱" placeholder="请填写邮箱" />
    </template>

    <template v-if="value=='公司'">
      <Field name="name" v-model="enterprise.name" label="企业名称" placeholder="请填写企业名称" />
      <Field name="ID_number" v-model="enterprise.duty_paragraph" label="税号" placeholder="请填写企业税号" />
      <Field name="e-mail" v-model="enterprise.E_mail" type="email" label="邮箱" placeholder="请填写邮箱" />
    </template>
    <div style="margin: 16px;">
      <Button round block type="info" native-type="submit" @click="submit">提交</Button>
    </div>
    <Popup v-model="show" position="bottom">
      <Picker title="开票类型" show-toolbar :columns="columns" @confirm="onConfirm" @cancel="onCancel" />
    </Popup>
  </div>
</template>

<script>
import { Picker, Popup, Field, Button, Toast } from "vant";
import NavTab from "../../components/Isnav";
export default {
  name: "ApplyInvoice",
  components: {
    Picker,
    Popup,
    Field,
    Button,
    Toast,
    NavTab,
  },
  props: {},
  data() {
    return {
      columns: ["个人", "公司"],
      show: false,
      value: "个人",
      //   个人
      personage: {
        name: "",
        ID_number: "",
        E_mail: "",
      },
      //   企业
      enterprise: {
        name: "",
        duty_paragraph: "",
        E_mail: "",
      },
    };
  },
  watch: {
    value() {},
  },
  created() {},
  mounted() {},
  activated() {},
  update() {},
  methods: {
    onConfirm(value, index) {
      this.value = value;
      this.onCancel();
    },
    onCancel() {
      this.show = false;
    },
    submit() {
      //   Toast.loading({
      //     message: "提交中...",
      //     forbidClick: true,
      //   });
      if (this.value == "个人") {
        console.log(this.personage);
        if (
          this.personage.name == "" ||
          this.personage.ID_number == "" ||
          this.personage.E_mail == ""
        ) {
          Toast.fail("请填写完整！");
        } else {
          //   this.personage;
          console.log(this.personage);
        }
      } else {
        if (
          this.enterprise.name == "" ||
          this.enterprise.duty_paragraph == "" ||
          this.enterprise.E_mail == ""
        ) {
          Toast.fail("请填写完整！");
        } else {
          //   this.enterprise;
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
#ApplyInvoice {
  table {
    width: 100%;
    font-size: 0.3rem;
    tr {
      width: 100%;
    }
    th {
      display: flex;
      input {
        width: 70%;
      }
    }
  }
}
</style>
