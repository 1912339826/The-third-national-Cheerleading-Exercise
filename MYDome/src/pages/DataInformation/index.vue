<template>
  <div id="DataInformation">
    <NavTab />
    <img src="../../../static/images/home_top.png" alt class="home_top" />
    <div class="content">
      <div class="from">
        <nav>
          <img src="../../../static/images/screenshot_03.png" alt />
          <div>上传您的抖音截图</div>
        </nav>
        <div class="ready_box">
          <form
            action
            method="post"
            enctype="multipart/form-data"
            id="fileFrom"
            target="uploadFrame"
          >
            <input
              type="file"
              name
              id="file"
              @change="file($event)"
              accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
              style="display:none"
            />
          </form>
          <iframe id="uploadFrame" name="uploadFrame" style="display:none;"></iframe>
          <label for="file">
            <img src="../../../static/images/ready.png" alt class="ready" v-if="Isimg==''" />
            <img :src="Isimg" alt v-else class="file" />
          </label>
        </div>
        <nav>
          <img src="../../../static/images/transpond_03.png" alt />
          <div>请填写转发数据</div>
        </nav>
        <input type="text" placeholder="转发数据" v-model="forward" />
        <nav>
          <img src="../../../static/images/comment_03.png" alt />
          <div>请填写评论数据</div>
        </nav>
        <input type="text" placeholder="评论数据" v-model="comment" />
        <nav>
          <img src="../../../static/images/Like_03.png" alt />
          <div>请填写点赞数据</div>
        </nav>
        <input type="text" placeholder="点赞数据" v-model="likes" />
        <button @click="submit">提交参赛凭证</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Toast } from "vant";
import NavTab from "../../components/Isnav";
export default {
  name: "DataInformation",
  components: {
    NavTab
  },
  props: {},
  data() {
    return {
      Isimg: "",
      temporaryImg: "",
      forward: "",
      comment: "",
      likes: ""
    };
  },
  created() {},
  mounted() {},
  activated() {},
  update() {},
  methods: {
    file(e) {
      let files = document.getElementById("file");
      var formData = new window.FormData();
      formData.append("file", files.files[0]);
      this.UploadPhotos(formData);
    },
    UploadPhotos(files) {
      let url = `${window.BASE_URLA}/info/import`;
      let formData = files;
      this.instance.post(url, formData).then(res => {
        this.Isimg = res.data.result.url;
      });
    },
    async InfoSubmit() {
      let res = await this.$req(window.api.InfoSubmit, {
        forward: Number(this.forward),
        comment: Number(this.comment),
        pic: this.Isimg,
        // pic: `http://leke.qiahaojia.com/pic/1591929122490.png`,
        likes: Number(this.likes),
        activityId: this.$route.query.id
      });
      if (res.data.success) {
        this.$router.push("./EntryList");
      } else {
        Toast.fail(res.data.message);
      }
    },
    submit() {
      this.InfoSubmit();
    }
  },
  filters: {},
  computed: {},
  watch: {}
};
</script>

<style lang="less" scoped>
#DataInformation {
  background-color: #3ba63e;
  padding-bottom: 20vw;
  .content {
    padding-left: 4vw;
    padding-right: 4vw;
  }
  .home_top {
    width: 100%;
  }
  .from {
    padding-left: 5vw;
    padding-right: 5vw;
    width: 100%;
    border-radius: 5vw;
    background-color: #ffffff;
    padding-bottom: 8vw;
    nav {
      font-size: 0.3rem;
      font-weight: 700;
      height: 13vw;
      line-height: 12vw;
      display: flex;
      align-items: center;
      img {
        margin-right: 2vw;
        width: 5vw;
        height: 5vw;
      }
    }
    .ready_box {
      width: 25vw;
      height: 25vw;
      background-color: #fafafa;
      border: 2px solid #dddddd;
      border-radius: 2vw;
      label {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background-color: #fafafa;
        border-radius: 2vw;
      }
      .ready {
        width: 30%;
        height: 30%;
      }
      .file {
        width: 100%;
        height: 100%;
        border-radius: 2vw;
      }
    }
    input {
      font-size: 0.4rem;
      padding: 5vw;
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
  }
}
</style>
