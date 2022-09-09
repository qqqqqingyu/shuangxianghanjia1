<template>
  <!--标签选择未做-->
  <div class="container">

    <!--          表单开始-->
    <el-form  :model="ActiveForm" :rules="rules" ref="ActiveForm" >

    <el-row>
      <el-col :xs="24" :md="24" :lg="12">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>活动基本信息11</span>
            </div>
          </template>

          <div class="stty_il">市场类型:
            <el-button type="danger" class="btn-margin">双向拍卖</el-button>

         
          </div>
          <el-row class="stty_il">
            <el-col class="item_title" :xs="4">标题：</el-col>
            <el-col :xs="{span: 20}" :md="20" :lg="24">
              <el-form-item prop="inputTitle">
                <el-input class="item_title non-border" v-model="ActiveForm.inputTitle" placeholder="请输入活动标题"/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row class="stty_il">
            <el-col :xs="4" class="title-mb">描述：</el-col>
            <el-col :xs="{span: 24}" :md="24" :lg="24">
              <el-form-item prop="inputDesCri">
                <el-input :rows="4" class="item_title inputDesCri" resize="none" type="textarea" v-model="ActiveForm.inputDesCri" placeholder="请输入活动描述"/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row class="stty_il">
            <el-col class="item_title title-mb" :xs="4">类别：</el-col>
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
            <el-col :xs="{span: 16}" :md="16" :lg="24">
              <el-form-item prop="inputAward">
<!--                奖金只能填非负整数，数据类型int-->
                <el-input type="number" class="item_title non-border" v-model.number="ActiveForm.inputAward"
                          placeholder="不填写默认为免费" oninput ="value=value.replace(/[^\d]/g,'')" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row class="stty_il">
            <el-col :xs="8" class="item_title">活动开始时间：</el-col>
            <el-col  :xs="{span: 16}" :md="16" :lg="24">
              <el-form-item prop="inputProStartTime">
                <el-date-picker
                    v-model="ActiveForm.inputProStartTime"
                    type="datetime"
                    placeholder="请选择活动开始时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row class="stty_il">
          <el-col :xs="8" class="item_title">活动结束时间：</el-col>
          <el-col :xs="{span: 16}" :md="16" :lg="24">
            <el-form-item prop="inputProEndTime">
              <el-date-picker
                  v-model="ActiveForm.inputProEndTime"
                  type="datetime"
                  placeholder="请选择活动结束时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

          <el-row class="stty_il">
            <el-col :xs="7" class="title-mb">验证资料：</el-col>
            <el-col :xs="{span: 24}" :md="24" :lg="24">
              <el-form-item prop="inputVerifyMaterial">
                <el-input :rows="4" class="item_title inputDesCri" resize="none" type="textarea" v-model="ActiveForm.inputVerifyMaterial" placeholder="请输入验证资料"/>
              </el-form-item>
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
              <el-form-item prop="inputMktPc">
<!--              开市价格不得为负，数据类型Decimal，这里设为非零整数或小数。-->
                <el-input type="number" class="item_title non-border" v-model="ActiveForm.inputMktPc"
                          placeholder="诸葛贝" oninput ="value=value.replace(/[^0-9.]/g,'')" />
              </el-form-item>
            </el-col>
          </el-row> 
          
          <el-row class="stty_il">
            <el-col class="item_title" :xs="17">请输入市场价格与诸葛贝结算的系数：</el-col>
            <el-col :xs="{span: 7}" :md="12" :lg="24">
              <el-form-item prop="inputPcCvr">
