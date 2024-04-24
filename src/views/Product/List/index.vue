<template>
  <div>
    <div>
      <!-- 面包导航屑 -->
      <!-- 产品搜索 -->
      <div class="header">
        <div class="form">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="审批人">
              <el-input size="small"
                v-model="formInline.ProductName"
                placeholder="审批人"
              ></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
              <el-date-picker size="small" v-model="formInline.date" type="date" placeholder="选择日期">
          </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small"  @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="group">
          <el-button class="buttonOne" type= "warning" icon="el-icon-plus">警告按钮</el-button>
          <el-button class="buttonTwo" type="danger" icon="el-icon-delete" >危险按钮</el-button>
        </div>
      </div>
      <!-- 产品列表 -->
      <div class="content">
        <el-table :data="tableData" border style="width: 100%" >
          <el-table-column
      type="selection"
      width="55">
    </el-table-column>
      <el-table-column  prop="date"  label="日期"  width="180">
      </el-table-column>
      <el-table-column  prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="address" label="地址">
      </el-table-column>
      <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="primary" class="el-icon-edit"
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button  icon="el-icon-delete"
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
          </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "List",
  data() {
    return {
      formInline: {
        ProductName: "",
        date: "",
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
  },
};
</script>

<style lang="less",scoped>
.header {
  background-color: #fff;
  margin-bottom: 20px;
  padding: 10px;
  .group {
    border: 1px solid #eee;
    padding: 8px;
    el-button .buttonOne {
      background-color: #efa337;
    }
    el-button .buttonOne {
      background-color: #ff7a6a;
    }
  }
  .el-form-item {
    margin-bottom: 10p;
  }
}
.content {
}
</style>