// pages/DataInformation/DataInformation.js
import Toast from '@vant/weapp/toast/toast';
import Dialog from '@vant/weapp/dialog/dialog';
const app = getApp()
const fun_ref = app.ref.default;
const fun_config = app.config.default;
import VODUpload from '../js/aliyun-upload-sdk-1.0.0.min.js'
let F = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1598335670268&di=1df837499548f192c2ad67b6655bb4e5&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_pic%2F17%2F07%2F28%2Fbad06dcfa266169db28d4e57d7085371.jpg"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoScreenshot_loading: false,
    videoScreenshot_file: {},
    videoScreenshot_fileList: [],
    videoScreenshot: "",
    Isimg: "",
    temporaryImg: "",
    forward: "",
    comment: "",
    likes: "",
    fileList: [],
    is_loading: false,
    activityId: '',
    id: "",
    afterRead_video_img: "",
    is_loading_video: false,
    file: {},
    uploadAuth: "",
    uploadAddress: "",
    videoId: "",
    bilocation_img: false,
    hasNormal_my: 0,
    show: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "数据信息" //页面标题为路由参数
    })
  },
  // 验证是否参加过普通场
  hasNormal(activityId) {
    fun_ref.get(fun_config.hasNormal.url, {
      activity: activityId
    }, res => {
      if (res.data.success) {
        // 没有参加过普通场次
        this.setData({
          hasNormal_my: 1
        })
      } else {
        // 参加过普通场次
        this.setData({
          hasNormal_my: 0
        })
      }
    })
  },
  hasNormal_message() {
    Toast.fail('已参加过普通赛场！')
  },
  findIsPay(activityId) {
    fun_ref.get(fun_config.findIsPay.url, {
      activityId: activityId
    }, res => {
      if (!res.data.result) {
        // 未支付
        Dialog.confirm({
            title: '提示',
            message: '参加黄金赛事需要支付相关费用！',
            width: "80vw",
            confirmButtonText: "去支付",
            className: "dialog_my"
          })
          .then(() => {
            // 确认
            this.payment_wxPay(activityId)
          })
          .catch(() => {
            // 取消
            // wx.redirectTo({
            //   url: '../home/home',
            // })
            wx.navigateBack({
              delta: 1,
            })
          });
      } else {
        // 已支付
      }
    })
  },

  // 活动ID
  findCurrentActivity() {
    fun_ref.get(
      fun_config.findCurrentActivity.url, {},
      res => {
        this.setData({
          id: res.data.result.id
        }, function () {
          this.setData({
            activityId: res.data.result.id
          }, function () {
            this.findIsPay(this.data.activityId)
            // 判断是否参加过普通场次
            this.hasNormal(this.data.activityId)
          })
        })
      },
      er => {
      })

  },

  input_comment(e) {
    this.setData({
      comment: e.detail.value
    })
  },
  input_tlikes(e) {
    this.setData({
      likes: e.detail.value
    })
  },

  submit() {
    if (this.data.videoScreenshot != "" && this.data.videoId != "") {
      Toast.fail("视频与视频截图只能选择一个进行上传!");
      return
    }
    if (this.data.comment != "" && this.data.likes != "") {
      this.InfoSubmit();
    } else {
      Toast.fail("请填写完整!");
    }
  },

  InfoSubmit() {
    let that = this;
    fun_ref.post(fun_config.InfoSubmit.url, {
      videoScreenshot: this.data.videoScreenshot,
      comment: Number(this.data.comment),
      pic: this.data.Isimg,
      likes: Number(this.data.likes),
      activityId: this.data.activityId,
      type: 1,
      videoId: this.data.videoId,
      hasNormal: this.data.bilocation_img ? "1" : "0"
    }, res => {
      if (res.data.success) {
        Toast.success("提交成功！")
        that.setData({
          show: true
        })
      } else {
        Toast.fail(res.data.message);
      }
    })
  },
  payment_wxPay(activityId) {
    fun_ref.post(fun_config.payment_wxPay.url, {
      activityId: activityId
    }, res => {
      if (res.data.success) {
        this.pay(res.data.result.timeStamp, res.data.result.nonceStr, res.data.result.package, res.data.result.sign)
      } else {
        Toast.fail(res.data.message);
        wx.redirectTo({
          url: '../home/home',
        })
      }
    })
  },
  pay(timeStamp, nonceStr, prepayid, paySign) {

    wx.requestPayment({
      timeStamp: `${timeStamp}`,
      nonceStr: nonceStr,
      package: prepayid, //
      signType: 'MD5',
      paySign: paySign, //
      success: function (res) {
        Toast.success("支付成功！");
      },
      fail: function (res) {
        Toast.fail('支付失败！');
      }
    })
  },

  // 上传图片1
  afterRead(event) {
    this.setData({
      fileList: [],
      is_loading: true
    })
    let this_ = this;
    const {
      file
    } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: fun_config.UploadPhotos.url, //真实的接口地址
      filePath: file.path,
      name: 'file',
      success(res) {
        // 上传完成需要更新 fileList
        this_.setData({
          Isimg: JSON.parse(res.data).result.url,
          is_loading: false,
          fileList: [{
            url: JSON.parse(res.data).result.url
          }]
        })
      },
      file(err) {
        console.log(err)
      }
    });
  },

  // 上传图片2
  afterRead_videoScreenshot(event) {
    this.setData({
      videoScreenshot_fileList: [],
      videoScreenshot_loading: true
    })
    let this_ = this;
    const {
      file
    } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: fun_config.UploadPhotos.url, // 仅为示例，非真实的接口地址
      filePath: file.path,
      name: 'file',
      success(res) {
        // 上传完成需要更新 fileList
        this_.setData({
          videoScreenshot: JSON.parse(res.data).result.url,
          videoScreenshot_loading: false,
          videoScreenshot_fileList: [{
            url: JSON.parse(res.data).result.url
          }]
        })
      },
    });
  },

  // 上传视频
  afterRead_video() {
    let that = this;
    Toast.loading({
      duration: 0,
      message: '添加文件中...',
      forbidClick: true,
    });
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      compressed: false,
      camera: 'back',
      success: function (res) {
        that.setData({
          file: {
            url: res.tempFilePath,
            coverUrl: res.thumbTempFilePath
          }
        })
        let uploader = that.data.uploader;
        let userData = `{"Vod":{"url":"${F}"}}`
        uploader.addFile(that.data.file, null, null, null, userData);
        uploader.startUpload()
      },
      fail: function (err) {
        if (err.errMsg == "chooseVideo:fail cancel") {
          that.setData({
            is_loading_video: false
          }, function () {
            Toast.fail("取消")
          })
        } else {
          that.setData({
            is_loading_video: false
          }, function () {
            Toast.fail("失败")
          })
        }

      }
    })

  },
  // 获取视频播放凭证
  getPlayInfo_info(videoId) {
    fun_ref.get(fun_config.getPlayInfo_info.url, {
      videoId: videoId
    }, res => {
      return res.data.result;
    })
  },
  // 获取视频上传凭证
  getPlayInfo_uploadInfo(title, fileName, url, uploadInfo) {
    let timestamp = (new Date()).valueOf();
    fun_ref.get(fun_config.getPlayInfo_uploadInfo.url, {
      title: timestamp,
      fileName: fileName
    }, res => {
      this.setData({
        uploadAuth: res.data.result.uploadAuth,
        uploadAddress: res.data.result.uploadAddress,
        videoId: res.data.result.videoId
      }, function () {
        this.data.uploader.setUploadAuthAndAddress(uploadInfo, this.data.uploadAuth, this.data.uploadAddress, res.data.result.videoId);

      })

    })
  },
  // 刷新视频上传凭证
  getPlayInfo_refreshUploadInfo(videoId) {
    fun_ref.post(fun_config.getPlayInfo_refreshUploadInfo.url, {
      videoId: videoId
    }, res => {
      this.setData({
        uploadAuth: res.data.result.uploadAuth,
        uploadAddress: res.data.result.uploadAddress,
        videoId: videoId
      }, function () {
        this.data.uploader.setUploadAuthAndAddress(uploadInfo, this.data.uploadAuth, this.data.uploadAddress, uploadInfo.videoId);
      })
    })
  },
  fun_oversize() {

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    let uploader = new VODUpload({
      //阿里账号ID，必须有值 ，值的来源https://help.aliyun.com/knowledge_detail/37196.html
      userId: "1777852761360178",
      //网络原因失败时，重新上传次数，默认为3
      retryCount: 3,
      //网络原因失败时，重新上传间隔时间，默认为2秒
      retryDuration: 2,

      // 添加文件成功
      addFileSuccess: function (uploadInfo) {
        Toast.loading({
          duration: 0,
          message: '添加文件成功',
          forbidClick: true,
        });
      },
      // 开始上传
      onUploadstarted: function (uploadInfo) {
        Toast.loading({
          duration: 0,
          message: '开始上传',
          forbidClick: true,
        });
        // that.setData({
        //   is_loading_video: true
        // })
        //上传方式1, 需要根据uploadInfo.videoId是否有值，调用点播的不同接口获取uploadauth和uploadAddress，如果videoId有值，调用刷新视频上传凭证接口，否则调用创建视频上传凭证接口
        // if (!!uploadInfo.videoId) {
        //   that.setData({
        //     videoId: uploadInfo.videoId
        //   })
        //   // 如果 uploadInfo.videoId 存在, 调用 刷新视频上传凭证接口(https://help.aliyun.com/document_detail/55408.html)
        //   that.getPlayInfo_refreshUploadInfo(uploadInfo.videoId)

        // } else {
        //   // 如果 uploadInfo.videoId 不存在,调用 获取视频上传地址和凭证接口(https://help.aliyun.com/document_detail/55407.html)
        //   that.setData({
        //     videoId: uploadInfo.videoId
        //   })
        // }
        that.getPlayInfo_uploadInfo("1", "1.mp4", F, uploadInfo)
        //从点播服务获取的uploadAuth、uploadAddress和videoId,设置到SDK里
      },
      // 文件上传成功
      onUploadSucceed: function (uploadInfo) {
        that.setData({
          afterRead_video_img: F
        }, function () {
          that.setData({
            is_loading_video: false
          }, function () {})
        })
      },
      // 文件上传失败
      onUploadFailed: function (uploadInfo, code, message) {
        Toast.fail("上传失败")
      },
      // 文件上传进度，单位：字节
      onUploadProgress: function (uploadInfo, totalSize, loadedPercent) {
      },
      // 上传凭证超时
      onUploadTokenExpired: function (uploadInfo) {
        console.log("onUploadTokenExpired");
        //实现时，根据uploadInfo.videoId调用刷新视频上传凭证接口重新获取UploadAuth
        //https://help.aliyun.com/document_detail/55408.html
        //从点播服务刷新的uploadAuth,设置到SDK里        
        uploader.resumeUploadWithAuth(uploadAuth);
      },
      //全部文件上传结束
      onUploadEnd: function (uploadInfo) {
        console.log("onUploadEnd: uploaded all the files");
        that.setData({
          is_loading_video: false
        }, function () {
          Toast.clear();
        })
      }
    });
    this.setData({
      uploader: uploader
    });
  },
  bilocation() {
    if (this.data.bilocation_img) {
      this.setData({
        bilocation_img: false
      })
    } else {
      this.setData({
        bilocation_img: true
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    wx.getSetting({
      success(res) {
        // 是否授过权
        let userInfo = res.authSetting["scope.userInfo"]
        if (userInfo) {
          that.findCurrentActivity()
        } else {
          wx.redirectTo({
            url: '../Authorized/Authorized?page_name=DataInformation',
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})