<template>
<div class="container">

    <el-row class="stty_il ">
      <el-col class="item_title market-type" :span="5" :offset="1">市场类型：</el-col>
      <el-col :span="18" v-if="liquidationData.market_type==1">
        <el-button type="danger" round>双向拍卖</el-button>
        <el-button type="danger" round plain>LMSR</el-button>
      </el-col>
      <el-col :span="18" v-if="liquidationData.market_type==0">
        <el-button type="danger" round plain>双向拍卖</el-button>
        <el-button type="danger" round>LMSR</el-button>
      </el-col>
    </el-row>

  <el-row class="details" >
  <el-col :span="23" :offset="1">标题：{{liquidationData.title}}</el-col>
  <el-col :span="23" :offset="1">状态：{{showStatus(liquidationData.status)}}</el-col>
  <el-col :span="23" :offset="1">描述：{{liquidationData.desc}}</el-col>
  <el-col :span="23" :offset="1">类别：{{showMarketType(liquidationData.market_type)}}</el-col>
  <el-col :span="23" :offset="1">奖金：{{liquidationData.award}}</el-col>
  <el-col :span="23" :offset="1">活动开始时间：{{formatTimer(liquidationData.pro_start_time)}}</el-col>
  <el-col :span="23" :offset="1">活动结束时间：{{formatTimer(liquidationData.pro_end_time)}}</el-col>
  <el-col :span="23" :offset="1">验证资料：{{liquidationData.verify_material}}</el-col>
</el-row>

  <el-row class="details">
    <el-col class="details-title" :span="23" :offset="1">市场信息</el-col>
    <el-col :span="23" :offset="1">开市价格：{{liquidationData.market_price}}</el-col>
    <el-col :span="23" :offset="1">市场价格与诸葛贝结算的换算系数：{{liquidationData.price_conversion}}</el-col>
    <el-col :span="23" :offset="1">是否为通用活动：{{showIsGen(liquidationData.is_gen)}}</el-col>
    <el-col :span="23" :offset="1">赠送的合约数量（份）：{{liquidationData.contract_free}}</el-col>
    <el-col :span="23" :offset="1">赠送的诸葛贝数量：{{liquidationData.coin_free}}</el-col>
  </el-row>

  <el-row class="details" >
    <el-col :span="17" :offset="1" class="input-title">请输入最终结果（诸葛贝）：</el-col>
    <el-col :span="6">
      <el-form-item prop="inputCoinFree" class="el-form-item-mb" >
        <!--                诸葛贝不得为负，数据类型Decimal，这里设为非零整数或小数。-->
        <el-input type="number" class="non-border" v-model.number="finalPrice"
                  placeholder="单位：个" oninput ="value=value.replace(/[^0-9.]/g,'')" />
      </el-form-item>
    </el-col>

  </el-row>
    <div class="btn-div">
      <el-button class="btn-mt" type="warning" round plain @click="liquidationActivityMethod">提交结算申请</el-button>
    </div>
</div>
  <FloatBall :text="'跳转LSMR'"></FloatBall>
</template>

<script>
import {
  getLiquidationInfo,
  liquidationActivity
} from '@/api/auction'
import FloatBall from '@/components/FloatBall';

export default {
  name: "Liquidation",
  components:{
    FloatBall
  },
  data() {
    return{
      alert_code:'',
      inputFinalPrice:'',
      liquidationData:{
        title:'',
        status:'',
        desc:'',
        market_type:'',
        award:'',
        pro_start_time:'',
        pro_end_time:'',
        verify_material:'',
        market_price:'',
        price_conversion:'',
        is_gen:'',
        contract_free:'',
        coin_free:''
      },
      status:'',
      finalPrice:'', //最终结果
      getTitle:'',
      id:''
    }
  },
  mounted() {
    this.getParams();
    this.getLiquidationInfoMethod();
  },
  methods : {
    // 获取活动id
    getParams:function(){
      // 取到路由带过来的参数
      let getId = this.$route.query.activityId
      // 将数据放在当前组件的数据内
      this.id = getId
    },
    //判断并返回状态类型
    showStatus(value){
      var s = '状态';
      if(value==0){
        s = '审核中';
      }else if(value==1){
        s = '通过';
      }else if(value==2){
        s = '未通过';
      }
      return s;
    },
    //判断市场类型
    showMarketType(value){
      var mt = '市场类型';
      if(value==1){
        mt = 'CDA';
      }
      return mt;
    },
    //判断是否为通用活动
    showIsGen(value){
      var ig = '通用活动';
      if(value == 0){
        ig = '不通用';
      }else if(value == 1){
        ig = '通用';
      }
      return ig;
    },
    //时间格式转换
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

    getLiquidationInfoMethod() {
      getLiquidationInfo(this.id).then(res => {
        console.log('4.7 查看活动清算信息')
        console.log(res.data)
        if (res.data.code === "200") {
          this.liquidationData = res.data.data[0]
          //获取title
          this.getTitle = res.data.data[0].title;
          console.log('getTitle='+this.getTitle)
        } else {
          alert(res.data.code)
          this.alert_code = res.data.code;
        }
      })
    },
    liquidationActivityMethod() {
      let liquidation = {};
      if(this.finalPrice==''){
        alert("未输入最终价格");
        return;
      }
        liquidation.final_price = parseInt(this.finalPrice)
      // 弹出的提示框
      this.$confirm('您确认以'+liquidation.final_price+'个诸葛贝对活动进行清算吗？', '活动清算', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {  // 选择确定时运行这段代码
        liquidationActivity(this.id, liquidation).then(res => {
          console.log('4.7 活动清算')
          console.log(res.data)
          this.$message({
            type: 'success',
            message: '提交成功!提交结果:'+liquidation.final_price+'个诸葛贝。界面即将跳转……'
          });
          // 延迟5s后跳转
          setTimeout(() => {
            this.$router.push('/MyActivity');
          }, 5000);
        }).catch(() => { //提交数据失败
          this.$message({
            type: 'info',
            message: '提交失败，请重试'
          });
        });
      }).catch(() => {  //选择取消时运行这段代码
        this.$message({
          type: 'info',
          message: '已取消提交'
        });
      });
    }
  }
}
</script>

<style scoped>
.details{
  text-align: left;
  border: #DCDCDC 1px solid;
  padding-bottom: 10px;
  padding-top: 10px;
  line-height: 25px;
}
.details-title{
  text-align: left;
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 5px;
}
.non-border>>>.el-input__inner {
  border: 0;
}
.input-title{
  line-height: 40px;
}
.el-form-item-mb{
  margin-bottom: 0px;
}
.btn-mt{
  margin-top: 20px;
}
/*不加pd页面拉不下去，不知道原因*/
.btn-div{
  padding-bottom: 60px
}
</style>
<style>
.market-type{
  line-height: 40px;
}
@media screen and (max-width: 750px) {
  .el-message-box {
    width: 90% !important;
    color: red;
  }
}
</style>