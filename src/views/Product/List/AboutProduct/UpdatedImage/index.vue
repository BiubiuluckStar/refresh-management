<template>
  <div>
    <el-upload
      :action="reqUploadImage"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      multiple
      :file-list="fileList"
      ref="upload"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <!-- 预览图片 -->
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import {reqUploadImage,host} from '@/API'
export default {
  props:['fileList'],  //存储图片的数组 {name:'',url:''}
  data() {
    return {
      reqUploadImage,
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 上传成功
    handleSuccess(response,file,fileList){
      // 获得图片src的网址
     let url = response.url.slice(7)
     let imgUrl = host +'/'+url
     this.$bus.$emit('sendImgUrl',imgUrl)
    },
    // 清除
    clearImage(){
      this.$refs.upload.clearFiles()
    }
  },
};
</script>

<style>
</style>