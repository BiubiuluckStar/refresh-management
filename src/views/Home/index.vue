<template>
  <div class="home">
    <!--1.  顶部区域布局---------- -->
    <div class="header">
      <div class="item">
        总销售额
        <div class="num">{{ homeInfo.saleTotal | num }}</div>
        <div class="bottom">今日销售额：{{ homeInfo.sale | num }}</div>
      </div>
      <div class="item">
        总访问量
        <div class="num">{{ homeInfo.viewsTotal | num }}</div>
        <div class="bottom">今日访问量：{{ homeInfo.views | num }}</div>
      </div>
      <div class="item">
        总收藏量
        <div class="num">{{ homeInfo.collectTotal | num }}</div>
        <div class="bottom">今日收藏量：{{ homeInfo.collect | num }}</div>
      </div>
      <div class="item">
        总支付量
        <div class="num">{{ homeInfo.payTotal | num }}</div>
        <div class="bottom">今日支付量：{{ homeInfo.pay | num }}</div>
      </div>
    </div>

    <!--2. 访问数据统计 ----------------->
    <div class="content">
      <div class="time-info" id="box13">
        <div class="title">月销售额</div>
        <div id="charts" style="width: 100%; height: 300px"></div>
      </div>
      <div class="area" id="box1">
        比例分配
        <div id="pie" style="width: 100%; height: 300px"></div>
      </div>
    </div>

    <!-- 3.  -->
    <!-- 最新内容 -->
    <div class="home-footer">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>今日订单</span>
        </div>
        <div class="text item">
          <el-row>
            <el-col :span="8">
              <div class="title">今日订单数</div>
              <div class="numST">{{ orderinfo.curOrderCount }}</div>
            </el-col>
            <el-col :span="8">
              <div class="title">汇总订单数</div>
              <div class="numST">{{ orderinfo.curCollect }}</div>
            </el-col>
            <el-col :span="8">
              <div class="title">今日金额</div>
              <div class="numST">{{ orderinfo.curMoney }}</div>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>本月订单</span>
        </div>
        <div class="text item">
          <el-row>
            <el-col :span="8">
              <div class="title">本月订单数</div>
              <div class="numST">{{ orderinfo.orderCount }}</div>
            </el-col>
            <el-col :span="8">
              <div class="title">汇总确认订单</div>
              <div class="numST">{{ orderinfo.collect }}</div>
            </el-col>
            <el-col :span="8">
              <div class="title money">累计金额</div>
              <div class="numST">{{ orderinfo.money }}</div>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>快捷入口</span>
        </div>
        <div class="text item">
          <el-button type="primary">产品管理</el-button>
          <el-button>消息管理</el-button>
          <el-button>内容管理</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import * as echarts from "echarts";
export default {
  name: "Home",
  mounted() {
    this.$store.dispatch("home/getHomeTotal");
    this.$store.dispatch("home/getorderinfo");
   this.$store.dispatch("home/getFormatInfo");
    this.getData()
  },
  computed: {
    ...mapState("home", ["homeInfo", "orderinfo", "formatInfo"]),
   ...mapGetters('home',['arrx','amount','money','saleMoney']),
  
  },
  // 过滤器去处理数据格式
  filters: {
    num(value) {
      if (!value) return;
      return value.toLocaleString();
    }
  },
  methods: {
    echarts() {
      var myChart = echarts.init(document.getElementById("charts"));
      myChart.setOption({
        tooltip: {  //提示框组件
          trigger: "axis", //x轴
        },
        xAxis: {
          data: JSON.parse(sessionStorage.getItem('arrx'))
        },
        legend: {},
        yAxis: {},
        // 动态加载数据
        series: [
          {
            name: "销售量",
            type: "line", //bar最常见的柱状图 line 折线图 pie饼图 map 地图
            data: JSON.parse(sessionStorage.getItem('amount')) ,
            smooth: true,
          },
          {
            name: "销售额",
            type: "bar", //bar最常见的柱状图 line 折线图 pie饼图 map 地图
            data: JSON.parse(sessionStorage.getItem('money')) ,
            smooth: true,
          },
        ],
      });
    },
    pie() {
      var myChart = echarts.init(document.getElementById("pie"));
      var option;
      option = {
        tooltip: {
          trigger: "item",
          formatter:'{a}<br>{b}-{d}%'
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "产品销售额",
            type: "pie",
            radius: "50%",
            data: JSON.parse(sessionStorage.getItem('saleMoney')),
            emphasis: {
              //高亮配置
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      option && myChart.setOption(option);
    },
    async getData(){
       try {
        await this.$store.dispatch("home/getFormatInfo");
        sessionStorage.setItem('arrx',JSON.stringify(this.arrx))
        sessionStorage.setItem('amount',JSON.stringify(this.amount))
        sessionStorage.setItem('money',JSON.stringify(this.money))
        sessionStorage.setItem('saleMoney',JSON.stringify(this.saleMoney))
        this.echarts()
        this.pie();
      } catch (error) {
        console.warn(error)
      }
    }
  },

};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  padding-right: 30px;
  .item {
    flex: 1;
    height: 100px;
    padding: 10px;
    background: #fff;
    border-radius: 10px;
    margin-left: 20px;
    margin-right: 20px;
    font-weight: bold;
    color: #fff;
    position: relative;
    .num {
      font-size: 22px;
      margin: 10px;
      color: #fff;
    }
    .bottom {
      position: absolute;
      border-top: 1px solid rgb(246, 245, 245);
      padding: 10px 20px;
      bottom: 0;
      right: 0;
      left: 0;
      color: #fff;
      font-weight: normal;
    }
  }
  .item:nth-child(1) {
    background-image: linear-gradient(#df887d, #88554d);
  }
  .item:nth-child(2) {
    background-image: linear-gradient(#409eff, #2e556e);
  }
  .item:nth-child(3) {
    background-image: linear-gradient(#b54fa8, #713c7a);
  }
  .item:nth-child(4) {
    background-image: linear-gradient(#1cd2f1, #39717a);
  }
}
.content {
  margin: 20px;
  display: flex;
  height: 320px;
  .time-info {
    flex: 2;
    background: #fff;
    margin-right: 20px;
    padding: 10px;
  }
  .area {
    flex: 1;
    background: #fff;
    padding: 10px;
  }
}

.home-footer {
  display: flex;
  padding-left: 20px;
  margin-bottom: 20px;
  .box-card {
    flex: 1;
    margin-right: 30px;
    span {
      font-weight: 600;
    }
  }
  .title {
    margin-bottom: 10px;
    font-size: 14px;
    text-align: center;
  }
  .money {
    margin-left: 5px;
  }
  .numST {
    text-align: center;
  }
}
</style>