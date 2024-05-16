<template>
     <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="pid" label="PID" width="180"> </el-table-column>
      <el-table-column prop="name" label="名称" width="180"> </el-table-column>
      <el-table-column prop="url" label="访问地址" min-width="240" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="image" label="图片地址" min-width="240" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
</template>

<script>
export default {
name:'adverTable'
}
</script>

<style>

</style>