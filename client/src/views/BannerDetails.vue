<template>
  <div>
    <div class="container mt-5">
      <div class="row">
        <div class="col-12">
          <router-link :to="{ name: 'Banner' }">Back to Mainpage</router-link>
        </div>
      </div>
    </div>
    <div class="container mt-5">
      <div class="row">
        <div class="col-12">
          <img :src="banner.image_url" class="card-img-top" alt="">
        </div>
      </div>
    </div>
    <div class="container mt-5">
      <h2>Banner Details</h2>
      <div class="row mt-5">
        <div class="col-6">
          <div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title text-center">{{ banner.title }}</h5>
              <small class="card-text">Last Update: {{ banner.updatedAt }}</small>
              <a href="#" class="btn btn-danger mt-3" @click.prevent="deleteItem">Delete</a>
            </div>
          </div>
        </div>
        <div class="col-6">
          <router-link class="btn btn-warning" :to="{ name: 'EditBanner' }">Edit Banner</router-link>
          <router-view></router-view>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '../components/Footer'
export default {
  name: 'BannerDetails',
  components: {
    Footer
  },
  created () {
    const payload = this.$route.params.id
    this.$store.dispatch('getBannerById', payload)
  },
  computed: {
    banner () {
      return this.$store.state.banner
    }
  },
  methods: {
    deleteItem () {
      const payload = this.$route.params.id
      this.$store.dispatch('deleteBanner', payload)
    }
  }
}
</script>

<style>

</style>
