// pages/ActivePage/ActivePage.js
const app = getApp();
const fun_ref = app.ref.default;
const fun_config = app.config.default;
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
    wx.setNavigationBarTitle({
      title: "活动" //页面标题为路由参数
    })
    let that = this;
    wx.getSetting({
      success(res) {
        // 是否授过权
        // console.log(res.authSetting["scope.userInfo"])
        let userInfo = res.authSetting["scope.userInfo"]
        if (userInfo) {
          that.findCurrentActivity()
        } else {
          wx.redirectTo({
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
        // console.log('成功了 :>> ', res);
        this.setData({
          img: res.data.result.pic,
          id: res.data.result.id
        })
      },
      er => {
        // console.log('失败了 :>> ', er);
      })

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