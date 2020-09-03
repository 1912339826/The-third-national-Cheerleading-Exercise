import Toast from '@vant/weapp/toast/toast';
const app = getApp();
const fun_ref = app.ref.default;
const fun_config = app.config.default;
// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    columns: [],
    provinceList: [],
    province: "",
    cityList: "",
    city: "",
    name: "",
    phone: "",
    message: "",
    html: "",
    Ismessage: false,
    show: false,
    change_picker: 0,
    // 记录当前点击的是省份0、城市1
    change_picker_type: 0,
    province_index: 0,
    city_index: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "首页" //页面标题为路由参数
    })
    this.cityTree();
    this.findCurrentActivity();
  },

  cansai() {
    let that = this
    wx.getSetting({
      success(res) {
        // 是否授过权
        let userInfo = res.authSetting["scope.userInfo"]
        if (userInfo) {
          that.signAdd();
        } else {
          wx.navigateTo({
            url: '../Authorized/Authorized?page_name=home',
          })
        }
        
      }
    })
  },
  async checkLogin() {
    fun_ref.post(fun_config.checkLogin.url, {}, res => {
      if (res.data.success) {
        this.setData({
          name: res.data.result.name,
          phone: res.data.result.phone,
          message: "已报名",
          Ismessage: true
        })
        this.getParentCity(res.data.result.cityId)
      } else {
        let provinceList = this.data.provinceList[0];
        let province_children = this.data.province.children;
        let cityList = this.data.cityList[0];
        this.setData({
          province: provinceList,
          cityList: province_children,
          city: cityList
        }, function () {
          Toast.clear();
        })
      }
    })
  },
  getParentCity(id) {
    fun_ref.get(fun_config.getParentCity.url, {
      cityId: id
    }, res => {
      for (let index = 0; index < this.data.provinceList.length; index++) {
        const element = this.data.provinceList[index];
        element.text = element.name
        if (res.data.result.parent.id == element.id) {
          this.setData({
            province: element,
            cityList: element.children
          })
        }
      }
      for (let index = 0; index < this.data.cityList.length; index++) {
        const element = this.data.cityList[index];
        element.text = element.name
        if (res.data.result.id == element.id) {
          this.setData({
            city: element
          }, function () {
            Toast.clear();
          })
        }
      }

    })

  },
  async findCurrentActivity() {
    fun_ref.get(fun_config.findCurrentActivity.url, {
      type: 1
    }, res => {
      this.setData({
        html: res.data.result.rule
      })
    })

  },
  async toAuthIndex() {
    fun_ref.get(fun_config.toAuthIndex.url, {})
  },
  submit() {
    wx.navigateTo({
      url: '../ActivePage/ActivePage',
    })
  },

  input_name(e) {
    this.setData({
      name: e.detail.value
    })
  },

  input_phone(e) {
    this.setData({
      phone: e.detail.value
    })
  },

  async signAdd() {
    fun_ref.post(fun_config.appLetsSignAdd.url, {
      name: this.data.name,
      cityId: this.data.city.id,
      phone: this.data.phone,
      type: 1,
      openId: wx.getStorageSync("openid")
    }, res => {
      let status = res.data.status;
      if (status == 200) {
        wx.setStorageSync("accessToken", res.data.result.token);
        Toast.success("报名成功!");
        this.setData({
          message: "报名成功！请参赛！",
          Ismessage: true
        })
      } else {
        this.setData({
          message: message
        })
      }
    })
  },
  // 省份
  fun_provinceList() {
    let province_index = this.data.province_index;
    let provinceList = this.data.provinceList;
    this.setData({
      change_picker_type: 0,
      change_picker: province_index,
      columns: provinceList,
      show: true
    })
  },
  // 城市
  fun_cityList() {
    let city_index = this.data.city_index;
    let cityList = this.data.cityList;
    this.setData({
      change_picker: city_index,
      change_picker_type: 1,
      columns: cityList,
      show: true
    })
  },

  // 选择器确定
  onConfirm(e) {
    if (this.data.change_picker_type == 0) {
      // 省份
      this.provinceChange(e.detail.value)
      this.setData({
        province_index: e.detail.index
      })
    } else {
      // 城市
      this.setData({
        city_index: e.detail.index,
        city: e.detail.value
      })
    }

    this.setData({
      show: false
    })
  },
  onClose() {
    this.onCancel();
  },


  onCancel() {
    this.setData({
      show: false
    })
  },

  provinceChange(detail) {
    this.setData({
      province: detail,
      cityList: detail.children,
      city: detail.children[0]
    })
  },



  cityhange() {},
  // 获取城市
  cityTree() {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
    });
    fun_ref.get(fun_config.cityTree.url, {}, res => {
      for (let index = 0; index < res.data.result.length; index++) {
        const element = res.data.result[index];
        element.text = element.name
        for (let index = 0; index < element.children.length; index++) {
          const elements = element.children[index];
          elements.text = elements.name
        }
      }
      this.setData({
        provinceList: res.data.result,
        province: res.data.result[0],
        cityList: res.data.result[0].children,
        city: res.data.result[0].children[0]
      }, function () {
        this.checkLogin();
      })
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