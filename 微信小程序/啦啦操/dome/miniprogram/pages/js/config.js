// 值	       说明	
// develop	开发版	
// trial	体验版	
// release	正式版

let envVersion = wx.getAccountInfoSync().miniProgram.envVersion
if (!envVersion || envVersion == "develop") {
  // var BASE_URLA = "https://llc.njqiahao.com/api";
  //  var BASE_URLA = "http://106.54.252.48:8091";
  var BASE_URLA = "http://192.168.5.157:8091";
} else if (envVersion == "trial") {
  var BASE_URLA = "https://llc.njqiahao.com/api";
} else if (envVersion == "release") {
  var BASE_URLA = "https://llc.njqiahao.com/api";
}

// window.BASE_URLA = BASE_URLA;
export default {
  // baseUrl: BASE_URLA,
  BASE_URLA,
  // 城市信息
  cityTree: {
    type: "GET",
    url: `${BASE_URLA}/city/cityTree`
  },
  // 报名
  signAdd: {
    type: "POST",
    url: `${BASE_URLA}/sign/signAdd`
  },
  // 获取最新活动信息/活动规则
  findCurrentActivity: {
    type: "GET",
    url: `${BASE_URLA}/activity/findCurrentActivity`
  },
  // 照片上传 
  UploadPhotos: {
    type: "POST",
    url: `${BASE_URLA}/info/import`
  },
  //参赛信息 
  InfoSubmit: {
    type: "POST",
    url: `${BASE_URLA}/info/submit`
  },
  // 我的报名列表
  myInfoList: {
    type: "GET",
    url: `${BASE_URLA}/info/myInfoList`
  },
  // 获取排名 
  getRank: {
    type: "GET",
    url: `${BASE_URLA}/info/getRank`
  },
  // 未登录,重定向
  toAuthIndex: {
    type: "GET",
    url: `${BASE_URLA}/toAuthIndex`
  },
  // 验证登录
  checkLogin: {
    type: "POST",
    url: `${BASE_URLA}/sign/checkLogin`
  },
  // 父城市
  getParentCity: {
    type: "GET",
    url: `${BASE_URLA}/city/getParentCity`
  },
  // 查询成绩 
  findAchievement: {
    type: "GET",
    url: `${BASE_URLA}/info/findAchievement`
  },
  // 是否支付 
  findIsPay: {
    type: "GET",
    url: `${BASE_URLA}/payment/findIsPay`
  },
  // 获取视频播放凭证 
  getPlayInfo_info: {
    type: "GET",
    url: `${BASE_URLA}/app/getPlayInfo/info`
  },
  // 获取视频上传凭证 
  getPlayInfo_uploadInfo: {
    type: "GET",
    url: `${BASE_URLA}/app/getPlayInfo/uploadInfo`
  },
  // 刷新视频上传凭证
  getPlayInfo_refreshUploadInfo: {
    type: "POST",
    url: `${BASE_URLA}/app/getPlayInfo/refreshUploadInfo`
  },
  // 小程序登录
  wxLogin: {
    type: "POST",
    url: `${BASE_URLA}/user/wxLogin`
  },
  // /payment/wxPay
  payment_wxPay: {
    type: "POST",
    url: `${BASE_URLA}/payment/wxPay`
  },
  // 判断是否参加过普通场次
  hasNormal: {
    type: "GET",
    url: `${BASE_URLA}/info/hasNormal`
  },
  // 二维码进入小程序，得到场景值sceneId，获取Token
  getTokenByScene: {
    type: "GET",
    url: `${BASE_URLA}/activity/getTokenByScene`
  },
};