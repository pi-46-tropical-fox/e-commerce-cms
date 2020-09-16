<template>
  <div id="app">
    <Home
     v-if="currentPage === 'home'">
    </Home>
  </div>
</template>
<script>
import Home from './views/Home'
export default {
  data () {
    return {
      currentPage: 'login'
    }
  },
  components: {
    Home
  },
  created () {
    if (localStorage.getItem('access_token')) {
      this.currentPage = 'home'
    } else {
      this.currentPage = 'login'
    }
  }
}
</script>
<style>

</style>
