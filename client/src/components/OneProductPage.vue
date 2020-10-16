<template>
  <div class="">
    <Navbar></Navbar>
    <OneProduct></OneProduct>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import OneProduct from '../components/OneProduct'

export default {
  name: 'OneProductPage',
  components: {
    Navbar,
    OneProduct
  },
  mounted () {
    // console.log(this.$store.state.isLogin)
    if (this.$store.state.role === '') {
      this.$router.push('/products')
    }
  }

}
</script>

<style>

</style>
