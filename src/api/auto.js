/* eslint-disable */
import xhr from '@/tools/http'

// 住宿管理-新增配置
export const addAdjustDormitorySettingUsingPOST = (body) => xhr(`./api/accommodation/addAdjustDormitorySetting`, {method: 'post', body})
  
// 住宿管理-入住管理-调整
export const adjustDormitoryUsingPOST = (body) => xhr(`./api/accommodation/adjustDormitory`, {method: 'post', body})
  
// 住宿管理-入住管理-缴费调整(调整为未缴费)
export const adjustNotPayUsingPOST = (sn) => xhr(`./api/accommodation/adjustNotPay/${sn}`, {method: 'post'})
  
// 住宿管理-入住管理-缴费调整(调整为已缴费)
export const adjustPayUsingPOST = (sn) => xhr(`./api/accommodation/adjustPay/${sn}`, {method: 'post'})
  
// 住宿管理-查询入住/未入住人数
export const countStudentNumUsingPOST = (body) => xhr(`./api/accommodation/countStudentNum`, {method: 'post', body})
  
// 住宿管理-入住管理-批量导入
export const excelImportUsingPOST = (body) => xhr(`./api/accommodation/excelImport`, {method: 'post', body})
  
// 住宿管理-根据配置id查看配置详情
export const getSettingConfigInfoUsingGET = (id) => xhr(`./api/accommodation/getSettingConfigInfo/${id}`, {method: 'get'})
  
// 住宿管理-入住管理-批量导入缴费信息
export const importPayInfoUsingPOST = (body) => xhr(`./api/accommodation/importPayInfo`, {method: 'post', body})
  
// 住宿管理-调整记录
export const listAdjustRecordUsingGET = (sn) => xhr(`./api/accommodation/listAdjustRecord/${sn}`, {method: 'get'})
  
// 住宿管理-入住管理-查询
export const listCheckInInfoUsingPOST = (body) => xhr(`./api/accommodation/listCheckInInfo`, {method: 'post', body})
  
// 住宿管理-查询配置列表
export const listSettingConfigUsingPOST = (body) => xhr(`./api/accommodation/listSettingConfig`, {method: 'post', body})
  
// 住宿管理-根据配置id查看执行结果
export const listSettingConfigResultUsingPOST = (body) => xhr(`./api/accommodation/listSettingConfigResult`, {method: 'post', body})
  
// 添加或者编辑楼栋
export const addOrUpdateBuildingUsingPOST = (body) => xhr(`./api/apertment/addOrUpdateBuilding`, {method: 'post', body})
  
// 添加或者修改园区信息
export const addOrUpdateParkUsingPOST = (body) => xhr(`./api/apertment/addOrUpdatePark`, {method: 'post', body})
  
// 添加或编辑房间
export const addOrUpdateRoomUsingPOST = (body) => xhr(`./api/apertment/addOrUpdateRoom`, {method: 'post', body})
  
// 批量设置房间
export const batchSettingRoomUsingPOST = (body) => xhr(`./api/apertment/batchSettingRoom`, {method: 'post', body})
  
// 是否启用房间/床位
export const enableRoomUsingGET = (id,enable,type) => xhr(`./api/apertment/enableRoom/${id}/${enable}/${type}`, {method: 'get'})
  
// 根据条件查询导出相关信息
export const exportStudentRoomInfoUsingPOST = (body) => xhr(`./api/apertment/exportStudentRoomBedInfo`, {method: 'post', body})
  
// 楼层分布调整
export const floorRoomAdjustUsingPOST = (body) => xhr(`./api/apertment/floorRoomAdjust`, {method: 'post', body})
  
// 根据学号查询床位信息
export const exportStudentRoomInfoUsingGET = (sn) => xhr(`./api/apertment/getBedDetailBySn/${sn}`, {method: 'get'})
  
// 根据园区id分页查询楼栋信息
export const listBuildingUsingPOST = (body) => xhr(`./api/apertment/listBuildingByParkId`, {method: 'post', body})
  
// 分页查询园区信息
export const listParkUsingPOST = (body) => xhr(`./api/apertment/listPark`, {method: 'post', body})
  
// 根据楼栋id分页查询房间信息
export const listRoomByBuildingIdUsingPOST = (body) => xhr(`./api/apertment/listRoomByBuildingId`, {method: 'post', body})
  
