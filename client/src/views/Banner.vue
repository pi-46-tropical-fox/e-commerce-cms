<template>
  <div id="banner">
    <BannerList />
  </div>
</template>

<script>
import BannerList from '@/components/banner/List.vue'

export default {
  name: "Banner",
  components: {
    BannerList
  },
  mounted() {
    this.$store.dispatch('getBanners')
  },
}
</script>

<style>

</style>