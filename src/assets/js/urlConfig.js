//开发
var BASE_URL = '/Api';
var isPro = process.env.NODE_ENV === 'production'
if(isPro){
  BASE_URL= 'http://127.0.0.1/composerProject/logistics-management-api/public/home'
}
const UrlConfig = {
    //  公共模块
    getBannerList:BASE_URL + '/Xfuapi/getBannerList',  //首页banner

    getServiceList:BASE_URL + '/Xfuapi/getServiceList',  //首页服务

    getConvenientList:BASE_URL +'/Xfuapi/getConvenientList',  //首页便民

    getRepairList:BASE_URL + '/Xfuapi/getRepairList',  // 公开报修

    getInspectList:BASE_URL + '/Xfuapi/getInspectList', //公开监督

    getIntendredirect:BASE_URL + '/Xfuapi/getIntendredirect', //监督详情

    getRepairredirect:BASE_URL + '/Xfuapi/getRepairredirect', //报修详情

    uploadFile:BASE_URL +'/file/uploadFile',//上传图片

    //学生模块

    studentDoLogin:BASE_URL + '/user/doLogin', //学生登录

    StudentUpdateInfo:BASE_URL + '/user/updateInfo', //学生更新信息

    studentGetRepairList:BASE_URL + '/Service/getRepairList',//获取报修记录

    studentGetRepairDetails:BASE_URL + '/Service/getRepairDetails',//获取报修详情

    studentDoRater:BASE_URL + '/Service/doRater', //评价

    studentDoRepair:BASE_URL + '/Service/doRepair',//提交报修

    //管理员模块

    adminDoLogin:BASE_URL + '/admin/dologin',//登录

    adminUpdateInfo:BASE_URL + '/admin/updateInfo',//跟新信息

    adminUpdatePassword:BASE_URL + '/admin/updatePassword',//更改密码

    getAdminList:BASE_URL + '/admin/getAdminList',//管理员列表

    getAdminInfo:BASE_URL + '/admin/getAdminInfo',//管理员信息

    changeAdminStatus:BASE_URL + '/admin/changeAdminStatus',//更改管理员status

    updateOneAdminInfo:BASE_URL + '/admin/updateOneAdminInfo',//超级管理员更改某个管理员信息

    doAddAdmin:BASE_URL + '/admin/doAddAdmin',//添加管理员

    updateOneWorkerInfo:BASE_URL + '/worker/updateOneWorkerInfo',//超级管理员更改某个维修工信息

    doAddWorker:BASE_URL + '/worker/doAddWorker',//添加维修工

    dispatchedWorker:BASE_URL + '/service/dispatchedWorker',//派工

    // 管理员和维修工公共模块

    getWorkerList:BASE_URL + '/worker/getWorkerList',//获取维修工列表

    getWorkerInfo:BASE_URL + '/worker/getWorkerInfo',//获取维修工信息

    changeWorkerStatus:BASE_URL + '/worker/changeWorkerStatus',//管理员更改worker的status

    pubGetRepairList:BASE_URL + '/repair/getRepairList',//获取报修列表

    pubGetRepairDetails:BASE_URL + '/service/getRepairDetails',//获取报修详情

    //维修工模块

    workerDoLogin:BASE_URL + '/worker/doLogin',//登录

    workerUpdateInfo:BASE_URL + '/worker/updateInfo',//更新信息

    workerUpdatePassword:BASE_URL + '/worker/updatePassword',//更改密码

    finishWork:BASE_URL + '/service/finishWork',//完成维修

};

export default {
  UrlConfig
};