// 根据楼栋id查询里面无人入住的寝室信息
export const listRoomByBuildingIdAndNoStudentUsingGET = (buildingId) => xhr(`./api/apertment/listRoomByBuildingIdAndNoStudent/${buildingId}`, {method: 'get'})
  
// 根据楼层和楼栋id查询楼层下分布的房间
export const listRoomByConditionUsingPOST = (floorId,buildingId) => xhr(`./api/apertment/listRoomByCondition/${floorId}/${buildingId}`, {method: 'post'})
  
// 根据寝室id查询学生信息
export const listStudentByRoomIdAndDateUsingGET = (bedroomId,date) => xhr(`./api/apertment/listStudentInfoByRoomId/${bedroomId}/${date}`, {method: 'get'})
  
// 根据条件查询床位入住相关信息
export const listStudentRoomInfoUsingPOST = (body) => xhr(`./api/apertment/listStudentRoomBedInfo`, {method: 'post', body})
  
// 删除楼栋
export const removeBuildingUsingDELETE = (id) => xhr(`./api/apertment/removeBuilding/${id}`, {method: 'delete'})
  
// 删除园区
export const removeParkUsingDELETE = (id) => xhr(`./api/apertment/removePark/${id}`, {method: 'delete'})
  
// 移除房间
export const removeRoomUsingDELETE = (roomId) => xhr(`./api/apertment/removeRoom/${roomId}`, {method: 'delete'})
  
// 根据楼栋id查询楼栋信息
export const selectBuildingByIdUsingGET = (buildingId) => xhr(`./api/apertment/selectBuildingById/${buildingId}`, {method: 'get'})
  
// 床位设置
export const setRoomBedUsingPOST = (body) => xhr(`./api/apertment/setRoomBed`, {method: 'post', body})
  
// 提交申请
export const addApplyUsingPOST = (body) => xhr(`./api/apply`, {method: 'post', body})
  
// 审批当前任务
export const commitTasksUsingPOST = (applyId) => xhr(`./api/apply/commit/${applyId}`, {method: 'post'})
  
// 获取我提交的申请
export const listByMeUsingPOST = (body) => xhr(`./api/apply/list/me`, {method: 'post', body})
  
// 获取和我相关的申请
export const listAboutMeUsingPOST = (body) => xhr(`./api/apply/listAboutMe`, {method: 'post', body})
  
// 导出和我相关的申请
export const listAboutMeExportUsingPOST = (body) => xhr(`./api/apply/listAboutMe/export`, {method: 'post', body})
  
// 获取我最近提交的申请
export const listLastByMeUsingGET = (params) => xhr(`./api/apply/me/findlast`, {method: 'get', params})
  
// 撤回任务
export const recallTasksUsingPOST = (applyId) => xhr(`./api/apply/recall/${applyId}`, {method: 'post'})
  
// 修改 备案/分配 状态
export const updateApplyUsingPUT = (applyId) => xhr(`./api/apply/${applyId}`, {method: 'put'})
  
// 生成备案编号
export const createFilingNumberUsingPUT = (applyId) => xhr(`./api/apply/${applyId}/filingNumber`, {method: 'put'})
  
// 获取审批详情
export const findApplyDetailUsingGET = (id) => xhr(`./api/apply/${id}/approve`, {method: 'get'})
  
// 录入星级寝室检查
export const addBedroomCheckUsingPOST = (body) => xhr(`./api/bedroomCheck/add`, {method: 'post', body})
  
// 导出寝室检查记录
export const exportBedroomCheckUsingPOST = (body) => xhr(`./api/bedroomCheck/export`, {method: 'post', body})
  
// 查询寝室检查记录
export const listBedroomCheckUsingPOST = (body) => xhr(`./api/bedroomCheck/list`, {method: 'post', body})
  
// 获取寝室检查详情
export const getBedroomCheckUsingGET = (bedroomId) => xhr(`./api/bedroomCheck/${bedroomId}`, {method: 'get'})
  
// 添加寝室评比
export const addRatingUsingPOST = (body) => xhr(`./api/bedroomRating/add`, {method: 'post', body})
  
// 统计评比名单
export const countRatingListUsingGET = (ratingId) => xhr(`./api/bedroomRating/countRatingList/${ratingId}`, {method: 'get'})
  
