<template>
  <div>
      <NavbarHome/>
      <Loading v-if="$store.state.loadingStatus"/>
          <!-- {{$store.state.selectedData}} -->
          <div class="container" v-if=" activity == 'showBanner'" >
        <table class="table table-hover" style="font-size: 1.2em">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Id Banner</th>
              <th scope="col">Title</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
          <BannerCard v-for="(banner,index) in data" :key="index"
          :itemData="banner" :number="index"  @removeData="removeItem"></BannerCard>
          </tbody>
        </table>
        </div>

         <!-- <div v-if=" activity == 'showBanner'" >
         <button type="submit" class="btn btn-primary" @click="goToCreateBanner">Create More</button>
        <BannerCard
          v-for="banner in data" :key="banner.id"
          :itemData="banner"  @removeData="removeItem"></BannerCard>
         </div> -->
          <div v-else-if="activity=='createBanner'">
            <CreateBannerForm> </CreateBannerForm>
          </div>

    </div>
</template>

<script>
import NavbarHome from '../components/NavbarHome.vue'
import BannerCard from '../components/BannerCard.vue'
import CreateBannerForm from '../components/CreateBannerForm.vue'
import Loading from '../components/Loading.vue'
export default {
  name: 'Banners',
  components: {
    NavbarHome,
    BannerCard,
    CreateBannerForm,
    Loading
  },
  data () {
    return {
      activity: ''
    }
  },
  computed: {
    data () {
      // return this.$store.getters.filterByCategory
      return this.$store.state.banners
    }
  },
  methods: {
    fetchBanners () {
      this.activity = 'showBanner'
      this.$store.dispatch('fetchBanners')
    },
    removeItem (id) {
      this.$store.state.banners = this.$store.state.banners.filter(banner => banner.id !== id)
    },
    goToCreateBanner () {
      this.activity = 'createBanner'
    }
  },
  created () {
    this.fetchBanners()
  }
}
</script>

<style>

</style>
