import Element from 'element-ui'; 
import 'element-ui/lib/theme-default/index.css';
Vue.use(Element);

<template>
<!--  <div id="nav">-->
<!--    <router-link to="/">Login</router-link> |-->
<!--    <router-link to="/about">About</router-link>-->
<!--  </div>-->
  <router-view/>
  <BottomNav />

</template>

<script>
  import BottomNav from "./components/BottomNav" 

  export default{
    components:{
      BottomNav
    }
  }
</script>

<style>
*{
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  height: 100%;
}

#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}


</style>