// 导出名单
export const exportListUsingGET = (ratingId) => xhr(`./api/bedroomRating/exportList/${ratingId}`, {method: 'get'})
  
// 导入名单
export const importListUsingPOST = (ratingId) => xhr(`./api/bedroomRating/importList/${ratingId}`, {method: 'post'})
  
// 分页查询寝室评比
export const listPageUsingPOST = (body) => xhr(`./api/bedroomRating/list`, {method: 'post', body})
  
// 编辑寝室评比名单
export const modifyRatingListUsingPUT = (params) => xhr(`./api/bedroomRating/list/modify`, {method: 'put', params})
  
// 编辑寝室评比名单等级
export const modifyRatingListLevelUsingPUT = (id,level) => xhr(`./api/bedroomRating/list/${id}/level/${level}`, {method: 'put'})
  
// 编辑寝室评比
export const modifyRatingUsingPUT = (params) => xhr(`./api/bedroomRating/modify`, {method: 'put', params})
  
// 分页查询寝室评比名单
export const findRatingListUsingPOST = (body) => xhr(`./api/bedroomRating/ratingList`, {method: 'post', body})
  
// 下载模板
export const getTempletUsingGET = (params) => xhr(`./api/bedroomRating/ratingList/templet`, {method: 'get', params})
  
// 修改选中状态
export const updateSelectUsingPUT = (id,select) => xhr(`./api/bedroomRating/ratingList/${id}/isSelect/${select}`, {method: 'put'})
  
// 修改名单锁定状态
export const updataRatingListStatusUsingPUT = (id,status) => xhr(`./api/bedroomRating/ratingList/${id}/status/${status}`, {method: 'put'})
  
// 获取寝室特征
export const getBedroomFeatureUsingGET = (id) => xhr(`./api/bedroomRating/ratinglist/${id}/feature`, {method: 'get'})
  
// 获取寝室荣誉
export const getBedroomHonorUsingGET = (id) => xhr(`./api/bedroomRating/ratinglist/${id}/honor`, {method: 'get'})
  
// 删除
export const modifyRatingUsingDELETE = (id) => xhr(`./api/bedroomRating/${id}`, {method: 'delete'})
  
// 公示
export const modefyRatingStatusUsingPUT = (id) => xhr(`./api/bedroomRating/${id}/status/publicity`, {method: 'put'})
  
// 一键锁定/解锁
export const updataAllRatingListStatusUsingPUT = (ratingId,status) => xhr(`./api/bedroomRating/${ratingId}/status/${status}`, {method: 'put'})
  
// 新增检查项目
export const addCheckProjectUsingPOST = (body) => xhr(`./api/checkProject/add`, {method: 'post', body})
  
// 获取检查工作总分
export const countCheckProjectScoreUsingGET = (params) => xhr(`./api/checkProject/countScore`, {method: 'get', params})
  
// 添加检查项目明细
export const addCheckProjectItemUsingPOST = (body) => xhr(`./api/checkProject/item/add`, {method: 'post', body})
  
// 获取检查明细
export const listItemByProjectIdUsingGET = (projectId) => xhr(`./api/checkProject/item/listByProjectId/${projectId}`, {method: 'get'})
  
// 删除检查项目明细
export const deleteCheckProjectItemUsingDELETE = (id) => xhr(`./api/checkProject/item/${id}`, {method: 'delete'})
  
// 获取所有检查项目
export const findCheckProjectUsingGET = (params) => xhr(`./api/checkProject/list`, {method: 'get', params})
  
// 修改检查项目
export const updateCheckProjectUsingPOST = (body) => xhr(`./api/checkProject/update`, {method: 'post', body})
  
// 删除检查项目
export const deleteCheckProjectUsingDELETE = (id) => xhr(`./api/checkProject/${id}`, {method: 'delete'})
  
// 添加检查工作
export const addCheckWorkUsingPOST = (body) => xhr(`./api/checkWork/add`, {method: 'post', body})
  
// 删除检查工作
export const modifyCheckWorkUsingDELETE = (id) => xhr(`./api/checkWork/delete/${id}`, {method: 'delete'})
  
// 检查工作列表
export const listCheckWorkUsingPOST = (body) => xhr(`./api/checkWork/list`, {method: 'post', body})
  