<!--                系数不得为负，数据类型为float，这里设为非零整数或小数。-->
                <el-input type="number" class="item_title non-border" v-model="ActiveForm.inputPcCvr"
                          placeholder="换算系数" oninput ="value=value.replace(/[^0-9.]/g,'')" />
              </el-form-item>
            </el-col>
          </el-row>


          <el-row class="stty_il">
            <el-col class="item_title" :xs="15">请输入赠送的合约数量：</el-col>
            <el-col :xs="{span: 7,offset:2}" :md="12" :lg="24">
              <el-form-item prop="inputContractFree">
                <!--                合约数为整数，数据类型int-->
                <el-input type="number" class="item_title non-border" v-model.number="ActiveForm.inputContractFree" placeholder="单位：份" oninput ="value=value.replace(/[^\d]/g,'')"/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row class="stty_il">
            <el-col class="item_title" :xs="24">是否为通用活动：
              <el-radio class="is_gen_radio" v-model="ActiveForm.inputIsGen" label="1" border>是</el-radio>
              <el-radio v-model="ActiveForm.inputIsGen" label="0" border>否</el-radio>
            </el-col>
          </el-row>

          <span v-if="ActiveForm.inputIsGen==0">
          <el-row class="stty_il">
            <el-col class="item_title" :xs="15">请输入赠送的诸葛贝数量：</el-col>
            <el-col :xs="{span: 7,offset:2}" :md="12" :lg="24">
              <el-form-item prop="inputCoinFree">
<!--                诸葛贝不得为负，数据类型Decimal，这里设为非零整数或小数。-->
                <el-input type="number" class="item_title non-border" v-model.number="ActiveForm.inputCoinFree"
                          placeholder="单位：个" oninput ="value=value.replace(/[^0-9.]/g,'')" />
              </el-form-item>
            </el-col>
          </el-row>
          </span>

          <div class="card-footer">
            <el-button type="info" round @click="startActivityMethod"><span>提交活动</span></el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

    </el-form>
<!--    表单结束-->
  </div>
  <FloatBall :text="'跳转LSMR'"></FloatBall>
</template>

<script>
import {
  startActivity
} from '@/api/auction'
import FloatBall from '@/components/FloatBall';


