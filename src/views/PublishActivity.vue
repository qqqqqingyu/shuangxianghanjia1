<template>
  <div class="container">
   
  
    <el-row>
      <el-col :xs="24" :md="24" :lg="12">
        <el-card class="box-card">
          
          <template #header>
            <div class="card-header">
              <span>活动基本信息</span>
            </div>
          </template>

          <div class="stty_il">市场类型:
            <el-button type="danger" round>双向拍卖</el-button>
         
          <router-link exact to="/Trade">
            <el-button plain round>切换到LMSR</el-button>
            </router-link>
         
          </div>

          <el-row class="stty_il">
            <el-col class="item_title" :xs="4">标题：</el-col>
            <el-col :xs="{span: 12}" :md="12" :lg="24">
              <el-input class="item_title non-border" v-model="inputTitle" placeholder="请输入活动标题"/>
            </el-col>
          </el-row>

          
          <el-row class="stty_il">
            <el-col :xs="4">描述：</el-col>
            <el-col :xs="{span: 23}" :md="12" :lg="24">
              <el-input :rows="4" class="item_title inputDesCri" resize="none" type="textarea" v-model="inputDesCri" placeholder="请输入活动描述"/>
            </el-col>
          </el-row>

          <el-row class="stty_il">
            <el-col class="item_title" :xs="4">类别：</el-col>
            <el-col :xs="{span: 22}" :md="12" :lg="24">
              <el-tag>科技</el-tag>
              <el-tag type="success">财经</el-tag>
              <el-tag type="info">教育</el-tag>
              <el-tag type="warning">体育</el-tag>
              <el-tag type="danger">汽车</el-tag>
              <el-tag>房产</el-tag>
              <el-tag type="success">娱乐</el-tag>
            </el-col>
          </el-row>


          <el-row class="stty_il">
            <el-col :xs="4" class="item_title">奖金：</el-col>
            <el-col :xs="{span: 12}" :md="12" :lg="24">
              <el-input class="item_title non-border" v-model="inputBounce" placeholder="不填写默认为免费"/>
            </el-col>
          </el-row>

          <el-row class="stty_il">
            <el-col :xs="6" class="item_title">活动开始时间：</el-col>
            <el-col :xs="{span: 6}" :md="12" :lg="24">
              <el-time-select
                  v-model="value"
                  start="08:30"
                  step="00:15"
                  end="18:30"
                  placeholder="请选择活动开始时间"
              >
              </el-time-select>
            </el-col>
          </el-row>
          
          <el-row class="stty_il">
          <el-col :xs="6" class="item_title">活动结束时间：</el-col>
          <el-col :xs="{span: 6}" :md="12" :lg="24">
            <el-time-select
                v-model="value"
                start="08:30"
                step="00:15"
                end="18:30"
                placeholder="请选择活动结束时间"
            >
            </el-time-select>
          </el-col>
        </el-row>

        </el-card>
      </el-col>
    </el-row>


    <el-row>
      <el-col :xs="24" :md="24" :lg="12">
       
        <el-card class="box-card">
          <div class="stty_i2">创建市场信息</div>
          
          <el-row class="stty_il">
            <el-col class="item_title" :xs="12">请输入开市价格：</el-col>
            <el-col :xs="{span: 7,offset:5}" :md="12" :lg="24">
              <el-input class="item_title non-border" v-model="inputTitle" placeholder="诸葛贝计算"/>
            </el-col>
          </el-row> 
          
          <el-row class="stty_il">
            <el-col class="item_title" :xs="12">请输入市场价格与诸葛贝结算的系数：</el-col>
            <el-col :xs="{span: 7,offset:5}" :md="12" :lg="24">
              <el-input class="item_title non-border" v-model="inputTitle" placeholder="换算系数"/>
            </el-col>
          </el-row> 

          <el-row class="stty_il">
            <el-col class="item_title" :xs="20">是否为通用活动：
              <el-button  round>是</el-button>
              <el-button  round>否</el-button>
            </el-col>
          </el-row>

          <el-row class="stty_il">
            <el-col class="item_title" :xs="15">请输入赠送的合约数量：</el-col>
            <el-col :xs="{span: 6,offset:3}" :md="12" :lg="24">
              <el-input class="item_title non-border" v-model="inputTitle" placeholder="单位：份"/>
            </el-col>
          </el-row>

          <el-row class="stty_il">
            <el-col class="item_title" :xs="15">请输入赠送的诸葛贝数量：</el-col>
            <el-col :xs="{span: 6,offset:3}" :md="12" :lg="24">
              <el-input class="item_title non-border" v-model="inputTitle" placeholder="单位：个"/>
            </el-col>
          </el-row>
        
          <div class="card-footer">
            <el-button type="info" round><span>提交活动</span></el-button>
          </div>

   

        </el-card>
      </el-col>
    </el-row>

  


  </div>
</template>

<script>

export default {
  name: "PublishActivity",
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
  height:100%;
  text-align: center;

}

.card-header {
  text-align: center;
  background-color: white !important;
  font-size: 25px;
  color: #222;
  font-weight: 700;
  padding: 10px 0;
}

.stty_il {
  font-size: 15px;
  font-weight: 700;
  margin-top: 15px;
  margin-bottom: 15px;
  /*justify-content: center;*/
  /*position: absolute;*/
}
  
.stty_i2{
  text-align:center;
   font-size: 20px;
  font-weight: 700;
  margin-top: 20px;
  margin-bottom: 20px;

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
  height: 100px;
}

.card-footer{
  margin-bottom: 60px;
  margin-top:10px;
  margin-left:40%;

}

.el-button--info {
  display: inline-block;
  font-size: 15px;
  background-color:#FF3333;	
  cursor: pointer;
  text-align: center;   
  text-decoration: none;
  outline: none;
  border: none;
  border-radius: 15px;
  box-shadow: 0 9px #999;
}

.el-button--info:hover {background-color: #FF3333}

.el-button--info:active {
  background-color: #FF3333;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}



</style>
