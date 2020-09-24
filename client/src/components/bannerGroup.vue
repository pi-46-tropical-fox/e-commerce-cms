<template>
  <div class="container">
    <div class="mb-5">
      <h1>Banner List</h1>
    </div>
    <div>
      <b-alert :variant="color" show v-if="notification[0]">{{notification[0]}}</b-alert>
      <banner class="mb-3"
        v-for="banner in banners"
        :key="banner.id"
        :banner="banner"
      ></banner>
    </div>
  </div>
</template>

<script>
import banner from './banner'

export default {
  name: 'bannerGroup',
  components: {
    banner
  },
  computed: {
    banners () {
      return this.$store.state.banners
    },
    notification: {
      get () {
        return this.$store.state.notification
      }
    },
    color: {
      get () {
        return this.$store.state.color
      }
    }
  },
  created () {
    return this.$store.dispatch('fetchBanners')
  }

}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
}

</style>
