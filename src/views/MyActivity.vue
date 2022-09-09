<template>
  <div class="container">
    <el-row>
      <el-col :span="24">
        <div v-for="item in myActivityData" :key='item'>
          <el-card class="box-card">
            <div class="stty_il">
              <span >
                {{item.title}}
              </span>
            </div>
            <el-row class="card-tag" >
              <el-tag type="primary" class="card-tag-margin">LMSR</el-tag>
              <el-tag type="warning" class="card-tag-margin">财经</el-tag>
              <el-tag type="warning" class="card-tag-margin">北向资金</el-tag>
              <el-tag type="warning" class="card-tag-margin">进行中</el-tag>
            </el-row>
            <el-row class="stty_i2">
              <el-col :xs="4" :md="2" >活动时间:</el-col>
              <el-col :span="19" :offset="1" align="left" >
                {{formatTimer(item.pro_start_time)}}-{{formatTimer(item.pro_end_time)}}
              </el-col>
            </el-row>
            <el-row class="card-huodong">
              <el-col :span="8" align="left">
                活动金额：
              </el-col>
              <el-col :span="14" :offset="1" align="left">
                <i class="el-icon-coin" type="success"></i>
                  {{item.award}}
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8" align="left">
                活动描述：
              </el-col>
              <el-col :span="14" :offset="1" align="left">
                {{item.desc}}
              </el-col>
            </el-row>
            <el-row class="card-button" gutter="3">
                <el-button class="btn-margin" type="warning" round @click="goToLiquidation(item.id)">{{showStatus(item.status)}}</el-button>
            </el-row>
            <div class="card-bottom"> 47人关注
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
  <FloatBall :text="'跳转LSMR'"></FloatBall>
</template>

<script>
import {
  getCdaMyActivity
} from '@/api/auction'
import FloatBall from '@/components/FloatBall';

export default {
  name: "MyActivity",
  components:{
    FloatBall
  },
  data() {
    return{
      myActivityData:'',
      alert_code:''
    }
  },
  mounted() {
    this.getCdaMyActivityMethod();
  },
  methods : {
    goToLiquidation:function (id) {
      this.$router.push({
        path:'/Liquidation',
        query:{
          activityId:id
        },
      })
    },
    getCdaMyActivityMethod() {
      getCdaMyActivity().then(res => {
        console.log('4.6 查看我发起的活动')
        console.log(res.data)
        if (res.data.code === "200") {
          this.myActivityData = res.data.data
        } else {
          alert(res.data.code)
          this.alert_code = res.data.code;
        }
      })
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
      return y + "/" + MM + "/" + d + " " + h + ":" + m;
    },
    //判断是否为通用活动
    showStatus(value){
      var ig = '状态未知';
      if(value == 0){
        ig = '审核中';
      }else if(value == 1){
        ig = '通过';
      }else if(value==2){
        ig = '未通过';
      }
      return ig;
    }
  }
}
</script>

<style scoped>

.market-radio>>>.el-radio-button__orig-radio:checked+.el-radio-button__inner{
  background: #E6A23C;
  border-color:#FFA963;
  box-shadow:-1px 0 0 0 #E6A23C ;
  width: 50%;
}
</style>