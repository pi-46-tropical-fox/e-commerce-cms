<template>
  <div id="app">
    <Home
     v-if="$store.state.currentPage === 'home'">
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
      this.$store.state.currentPage = 'home'
    } else {
      this.$store.state.currentPage = 'login'
    }
  }
}
</script>
<style>

</style>
