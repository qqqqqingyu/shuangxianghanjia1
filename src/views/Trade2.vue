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
          
          <div class="stty_il trade_button" style="text-align: center">
             <el-button class="toggle-btn" size="mini" plain type="danger" round @click="goToT(id,title)">买入</el-button>
             <el-button class="toggle-btn" size="mini" type="primary" round>卖出</el-button>
             <el-button size="mini" plain  type="info" round @click="goToT3(id,title)">撤单</el-button>
          </div>

      <el-row>
       <el-col :span="12">
        <div class="hcharts">
          <el-row class="stty_il">
            <el-col class="item_title" :offset="1" :span="23">活动可用诸葛贝：{{numFilter(coin)}}个</el-col>
          </el-row>


         <el-row class="stty_il">
              <el-col class="item_title" :offset="1" :span="23">当前合约持有量：{{share}}份</el-col>
          </el-row>

          <el-row class="stty_il">
            <el-col :span="11" :offset="1">
              <el-radio class="radio-pl" v-model="tradeForm.auctionType" label="1" size="large">询价交易</el-radio>
            </el-col>
            <el-col :span="11" :offset="1">
              <el-radio class="radio-pl" v-model="tradeForm.auctionType" label="2" size="large">市价交易</el-radio>
            </el-col>
          </el-row>

          <el-row class="stty_il">
            <el-col class="item_title" :offset="1" :span="17">请输入交易价格：</el-col>
            <el-col :span="6" class="input-pd" v-if="tradeForm.auctionType==1">
              <el-input class="item_title non-border" v-model="tradeForm.inputTradePrice" placeholder="价格"/>
            </el-col>
            <el-col :span="6" class="input-pd1" v-if="tradeForm.auctionType==2">
              <el-input class="item_title non-border" :disabled="true" :placeholder="getTradePrice"/>
            </el-col>
          </el-row>

          <el-row class="stty_il">
            <el-col class="item_title" :offset="1" :span="17">请输入交易数量：</el-col>
            <el-col :span="6" class="input-pd1">
              <el-input class="item_title non-border" v-model="tradeForm.inputTradeCount" :placeholder="'≤'+getTradeCount"/>
            </el-col>
          </el-row>

          <el-row class="stty_il">
            <el-col class="item_title" :xs="22" :span="13" :offset="1"  >请输入交易截止时间：</el-col>
            <el-col :xs="{span: 22}" :md="22" :lg="22" :offset="1" v-if="tradeForm.auctionType==1">
              <el-form-item class="date-mb input-pd2">
                <el-date-picker

                    style="width: 100%"
                    v-model="tradeForm.inputTradeEndTime"
                    type="datetime"
                    format="YYYY-MM-DD hh:mm"
                    placeholder="截止时间"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="{span: 22}" :md="22" :lg="22" :offset="1" v-if="tradeForm.auctionType==2">
              <el-input
                  placeholder="自动获取提交时间"
                  :disabled="true">
              </el-input>
            </el-col>
          </el-row>

          <el-row class="stty_il">
            <!--            <el-col :xs="4">交易理由</el-col><br>-->
            <el-col :span="22" :offset="1"  >
              <el-input :rows="2" class="item_title inputDesCri" resize="none" type="textarea" v-model="tradeForm.inputNoteText" placeholder="可以说说您为什么要这么交易吗"/>
            </el-col>
          </el-row>

          <el-row class="stty_il submit-margin">
            <el-col :offset="1" >
              <el-button size="medium" plain @click="startTransactionMethod" type="primary"  round>卖出</el-button>
            </el-col>
          </el-row>

          </div>
        </el-col>

        <el-col :span="12">
          <div class="sell-charts">
            <div class="queue-title-sell">卖价队列</div>
            <el-table
                size="mini"
                :data="sellSeq"
                :row-class-name="sellTableRowClassName">
              <el-table-column
                  prop="date"
                  label="询价数量">
              </el-table-column>
              <el-table-column
                  prop="name"
                  label="询价价格">
              </el-table-column>
            </el-table>


          </div>
          <div class="buy-charts">
            <div class=" queue-title-buy">买价队列</div>
            <el-table
                size="mini"
                :data="buySeq"
                :row-class-name="buyTableRowClassName">
              <el-table-column
                  prop="date"
                  label="喊价数量">
              </el-table-column>
              <el-table-column
                  prop="name"
                  label="喊价价格">
              </el-table-column>
            </el-table>
          </div>

        </el-col>
      </el-row>

      </el-card>

      </el-col>
    </el-row>

    <el-row>
      <el-col :xs="24" :md="24" :lg="12">
        <el-card class="box-card">
         <div class="stty_il bottom_button" style="text-align: center">
            <el-button size="large" type="danger" round @click="goToCheck(id,title)" class="toggle-btn">查看报告</el-button>
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
  name: "Trade",
  components:{
    FloatBall
  },
  data() {
    return {
      coin:'',
      share:null,
      getTradeCount:'无', //获取的询价数量，获取不到则显示无
      getTradePrice:'无', //获取的询价价格，获取不到则显示无
      id:'',
      title:'',
      timeNow:'', //当前时间
      sellSeq:'', //卖价队列
      buySeq:'', //买价队列
      priceSeq:'', //在方法中获取时间和价格用于作图
      timeArr:'', //交易发起时间，x轴
      priceArr:'', //价格,y轴
      tradeForm:{
        actionType:'sell', //动作类型
        auctionType:'1', //拍卖类型
        inputNoteText:'', //笔记
        inputTradeCount:'', //交易数量
        inputTradeEndTime:'', //交易截止时间
        inputTradePrice:'', //交易价格
      }
    }
  },
  mounted() {
    this.getParams();
    //自动获取可用诸葛贝和合约数
    this.getCdaActivityTransactionInfoMethod()
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
    // 获取当前时间，赋值给timeNow
    getCurrentTime() {
      var _this = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth()+1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
      _this.timeNow = yy+'-'+mm+'-'+dd+' '+hh+':'+mf;
    },
    // 保留两位小数
    numFilter(value) {
      const realVal = parseFloat(value).toFixed(1);
      return realVal;
    },
  formatTimer: function(value) {
    let date = new Date(value);
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
    getCdaActivityTransactionInfoMethod() {
      getCdaActivityTransactionInfo(this.id).then(res => {
            console.log('4.3 获取活动交易信息')
            console.log(res.data)
            if (res.data.code === "200") {

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

              //获取可用诸葛贝和合约数
              this.coin = res.data.coin
              this.share = res.data.share
              // alert(this.tableData)
              //获取询价数量、询价价格和id ，应该只会获取到一个数量的值和一个价格的值。若不是则加上循环。
              this.getTradeCount = res.data.sell_seq.data[0].trade_count
              this.getTradePrice = res.data.sell_seq.data[0].trade_price
              this.id = res.data.trade_account.data[0].id
              // 获取买价队列和卖价队列
              this.sellSeq = res.data.sell_sql.data;
              this.buySeq = res.data.buy_seq.data;

            } else {
              alert(res.data.code)
              this.alert_code = res.data.code;
            }
          })
    },
  //传输数据
  startTransactionMethod() {
    let transaction = {}
    if(this.tradeForm.inputTradeCount.length==0){
      alert("未输入交易数量");
      return;
    }
    if(this.tradeForm.inputTradePrice.length==0 && this.tradeForm.auctionType==1){
      alert("未输入交易价格");
      return;
    }
    if(this.tradeForm.inputTradeEndTime.length==0&&this.tradeForm.auctionType==1){
      alert("未输入截止时间");
      return;
    }
    if(this.tradeForm.inputNoteText.length==0){
      alert("未输入交易原因");
      return;
    }
    // transaction为交易信息 须组装后提交 注意字段非空判断（参考接口文档）以下代码仅做参考
    this.tradeForm.inputTradeEndTime = this.formatTimer(this.tradeForm.inputTradeEndTime);

    transaction.action_type = 'sell'
    transaction.note_text = this.tradeForm.inputNoteText;
    transaction.trade_count = this.tradeForm.inputTradeCount;
    if(this.tradeForm.auctionType==1){
      transaction.auction_type = 1
      transaction.trade_end_time =this.tradeForm.inputTradeEndTime; //交易时间为用户输入
      transaction.trade_price = this.tradeForm.inputTradePrice; //交易价格为用户输入
    }
    if(this.tradeForm.auctionType == 2){
      transaction.auction_type = 2
      this.getCurrentTime(); // 获取当前时间，赋值给timeNow
      transaction.trade_end_time = this.timeNow; //交易时间自动为当前时间
      transaction.trade_price = this.getTradePrice; //交易价格自动获取当前价格
    }

    startTransaction(this.id, transaction).then(response => {
      console.log('4.3 去交易')
      console.log(response.data)
      this.$message({
        type: 'success',
        message: '交易成功！'
      });
      this.$router.push('/MyTrade');
    }).catch(() => { //提交数据失败
      this.$message({
        type: 'info',
        message: '交易失败，请重试'
      });
    });
  },
    //卖价队列的颜色
    sellTableRowClassName({rowIndex}) {
      if (rowIndex%2 === 0) {
        return 'light-blue-row';
      }else{
        return 'blue-row';
      }
    },
    //买价队列的颜色
    buyTableRowClassName({rowIndex}) {
      if (rowIndex%2 === 0) {
        return 'light-red-row';
      }else{
        return 'red-row';
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
    //点击事件，传值
    goToT:function(id,title) {
      this.$router.push({
        path:'/Trade',
        query:{
          activityId:id,
          activityTitle:title
        },
      })
    },
    goToT3:function(id,title) {
      this.$router.push({
        path:'/Trade3',
        query:{
          activityId:id,
          activityTitle:title},
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
  font-size: 14px;
  letter-spacing: -0.015em;
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
.inputDesCri{
  height: 60px;
}
.echarts{
  height: 150px;
  width: 100%;
  border: #222222 1px solid;
}
.scharts{
  height: 240px;
  width: 100%;
  border: #DCDCDC 1px solid;
}
.hcharts{
  height:480px;
  width: 100%;
  border: #DCDCDC 1px solid;
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
/*vue深度选择器*/
.input-pd>>>.el-input__inner{
  padding-left: 0;
  padding-right: 0;
}
.input-pd1>>>.el-input__inner{
  padding-left: 3px;
  padding-right: 0;
}
.input-pd2>>>.el-input__inner{
  padding-right: 0;
}
.date-mb{
  margin-bottom: 0;
}
.submit-margin{
  margin-top: 0;
}
.toggle-btn{
  margin-right: 5%;
}
.sell-charts{
  height: 240px;
  width: 100%;
  border-right: #DCDCDC 1px solid;
  border-top: #DCDCDC 1px solid;
  padding-left: 2px;
}
.buy-charts{
  height: 240px;
  width: 100%;
  border-right: #DCDCDC 1px solid;
  border-top: #DCDCDC 1px solid;
  border-bottom: #DCDCDC 1px solid;
  padding-left: 2px;
}
.queue-title-sell{
  text-align: center;
  font-weight: 600;
  color: #409EFF;
  padding-top: 3px;
}
.queue-title-buy{
  text-align: center;
  font-weight: 600;
  color: #f78989;
  padding-top: 3px;
}
.el-table>>>.light-blue-row {
  background: rgba(236,245,255,0.6) ;
}
.el-table>>>.blue-row {
  background: rgba(236,245,255,0.1);
}
.el-table>>>.light-red-row {
  background: rgba(251,196,196,0.4) ;
}
.el-table>>>.red-row {
  background: rgba(251,196,196,0.1);
}
#price{
  height: 150px;
  width: 100%;
  border: #DCDCDC 1px solid;
}
.radio-pl>>>.el-radio__label{
  padding-left: 2px;
  margin-right: 3px;
}
</style>

