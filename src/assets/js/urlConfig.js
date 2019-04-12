//正式
var VSCHOOL_URL = 'http://wx10.hw.thinkjoy.cn',
    WXCENTER_URL = 'http://wx02.hw.thinkjoy.cn',
    PROXY_URL = 'http://wx03.hw.thinkjoy.cn';
//开发
// var VSCHOOL_URL = '/vs',
//     WXCENTER_URL = '/wx',
//     PROXY_URL = '/proxy';

const UrlConfig = {
  //================================================================================sx
  joinUs: VSCHOOL_URL +"/userApply/joinUs", //教师获取作业列表

  getUser: VSCHOOL_URL +"/apply/getUser?token=", //获取用户

  getUserInfoAndStuInfo: VSCHOOL_URL +"/userInfo/getUserInfoAndStuInfo", //获取用户和孩子

  getSignature: WXCENTER_URL +"/agent/config", //获取微信参数

  uploadByServerId: WXCENTER_URL +"/agent/media", //提交serverId

  sendDiscoveryInfo: VSCHOOL_URL +"/discovery/sendDiscoveryInfo?token=", //发班圈

  sendClassAlbum: VSCHOOL_URL +"/album/upload?token=", //发班圈

  getProxyRole: PROXY_URL +"/auth/role/", //获取角色信息

  getProxyWx: PROXY_URL +"/auth/wx/", //获取wx登录信息

  getProxyAuth: PROXY_URL +"/auth/", //获取wx登录信息

  qtzhcsxx: PROXY_URL +"/school/", //取学校信息

  getAlbumListByClassId: VSCHOOL_URL +"/album/getAlbumListByClassId?token=", //获取班级相册列表

  delPhoto: VSCHOOL_URL +"/album/delPhoto?token=", //删除相册

  getNoticeList: VSCHOOL_URL +"/notice/getNoticeInfos?token=", //查询通知列表

  getStudentsByClassCode: VSCHOOL_URL +"/userInfo/getStudentsByClassCode?token=", //查询班级下的所有孩子

  sendNoticeInfo: VSCHOOL_URL +"/notice/sendNoticeInfo?token=", //发送通知

  getReaderList: VSCHOOL_URL +"/notice/getReaderList?token=", //已阅人列表

  getHomeworkList: VSCHOOL_URL +"/homework/getHomeworkList?token=", //作业列表

  getSubjectsByUid: VSCHOOL_URL +"/homework/getSubjectsByUid?token=", //获取科目

  sendWorkInfo: VSCHOOL_URL +"/homework/sendHomeworkInfo?token=", //发作业

  getHomeworkDetail: VSCHOOL_URL +"/homework/getHomeworkDetail?token=", //作业详情

  getNoticeDetailByCode: VSCHOOL_URL +"/notice/getNoticeDetailByCode?token=", //通知详情

  changeRoleType: VSCHOOL_URL +"/userInfo/changeRoleType?token=", //切换身份

  //================================================================================cll
  completeUserInfo: VSCHOOL_URL +"/userInfo/completeUserInfo?token=", //完善个人信息

  getParUserInfoAndStuInfo: VSCHOOL_URL +"/userInfo/getParUserInfoAndStuInfo?token=", //获取家长用户信息和孩子

  updateFamName: VSCHOOL_URL +"/userInfo/updateFamName?token=", //修改家长名称

  addStuInfo: VSCHOOL_URL +"/userInfo/addStuInfo?token=", //添加学生

  delStudentByChildCode: VSCHOOL_URL +"/userInfo/delStudentByChildCode?token=",//根据学生编号删除学生信息

  editStuInfo: VSCHOOL_URL +"/userInfo/editStuInfo?token=",//修改学生信息

  getTeaUserInfo: VSCHOOL_URL +"/userInfo/getTeaUserInfo?token=",//获取教师用户信息

  getTeachClass: VSCHOOL_URL +"/apply/getTeachClass?token=", //获取教师所带班级信息

  getClassListByGradeCode: VSCHOOL_URL +"/userInfo/getClassListByGradeCode?token=",//获取学校班级信息

  getGradeListBySchoolCode: VSCHOOL_URL +"/userInfo/getGradeListBySchoolCode?token=",//获取学校年级信息

  getDiscoveryListByClassId: VSCHOOL_URL +"/discovery/getDiscoveryListByClassId?token=", //根据班级ID获取班圈列表

  getNewCommentDetail:VSCHOOL_URL +"/discovery/getNewCommentDetail?token=",//

  praise:VSCHOOL_URL +"/discovery/praise?token=",//班圈点赞

  delDiscovery:VSCHOOL_URL +"/discovery/delDiscovery?token=",//删除班圈

  sendComment:VSCHOOL_URL +"/discovery/sendComment?token=",//发送班圈评论

  delComment:VSCHOOL_URL +"/discovery/delComment?token=",//删除评论

  getNewCommentInfo:VSCHOOL_URL +"/discovery/getNewCommentInfo?token=",//获取新回复提醒

  getNewCommentDetail:VSCHOOL_URL +"/discovery/getNewCommentDetail?token=",//获取新回复详情

  getBanners:VSCHOOL_URL +"/discovery/getBanners?token=",//获取轮播图

  getMyClassList:VSCHOOL_URL +"/userInfo/getMyClassList?token=",//获取我所有孩子的班级列表

  //微官网
  getBannerList:VSCHOOL_URL +"/wgw/getBannerList?token=",//获取banner列表

  getBannerByBannerCode:VSCHOOL_URL +"/wgw/getBannerByBannerCode?token=",//通过bannerCode获取banner详情

  getColumnList:VSCHOOL_URL +"/wgw/getColumnList?token=",//获取学校栏目

  getNewArticleList:VSCHOOL_URL +"/wgw/getNewArticleList?token=",//获取最新文章列表

  getArticleListByColumnCode:VSCHOOL_URL +"/wgw/getArticleListByColumnCode?token=",//根据栏目code查询文章列表

  getArticleByArticleCode:VSCHOOL_URL +"/wgw/getArticleByArticleCode?token=",//根据文章code或栏目code查询文章详情

  getPictureByColumnCode:VSCHOOL_URL +"/wgw/getPictureByColumnCode?token=",//根据栏目code查询相册详情

  //通讯录

  getParents:VSCHOOL_URL +"/addressBook/getParents?token=",//获取所有学生家长的通讯录

  getAllTeachers:VSCHOOL_URL +"/addressBook/getAllTeachers?token=",//获取本校的所有教师信息列表
};

export default {
  UrlConfig
};
