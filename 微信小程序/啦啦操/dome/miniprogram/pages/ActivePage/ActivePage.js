// pages/ActivePage/ActivePage.js
const app = getApp();
const fun_ref = app.ref.default;
const fun_config = app.config.default;
var log = require('../../log.js') // 引用上面的log.js文件
Page({
  /**
   * 页面的初始数据
   */
  data: {
    img: "",
    id: "",
    show: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(!!options.scene)
    if (!!options.scene) {
      // 判断是代参二维码进入
      // getTokenByScene
      fun_ref.get(fun_config.getTokenByScene.url, {
        sceneId: options.scene
      }, res => {
        console.log(res.data)
        // 存储用户Token
        wx.setStorageSync("scene", options.scene);
        wx.setStorageSync("accessToken_scene", res.data.result.token);
        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            fun_ref.post(fun_config.wxLogin.url, {
              wxCode: res.code
            }, res => {
              console.log(res)
            })
          }
        })
      })

    }
    log.info('活动页面' + JSON.stringify(options)) // 日志会和当前打开的页面关联，建议在页面的onHide、onShow等生命周期里面打
    wx.setNavigationBarTitle({
      title: "活动" //页面标题为路由参数
    })
    let that = this;
    wx.getSetting({
      success(res) {
        // 是否授过权
        let userInfo = res.authSetting["scope.userInfo"]
        if (userInfo) {
          that.findCurrentActivity()
        } else {
          wx.navigateTo({
            url: '../Authorized/Authorized?page_name=ActivePage',
          })
        }
      }
    })
  },
  onChange(event) {
    this.setData({
      radio: event.detail,
    });
  },
  toDataInformation() {
    wx.navigateTo({
      url: '../DataInformation/DataInformation?id=' + this.data.id,
    })
  },
  findCurrentActivity() {
    fun_ref.get(
      fun_config.findCurrentActivity.url, {},
      res => {
        this.setData({
          img: res.data.result.pic,
          id: res.data.result.id
        })
      },
      er => {})

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.findCurrentActivity()
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