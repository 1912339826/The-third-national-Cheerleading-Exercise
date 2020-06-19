import Vue from 'vue'
import Router from 'vue-router'
// 排行榜
import ranking from '../pages/ranking/index'
// 参赛列表
import EntryList from '../pages/EntryList/index'
// 首页
import home from '../pages/home/index'
// 数据信息
import DataInformation from '../pages/DataInformation/index'
// 活动页面
import ActivePage from '../pages/ActivePage/index'
// 查询成绩页面
import WeekOfCity from '../pages/WeekOfCity/index'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: home,
      meta: {
        KeepAlive: false,
        title:""
      }
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: ranking,
      meta: {
        KeepAlive: false,
        title:"排名"
      }
    },
    {
      path: '/EntryList',
      name: 'EntryList',
      component: EntryList,
      meta: {
        KeepAlive: false,
        title:"参赛列表"
      }
    },
    {
      path: '/DataInformation',
      name: 'DataInformation',
      component: DataInformation,
      meta: {
        KeepAlive: false,
        title:"数据信息"
      }
    },
    {
      path: '/ActivePage',
      name: 'ActivePage',
      component: ActivePage,
      meta: {
        KeepAlive: false,
        title:"活动"
      }
    },
    {
      path: '/WeekOfCity',
      name: 'WeekOfCity',
      component: WeekOfCity,
      meta: {
        KeepAlive: false,
        title:"排名"
      }
    }
  ]
})