// 获取状态为进行中和已结束的星级寝室检查项
export const listWorkListUsingPOST = (body) => xhr(`./api/checkWork/listNotStartWorkList`, {method: 'post', body})
  
// 修改检查工作
export const modifyCheckWorkUsingPUT = (params) => xhr(`./api/checkWork/modify`, {method: 'put', params})
  
// 获取检查工作
export const getCheckWorkUsingGET = (id) => xhr(`./api/checkWork/${id}`, {method: 'get'})
  
// 根据登录用户查询可以管理的楼栋
export const collegeListBuildingUsingGET = (params) => xhr(`./api/common/collegeListBuilding`, {method: 'get', params})
  
// 导入错误临时文件下载
export const downloadUsingGET = (fileName) => xhr(`./api/common/download/${fileName}`, {method: 'get'})
  
// 初始化数据导入
export const importAccommodationInformationUsingPOST = (body) => xhr(`./api/common/importAccommodationInformation`, {method: 'post', body})
  
// 查询所有年级
export const listAllGradeUsingGET = (params) => xhr(`./api/common/listAllGrade`, {method: 'get', params})
  
// 根据房间id查询房间内床位
export const listBedByRoomIdUsingGET = (id) => xhr(`./api/common/listBedByRoomId/${id}`, {method: 'get'})
  
// 根据园区id和登陆用户查询管辖的楼栋
export const listBuildingByCampusIdAndSexUsingGET = (id,sex) => xhr(`./api/common/listBuildingByCampusIdAndSex/${id}/${sex}`, {method: 'get'})
  
// 根据园区id和登陆用户查询管辖的楼栋
export const listBuildingByCampusIdAndUserUsingGET = (id) => xhr(`./api/common/listBuildingByCampusIdAndUser/${id}`, {method: 'get'})
  
// 根据登陆用户查询指定校区下的园区
export const listCampusBySchoolAreaIdAndUserUsingGET = (id) => xhr(`./api/common/listCampusBySchoolAreaIdAndUser/${id}`, {method: 'get'})
  
// 根据房间id查询房间内可用的床位
export const listCanUseBedByRoomIdUsingGET = (id) => xhr(`./api/common/listCanUseBedByRoomId/${id}`, {method: 'get'})
  
// 查询指定组织机构下和指定年级下的班级信息
export const listClassByGradeAndMajorIdUsingGET = (grade,majorId) => xhr(`./api/common/listClassByGradeAndMajorId/${grade}/${majorId}`, {method: 'get'})
  
// 根据条件查询班级列表信息
export const listClassByQueryConditionUsingPOST = (body) => xhr(`./api/common/listClassByQueryCondition`, {method: 'post', body})
  
// 根据条件分页查询班级
export const listClassInfoByConditionUsingPOST = (body) => xhr(`./api/common/listClassInfoByCondition`, {method: 'post', body})
  
// 根据登陆用户查询学院列表
export const listCollegeByUserUsingGET = (params) => xhr(`./api/common/listCollegeByUser`, {method: 'get', params})
  
// 根据楼栋id和登陆用户查询管辖的楼层
export const listFloorByBuildingIdUsingGET = (id) => xhr(`./api/common/listFloorByBuildingId/${id}`, {method: 'get'})
  
// 根据专业id查询年级列表
export const listGradeByMajorIdUsingGET = (majorId) => xhr(`./api/common/listGradeByMajorId/${majorId}`, {method: 'get'})
  
// 根据学院查询学院下的专业列表
export const listMajorByCollegeIdUsingGET = (collegeId) => xhr(`./api/common/listMajorByCollegeId/${collegeId}`, {method: 'get'})
  
// 根据登陆用户查询专业列表
export const listMajorByCollegeIdUsingGET_1 = (params) => xhr(`./api/common/listMajorByUser`, {method: 'get', params})
  
// 根据楼栋id查询管辖的房间
export const listRoomByBuildingIdUsingGET = (id) => xhr(`./api/common/listRoomByBuildingId/${id}`, {method: 'get'})
  
// 根据楼栋id和登陆用户查询管辖的还有床位的房间
export const listRoomByBuildingIdAndUserUsingGET = (id) => xhr(`./api/common/listRoomByBuildingIdAndUser/${id}`, {method: 'get'})
  
// 根据房间编号查询房间列表
export const listRommByNameUsingGET = (roomNum) => xhr(`./api/common/listRoomByName/${roomNum}`, {method: 'get'})
  
