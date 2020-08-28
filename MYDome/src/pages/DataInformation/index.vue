<template>
  <div id="DataInformation">
    <NavTab />
    <img src="../../../static/images/home_top.png" alt class="home_top" />
    <div class="content">
      <div class="from">
        <nav>
          <img src="../../../static/images/screenshot_03.png" alt />
          <div>上传您的微信朋友圈截图、抖音截图(注:图片大小请限制在1MB以内!)</div>
        </nav>
       
        <div class="ready_box">
          <uploader
            :after-read="afterRead"
            v-model="fileList"
            :deletable="false"
            :preview-full-image="false"
            ref="uploader"
          />
          <div @click="up" class="up">
            <!-- 默认展示 -->
            <img src="../../../static/images/ready.png" alt class="ready" v-if="Isimg==''&&!is_loading" />
            <!-- 上传中 -->
             <loading type="spinner" size="20" v-else-if="is_loading"/>
            <!-- 上传成功之后 -->
            <img :src="Isimg" alt v-else class="file" />
          </div>
        </div>
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
import { Toast, Uploader, Loading } from "vant";
import NavTab from "../../components/Isnav";
export default {
  name: "DataInformation",
  components: {
    NavTab,
    Uploader,
    Loading,
  },
  props: {},
  data() {
    return {
      Isimg: "",
      temporaryImg: "",
      forward: "",
      comment: "",
      likes: "",
      fileList: [
        {
          url: "",
        },
      ],
      is_loading:false
    };
  },
  created() {},
  mounted() {},
  activated() {},
  update() {},
  methods: {
    up() {
      this.$refs.uploader.chooseFile();
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      var formData = new window.FormData();
      formData.append("file", file.file);
      this.UploadPhotos(formData);
    },
    UploadPhotos(files) {
      this.is_loading = true;
      let url = `${window.BASE_URLA}/info/import`;
      let formData = files;
      this.instance.post(url, formData).then((res) => {
        this.Isimg = res.data.result.url;
        this.is_loading = false;
      });
      this.fileList = [{ url: "" }];
    },
    async InfoSubmit() {
      let res = await this.$req(window.api.InfoSubmit, {
        comment: Number(this.comment),
        pic: this.Isimg,
        likes: Number(this.likes),
        activityId: this.$route.query.id,
        type:0
      });
      if (res.data.success) {
        this.$router.push("./EntryList");
      } else {
        Toast.fail(res.data.message);
      }
    },
    submit() {
      if (this.comment != "" && this.likes != "") {
        this.InfoSubmit();
      } else {
        Toast.fail("请填写完整!");
      }
    },
  },
  filters: {},
  computed: {},
  watch: {},
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
      line-height: 5vw;
      display: flex;
      align-items: center;
      img {
        margin-right: 2vw;
        width: 5vw;
        height: 5vw;
      }
    }
    /deep/.van-loading__spinner.van-loading__spinner--spinner {
      width: 5vw !important;
      height: 5vw !important;
    }
    .ready_box {
      width: 25vw;
      height: 25vw;
      background-color: #fafafa;
      border: 2px solid #dddddd;
      border-radius: 2vw;
      position: relative;
      /deep/.van-uploader {
        width: 0;
        height: 0;
        overflow: hidden;
      }
      // label {
      //   display: flex;
      //   align-items: center;
      //   justify-content: center;
      //   width: 100%;
      //   height: 100%;
      //   background-color: #fafafa;
      //   border-radius: 2vw;
      // }
      .up {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background-color: #fafafa;
        border-radius: 2vw;
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
