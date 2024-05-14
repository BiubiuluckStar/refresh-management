<template>
  <div class="order">
    <div class="list">
      <!-- 2. 列表展示 -->
      <div class="header">
        <el-row :gutter="20">
          <el-col :span="14">
            <el-form
              :inline="true"
              :model="formInline"
              class="demo-form-inline"
              size="mini"
            >
              <el-form-item label="订单编号" label-width="100px">
                <el-input
                  v-model="formInline.user"
                  placeholder="输入品牌名称"
                ></el-input>
              </el-form-item>
              <el-form-item label="预定时间" label-width="100px">
                <el-col :span="11">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="formInline.date1"
                    style="width: 100%"
                  ></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">至</el-col>
                <el-col :span="11">
                  <el-time-picker
                    placeholder="选择时间"
                    v-model="formInline.date2"
                    style="width: 100%"
                  ></el-time-picker>
                </el-col>
              </el-form-item>
              <el-form-item label="下单人" label-width="100px">
                <el-input
                  v-model="formInline.user"
                  placeholder="输入"
                ></el-input>
              </el-form-item>
              <el-form-item label="所属单位" label-width="100px">
                <el-input
                  v-model="formInline.user"
                  placeholder="输入"
                ></el-input>
              </el-form-item>
              <el-form-item label="汇总状态" label-width="100px">
                <el-select v-model="formInline.region" placeholder="全部">
                  <el-option label="全部" value="shanghai"></el-option>
                  <el-option label="未汇总" value="shanghai"></el-option>
                  <el-option label="已汇总" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="10">
            <el-button type="primary">查询</el-button>
          </el-col>
        </el-row>
      </div>
      <!-- 3. 订单列表按钮 -->
      <div class="header-btn">
        <el-button
          class="order-btn"
          type="warning"
          size="small"
          @click="orderCollection"
          >订单汇总</el-button
        >
        <!-- <download-excel  -->
        <!-- style="display:inline-block;margin-left:10px;"> -->
        <el-button class="order-btn" type="warning" size="small"
          >导出</el-button
        >
        <!-- </download-excel> -->
      </div>
      <!-- 表格区域 -->
      <div class="content">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          :header-cell-style="{
            background: '#fafafa',
            color: '#333',
            textAlgin: 'center',
          }"
          :cell-style="{ textAlgin: 'center' }"
          @select="select"
        >
          <el-table-column type="selection" width="55" :selectable="selectable">
          </el-table-column>
          <el-table-column prop="code" label="订单编号" width="180">
          </el-table-column>
          <el-table-column prop="ordername" label="下单人" width="180">
          </el-table-column>
          <el-table-column prop="company" label="所属单位"> </el-table-column>
          <el-table-column prop="phone" label="联系电话"> </el-table-column>
          <el-table-column prop="yudingTime" label="预定时间">
            <template slot-scope="scope">
              {{ dayjs(scope.row.yudingTime).format("YYYY-MM-DD HH:mm:ss") }}
            </template>
          </el-table-column>
          <el-table-column prop="price" label="订单总价"> </el-table-column>
          <!-- 利用template得到当前行的数据 -->
          <el-table-column prop="huizongStatus" label="汇总状态">
            <template slot-scope="scope">
              {{ scope.row.huizongStatus == 1 ? "未汇总" : "已汇总" }}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <pagination></pagination>
    </div>
  </div>
</template>

<script>
import pagination from "@/components/pagination";
import dayjs from "dayjs";
export default {
  name: "OrderList",
  components: { pagination },
  data() {
    return {
      formInline: {
        ProductName: "",
        date: "",
      },
      tableData: [],
      ids: [], //存储汇总的id
    };
  },
  mounted() {
    this.orderListData();
    this.$bus.$on("receiveCurrentPage", this.getPagination);
  },
  computed: {
    orderList() {
      return this.$store.state.order.orderList.data;
    },
  },
  methods: {
    dayjs,
    // 通过汇总状态控制多选框的禁用
    selectable(row, index) {
      if (row.huizongStatus == 2) {
        return false;
      }
      return true;
    },
    // 获取订单列表数据
    async orderListData(page) {
      console.log(page);
      try {
        await this.$store.dispatch("order/getOrderList", { page });
        this.tableData = this.orderList;
      } catch (error) {
        console.warn(error);
      }
    },
    // 获取分页器--当前页码
    getPagination(val) {
      this.orderListData(val);
    },
    // 选中勾选内容
    select(selection, row) {
      let arr = [];
      selection.forEach((item) => {
        arr.push(item.id);
      });
      this.ids = arr;
    },
    // 订单汇总 1.获取选择的数据订单 2.提交汇总发请求 3.改变汇总状态为2
    async orderCollection() {
      if (this.ids.length >= 2) {
        try {
          this.$confirm("确定汇总吗", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(()=>{
            this.$message({
            type: "success",
            message: "汇总成功!",
          })
          }).catch(()=>{
            this.$message({
            type: "info",
            message: "已取消汇总",
          });
          })
          await this.$store.dispatch("order/getOrderMaraize", {
            ids: this.ids.join(","),
          });
          this.orderList.huizongStatus == 2;
          this.orderListData();
         
        } catch (error) {
          this.$message({
            type: "info",
            message: "汇总失败",
          });
          console.warn(error);
        }
      } else {
        this.$alert("被汇总数必须多于两条", "汇总", {
          confirmButtonText: "确定",
          callback: (action) => {
            this.$message({
              type: "info",
              message: `action: ${action}`,
            });
          },
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
-- > .header-btn {
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1px solid #eee;
  padding: 10px;

  .el-button {
    background: orange;
    border: none;
    width: 100px;
    font-weight: bold;
  }
}
</style>