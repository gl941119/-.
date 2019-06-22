<template>
    <div>
      <!--vux。。。垃圾-->
      <popup-picker title="楼栋" placeholder="请选择楼栋"  :data="buildingList" v-model="building" @on-change="buildingChange" :show-name="showName"></popup-picker>
      <popup-picker  placeholder="请选择楼层"  title="楼层" :data="floorList"  v-model="floor" @on-change="floorChange" :disabled="!building.length" @click.native="floorShow" :show-name="showName"></popup-picker>
      <popup-picker  placeholder="请选择寝室"  title="寝室号" :data="roomList"  v-model="room"  @on-change="roomChange" :disabled="!floor.length" @click.native="roomShow" :show-name="showName"></popup-picker>
      <!--<popup-picker v-if="type"  placeholder="请选择" @on-hide="handleHide"  title="违纪人员" :display-format="format" :data="roleList" v-model="role" @click.native="roleShow" :disabled="!room.length" :show-name="showName"></popup-picker>-->
      <cell title="违纪人员" v-if="type" :value="value" is-link @click.native="roleShow"></cell>
      <div v-transfer-dom>
        <x-dialog v-model="show" class="dialog-demo" :hide-on-blur="hideOnBlur">
          <div class="img-box">
            <checker v-model="form.student" class="check-ul" type="checkbox"  default-item-class="demo1-item" selected-item-class="demo1-item-selected">
              <checker-item class="check-li" :value="item" v-for="(item, index) in roleList" :key="index">{{item.value}}</checker-item>
            </checker>
          </div>
          <div @click="show=false">
            <span class="vux-close"></span>
          </div>
        </x-dialog>
      </div>
    </div>
</template>

<script>
import moment from 'moment'
import {PopupPicker, Picker, XDialog, TransferDomDirective as TransferDom, Checker, CheckerItem} from 'vux'
import {collegeListBuildingUsingGET, listFloorByBuildingIdUsingGET, listRoomByCollegeAndFloorUsingGET, listStudentByRoomAndDateUsingGET} from '@/api/auto'
export default {
  name: 'CommonPicker',
  components: {
    PopupPicker,
    Picker,
    XDialog,
    Checker,
    CheckerItem
  },
  directives: {
    TransferDom
  },
  props: {
    form: {
      default: () => ({
        'checkDate': '',
        'content': '',
        'roomId': [],
        'student': []
      }),
      type: Object
    },
    type: { // 是否显示违纪人员
      default: false,
      type: Boolean
    }
  },
  computed: {
    value () { // 选择学生改变form
      if (!this.form.student) return ''
      const result = this.form.student.map(item => {
        return item.value
      }).join('-')
      return result
    }
  },
  data () {
    return {
      hideOnBlur: false,
      show: false,
      showName: true,
      buildingList: [],
      floorList: [],
      roomList: [],
      roleList: [],
      building: [],
      floor: [],
      room: [],
      role: []
    }
  },
  created () {
    this.getBuilding()
  },
  methods: {
    handleClick () {
      this.show = true
    },
    // 获取楼栋
    getBuilding () {
      collegeListBuildingUsingGET({}).then(res => {
        if (res.status) {
          const arr = res.data.map(item => {
            return {
              name: item.number + '栋',
              value: item.id + '' // vux必须要字符串
            }
          })
          this.floor = []
          this.room = []
          this.buildingList = [arr]
        }
      })
    },
    // 获取楼层
    buildingChange (value) {
      this.getFloor(value[0])
    },
    getFloor (id = 1) {
      listFloorByBuildingIdUsingGET(id).then(res => {
        if (res.status) {
          const arr = res.data.map(item => {
            return {
              name: item.name + '',
              value: item.id + ''
            }
          })
          this.floorList = [arr]
        }
      })
    },
    // 获取寝室
    floorChange (value) {
      this.getRoom(value[0])
    },
    getRoom (id) {
      listRoomByCollegeAndFloorUsingGET(id, -1).then(res => {
        if (res.status) {
          const arr = res.data.map(item => {
            return {
              name: item.name + '',
              value: item.id + ''
            }
          })
          this.roomList = [arr]
        }
      })
    },
    // 获取人员
    roomChange (value) {
      this.form.roomId = value[0]
      this.$emit('update:form', this.form)
    },
    getRole () {
      listStudentByRoomAndDateUsingGET(this.form.roomId, moment(this.form.checkDate)._d).then(res => {
        if (res.status) {
          const arr = res.data.map(item => {
            return {
              value: item.name + '',
              key: item.sn + ''
            }
          })
          this.roleList = arr
        }
      })
    },
    // 状态判断
    floorShow () {
      if (!this.building.length) {
        this.$vux.alert.show({
          content: '请选择楼栋'
        })
      }
    },
    roomShow () {
      if (!this.floor.length) {
        this.$vux.alert.show({
          content: '请选择楼层'
        })
      }
    },
    roleShow () {
      if (!this.room.length || !this.form.checkDate) {
        this.$vux.alert.show({
          content: '请选择寝室和检查时间'
        })
        return
      }
      this.show = true
      this.getRole()
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~vux/src/styles/close';
  .img-box{
    overflow: hidden;

    .check-ul{
      width: 100%;
      height: 100%;
      overflow: hidden;
      display: flex;
      justify-content: space-between;
      .check-li{
        flex: 1;
        margin: 10px 5px;
      }
    }
  }
  .demo1-item {
    border: 1px solid #ececec;
    padding: 5px 5px;
  }
  .demo1-item-selected {
    border: 1px solid green;
  }

</style>
