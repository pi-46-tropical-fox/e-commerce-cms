<template>
  <div id="app">
    <Home></Home>
  </div>
</template>
<script>
import Home from './views/Home'
export default {
  components: {
    Home
  },
  created () {
    if (localStorage.getItem('access_token')) {
      this.$store.state.isLogin = true
    } else {
      this.$store.state.isLogin = false
    }
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Londrina+Solid&family=Quicksand:wght@400;600&display=swap');
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Quicksand', sans-serif;
}
</style>
