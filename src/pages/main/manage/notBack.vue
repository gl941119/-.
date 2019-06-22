<template>
  <div class="container">
    <div class="main">
      <group>
        <CommonDate :checkDate.sync="form.violationDate"></CommonDate>
      </group>
      <group>
        <CommonBreakRule :studentSn.sync="form.sn" :bedNumber.sync="form.bedDetail" :name.sync="form.name" @handleClick="handleClick"></CommonBreakRule>
      </group>
      <group>
        <popup-picker title="违纪类型" :data="options" v-model="form.violationType" @on-change="onChange" :show-name="showName"
                      placeholder="请选择"></popup-picker>
      </group>
    </div>

    <x-button class="submit" @click.native="handleSubmit">提交</x-button>
  </div>
</template>

<script>
import {PopupPicker} from 'vux'
import CommonBreakRule from './component/CommonBreakRule'
import {addUsingPOST} from '@/api/auto'

export default {
  name: 'notBack',
  components: {
    PopupPicker,
    CommonBreakRule
  },
  data () {
    return {
      showName: true,
      Time: '',
      report: '',
      value1: [],
      options: [[
        {
          name: '晚归',
          value: '1'
        },
        {
          name: '未归',
          value: '2'
        }
      ]],
      form: {
        'bedDetail': '',
        'name': '',
        'sn': '',
        'violationDate': '',
        'violationType': []
      }
    }
  },
  methods: {
    onChange (val) {

    },
    handleClick (item) {

    },
    handleSubmit () {
      if (!this.form.sn || !this.form.name || !this.form.bedDetail || !this.form.violationDate || !this.form.violationType.length) {
        this.$vux.alert.show({
          content: '请填写完表单'
        })
        return
      }
      const form = Object.assign({}, this.form)
      // debugger
      form.violationType = form.violationType[0]
      addUsingPOST(form).then(res => {
        if (res.status) {
          const that = this
          this.$vux.alert.show({
            content: '提交成功',
            onHide () {
              that.$router.go(-1)
            }
          })
        }
      })
    },
    inputChange (val) {
      // console.log(val)
    }
  }
}
</script>

<style lang="less" scoped>
  .container {
    height: 100vh;
    overflow-y: scroll;
    background: #F2F3FA;
    padding: 0 15px;
    .main {
      margin-top: 16px;
      min-height: 133px;
      background: rgba(255, 255, 255, 1);
      border-radius: 12px;
    }

    .submit {
      height: 44px;
      background: rgba(50, 83, 192, 1);
      border-radius: 5px;
      margin: 30px auto 10px;
      font-size: 17px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
    }
  }
</style>
