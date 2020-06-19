import axios from 'axios'
axios.defaults.withCredentials = true
import qs from 'qs'
import Vue from "vue";
import VueResource from "vue-resource";
Vue.use(VueResource);

let pending = [];
let removePending = ele => {
  let data = JSON.stringify(ele.data || ele.params);
  for (let p in pending) {
    if (pending[p].path === ele.url + "&" + ele.method + "&" + data) {
      pending[p].cancel();
      pending.splice(p, 1);
    }
  }
};

axios.defaults.timeout = 60000;
axios.defaults.withCredentials = true

axios.interceptors.request.use(config => {
  // 此处对请求的header进行配置
  // let cookies = Tools.getCookies(`${appConfig.simpleName}_access_token`) || {};
  // config.headers = {
  //   Authorization: `${cookies.token_type} ${cookies.access_token}`
  // };
  // config.headers={
  //   'Access-Token':111111
  // };
  let data = config.data || config.params;
  // removePending(config);
  // config.cancelToken = new axios.CancelToken(cancel => {
  //   pending.push({
  //     path: config.url + "&" + config.method + "&" + JSON.stringify(data),
  //     cancel
  //   });
  // });
  let token = window.localStorage.getItem("accessToken");
  let AccessToken = "Access-Token"
  if (token) {
    config.headers[AccessToken] = token;
  }
  if (config.url == `${window.BASE_URLA}/info/import`) {
    // config.headers['Content-Type'] = 'multipart/form-data'
  } else {
    config.data = (config.method === 'post' || config.method === 'put') ? qs.stringify(data) : null;
    config.headers['Content-Type'] = config.headers['Content-Type'] ? config.headers['Content-Type'] : 'application/x-www-form-urlencoded;charset=UTF-8';
  }

  // if (config.headers['Content-Type'] == 'multipart/form-data') {
  //   //上传不需要序列化data 坑20190417
  // } else {

  // }
  return config;
});
// let cun = 0;
axios.interceptors.response.use(
  response => {
    removePending(response.config);
    console.log(response.data)
    // // 因为登录过期,后台数据返回含有'登录超时，请重新登录'的字符串
    // if ((typeof response.data) == 'string') {
    //   if (response.data.indexOf("登录超时，请重新登录") != -1) {
    //     // 一个页面有1个以上的请求,判断只显示一个'登录过期'的提示.
    //     cun++
    //     if (cun == 1) {
    //       window.selfVue.$message.destroy()
    //       window.selfVue.$message.error("登录超时，请重新登录");
    //       cun = 0;
    //       setTimeout(() => {
    //         window.selfVue.$message.destroy()
    //       }, 2000)
    //     }
    //     window.selfVue.$router.push('/login')
    //   }

    // }
    return response;


  },
  error => {
    console.log(error)
    if (error.request.status === 404) {
      // Tools.setCookies(`${appConfig.simpleName}_access_token`, null);
      // location.reload();
    }
  }
);

export default function (url, data) {
  if (!url) throw new Error("请求的url为空");
  let param = url.match(/\:[a-zA-Z]+/g);
  if (param) {
    param.forEach(ele => {
      let attr = ele.substr(1);
      url = url.replace(ele, data[attr]);
      delete data[attr];
    });
  }
  let method = url.match(/^(PUT|DELETE|GET|POST)\s/);
  if (method) {
    url = url.replace(method[0], "");
    method = method[0].trim();
  } else {
    method = "GET";
  }
  switch (method.toLowerCase()) {
    case "delete":
      return axios.delete(url, {
        params: data
      });
    case "post":

      return axios.post(url, data);
    case "put":
      return axios.put(url, data);
    case "patch":
      return axios.patch(url, data);
    default:
      return axios.get(url, {
        params: data
      });
  };
}






// export let req = {
//     // imgUrl: 'http://sign.xn--fjq0sg8h2zkivvwsonptcv2b.com',
//     imgUrl: setting.apiBaseURL,
//     // 'http://47.98.169.218:8085', // 测试环境
//     // 生产环境
//     domain: setting.imageBaseURL,
//     get: function (url, params, callback) {
//       var me = this
//       url = me.domain + url
//       axios({
//         url: url,
//         method: 'get',
//         params: params,
//       }).then(function (response) {
//         if (response.status === 401 || response.status === 403) {
//         // 处理401，403
//         //   window.Global.removeLocalStorage('token');
//         //   router.push({name:"Login"})
//         } else {
//           if (typeof (callback) === 'function') {
//             callback(response)
//           }
//         }
//       }).catch(function (error) {

//       })
//     },
//     post: function (url, params, callback) {
//       var me = this;
//       url = me.domain + url;
//       axios({
//         url: url,
//         method: 'post',
//         data: params,
//         transformRequest: [function (data) {
//           let ret = ''
//           for (let it in data) {
//             ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
//           }
//           return ret
//         }]
//       }).then(function (response) {
//         if (response.status == 401 || response.status == 403) {
//         //   window.Global.removeLocalStorage('token');
//         //   router.push({name:"Login"})
//         } else {
//           if (typeof (callback) === 'function') {
//             callback(response)
//           }
//         }
//       }).catch(function (error) {

//       })
//     },
//     upload: function (url, params, callback) {
//       var me = this
//       url = me.domain + url
//       axios({
//         url: url,
//         method: 'post',
//         data: params,
//         'Content-Type': 'multipart/form-data'
//       }).then(function (response) {
//         if (typeof (callback) === 'function') {
//           callback(response)
//         }
//       }).catch(function (error) {
//         var rs = error.response.data
//         if (rs.status === false) {
//           window.Global.removeLocalStorage('token')
//           // window.location.reload()
//         }
//       })
//     },

//     checkToken() {
//       if (window.Global.getLocalStorage('token')) {
//         let tokend = window.Global.getLocalStorage('token')
//         window.Global.post("wechat/user/checkToken", {
//           token: tokend
//         }, rs => {
//           console.log("checkToken", tokend, rs.data.success)
//           // 测试判断
//           if (rs.data.success == false) {

//             // window.Global.removeLocalStorage('token')
//             // router.push({name:"Login"})
//           } else {
//             // router.push({name:"sign"})
//           }
//         })
//       } else {
//         // window.Global.removeLocalStorage('token')
//         // router.push({name:"Login"})
//       }
//     },
//     setLocalStorage: function (name, token) {
//       window.localStorage.setItem(name, token)
//     },
//     getLocalStorage: function (name) {
//       return window.localStorage.getItem(name)
//     },
//     removeLocalStorage: function (name) {
//       window.localStorage.removeItem(name)
//     }
//   }
