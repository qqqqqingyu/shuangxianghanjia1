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
          
          <div class="stty_il trade_button" style="text-align:center">
            <router-link exact to="/Trade"> 
             <el-button size="mini" plain type="info" round>买入</el-button>
            </router-link>
            <router-link exact to="/Trade2" >
             <el-button size="mini" plain type="success" round>卖出</el-button>
            </router-link>

             <el-button size="mini"  type="danger" round>撤单</el-button>
             
          </div>

 <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
     
      prop="date"
      label="委托时间"
      >
    </el-table-column>
    <el-table-column
      prop="name"
      label="结束时间"
      >
    </el-table-column>
    <el-table-column
      prop="province"
      label="类型"
      >
    </el-table-column>
    <el-table-column
      prop="city"
      label="价格"
      >
    </el-table-column>
    <el-table-column
      prop="address"
      label="交易数量"
      >
    </el-table-column>
    <el-table-column
      prop="zip"
      label="状态"
     >
    </el-table-column>
    <el-table-column
      label="操作"
      >
      
        <el-button @click="handleClick(scope.row)" type="text" size="small">撤单</el-button>
    
    </el-table-column>
  </el-table>

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
  data() {
    return {
      tableData: [{
          date: '2016',
          name: '2022',
          province: '01',
          city: '50',
          address: '50',
          zip: 200333
        }]
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

