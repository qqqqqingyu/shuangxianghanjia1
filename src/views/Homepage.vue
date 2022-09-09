<template>
  <div class="container">
    <div class="banner"></div>
    <div class="market-type ">
        <span>请选择市场类型</span>
    </div>

    <router-link exact to="/">
      <div class="market-info stty_il">
        <span class="market-title">双向拍卖市场</span>
        <div>简介</div>
      </div>
    </router-link>

    <router-link exact to="" class="stty_il">
      <div class="market-info">
        <span class="market-title">LMSR市场</span>
        <div>
          简介
        </div>
      </div>
    </router-link>
  </div>
  <FloatBall :text="'跳转LSMR'"></FloatBall>

</template>

<script>
import FloatBall from '@/components/FloatBall';

export default {
  name: "Homepage",
  components:{
    FloatBall
  },
  data() {
    return{
      marketType:'0'
    }
  }
}
</script>

<style scoped>
.container {
  height:100%;
  text-align: center;
}
.market-radio>>>.el-radio-button__orig-radio:checked+.el-radio-button__inner{
  background: #E6A23C;
  border-color:#FFA963;
  box-shadow:-1px 0 0 0 #E6A23C ;
}
.market-info{
  border: #DCDCDC 1px solid;
  height: 200px;
  text-align: center;
  padding-top: 20px;
  padding-bottom: 20px;
}
.market-title{
  font-size: 20px;
}
.banner{
  height: 120px;
}
.market-type{
  text-align: center;
  border: #DCDCDC 1px solid;
  padding: 15px;
  font-size: 28px;
  font-weight: 600;
  color: #3E4756;
}
a {
  text-decoration: none;
  color: #3E4756;
}
</style>