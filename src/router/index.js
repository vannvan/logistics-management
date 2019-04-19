import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/serviceCenter'
    },
    {
      path: '/student',
      component: resolve => require(['@/components/common/student'], resolve),
      children:[
        {
          path: '/userCenter',
          component: resolve => require(['@/components/views/user/userCenter'], resolve),
          meta:{
              title:'个人中心'
          }
        },
        {
          path: '/communityCenter',
          component: resolve => require(['@/components/views/community/communityCenter'], resolve),
          meta:{
              title:'公开信息',auth:false
          }
        },
        {
          path: '/inspectDetail',
          component: resolve => require(['@/components/views/community/inspectDetail'], resolve),
          meta:{
              title:'监督详情',auth:false
          }
        },
        {
          path: '/repairDetail',
          component: resolve => require(['@/components/views/community/repairDetail'], resolve),
          meta:{
              title:'保修详情',auth:false
          }
        },
        {
          path: '/serviceCenter',
          component: resolve => require(['@/components/views/service/serviceCenter'], resolve),
          meta:{
              title:'服务中心',auth:false
          }
        },
        {
          path: '/studentMessage',
          component: resolve => require(['@/components/views/user/message'], resolve),
          meta:{
              title:'我的消息',auth:true
          }
        },
        {
          path: '/areaManage',
          component: resolve => require(['@/components/views/user/areaManage'], resolve),
          meta:{
              title:'地址管理',auth:true
          }
        },
        {
          path: '/repair',
          component: resolve => require(['@/components/views/repair/index'], resolve),
          meta:{
              title:'维修中心',auth:false
          }
        },
        {
          path: '/myRepair',
          component: resolve => require(['@/components/views/user/myRepair'], resolve),
          meta:{
              title:'报修纪录',auth:true
          }
        },
        {
          path: '/myRepairDetails',
          component: resolve => require(['@/components/views/user/repairDetails'], resolve),
          meta:{
              title:'我的报修纪录',auth:true
          }
        },
        {
          path: '/loginReg',
          component: resolve => require(['@/components/views/user/loginReg'], resolve),
          meta:{
              title:'登录',auth:false
          }
        },
        {
          path: '/detailInfo',
          component: resolve => require(['@/components/views/user/detailInfo'], resolve),
          meta:{
              title:'个人信息',auth:true
          }
        }

      ]
    },
    {
      path: '/repairList',
      component: resolve => require(['@/components/common/repairList'], resolve),
      meta:{
          title:''
      }
    },
    {
      path:'/admin',
      component: resolve => require(['@/components/common/admin'], resolve),
      children:[
        {
          path: '/adminLogin',
          component: resolve => require(['@/components/views/admin/login'], resolve),
          meta:{
              title:'管理员登录'
          }
        },
        {
          path: '/adminCenter',
          component: resolve => require(['@/components/views/admin/adminCenter'], resolve),
          meta:{
              title:'管理员中心'
          }
        },
        {
          path: '/adminDetails',
          component: resolve => require(['@/components/views/admin/adminDetails'], resolve),
          meta:{
              title:'个人信息'
          }
        },
        {
          path: '/adminRepairCenter',
          component: resolve => require(['@/components/views/admin/repairCenter'], resolve),
          meta:{
              title:'维修中心'
          }
        },
        {
          path: '/adminRepairDetails',
          component: resolve => require(['@/components/views/admin/repairDetails'], resolve),
          meta:{
              title:'维修详情'
          }
        },
        {
          path: '/adminManage',
          component: resolve => require(['@/components/views/admin/adminManage'], resolve),
          meta:{
              title:'管理员管理'
          }
        },
        {
          path: '/workerManage',
          component: resolve => require(['@/components/views/admin/workerManage'], resolve),
          meta:{
              title:'维修工管理'
          }
        },
        {
          path: '/addAdmin',
          component: resolve => require(['@/components/views/admin/addAdmin'], resolve),
          meta:{
              title:'添加管理员'
          }
        },
        {
          path: '/addWorker',
          component: resolve => require(['@/components/views/admin/addWorker'], resolve),
          meta:{
              title:'添加维修工'
          }
        },
        {
          path: '/adminExamine',
          component: resolve => require(['@/components/views/admin/adminExamine'], resolve),
          meta:{
              title:'我的审核'
          }
        },

      ]
    },
    {
      path:'/worker',
      component: resolve => require(['@/components/common/worker'], resolve),
      children:[
        {
          path: '/workerLogin',
          component: resolve => require(['@/components/views/worker/login'], resolve),
          meta:{
              title:'维修工登录'
          }
        },
        {
          path: '/workerCenter',
          component: resolve => require(['@/components/views/worker/workerCenter'], resolve),
          meta:{
              title:'维修工中心'
          }
        },
        {
          path: '/workerRepairCenter',
          component: resolve => require(['@/components/views/worker/RepairCenter'], resolve),
          meta:{
              title:'我的工单'
          }
        },
        {
          path: '/workerRepairRecords',
          component: resolve => require(['@/components/views/worker/repairRecords'], resolve),
          meta:{
              title:'维修记录'
          }
        },
        {
          path: '/workerRepairDetails',
          component: resolve => require(['@/components/views/worker/repairDetails'], resolve),
          meta:{
              title:'工单详情'
          }
        },
        {
          path: '/workerDetails',
          component: resolve => require(['@/components/views/worker/workerDetails'], resolve),
          meta:{
              title:'个人信息'
          }
        },
        {
          path: '/myWorkmate',
          component: resolve => require(['@/components/views/worker/myWorkmate'], resolve),
          meta:{
              title:'工友通讯录'
          }
        },




      ]
    }



  ]
})
