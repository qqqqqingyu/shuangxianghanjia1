<template>
  <Header msg="数据标注系统" mainPage="首页" settings=""/>
  <!--  <Header msg="数据标注系统" mainPage="首页" settings="个人中心"/>-->
  <br><br>
  <el-row>
    <el-col :xs="0" :md="1" :lg="2">
    </el-col>
    <el-col :xs="0" :md="1" :lg="4">
    </el-col>
    <el-col :xs="0" :sm="6" :md="6" :lg="4">
      <el-button><p class="page">已标记页数：{{ marked_count }}/剩余可标记页数:{{ left_count }}</p></el-button>
    </el-col>
    <el-col :xs="2" :sm="2" :md="4" :lg="4">
    </el-col>
    <el-col :xs="4" :sm="4" :md="3" :lg="2">
      <el-button><p class="page">当前页数：{{ marked_index }}</p></el-button>
    </el-col>
    <el-col :xs="4" :sm="6" :md="6" :lg="4">
      <JumpTo :marked_count="marked_count" @jumpToMarkedIndex="submitAndGetClassify"></JumpTo>
    </el-col>
    <el-col :xs="0" :md="2">
    </el-col>
  </el-row>

  <el-row :gutter="20">
    <el-col :xs="0" :md="2" :lg="4">
    </el-col>
    <el-col :xs="3" :md="2" :lg="2" class="changeButton">
    </el-col>
    <el-col :md="17" :lg="12" class="textarea">
      <AddText :content="content" :title="title"></AddText>
    </el-col>
    <el-col :xs="3" :md="2" :lg="2" class="changeButton">
    </el-col>
    <el-col :xs="0" :md="2" :lg="4">
    </el-col>
  </el-row>

  <el-row :gutter="30">
    <el-col :xs="3" :sm="4" :md="6" :lg="6">
    </el-col>
    <el-col :xs="3" :sm="4" :md="2" :lg="2" class="changeButton">
      <ButtonBefore :marked_index="marked_index" @preMarkedIndex="submitAndGetClassify"></ButtonBefore>
    </el-col>
    <el-col :xs="4" :sm="4" :md="4" :lg="4">
    </el-col>
    <el-col :xs="4" :sm="4" :md="3" :lg="5">
    </el-col>
    <el-col :xs="3" :sm="4" :md="2" :lg="2" class="changeButton">
      <ButtonNext :marked_index="marked_index" @nextMarkedIndex="submitAndGetClassify"></ButtonNext>
    </el-col>
    <el-col :xs="3" :sm="4" :md="6" :lg="6">
    </el-col>
  </el-row>
  <br><br>
  <AddOptions :category_data="category_data" ref="RefAddOptions"></AddOptions>
  <br>
  <SaveAndSubmit></SaveAndSubmit>
  <br><br><br>
  <FloatBall :text="'跳转LSMR'"></FloatBall>
</template>


<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import SaveAndSubmit from "@/components/SaveAndSubmit";
import ButtonBefore from "@/components/ButtonBefore";
import AddText from "@/components/AddText";
import ButtonNext from "@/components/ButtonNext";
import JumpTo from "@/components/JumpTo";
import AddOptions from "@/components/AddOptions";
import {get, post} from "axios";
import {mapGetters} from "vuex";
import 'element-plus/lib/theme-chalk/display.css';
import FloatBall from '@/components/FloatBall';

export default {
  name: 'Classify',
  data() {
    return {
      marked_count: '',
      left_count: '',
      marked_index: '',
      marked_category: [],
      api_submit_classify: "/api/submit_classify/" + this.$route.query.taskId,
      api_get_classify: "/api/get_classify/" + this.$route.query.taskId,
      api_get_category: "/api/get_category/" + this.$route.query.taskId,
      category_data: [],

      title: this.$route.query.title,
      content: '',
      headersConfig: {
        headers: {
          Authorization: this.getToken(),
          'Content-Type': 'application/json'
        }
      }
    }
  },
  components: {
    JumpTo,
    ButtonNext,
    AddText,
    ButtonBefore,
    SaveAndSubmit,
    Header,
    AddOptions,
    FloatBall
  },
  methods: {
    ...mapGetters(['getToken']),

    gen_submit_data() {
      let marked_category = this.$refs.RefAddOptions.getCategories()
      return {
        "marked_index": this.marked_index,
        "marked_category": marked_category,
      }
    },


    genClassifyData(marked_index) {

      let data = new FormData();
      data.append('marked_index', marked_index);
      return data
    },

    //上一页，下一页，跳转 调用
    submitAndGetClassify(toMarkedIndex) {
      console.log("submitAndGetClassify toMarkedIndex " + toMarkedIndex)
      post(this.api_submit_classify, this.gen_submit_data(), this.headersConfig)
          .then((res) => {
            if (res.data.code === 200) {
              //填充数据
              console.log(res)
              //  提交之后，获取任务
              this.$refs.RefAddOptions.cleanCategories()
              return post(this.api_get_classify, this.genClassifyData(toMarkedIndex), this.headersConfig)
            } else {
              alert("提交出错")
              //  提示提交出错
            }
          })
          .then((res) => {
            if (res.data.code === 200) {
              //填充数据
              this.fill_data(res.data.data)
              console.log(res)
            }
          })
          .catch((res) => {
                console.log(res);
              }
          );
    },

    //保存按钮，全部提交按钮 调用
    submitClassify() {
      post(
          this.api_submit_classify,
          this.gen_submit_data(),
          this.headersConfig
      )
          .then((res) => {
            if (res.data.code === 200) {
              //填充数据
              console.log(res)
            } else {
              //提示提交出错
            }
          })
          .catch((res) => {
                console.log(res);
              }
          );
    },

    fill_data(data) {
      //  填充数据
      this.content = data.content
      this.marked_count = data.marked_count
      this.marked_index = data.marked_index
      this.left_count = data.left_count
      this.$refs.RefAddOptions.setCategories(data.marked_category)
    },

    //第一次进入分类界面调用
    getCategory() {
      console.log(this.headersConfig)
      get(this.api_get_category, this.headersConfig)
          .then((res) => {
            if (res.data.code === 200) {
              console.log(res.data.data)
              this.category_data = res.data.data
              this.$refs.RefAddOptions.createVModel(this.category_data)
              //获取已标记的对后一个任务
              return get(this.api_get_classify, this.headersConfig)
            } else {
              console.log('get category error')
            }
          })
          .then((res) => {
            if (res.data.code === 200) {
              //第一次进入界面，循环marked_category字段，填入已标记选项，填充数据
              this.fill_data(res.data.data)
              console.log(res)
            }
          })
          .catch((res) => {
                console.log(res);
              }
          );
    },
  }
  ,
  mounted() {
    this.getCategory()
    // this.$refs.RefAddOptions.createVModel(this.category_data)
  }

}

</script>

<style>

html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

.changeButton {
  margin-top: 30px;
}
</style>

