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

        <div class="ebutton">
            <el-button type="danger" round class="btn-mr">任务预测</el-button>

            <el-button plain round @click="goToMyTrade(id,title)">我的交易</el-button>
        </div>

        <div id="price">价格走势图</div>
        <div class="trade-time-box">
            <el-row>
              <el-col :span="23" :offset="1" class="stty_il">
                <span class="highlight-title">任务交易次数:&emsp;</span>
                <span class="highlight-content">{{tradeTime}}</span>
              </el-col>
            </el-row>

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
            <el-button size="large" plain  type="info" round @click="goToT(id,title)">去交易</el-button>
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
      userAccountData:'',
      newArr:'',
      newArr1:'',
      tradeTime:'',
      id:'',
      title:''
    }
  },
  mounted() {
    this.getParams()
    this.getCdaReportInfoMethod();
  },
  methods:{
    // 获取活动id和标题
    getParams:function(){
      // 取到路由带过来的参数
      let getId = this.$route.query.activityId
      let getTitle = this.$route.query.activityTitle
      // 将数据放在当前组件的数据内
      this.id = getId
      this.title = getTitle
    },
    //界面传值
    goToMyTrade:function (id,title) {
      this.$router.push({
        path:'/MyTrade',
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
          data: this.newArr
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: this.newArr1,
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
    getCdaReportInfoMethod() {
        getCdaReportInfo(this.id).then(response => {
            this.userAccountData = response.data.user_account.data
            this.tradeTime = response.data.trade_times;
            //x轴数据
            var str = "";
            this.userAccountData.forEach(function(e) {
                str += e.trade_start_time + ",";
            });
            str = str.substring(0, str.length-1);
            this.newArr = str.split(",");
            //y轴数据
            var str1 = "";
            this.userAccountData.forEach(function(e) {
                str1 += e.trade_price + ",";
            });
            str1 = str1.substring(0, str1.length-1);
            this.newArr1 = str1.split(",");
            //获取到数据后作图
            this.myEcharts();
        })
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

#price{
  margin-top:20px;
  height: 300px;
  width: 100%;
  border: #DCDCDC 1px solid;
}
.trade-time-box{
 margin-top:20px;
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
.btn-mr{
  margin-right: 5%;
}
.highlight-title{
  text-align: center;
  color: #606266;
}
.highlight-content{
  font-weight: 600;
  color: #E6A23C;
  text-align: center;
}
</style>

