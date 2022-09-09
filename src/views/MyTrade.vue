<template>
<!--  表格后两个（持有量、类型），当前持有量总计不清楚对应哪些字段-->
  <div class="container">
   
    <el-row>
      <el-col :xs="24" :md="24" :lg="12">
        
        <el-card class="box-card">
         
          <template #header>
            <div class="card-header">
              <span>{{title}}</span>
            </div>
          </template>

        <div class="ebutton">
            <el-button plain round class="btn-mr" @click="goToCheck(id,title)">任务预测</el-button>
            <el-button type="danger" round>我的交易</el-button>
        </div>

        <el-row class="echarts">
          <el-col :span="11">
            <el-row>
              <el-col :span="24" class="stty_il highlight-title">我的预测次数</el-col>
              <el-col :span="24" class="stty_il highlight-content">{{getUserTimes}}</el-col>
            </el-row>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-row>
              <el-col :span="24" class="stty_il highlight-title">当前任务净收益</el-col>
              <el-col :span="24" class="stty_il highlight-content">{{numFilter(getRev)}}</el-col>
            </el-row>
          </el-col>
        </el-row>
        <div class="history"><span>我的交易历史:</span>
        <el-table :data="userAccountData" border style="width: 100%">
          <el-table-column prop="id" label="id" />
          <el-table-column prop="trade_start_time" label="时间" :formatter="formatTradeStartTime" />
          <el-table-column prop="auction_type" label="交易类型" :formatter="formatAuctionType" />
          <el-table-column prop="trade_count" label="交易数量" />
          <el-table-column prop="trade_price" label="交易价格" />
          <el-table-column prop="share" label="持有量" />
          <el-table-column prop="trade_status" label="交易状态" />
        </el-table>

        <div class="count">
          <span class="stty_il">
            当前持有量总计：{{shareSum}}    持仓总价：{{getMarketCoin}}
            <br>可用诸葛贝数量：{{numFilter(getCoin)}} </span>
        </div>
        </div>
       </el-card>
      </el-col>
    </el-row>

    <el-row>
      <el-col :xs="24" :md="24" :lg="12">

        <el-card class="box-card">
         <div class="stty_il bottom_button" style="text-align: center">
          <router-link exact to="/">
            <el-button size="large" type="danger" round class="btn-mr">返回活动广场</el-button>
          </router-link>
            <el-button size="large" plain  type="info" round @click="goToT(id,title)">继续交易</el-button>
         </div>

        </el-card>
      </el-col>
    </el-row>
  </div>
  <FloatBall :text="'跳转LSMR'"></FloatBall>
</template>

<script>
import {
  getCdaReportInfo
} from '@/api/auction'
import FloatBall from '@/components/FloatBall';

export default {
  components:{
    FloatBall
  },
  data() {
      return {
        myTradeData:'',
        userAccountData:'',
        alert_code:'',
        getUserTimes:'',//任务交易总次数（我的预测次数？）
        getRev:'',//任务净收益
        getCoin:'', //可用诸葛贝
        getMarketCoin:'', //持仓总价
        shareSum:'', //持有量总计
        id:'',
        title:''
      }
 },
  mounted() {
    this.getParams();
    this.getCdaReportInfoMethod();
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
    goToCheck:function (id,title) {
      this.$router.push({
        path:'/Check',
        query:{
          activityId:id,
          activityTitle:title
        },
      })
    },
    goToT:function(id,title) {
      this.$router.push({
        path:'/Trade',
        query:{
          activityId:id,
          activityTitle:title
        },
      })
    },
    getCdaReportInfoMethod() {
      getCdaReportInfo(this.id).then(res => {
        console.log('4.5 查看报告')
        // console.log(res.data)
          if (res.data.code === "200") {
            this.myTradeData = res.data
            this.getUserTimes = this.myTradeData.user_times
            this.getRev = this.myTradeData.rev
            this.getCoin = this.myTradeData.coin
            this.getMarketCoin = this.myTradeData.market_coin
            this.userAccountData = this.myTradeData.user_account.data
            console.log(this.userAccountData)
            // alert(this.tableData)

            //求持有量总计
            this.calShareSum();

          } else {
            alert(res.data.code)
            this.alert_code = res.data.code;
          }
      })
    },
    //将数字转化为相应交易状态显示在表格中。
    formatTradeStartTime: function (row, column, TradeStartTimeValue) {
      let date = new Date(TradeStartTimeValue);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      return y + "-" + MM + "-" + d + " " + h + ":" + m;
    },
    //将数字转化为相应拍卖类型显示在表格中。
    formatAuctionType: function (row, column, auctionTypeValue) {
      var AuctionType = '';
      AuctionType = auctionTypeValue == null?"无":auctionTypeValue == 0?"喊价": auctionTypeValue == 1?"询价"
          :auctionTypeValue == 2?"市价":auctionTypeValue == 3?"未成交":"类型错误";
      return AuctionType;
    },
    //将数字转化为相应交易状态显示在表格中。
    formatTradeStatus: function (row, column, auctionTypeValue) {
      var statusTxt = '';
      statusTxt = auctionTypeValue == null?"无":auctionTypeValue == 0?"交易队列中": auctionTypeValue == 1?"交易成功"
          :auctionTypeValue == 2?"交易失败":auctionTypeValue == 3?"已撤单":auctionTypeValue == 4?"已结转"
              :auctionTypeValue == 5?"已过期":"类型错误";
      return statusTxt;
    },
    // 保留两位小数
    numFilter(value) {
      const realVal = parseFloat(value).toFixed(2);
      return realVal;
    },
    //求持有量总计
    calShareSum(){
      let sum = 0;
      this.userAccountData.forEach((item) => {
        //遍历prodAllPrice这个字段，并累加
        sum += item.share;
      });
      //返回
      this.shareSum = sum;
    }
  }
}
</script>

<style scoped>

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
  line-height: 40px;
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



.box-card {
  width: 100%;
  text-align: left;
  margin: 2px;
}

.ebutton{
    
}

.echarts{
 margin-top:20px;
  width: 100%;
  border: #DCDCDC 1px solid;
}

.history{
  margin-top:20px;
}
.history span{
  font-size: 15px;
  font-weight: 700;
}
.count{
  border:#DCDCDC solid 0.5px;
  margin-top:5px;
  text-align: center;
  color: #606266;
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
.btn-mr{
  margin-right: 5%;
}
.highlight-title{
  text-align: center;
  color: #606266;
}
.highlight-content{
  font-size: 35px;
  font-weight: 600;
  line-height: 1.2;
  color: #E6A23C;
  text-align: center;
  padding-bottom: 15px;
}

</style>

