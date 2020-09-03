//app.js
let config = require('./pages/js/config');
let ref = require('./pages/js/ref');
var log = require('./log.js') // 引用上面的log.js文件
App({
  ref: ref,
  config: config,
  onLaunch: function (options) {
    log.info('hello test hahaha' + JSON.stringify(options)) // 日志会和当前打开的页面关联，建议在页面的onHide、onShow等生命周期里面打
    if (!!options.query.scene) {} else {
      wx.removeStorage({
        key: 'scene',
        success() {
          wx.login({
            success: res => {
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
              ref.default.post(config.default.wxLogin.url, {
                wxCode: res.code
              }, res => {
                wx.setStorageSync("openid", res.data.result)
              })
            }
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