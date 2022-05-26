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

          <div class="echarts">价格走势图（要醒目地显示当前的价格、涨跌）</div>
          
          <div class="stty_il trade_button" style="text-align: center">
            <router-link exact to="/Trade" >
             <el-button size="mini" plain type="success" round>买入</el-button>
            </router-link>
             <el-button size="mini"  type="danger" round>卖出</el-button>
            

            <router-link exact to="/Trade3">
             <el-button size="mini" plain  type="info" round>撤单</el-button>
            </router-link> 
          </div>

      <el-row>
       <el-col :span="12">
        <div class="hcharts">
          <el-row class="stty_il">
            <el-col class="item_title" :span="14">活动可用诸葛贝：</el-col>
            <el-col :xs="{span: 4}"  >
              <el-input class="item_title non-border" v-model="inputTitle" placeholder="2"/>
            </el-col>
          </el-row>

     
         <el-row class="stty_il">
              <el-col class="item_title" :span="14">当前合约持有量：</el-col>
              <el-col :xs="{span: 4}" >
                <el-input class="item_title non-border" v-model="inputTitle" placeholder="2"/>
              </el-col>
          </el-row>

          <div class="stty_il">
              <el-radio v-model="radio1" label="1" size="large">喊价交易</el-radio>
              <el-radio v-model="radio1" label="2" size="large">市场交易</el-radio>
         </div>

           <el-row class="stty_il">
              <el-col class="item_title" :span="14">请输入交易价格：</el-col>
              <el-col :xs="{span: 4}" >
                <el-input class="item_title non-border" v-model="inputTitle" placeholder="2"/>
              </el-col>
          </el-row>

            <el-row class="stty_il">
              <el-col class="item_title" :span="14">请输入交易数量：</el-col>
              <el-col :xs="{span: 4}" >
                <el-input class="item_title non-border" v-model="inputTitle" placeholder="2"/>
              </el-col>
          </el-row>

          <el-row class="stty_il">
            <el-col :xs="20" class="item_title">请输入交易截止时间：</el-col>
            <el-col :xs="{span: 20}" :md="22" :lg="24">
              <el-time-select
                  v-model="value"
                  start="08:30"
                  step="00:15"
                  end="18:30"
                  placeholder="请输入交易截止时间"
              >
              </el-time-select>
            </el-col>
          </el-row>

          <el-row class="stty_il">
<!--            <el-col :xs="4">交易理由</el-col><br>-->
            <el-col :xs="{span: 20}" :md="22" :lg="24">
              <el-input :rows="2" class="item_title inputDesCri" resize="none" type="textarea" v-model="inputDesCri" placeholder="可以说说您为什么要这么交易吗"/>
            </el-col>
          </el-row>

          <el-row class="stty_il">
            <el-button size="medium" plain  type="info" round>卖出</el-button>
          </el-row>
          
          </div>
        </el-col>

        <el-col :span="12">
          <div class="scharts">卖价队列</div>
          <div class="scharts">买价队列</div>
        </el-col>
      </el-row>


          
          
         

      </el-card>

      </el-col>
    </el-row>

    <el-row>
      <el-col :xs="24" :md="24" :lg="12">
        <el-card class="box-card">
         <div class="stty_il bottom_button" style="text-align: center">
         
          <router-link exact to="/Check">
            <el-button size="large" type="danger" round>查看报告</el-button>
          </router-link>

          <router-link exact to="/">
            <el-button size="large" plain  type="info" round>返回活动广场</el-button>
          </router-link>
          </div>


        </el-card>
      </el-col>
    </el-row>
  </div>

</template>
<script>
// import '@/assets/CSS/startactivity.css'
// import '@/assets/CSS/common.css'

export default {
  name: "Trade",
  data() {
    return {
      inputTitle:'',
      inputDesCri:'',
      inputBounce:'',
    }
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
  border: #222222 1px solid;
}
.hcharts{
  height:480px;
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

