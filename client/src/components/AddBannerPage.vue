<template>
  <div>
    <Navbar></Navbar>
    <AddFormBanner></AddFormBanner>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import AddFormBanner from '../components/AddFormBanner'

export default {
  name: 'AddBannerPage',
  components: {
    Navbar,
    AddFormBanner
  },
  mounted () {
    if (this.$store.state.role === '') {
      this.$router.push('/products')
    }
  }
}
</script>

<style>

</style>