// 查询所有校区
export const listSchoolAreaUsingGET = (params) => xhr(`./api/common/listSchoolArea`, {method: 'get', params})
  
// 用户根据登陆用户查询可以查看的校区
export const listSchoolAreaByUserUsingGET = (params) => xhr(`./api/common/listSchoolAreaByUser`, {method: 'get', params})
  
// 根据条件和登陆用户分页查询管辖的还有床位的房间信息
export const pageRoomByBuildingIdAndUserUsingPOST = (body) => xhr(`./api/common/pageRoomByBuildingIdAndUser`, {method: 'post', body})
  
// 根据条件和登陆用户分页查询学生列表
export const pageStudentByConditionUsingPOST = (body) => xhr(`./api/common/pageStudentByCondition`, {method: 'post', body})
  
// 获取学生床位
export const getStudentBedInfoUsingGET = (params) => xhr(`./api/common/studentBedInfo`, {method: 'get', params})
  
// 获取学生信息
export const getStudentInfoUsingGET = (params) => xhr(`./api/common/studentInfo`, {method: 'get', params})
  
// 获取用户信息
export const getUserInfoUsingGET = (params) => xhr(`./api/common/userInfo`, {method: 'get', params})
  
// 数据字典查询
export const dataDictUsingGET = (code) => xhr(`./api/datadict/dataDict/${code}`, {method: 'get'})
  
// 添加图样
export const addGraphicUsingPOST = (body) => xhr(`./api/graphic/add`, {method: 'post', body})
  
// 查询图样
export const searchGraphicUsingGET = (name) => xhr(`./api/graphic/search/${name}`, {method: 'get'})
  
// 修改图样
export const updateGraphicUsingPOST = (body) => xhr(`./api/graphic/update`, {method: 'post', body})
  
// 删除图样
export const deleteGraphicUsingDELETE = (id) => xhr(`./api/graphic/${id}`, {method: 'delete'})
  
// 新增卫生检查记录[新增]
export const addRecordUsingPOST = (body) => xhr(`./api/healthrecord/addRecord`, {method: 'post', body})
  
// 新增违章
export const addViolationUsingPOST = (body) => xhr(`./api/healthrecord/addViolation`, {method: 'post', body})
  
// 编辑回显[新增]
export const editDisplayUsingGET = (id) => xhr(`./api/healthrecord/editDisplay/${id}`, {method: 'get'})
  
// 获取卫生检查项目[新增]
export const getCheckItemUsingGET = (params) => xhr(`./api/healthrecord/getCheckItem`, {method: 'get', params})
  
// 根据房间id,检查日期,检查id查询卫生记录
export const updateViolationStatusUsingGET = (roomId,checkTime,checkWorkId) => xhr(`./api/healthrecord/getHealthRecordByCondition/${roomId}/${checkTime}/${checkWorkId}`, {method: 'get'})
  
// 查询添加列表的所填项及分数
export const listTitleAndScoreUsingPOST = (body) => xhr(`./api/healthrecord/getTitleAndScoreByDate`, {method: 'post', body})
  
// 根据分页条件查询卫生记录[修改]
export const listRoomHealthUsingPOST = (body) => xhr(`./api/healthrecord/listRoomHealth`, {method: 'post', body})
  
// 根据时间寝室人员查询
export const listStudentByRoomAndDateUsingGET = (roomId,date) => xhr(`./api/healthrecord/listStudentByRoomAndDate/${roomId}/${date}`, {method: 'get'})
  
// 寝室人员查询
export const listStudentInfoByRoomIdUsingGET = (roomId,recordId,date) => xhr(`./api/healthrecord/listStudentInfoByRoomId/${roomId}/${recordId}/${date}`, {method: 'get'})
  
// 查询添加列表的所填项及分数
export const listTitleAndScoreUsingGET = (healthCheckId) => xhr(`./api/healthrecord/listTitleAndScore/${healthCheckId}`, {method: 'get'})
  
// 根据条件分页查询违章记录
export const listViolationUsingPOST = (body) => xhr(`./api/healthrecord/listViolation`, {method: 'post', body})
  
// 新增/编辑卫生记录
export const saveOrUpdateRecordUsingPOST = (body) => xhr(`./api/healthrecord/saveOrUpdateRecord`, {method: 'post', body})
  
