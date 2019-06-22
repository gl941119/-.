// 页面模块配置
export const pageModules = [{
  title: '寝室成员',
  path: '/merber',
  iconBase64: './../../static/img/ic_roommate@2x.png'
},
{
  title: '入住申请',
  path: '/applyCheckin/viewer?type=1',
  iconBase64: './../../static/img/ic_dorm_application@2x.png'
},
{
  title: '调宿申请',
  path: '/applyCheckin/viewer?type=3',
  iconBase64: './../../static/img/ic_Accommodation_transfer@2x.png'
},
{
  title: '校外住宿',
  path: '/applyCheckin/viewer?type=4',
  iconBase64: './../../static/img/ic_off_campus_housing@2x.png'
},
{
  title: '寝室检查',
  path: '/inspection',
  iconBase64: './../../static/img/ic_check_the_dorm@2x.png'
},
{
  title: '寝室评比',
  path: '/rate/list',
  iconBase64: './../../static/img/ic_compare_the_dorm@2x.png'
}
]
// 默认头像
export const defaultAvater =
  'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1788562038,3472846301&fm=27&gp=0.jpg'
// 文件上传配置
const fileServerPro = {
  upload: '/zuul/fastdfs-util/api/fastdfs/upload/common/sample',
  download: '/zuul/fastdfs-util/api/fastdfs/download/file',
  delete: '/zuul/fastdfs-util/api/fastdfs/delete/file'
}
const fileServerDev = {
  upload: '/api/fastdfs/upload/common/sample',
  download: '/api/fastdfs/download/file',
  delete: '/api/fastdfs/delete/file'
}
export const fileServer = process.env.NODE_ENV === 'production' ? fileServerPro : fileServerDev
