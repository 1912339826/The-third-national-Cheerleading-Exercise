// pages/Authorized/Authorized.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page_name: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "授权登录" //页面标题为路由参数
    })
    console.log(options.page_name)
    this.setData({
      page_name: options.page_name
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

  },
  onGotUserInfo(e) {
    // console.log(e)
    let message = e.detail.errMsg
    if (message == "getUserInfo:ok") {
      // 允许
      
      wx.redirectTo({
        url: `../${this.data.page_name}/${this.data.page_name}`,
      })
    } else {
      // 拒绝
    }
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