export default {
  name: "PublishActivity",
  components:{
    FloatBall
  },
  data() {
    return {
      ActiveForm:{
        //活动基本信息
        inputTitle:'',
        inputDesCri:'',
        inputAward:'', //奖金
        inputProStartTime:'', //活动开始时间
        inputProEndTime:'', //活动结束时间
        inputVerifyMaterial:'', //验证资料
        //市场信息
        inputMktPc:'', //开市价格
        inputPcCvr:'', //价格换算比例
        inputIsGen:null, //是否为通用活动，0为不通用,1为通用。为0时需要填写以下两个
        isGen:'', //是否为通用的文字表述，用于弹窗显示
        inputContractFree:'', //赠送的合约数
        inputCoinFree:'', //赠送的诸葛贝
      },
      //弹框
      messageBoxText:'', //弹框的文字提示
      //填写表单时的提示
      //已对填入数字的文本框做了限制，不会出现小于0的情况。但rules中也写了相应的提示语句。
      rules: {
        inputTitle:[
          { required: true, message: '标题不得为空',trigger: 'blur'}
        ],
        inputDesCri:[
          { required: true, message: '描述不得为空',trigger: 'blur'}
        ],
        inputAward:[
          { type:"number" ,min:0, message: '奖金不得小于0',trigger: 'blur'}
        ],
        inputProStartTime: [
          { type: 'date', required: true, message: '活动开始时间不得为空', trigger: 'change' }
        ],
        inputProEndTime: [
          { type: 'date', required: true, message: '活动结束时间不得为空', trigger: 'change' }
        ],
        inputVerifyMaterial:[
          {required: true, message: '验证资料不得为空',trigger: 'blur'},
        ],
        inputMktPc:[
          {required: true, message: '开市价格不得为空',trigger: 'blur'}
        ],
        inputPcCvr: [
          {required: true, message: '换算系数不得为空',trigger: 'blur'},
        ],
        inputContractFree:[
          {required: true, message: '合约数量不得为空',trigger: 'blur'},
          { type:"number" ,min:0, message: '合约数量不得小于0',trigger: 'blur'}
        ],
        inputCoinFree:[
          {required: true, message: '赠送诸葛贝数量不得为空',trigger: 'blur'},
          { type:"number" ,min:0, message: '赠送诸葛贝数量不得小于0',trigger: 'blur'}
        ]
      }
    };
  },
  methods : {
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
    // active为活动信息 须组装后提交 注意字段非空判断（参考接口文档）以下代码仅做参考
    startActivityMethod() {
      let active = {};
      // 数据校验，若不符合条件则终止
      if(this.ActiveForm.inputTitle.length==0){
        alert("未输入标题");
        return;
      }
      if(this.ActiveForm.inputDesCri.length==0){
        alert("未输入描述");
        return;
      }
      if(this.ActiveForm.inputAward.length==0){
        this.ActiveForm.inputAward=0;
      }
      if(this.ActiveForm.inputProStartTime.length==0){
        alert("未输入活动开始时间");
        return;
      }
      if(this.ActiveForm.inputProEndTime.length==0){
        alert("未输入活动结束时间");
        return;
      }
      if(this.ActiveForm.inputProStartTime>this.ActiveForm.inputProEndTime){
        alert("活动开始时间晚于活动结束时间");
        return;
      }
      if(this.ActiveForm.inputVerifyMaterial.length==0){
        alert("未输入验证资料");
        return;
      }
      if(this.ActiveForm.inputMktPc.length==0){
        alert("未输入开市价格");
        return;
      }
      if(this.ActiveForm.inputPcCvr.length==0){
        alert("未输入换算系数");
        return;
      }
      if(this.ActiveForm.inputIsGen.length==0){
        alert("未选择是否为通用活动");
        return;
      }
      if(this.ActiveForm.inputContractFree.length==0){
        alert("未输入赠送的合约数量");
        return;
      }
      if(this.ActiveForm.inputIsGen==0){ //不是通用活动
        if(this.ActiveForm.inputCoinFree.length==0){
          alert("未输入赠送的诸葛贝数量");
          return;
        }
        active.coin_free = this.ActiveForm.inputCoinFree
        //弹框显示
        this.isGen = '否';
        this.messageBoxText = '活动名称：'+this.ActiveForm.inputTitle+'<br>开市价格：'+this.ActiveForm.inputMktPc
            +'<br>市场价格与诸葛贝结算的换算系数：'+this.ActiveForm.inputPcCvr+'<br>赠送的合约数量：'+this.ActiveForm.inputContractFree
            +'<br>是否为通用：'+this.isGen +'<br>赠送的诸葛贝数量：'+this.ActiveForm.inputCoinFree
      }else if(this.ActiveForm.inputIsGen==1){  //是通用活动
        this.isGen = '是';
        this.messageBoxText = '活动名称：'+this.ActiveForm.inputTitle+'<br>开市价格：'+this.ActiveForm.inputMktPc
            +'<br>市场价格与诸葛贝结算的换算系数：'+this.ActiveForm.inputPcCvr+'<br>赠送的合约数量：'+this.ActiveForm.inputContractFree
              +'<br>是否为通用：'+this.isGen
      }

      this.ActiveForm.inputProStartTime = this.formatTimer(this.ActiveForm.inputProStartTime)
      this.ActiveForm.inputProEndTime = this.formatTimer(this.ActiveForm.inputProEndTime)

      active.title = this.ActiveForm.inputTitle
      active.desc = this.ActiveForm.inputDesCri
      active.award = this.ActiveForm.inputAward
      active.pro_start_time = this.ActiveForm.inputProStartTime
      active.pro_end_time = this.ActiveForm.inputProEndTime
      active.verify_material = this.ActiveForm.inputVerifyMaterial
      active.market_price = this.ActiveForm.inputMktPc
      active.price_conversion = this.ActiveForm.inputPcCvr
      active.is_gen=this.ActiveForm.inputIsGen
      active.contract_free = this.ActiveForm.inputContractFree

      // 弹出的提示框
      this.$confirm(this.messageBoxText, '请确认如下信息', {
        dangerouslyUseHTMLString: true,
        center: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {  // 选择确定时运行这段代码
        startActivity(active).then(response => {
          console.log('4.1 发起活动')
          console.log(response.data)
          this.$message({
            type: 'success',
            message: '发起活动成功，请等待审核员审核。'
          });
        }).catch(() => { //提交数据失败
          this.$message({
            type: 'info',
            message: '发起活动失败，请重试'
          });
        });
      })
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

.is_gen_radio {
  margin-right: 5px;
}
.btn-margin{
  margin-right: 5%;
  margin-left: 5%;
}
.title-mb{
  margin-bottom: 10px;
}

</style>