// 修改违章状态
export const updateViolationStatusUsingPUT = (id,status) => xhr(`./api/healthrecord/updateViolationStatus/${id}/${status}`, {method: 'put'})
  
// 添加学生入离寝记录
export const addUsingPOST = (body) => xhr(`./api/inOutRecord/add`, {method: 'post', body})
  
// 将学生入离寝记录修改为无效
export const changeInvalidUsingPOST = (body) => xhr(`./api/inOutRecord/changeInvalid`, {method: 'post', body})
  
// 将学生入离寝记录修改为有效
export const changeValidUsingPOST = (body) => xhr(`./api/inOutRecord/changeValid`, {method: 'post', body})
  
// 根据记录id获取记录详情
export const getDetailUsingGET = (id) => xhr(`./api/inOutRecord/getDetail/${id}`, {method: 'get'})
  
// 根据学号或姓名搜索学生信息
export const getStudentUsingGET = (params) => xhr(`./api/inOutRecord/getStudent`, {method: 'get', params})
  
// 获取当前登录学生的回寝违纪记录
export const getStudentRecordsUsingGET = (params) => xhr(`./api/inOutRecord/getStudentRecords`, {method: 'get', params})
  
// 导入违规记录
export const importRecordUsingPOST = (body) => xhr(`./api/inOutRecord/importRecord`, {method: 'post', body})
  
// 入离寝记录列表查询
export const listUsingPOST = (body) => xhr(`./api/inOutRecord/list`, {method: 'post', body})
  
// 晚归&放假配置
export const settingUsingPOST = (body) => xhr(`./api/inOutRecord/setting`, {method: 'post', body})
  
// 学生登陆
export const loginByStudentUsingPOST = (body) => xhr(`./api/login`, {method: 'post', body})
  
// 辅导员登陆
export const loginByInstructorUsingPOST = (body) => xhr(`./api/login/instructor`, {method: 'post', body})
  
// 添加新的用户
export const getPasswordUsingGET = (userName,password,type) => xhr(`./api/login/setUser/${userName}/${password}/${type}`, {method: 'get'})
  
// 修改用户密码
export const updatePasswordUsingGET = (userName,password) => xhr(`./api/login/updatePassword/${userName}/${password}`, {method: 'get'})
  
// 根据楼层id查询房间列表
export const listBedRoomByFloorIdUsingGET = (buildingId,floorId) => xhr(`./api/modeling/listBedRoomByBuildingIdAndFloorId/${buildingId}/${floorId}`, {method: 'get'})
  
// 根据园区id查询楼栋列表
export const listBuildingByCampusAreaIdUsingGET = (id) => xhr(`./api/modeling/listBuildingByCampusAreaId/${id}`, {method: 'get'})
  
// 根据校区id查询园区列表
export const listCampusAreaBySchoolAreaIdUsingGET = (id) => xhr(`./api/modeling/listCampusAreaBySchoolAreaId/${id}`, {method: 'get'})
  
// 根据楼栋id查询楼层列表
export const listFloorByBuildingIdUsingGET_1 = (id) => xhr(`./api/modeling/listFloorByBuildingId/${id}`, {method: 'get'})
  
// 查询所有校区
export const listSchoolAreaUsingGET_1 = (params) => xhr(`./api/modeling/listSchoolArea`, {method: 'get', params})
  
// 根据房间号查询学生信息
export const listStudentByBedroomIdUsingGET = (id) => xhr(`./api/modeling/listStudentByBedroomId/${id}`, {method: 'get'})
  
// 根据房间号查询学生(姓氏)信息
export const listStudentRoomByRoomIdUsingGET = (id) => xhr(`./api/modeling/listStudentRoomByRoomId/${id}`, {method: 'get'})
  
// 根据校区id查询该校区的入住情况
export const selectIntakeToAreaByAreaIdUsingGET = (id) => xhr(`./api/modeling/selectIntakeToAreaByAreaId/${id}`, {method: 'get'})
  
// 根据条件查询该楼栋的入住情况
export const selectIntakeToBuildByConditionUsingPOST = (body) => xhr(`./api/modeling/selectIntakeToBuildByCondition`, {method: 'post', body})
  
// 模拟登陆接口
export const loginUsingPOST = (body) => xhr(`./api/open`, {method: 'post', body})
  
