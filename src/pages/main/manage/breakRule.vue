<template>
  <div class="container">
    <div class="card">
      <group>
        <CommonDate :checkDate.sync="form.checkDate"></CommonDate>
      </group>
      <group>
        <CommonPicker :form.sync="form" :type="true"></CommonPicker>
      </group>
      <!--<group>-->
        <!--<CommonBreakRule :student.sync="form.student"></CommonBreakRule>-->
      <!--</group>-->
     <p class="title">
      违章内容
     </p>
      <group >
        <x-textarea class="remark-text"
                    :max="200"
                    :rows="5"
                    :autosize="true"
                    v-model.trim="form.content"
                    placeholder="内容不超过200字" />
      </group>
    </div>
    <x-button class="submit" @click.native="handleSubmit">提交</x-button>
  </div>
</template>
<script>
import {addViolationUsingPOST} from '@/api/auto'
import CommonBreakRule from './component/CommonBreakRule'
export default {
  name: 'breakRule',
  mixins: [],
  components: {
    CommonBreakRule
  },
  data () {
    return {
      pickerForm: null,
      form: {
        'checkDate': '',
        'content': '',
        'roomId': [],
        'student': []
      }
    }
  },
  created () { },
  mounted () { },
  methods: {
    handleSubmit () {
      // 验证
      if (!this.form.checkDate || !this.form.content || !this.form.student.length) {
        this.$vux.alert.show({
          content: '请填写完表单'
        })
        return
      }

      const form = this.form
      form.studentSn = form.student.map(item => {
        return item.key
      }).join(',')
      addViolationUsingPOST(form).then(res => {
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
    }
  }
}
</script>
<style lang='less' scoped>
  .container {
    height: 100vh;
    overflow-y: scroll;
    background: #F2F3FA;
    padding: 0 15px;
    .card{
      margin-top: 16px;
      min-height:420px;
      background:rgba(255,255,255,1);
      border-radius:12px;
      .title{
        height:40px;
        line-height: 40px;
        font-size:17px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(0,0,0,1);
        margin-left: 15px;
      }
      .remark-text{

      }
    }
    .submit{
      height:44px;
      background:rgba(50,83,192,1);
      border-radius:5px;
      margin: 30px auto 10px;
      font-size:17px;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:rgba(255,255,255,1);
    }
  }

</style>
