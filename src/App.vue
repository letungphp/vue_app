<template>
  <div id="app">

    <router-link to="/">Home</router-link>
    <router-link to="/todo">Todo</router-link>
    <button @click="logout()">Logout</button>
    <div v-show="showloading" > Processing ... </div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {

  },
  data() {
    return {
      
    };
  },
  computed : {
    showloading (){
      this.$store.getters.showloading
    }
  },
  methods : {
    'logout' : function(){
      this.$store.dispatch( 'A_LOGOUT').then(()=>{
        this.$router.push('/login');
      });;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
