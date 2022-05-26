<template>
 
  <div class="container">
   
    <el-row>
      <el-col :xs="24" :md="24" :lg="12">
        
        <el-card class="box-card">
         
          <template #header>
            <div class="card-header">
              <span>预测活动标题</span>
            </div>
          </template>

        <div class="ebutton">
            <el-button type="danger" round>任务预测</el-button>
         
          <router-link exact to="/MyTrade">
            <el-button plain round>我的交易</el-button>
          </router-link>
        </div>

        <div class="echarts">价格走势图</div>
        <div class="echarts">任务交易次数</div>
          
       </el-card>
      </el-col>
    </el-row>

    <el-row>
      <el-col :xs="24" :md="24" :lg="12">

        <el-card class="box-card">
         <div class="stty_il bottom_button" style="text-align: center">
          <router-link exact to="/">
            <el-button size="large" type="danger" round>返回活动广场</el-button>
          </router-link>
          <router-link exact to="/Trade">
            <el-button size="large" plain  type="info" round>去交易</el-button>
          </router-link>
         </div>

        </el-card>
      </el-col>
    </el-row>
  </div>

</template>

<script>

export default {
 
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
  height: 150px;
  width: 100%;
  border: #222222 1px solid;
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
</style>

