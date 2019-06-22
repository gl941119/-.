<template>
    <div class="container">
      <ul class="main">
      <li>
        <p>长征学院11栋</p>
        <p>全部楼层</p>
      </li>
        <li>
          <p>长征学院11栋</p>
          <p>全部楼层全部楼层全部楼层全部楼层全部楼层全部楼层全部楼层全部楼层全部楼层全部楼层全部楼层全部楼层全部楼层全部楼层全部楼层</p>
        </li>
      </ul>
    </div>
</template>

<script>
import {collegeListBuildingUsingGET} from '@/api/auto'
export default {
  name: 'mangeArea',
  created () {
    this.init()
  },
  methods: {
    init () {
      collegeListBuildingUsingGET().then(res => {

      })
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
    .main{
      background:rgba(255,255,255,1);
      box-shadow:0px 2px 6px 0px rgba(26,26,55,0.06);
      border-radius:8px;
      margin-top: 15px;
      padding: 0 15px;
      li{
        min-height: 65px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        border-bottom: 1px solid #E3E3E3;
        p:first-child{
          font-size:16px;
          font-family:PingFang-SC-Medium;
          font-weight:500;
          color:rgba(51,51,51,1);
        }
        p:last-child{
          font-size:14px;
          font-family:PingFang-SC-Medium;
          font-weight:500;
          color:rgba(153,153,153,1);
        }
      }
    }
  }

</style>
