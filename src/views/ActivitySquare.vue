<template>
<div class="container">

<el-row>
 <el-col :xs="24" :md="24" :lg="12">
  
 
 <el-row class="el-select">
  <el-col :xs="6">
   <span class="li">市场类型</span>
   <el-select v-model="value" placeholder="Select" size="small">
    <el-option
      v-for="item in cities"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
      
    </el-option>
  </el-select>
  </el-col>
 
  <el-col :xs="6">
   <span class="li">活动类型</span>
    <el-select v-model="value" placeholder="Select" size="small">
     <el-option
      v-for="item in cities"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
   </el-select>
  </el-col>
 
   <el-col :xs="6">
    <span class="li">状态</span>
     <el-select v-model="value" placeholder="Select" size="small">
      <el-option
      v-for="item in cities"
      :key="item.value"
      :label="item.label"
      :value="item.value"
        >
       </el-option>
    </el-select>
   </el-col>
 
  <el-col :xs="6">
    <span class="li">我的活动</span>
    <el-select v-model="value" placeholder="Select" size="small">
     <el-option
      v-for="item in cities"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
    </el-select>
  </el-col>

  <div class="head_ti">双向喊价活动简介</div>
    

   </el-row>

 
 
  </el-col>
</el-row>


<el-row>
  <el-col :xs="24" :md="24" :lg="12">
     <el-card class="box-card">
    
       <template #header>
        <div class="stty_il">
          <span >2022年全年的北向资金净流入会超过4500亿吗？</span>   
        </div>
      </template>

      
          <el-row class="card-tag" >
              <el-tag type="warning">财经</el-tag>
              <el-tag type="warning">北向资金</el-tag>
              <el-tag type="warning">进行中</el-tag>
          </el-row>
        
         <el-row class="stty_i2">
           <el-col :xs="4">活动时间：</el-col>
           <el-col :xs="{span:12}" :md="12" :lg="24">2021.0303---2022.0506</el-col>
         </el-row>
        
         <el-row class="card-huodong">
           <el-col :span="4">
              <el-link><i class="el-icon-coin" type="success"></i>活动金额:</el-link>
           </el-col>
           <el-col :span="4">
              <el-link> <i class="el-icon-coin" type="success"></i> 50</el-link>
           </el-col>
          </el-row>

      <el-row class="card-button" gutter="3">
       <router-link exact to="/Trade">
          <el-button type="warning" round>去交易</el-button>
        </router-link>
        <router-link exact to="/Check">
          <el-button type="warning" round>查看报告</el-button>
          </router-link>
      </el-row>
    
     <div class="card-bottom"> 47人关注
       <!--<el-button type="warning" :icon="start" circle />-->
     </div>
     </el-card>
 



  </el-col>
</el-row>


       

</div>
  
</template>




<script lang="ts" setup>

import { ref } from 'vue'

const value = ref('')
const cities = [
  {
    value: 'Beijing',
    label: 'Beijing',
  },
  {
    value: 'Shanghai',
    label: 'Shanghai',
  },
  {
    value: 'Nanjing',
    label: 'Nanjing',
  },
  {
    value: 'Chengdu',
    label: 'Chengdu',
  },
  {
    value: 'Shenzhen',
    label: 'Shenzhen',
  },
  {
    value: 'Guangzhou',
    label: 'Guangzhou',
  },
]
</script>




<style>
.container {
  height:100%;
  text-align: center;
}
.li{
    font-size:5px;
    font-weight:700;
    
}


.card-header {
  display: flex;
  justify-content: space-between;
  align-items: centser;
}

.box-card {
  width: 100%;
  text-align: left;
  margin: 2px;
  background-color: white !important;
}

.stty_il {
  text-align: left;
  font-size: 15px;
  font-weight: 700;
  margin-top: 15px;
  margin-bottom: 5px;
  /*justify-content: center;*/
  /*position: absolute;*/
}
.stty_i2{
  text-align:left;
  font-size: 12px;
  color:#909399;
  margin-top:10px;
  margin-bottom:10px;

}
.card-huodong{
  justify-content:start;

}


.card-button{
  margin-top:20px;
  margin-bottom:20px;
  
  display: flex;
  justify-content: center;
}
.card-bottom{
  font-size:10px;
  color:#909399;
  text-align:right;
}





.head_li{
  font-size: 10px;
  font-weight: 700;
  margin-top: 10px;
  margin-bottom: 10px;
}
.head_ti{
    font-size: 25px;
    font-weight: 700;
    margin:auto;
    height:50px;
    width:100%;
    border:solid;
}
.box-card {
  width: 100%;
  text-align: center;
  margin: 2px;
}
</style>