// 根据学号获取学生当前住宿信息
export const listSettingConfigResultUsingGET = (sn) => xhr(`./api/open/getCurrentCheckInfoBySn/${sn}`, {method: 'get'})
  
// 根据学号查询校区
export const getSchoolAreaBySnUsingGET = (sn) => xhr(`./api/open/getSchoolAreaBySn/${sn}`, {method: 'get'})
  
// 学校导入初始校区，床位，住宿等数据
export const initDataUsingPOST = (body) => xhr(`./api/open/initData`, {method: 'post', body})
  
// 同步学生数据
export const syncStudentUsingGET = (params) => xhr(`./api/open/syncStudent`, {method: 'get', params})
  
// 将学生表中数据设置密码后同步到User表
export const syncStudentToUserUsingGET = (params) => xhr(`./api/open/syncStudentToUser`, {method: 'get', params})
  
// 获取所有的楼栋
export const getAllBuildingsUsingGET = (params) => xhr(`./api/overview/getAllBuildings`, {method: 'get', params})
  
// 根据楼层id获取寝室(data)以及统计信息(otherData:count)
export const getBedroomByFloorUsingGET = (floorId) => xhr(`./api/overview/getBedroomByFloor/${floorId}`, {method: 'get'})
  
// 根据寝室id获取寝室学生详细信息
export const getBedroomDetailByIdUsingGET = (bedroomId) => xhr(`./api/overview/getBedroomDetailById/${bedroomId}`, {method: 'get'})
  
// 根据楼栋id获取楼层(data)以及统计信息(otherData:count)
export const getFloorByBuildingUsingGET = (buildingId) => xhr(`./api/overview/getFloorByBuilding/${buildingId}`, {method: 'get'})
  
// 修改规则
export const modifyUsingPOST = (body) => xhr(`./api/rating/modify`, {method: 'post', body})
  
// 查询规则列表
export const listByTypeUsingPOST = (ratingType) => xhr(`./api/rating/type/${ratingType}`, {method: 'post'})
  
// 学院分管-为学院新增楼栋
export const addBuildingToCollegeUsingPOST = (body) => xhr(`./api/systemManagement/addBuildingToCollege`, {method: 'post', body})
  
// 学院分管-调整学院分管的寝室--添加
export const addCollegeRoomUsingPOST = (body) => xhr(`./api/systemManagement/addCollegeRoom`, {method: 'post', body})
  
// 校区分管-修改分管校区配置
export const addORUpdateSchoolAreaToSnUsingPOST = (body) => xhr(`./api/systemManagement/addOrUpdateSchoolAreaToSn`, {method: 'post', body})
  
// 学院分管-删除指定的楼栋配置
export const deleteReByIdUsingDELETE = (id) => xhr(`./api/systemManagement/deleteCollegeBuildingById/${id}`, {method: 'delete'})
  
// 配置流程详情
export const addFlowSettingUsingPOST = (id) => xhr(`./api/systemManagement/flow/${id}/setting`, {method: 'post'})
  
// 获取系统流程
export const listFlowsUsingGET = (params) => xhr(`./api/systemManagement/flows`, {method: 'get', params})
  
// 学院分管-根据学院id查询管辖楼栋
export const listBuildingByCollegeIdUsingGET = (collegeId) => xhr(`./api/systemManagement/listBuildingByCollegeId/${collegeId}`, {method: 'get'})
  
// 学院分管-根据学院id和楼层id查询房间列表
export const listRoomByCollegeAndFloorUsingGET = (floorId,collegeId) => xhr(`./api/systemManagement/listRoomByCollegeAndFloor/${floorId}/${collegeId}`, {method: 'get'})
  
// 校区分管-根据用户sn查询管理的校区
export const listSchoolAreaBySnUsingGET = (sn) => xhr(`./api/systemManagement/listSchoolAreaBySn/${sn}`, {method: 'get'})
  
// 校区分管-查询所有学校用户的信息
export const listSchoolUserUsingGET = (params) => xhr(`./api/systemManagement/listSchoolUser`, {method: 'get', params})
  
// 学院分管-调整学院分管的寝室--移除
export const removeCollegeRoomUsingPOST = (body) => xhr(`./api/systemManagement/removeCollegeRoom`, {method: 'post', body})
  