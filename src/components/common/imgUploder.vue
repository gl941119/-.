<template>
  <div class="container">
    <div class="upload-container">
      <input type="file"
             id='image'
             accept="image/*"
             class="hidden-input"
             @change="imgChange">
      <div class="upload-btn">+</div>
    </div>
  </div>
</template>
<script>
import { fileServer } from '@/config'
export default {
  name: 'imgUploder',
  props: {
  },
  data () {
    return {}
  },
  methods: {
    // 本地图片选择回调
    imgChange (el) {
      if (!el.target.files[0].size) return
      if (el.target.files[0].type !== 'image/jpeg' && el.target.files[0].type !== 'image/png') {
        this.$vux.alert.show({
          content: '请选择jpg/png类型的图片文件',
          onHide () {
          }
        })
      } else if (!this.fileCheck(el.target.files[0].size, 5)) {
        this.$vux.alert.show({
          content: '请选择5M以下的图片',
          onHide () {
          }
        })
      } else {
        this.fileAdd(el.target.files[0])
        this.fileUpload(el.target.files[0])
        el.target.value = ''
      }
    },
    // fastdfs文件上传
    fileUpload (file) {
      let that = this
      let xhr = new XMLHttpRequest()
      xhr.open('POST', fileServer.upload)
      let formData
      formData = new FormData()
      formData.append('file', file)
      xhr.onreadystatechange = (res) => {
        if (xhr.readyState === 4 && xhr.status === 200 && xhr.responseText !== '') {
          var result = JSON.parse(xhr.responseText)
          // 用于父组件表单上传
          if (result.success) {
            that.$emit('uploadorigin', { filePath: result.filePath })
          } else {
            that.$vux.alert.show({
              content: result.message,
              onHide () {
              }
            })
          }
        }
      }
      xhr.send(formData)
    },
    fileCheck (size, num) {
      if (size / 1024 / 1024 < num) {
        return true
      }
      return false
    },
    // 处理本地图片选择后回显到页面
    fileAdd (file) {
      let that = this
      if (file.type.indexOf('image') === -1) {
        console.log('图片格式有误')
      } else {
        let reader = new FileReader()
        let image = new Image()
        reader.readAsDataURL(file)
        reader.onload = function () {
          file.src = this.result
          image.onload = function () {
            let width = image.width
            let height = image.height
            file.width = width
            file.height = height
          }
          // 用于页面图片回显
          that.$emit('uploadCb', { tempSrc: file.src })
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.container {
  width: 65px;
  height: 65px;
  background-color: #fff;
  .upload-container {
    position: relative;
    .hidden-input {
      width: 65px;
      height: 65px;
      z-index: 100;
      position: absolute;
      opacity: 0;
    }
    .upload-btn {
      font-weight: lighter;
      font-size: 50px;
      text-align: center;
      color: #ccc;
      line-height: 56px;
      width: 65px;
      height: 65px;
      position: absolute;
      border: 1px solid #dedede;
      box-sizing: border-box;
      z-index: 99;
    }
  }
}
</style>
