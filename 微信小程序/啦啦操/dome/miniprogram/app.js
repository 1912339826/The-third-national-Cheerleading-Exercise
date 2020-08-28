//app.js
let config = require('./pages/js/config');
let ref = require('./pages/js/ref');
App({
  ref: ref,
  config: config,
  onLaunch: function (options) {
    console.log(options)
    console.log(wx.getLaunchOptionsSync())
    wx.removeStorageSync('accessToken')
    if (options.scene == 1101 ||options.scene == 1011) {
      // 判断是二维码进入
      console.log(options.query.sceneId)
      // getTokenByScene
      ref.default.get(config.default.getTokenByScene.url, {
        sceneId: options.query.sceneId
      }, res => {
        // console.log(res.data.result.token)
        // 存储用户Token
        wx.setStorageSync("accessToken", res.data.result.token);
        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            ref.default.post(config.default.wxLogin.url, {
              wxCode: res.code
            }, res => {
              // console.log(res)
            })
          }
        })
      })
    } else {
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          ref.default.post(config.default.wxLogin.url, {
            wxCode: res.code
          }, res => {
            wx.setStorageSync("openid",res.data.result)
            // console.log(res.header['Set-Cookie'])
            // wx.setStorageSync('sessionid', res.header['Set-Cookie']); //保存Cookie到Storage
            // wx.setStorageSync("accessToken", res.data.result.token);
          })
        }
      })
    }
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'test-f0b102',
        traceUser: true,
      })
    }
    this.globalData = {}
  }
})