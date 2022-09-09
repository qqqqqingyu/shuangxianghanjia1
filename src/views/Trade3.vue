<template>
  <div class="container">
    <el-row>
      <el-col :xs="24" :md="24" :lg="12">
        
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>{{title}}</span>
            </div>
          </template>

          <div id="price"></div>
          
          <div class="stty_il trade_button" style="text-align:center">
             <el-button size="mini" class="toggle-btn" plain type="danger" round @click="goToT(id,title)">买入</el-button>
             <el-button size="mini" class="toggle-btn" plain type="primary" round @click="goToT2(id,title)">卖出</el-button>
             <el-button size="mini" class="toggle-btn" type="info" round>撤单</el-button>
             
          </div>

 <el-table
    :data="TradeAccountData"
    border
    style="width: 100%">
    <el-table-column
     
      prop="trade_start_time"
      label="委托时间"
      >
    </el-table-column>
    <el-table-column
      prop="trade_end_time"
      label="结束时间"
      >
    </el-table-column>
    <el-table-column
      prop="auction_type"
      label="类型"
      :formatter="formatAuctionType"
      >
    </el-table-column>
    <el-table-column
      prop="trade_price"
      label="价格"
      >
    </el-table-column>
    <el-table-column
      prop="trade_count"
      label="交易数量"
      >
    </el-table-column>

    <el-table-column
      prop="trade_status"
      label="状态"
      :formatter="formatTradeStatus"
     >
    </el-table-column>
    <el-table-column
      label="操作"
      >

      <template v-slot="scope">
        <el-button @click="cancleClick(scope.row)" type="text" size="small">撤单</el-button>
      </template>

    </el-table-column>
  </el-table>

      </el-card>
         
      </el-col>
    </el-row>

    <el-row>
      <el-col :xs="24" :md="24" :lg="12">
        <el-card class="box-card">
         <div class="stty_il bottom_button" style="text-align: center">

            <el-button size="large" class="toggle-btn" type="danger" round @click="goToCheck(id,title)">查看报告</el-button>

          <router-link exact to="/">
            <el-button size="large" plain  type="info" round>返回活动广场</el-button>
          </router-link>
          </div>

        </el-card>
      </el-col>
    </el-row>
  </div>
  <FloatBall :text="'跳转LSMR'"></FloatBall>
</template>
<script>
// import '@/assets/CSS/startactivity.css'
// import '@/assets/CSS/common.css'
import {
  startTransaction,
  getCdaActivityTransactionInfo
} from '@/api/auction'
import FloatBall from '@/components/FloatBall';

