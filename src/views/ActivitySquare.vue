<template>
<!--  筛选功能未做-->
  <div class="container">

    <el-row>
      <el-col :xs="24" :md="24" :lg="12">

        <el-row class="el-select">
          <el-col :xs="6">
            <span class="li">市场类型</span>
            <el-select v-model="valueMarketType" clearable placeholder="请选择" size="small">
              <el-option
                  v-for="item in marketType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>

          <el-col :xs="6">
            <span class="li">活动类型</span>
            <el-select v-model="valueActivityType" clearable placeholder="请选择" size="small">
              <el-option
                  v-for="item1 in activityType"
                  :key="item1.value"
                  :label="item1.label"
                  :value="item1.value"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :xs="6">
            <span class="li">状态</span>
            <el-select v-model="valueStatus" clearable placeholder="请选择" size="small">
              <el-option
                  v-for="item in status"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :xs="6">
            <span class="li">我的活动</span>
            <el-select v-model="valueActivity" clearable placeholder="请选择" size="small">
              <el-option
                  v-for="item in myActivity"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
          <div class="head_ti">双向拍卖市场简介</div>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <div v-for="item in tableData.data" :key='item' style="display: flex;flex-direction: column-reverse">
        <div v-if="item.category_type==='radio'">
          <el-form-item :label="item.category_name" prop="radio">
            <el-row>
              <el-col :xs="24" :sm="12" :md="8" :lg="4" :xl="3" v-for="category in item.categories" :key='category'>
                <el-radio v-model="ruleForm.marked_category[item.category_name]" :value="category" :label="category"
                          border>{{ category }}
                </el-radio>
              </el-col>
            </el-row>
          </el-form-item>
        </div>
      </div>

      <el-col :xs="24" :md="24" :lg="24">
        <div v-for="item in this.tableData" :key='item'>
          <el-card class="box-card">
              <div class="stty_il">
                <span >{{item.title}}</span>
              </div>
            <el-row class="card-tag" >
              <el-tag type="primary" class="card-tag-margin">LMSR</el-tag>
              <el-tag type="warning" class="card-tag-margin">财经</el-tag>
              <el-tag type="warning" class="card-tag-margin">北向资金</el-tag>
              <el-tag type="warning" class="card-tag-margin">进行中</el-tag>
            </el-row>
            <el-row class="stty_i2">
              <el-col :xs="4" :md="2" >活动时间:</el-col>
              <el-col :span="19" :offset="1" align="left" >{{formatTimer(item.pro_start_time)}}-{{formatTimer(item.pro_end_time)}}</el-col>
            </el-row>
            <el-row class="card-huodong">
              <el-col :span="8" align="left">
                <el-tooltip popper-class="test line-feed" class="item" effect="light" :content="tips" placement="right">
                  <i class="el-icon-question" />
                </el-tooltip>
                活动奖金：
              </el-col>
              <el-col :span="14" :offset="1" align="left">
                <i class="el-icon-coin" type="success"></i> {{item.award}}
              </el-col>
            </el-row>
            <el-row>
              <el-col :xs="8" :md="4" align="left">
<!--              目的是和上面对齐，不需要显示小问号-->
              <el-tooltip style="visibility: hidden">
                <i class="el-icon-question" />
              </el-tooltip>
              活动描述：
              </el-col>
              <el-col :span="14" :offset="1" align="left">
                {{item.desc}}
              </el-col>
            </el-row>
            <el-row class="card-button" gutter="3">
              <el-link id="link-check">
                <el-button type="warning" round @click="jumpToCheck(item.id)">参与活动</el-button>
              </el-link>
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
// @ is an alias to /src
// import Header from '@/components/Header.vue'
import {
  getCdaActivitySquare
} from '@/api/auction'
// import baseUrl from '../router/api_url.js';
import {mapMutations} from 'vuex';
import FloatBall from '@/components/FloatBall';

export default {
  name: 'Login',
  components:{
    FloatBall
  },
  data() {
    return {
      login: true,
      email: "",
      password: "",
      tableData:'',
      alert_code: "",
      alert_message: '',
      marketType: [{
        value: '全部',
        label: '全部'
      },{
        value: 'LMSR',
        label: 'LMSR'
      }, {
        value: '双向拍卖',
        label: '双向拍卖'
      }],
      activityType:[{
        value: '全部',
        label: '全部'
      }, {
        value: '推荐',
        label: '推荐'
      }, {
        value: '社会',
        label: '社会'
      }, {
        value: '财经',
        label: '财经'
      }, {
        value: '科技',
        label: '科技'
      }, {
        value: '娱乐',
        label: '娱乐'
      }, {
        value: '体育',
        label: '体育'
      }, {
        value: '汽车',
        label: '汽车'
      }, {
        value: '房产',
        label: '房产'
      }, {
        value: '教育',
        label: '教育'
      }],
      status: [{
        value: '全部',
        label: '全部'
      },{
        value: '预热中',
        label: '预热中'
      },{
        value: '进行中',
        label: '进行中'
      },{
        value: '已结束',
        label: '已结束'
      },{
        value: '结果待揭晓',
        label: '结果待揭晓'
      },{
        value: '已结算',
        label: '已结算'
      }
      ],
      myActivity:[{
        value: '全部',
        label: '全部'
      },{
        value: '关注过',
        label: '关注过'
      },{
        value: '预测过',
        label: '预测过'
      },{
        value: '已报名',
        label: '已报名'
      }],
      valueMarketType:'全部',
      valueActivityType:'全部',
      valueStatus:'全部',
      valueActivity:'全部',
      tips:'参与活动主要目的是学习与自我成长，设置少量现金奖励是为了带来更多的乐趣。' +
          '平台根据活动结束后用户在该活动中拥有财富的比例分配奖金。'
    }
  },
  mounted() {
    this.initial();

  },
  methods: {
    ...mapMutations(['setToken']),
    setErrors(e) {
      window.alert(e)
    },
    initial() {
      getCdaActivitySquare().then(response => {
        this.tableData = response.data
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
    //把跳转链接写入超链接中
    jumpToCheck:function (id){
      let url = 'http://47.108.189.227:8000/activity/cda/'+id+'/join'
      alert('跳转至'+url)
      document.getElementById("link-check").href=url;
    }
  }
}
</script>

<style>
.container {
  height:100%;
  text-align: center;
}
.li{
  font-size:13px;
  font-weight:700;

}


.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box-card {
  width: 100%;
  text-align: left;
  margin: 2px;
  background-color: white !important;
}

.stty_il {
  text-align: left;
  font-size: 16px;
  font-weight: 700;
  margin-top: 15px;
  margin-bottom: 15px;
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
  font-weight: 500;
  margin:auto;
  height:50px;
  width:100%;
  padding-top: 10px;
  border: #DCDCDC 1px solid;
}
.box-card {
  width: 100%;
  text-align: center;
  margin: 2px;
}
.card-tag-margin{
  margin-right: 5px
}
.btn-margin{
  margin-right: 5%
}
.test{
  background: rgba(255,255,255,0.9) !important;
  color: 	#708090;
}
.line-feed{
  max-width: 200px;
}

</style>
