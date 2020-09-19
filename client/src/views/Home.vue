<template>
  <div class="home">
    <navbar></navbar>
    <img alt="Vue logo" src="../assets/logo.png">
    <productCard ></productCard>
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src

import navbar from '../components/navbar'
import productCard from '../components/productCard'

export default {
  name: 'Home',
  components: {
    productCard,
    navbar
  },
  methods:{
    fetch(){
      return this.$store.dispatch('fetchData')
    }
  },
  created(){
    this.fetch()
  }

}
</script>
