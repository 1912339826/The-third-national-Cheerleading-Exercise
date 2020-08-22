if (process.env.NODE_ENV == "development") {
  // 开发
  var BASE_URLA = "http://106.54.252.48:8091";
} else if (process.env.NODE_ENV == "debug") {
  // debug
  var BASE_URLA = "http://192.168.0.151:8086";
} else if (process.env.NODE_ENV == "production") {
  // 生产
  var BASE_URLA = "http://llc.njqiahao.com/api";
}
window.BASE_URLA = BASE_URLA;
export default {
  // baseUrl: BASE_URLA,
  BASE_URLA,
  // 城市信息
  cityTree:`${BASE_URLA}/city/cityTree`,
  // 报名
  signAdd: `POST ${BASE_URLA}/sign/signAdd`,
  // 获取最新活动信息/活动规则
  findCurrentActivity: `${BASE_URLA}/activity/findCurrentActivity`,
  // 照片上传 
  UploadPhotos: `POST ${BASE_URLA}/info/import`,
  //参赛信息 
  InfoSubmit:`POST ${BASE_URLA}/info/submit`,
  // 我的报名列表
  myInfoList: `${BASE_URLA}/info/myInfoList`,
  // 获取排名 
  getRank: `${BASE_URLA}/info/getRank`,
  // 未登录,重定向
  toAuthIndex: `${BASE_URLA}/toAuthIndex`,
  // 验证登录
  checkLogin:`POST ${BASE_URLA}/sign/checkLogin`,
  // 父城市
  getParentCity:`${BASE_URLA}/city/getParentCity`,
  // 查询成绩 
  findAchievement:`${BASE_URLA}/info/findAchievement`,
  // 二维码图片
  getQrCode:`${BASE_URLA}/activity/getQrCode`
};
