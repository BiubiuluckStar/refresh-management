<template>
  <el-row :gutter="20">
    <el-col :span="4">
      <div class="nav">
        <div class="title1">产品类型列表</div>
        <div class="tree">
          <TreeProduct />
        </div>
      </div>
    </el-col>
    <el-col :span="20">
      <div class="wrapper">
        <div class="title2">商品添加</div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
        <!-- rules配合props使用,验证规则,调用方法 -->
        <el-form-item label="所属分类" prop="category">
          <span>{{ ruleForm.category }}</span>
          </el-form-item>
          <el-form-item label="商品名称" prop="title">
            <el-input v-model="ruleForm.title" size = "small"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="price">
            <el-input v-model="ruleForm.price"  size = "small"></el-input>
          </el-form-item>
          <el-form-item label="商品数量" prop="num">
            <el-input v-model="ruleForm.num"  size = "small"></el-input>
          </el-form-item>
          <el-form-item label="商品卖点" prop="sellPoint">
            <el-input v-model="ruleForm.sellPoint"  size = "small"></el-input>
          </el-form-item>
          <el-form-item label="上传图片" prop="image">
         <UpdatedImage />
          </el-form-item>
          <el-form-item label="商品描述" prop="descs">
            <WangEditor />
          </el-form-item>
          <el-form-item label="首页轮播推进" prop="isShow">
           <el-switch v-model="ruleForm.isShow" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </el-form-item>
          <el-form-item label="是否推荐商品"  prop="isShow">
           <el-switch v-model="ruleForm.isShow" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </el-form-item>
          <el-form-item label="是否上架商品" prop="isShow">
          <el-switch v-model="ruleForm.isShow" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >保存</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
            <el-button @click="resetForm('ruleForm')">取消</el-button>

          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import TreeProduct from "./TreeProduct";
import UpdatedImage from "./UpdatedImage";
import WangEditor   from './WangEditor'

export default {
  name: "AboutProuct",
  mounted(){
  this.$bus.$on('snedTreeData',this.getTreeData),
  this.$bus.$on('sendImgUrl',this.receiveImgUrl),
  this.$bus.$on('sendDescMsg',this.receiveDescMsg)
  },
  components: {
    TreeProduct,
    UpdatedImage,
    WangEditor
  },
  data() {
      return {
        ruleForm: {
         title:'',
         num:'',
         price:'',
         sellPoint:'',
         image:[],
         descs:'',
         category:'',
         cid:'',
         isShow:true
        },
        rules: { //表单验证规则
          title: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
          ],
          num:[
          { required: true, message: '请输入商品数量', trigger: 'blur' },
          ],
          price:[
          { required: true, message: '请输入商品价格', trigger: 'blur' },
          ],
          category:[
          { required: true, message: '请选择商品分类', trigger: 'blur' },
          ],
        }
      };
    },
    methods: {
      // 默认提交事件
      submitForm(formName) {
        // this.$refs.ruleForm 然后进行表单验证
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let { title,num, price,sellPoint,image,descs,category,cid} = this.ruleForm
            // 将image数组转字符串
          this.addProductData({title,num, price,sellPoint,image:JSON.stringify(image),descs,category,cid})
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      getTreeData(val){
       this.ruleForm.category = val.name;
       this.ruleForm.cid = val.cid
      },
      receiveImgUrl(val){
     this.ruleForm.image.push(val)
    //  console.log(this.ruleForm.image);
      },
      receiveDescMsg(val){
      this.ruleForm.descs =  val
      },
      // 添加商品
    async addProductData(params) {
              let res =  await this.$API.reqAddProduct(params)
              console.log(res);
    }
  }
};
</script>
<!-- rgb(213, 221, 224) -->
<style lang="less" scoped >
.nav {
  height: 600px;
  background-color: #fff;
  .title1 {
    background-color:#ddd9d9 ;
    color:black;
    font-weight:bold;
    padding: 20px;
    border-radius: 10px;
  }
  .tree {
    padding: 20px;
  }
}
.wrapper {
  // height: 800px;
  background-color: #f4f4f4;
  .title2 {
    background-color:#ddd9d9 ;
    color: #333;
    font-weight: bold;
    padding: 14px;
    margin-bottom: 20px;
  }
  .demo-ruleForm{
    padding:20px
  }
}
</style>