export default {
  components:{
    FloatBall
  },
  data() {
    return {
      TradeAccountData:'',//存储获取到的数据
      priceSeq:'', //在方法中获取时间和价格用于作图
      timeArr:'', //交易发起时间，x轴
      priceArr:'', //价格,y轴
      id:'',
      title:''
    }
  },
  mounted() {
    this.getParams();
    this.getCdaActivityTransactionInfoMethod();
  },
  methods : {
    // 获取活动id和标题
    getParams:function(){
      // 取到路由带过来的参数
      let getId = this.$route.query.activityId
      let getTitle = this.$route.query.activityTitle
      // 将数据放在当前组件的数据内
      this.id = getId
      this.title = getTitle
    },
    startTransactionMethod() {
      // transaction为交易信息 须组装后提交 注意字段非空判断（参考接口文档）以下代码仅做参考
      let transaction = {}
      transaction.action_type = 'cancle'
      transaction.auction_type = 0

      startTransaction(39, transaction).then(response => {
        console.log('4.3 去交易')
        console.log(response.data)
      })
    },
    getCdaActivityTransactionInfoMethod() {
      getCdaActivityTransactionInfo(this.id).then(res => {
        console.log('4.3 获取活动交易信息')
        console.log(res.data)
        if (res.data.code === "200") {
          //目前获取到的data暂时为空的
          this.TradeAccountData = res.data.trade_account.data

          //获取price_seq用于作图
          this.priceSeq = res.data.price_seq.data;
          //x轴数据
          var str = "";
          this.priceSeq.forEach(function(e) {
            str += e.time + ",";
          });
          str = str.substring(0, str.length-1);
          this.timeArr = str.split(",");
          //y轴数据
          var str1 = "";
          this.priceSeq.forEach(function(e) {
            str1 += e.price + ",";
          });
          str1 = str1.substring(0, str1.length-1);
          this.priceArr = str1.split(",");
          //获取到数据后作图
          this.myEcharts();
        } else {
          alert(res.data.code)
          this.alert_code = res.data.code;
        }
      })
    },
    //将数字转化为相应拍卖类型显示在表格中。
    formatAuctionType: function (row, column, auctionTypeValue) {
      var statusTxt = '';
      statusTxt = auctionTypeValue == null?"无":auctionTypeValue == 0?"喊价": auctionTypeValue == 1?"询价":auctionTypeValue == 2?"市价":auctionTypeValue == 3?"未成交":"类型错误";
      return statusTxt;
    },
    //将数字转化为相应交易状态显示在表格中。
    formatTradeStatus: function (row, column, tradeStatusValue) {
      var statusTxt = '';
      statusTxt = tradeStatusValue == null?"无":tradeStatusValue == 0?"交易队列中": tradeStatusValue == 1?"交易成功":tradeStatusValue == 2?"交易失败":
          tradeStatusValue == 3?"已撤单":tradeStatusValue == 4?"已结转":tradeStatusValue == 5?"已过期":"状态未知";
      return statusTxt;
    },
    //点击撤销
    cancleClick(row) {
      console.log(row);
      if(row.trade_status=='已成交'){
        this.$message({
          type: 'warn',
          message: '该交易已成交，无法撤单'
        });
      }else if(row.trade_status=='已撤单'){
        this.$message({
          type: 'warn',
          message: '该交易已撤单，无需重复操作'
        });
      }else if(row.trade_status=='未成交'){
        // 弹出弹窗
        this.$confirm('操作：撤销 <br> 数量：'+row.trade_count+' &ensp; 价格：'+row.trade_price+'<br> 您是否确认以上撤单？', '撤单确认', {
          dangerouslyUseHTMLString:true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {  // 选择确定时运行这段代码
          let transaction = {}  //交易信息
          transaction.action_type = 'cancle';
          transaction.trade_id = row.trade_id; //需要撤销的id
          // 提交数据
          startTransaction(transaction.trade_id, transaction).then(response => {
            console.log('4.3 去交易');
            console.log(response.data);
            this.$message({
              type: 'success',
              message: '撤销成功!'
            });
            //刷新有短暂空白。查到不会空白的方法，但尝试了一下没有成功
            location.reload();
          }).catch(() => { //撤销失败，即数据提交失败
            this.$message({
              type: 'info',
              message: '撤销失败，请重试'
            });
          });
        }).catch(() => {  //取消提交数据
          this.$message({
            type: 'info',
            message: '已取消提交'
          });
        });
      }else{
        console.log('交易状态为'+row.trade_status)
        this.$message({
          type: 'warn',
          message: '出错了，请重试'
        });
      }
    },
    myEcharts(){
      let echarts = require('echarts');
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('price'));
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: '价格走势图',//图标标题
          x: 'center',//水平居中
          top:10
        },
        xAxis: {
          type: 'category',
          data: this.timeArr
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: this.priceArr,
            type: 'line',
            smooth: true,
            label: {//线条上的数字提示信息
              normal: {
                show: true,
                position: 'top'
              }
            },
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },

    //点击事件,传值
    goToT:function(id,title) {
      this.$router.push({
        path:'/Trade',
        query:{
          activityId:id,
          activityTitle:title
        },
      })
    },
    goToT2:function (id,title) {
      this.$router.push({
        path:'/Trade2',
        query:{
          activityId:id,
          activityTitle:title
        },
      })
    },
    goToCheck:function (id,title) {
      this.$router.push({
        path:'/Check',
        query:{
          activityId:id,
          activityTitle:title
        },
      })
    },
  }
}
</script>

<style scoped>
.item_title{
  line-height: 40px;
}

.non-border>>>.el-input__inner {
  border: 0;
}

/*.inputDeep>>>.el-textarea__inner {*/
/*  border: 0;*/
/*  resize: none;!* 这个是去掉 textarea 下面拉伸的那个标志，如下图 *!*/
/*}*/
.container {
  text-align: center;
}

.card-header {
  text-align: center;
  background-color: white !important;
  font-size: 20px;
  color: #222;
  font-weight: 700;
  /*border:solid 3px;*/
  /*padding: 10px 0;*/
}

.stty_il {
  font-size: 15px;
  font-weight: 700;
  /*margin-top: 15px;*/
  /*margin-bottom: 15px;*/
  /*justify-content: center;*/
  /*position: absolute;*/
}

.el-tag{
  margin-right: 5px;
  margin-bottom: 5px;
}
.box-card {
  width: 100%;
  text-align: left;
  margin: 2px;
}

.trade_button{
  padding-bottom: 5px;
  padding-top: 5px;
  /*border-bottom: #222222 1px solid;*/
}

.bottom_button{
  padding-bottom: 5px;
  padding-top: 5px;
  margin-bottom:60px;
}
.toggle-btn{
  margin-right: 5%;
}
#price{
  height: 150px;
  width: 100%;
  border: #DCDCDC 1px solid;
}
</style>

