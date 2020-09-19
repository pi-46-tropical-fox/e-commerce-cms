<template>
  <div class="">
    <Navbar></Navbar>
    <OneBanner></OneBanner>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import OneBanner from '../components/OneBanner'

export default {
  name: 'OneBannerPage',
  components: {
    Navbar,
    OneBanner
  },
  mounted () {
    // console.log(this.$store.state.isLogin)
    if (this.$store.state.role === '') {
      this.$router.push('/banners')
    }
  }

}
</script>

<style>

</style>
