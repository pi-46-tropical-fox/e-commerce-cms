<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home | </router-link>
      <router-link to="/Login" v-if="!isLogin">Login | </router-link>
      <router-link to="/dashboard" v-if="isLogin">Dashboard | </router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'AddPage',
  data () {
    return {
    }
  },
  computed: {
    isLogin() {
      if(this.$store.state.isLogin){
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    checkIsLogin(){
      this.$store.dispatch('isLogin')
    }
  },
  created(){
    this.checkIsLogin()
  }
}
</script>

<style>

</style>
