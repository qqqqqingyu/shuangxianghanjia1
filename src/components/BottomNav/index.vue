<template>
  <div class="bottom-nav">
      <ul class="nav-container">
          <li>
              <router-link exact to="/Homepage">
                <span class="iconfont icon-shouye"></span>
                首页
              </router-link>
          </li>
          <li>
              <router-link exact to="/PublishActivity">
                <span class="iconfont icon-fabu"></span>
                发布活动
              </router-link>
          </li>
          <li>
              <router-link exact to="/">
                <span class="iconfont icon-huodong"></span>
                活动广场
              </router-link>
          </li>
          <li>
              <router-link exact to="/MyActivity">
                <span class="iconfont icon-xuexi"></span>
                我发起的
              </router-link>
          </li>
          <li>
              <router-link exact to="">
                <span class="iconfont icon-wode"></span>
                我的
              </router-link>
          </li>
      </ul>
  </div>
</template>
 
<script>
export default {
 
}
</script>
 


<style scoped>


.active {
    color: red;
}
 
.bottom-nav {
    width: 100%;
    height: 50px;
    background: #fff;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
}
 
.bottom-nav .nav-container {
    overflow: hidden;
    clear: both;
}
 
.bottom-nav .nav-container li {
    list-style-type:none;
    float: left;
    width: 20%;
    text-align: center;
}
 
.bottom-nav .nav-container li a {
    text-decoration:none;
    display: block;
    margin-top: 7px;
    font-size: 12px;
}
.bottom-nav .nav-container li a span {
    font-size: 24px;
    display: block;
}
 
</style>