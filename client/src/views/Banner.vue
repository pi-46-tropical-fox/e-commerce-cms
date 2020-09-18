<template>
  <div>
    <Navbar></Navbar>
    <div class="container mt-5">
      <div class="row">
        <div class="col-6">
        <router-link class="btn-sm btn-success mr-2 p-2" :to="{ name: 'AddBanner' }">Add Banner</router-link>
        <router-view></router-view>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <h2 class="mt-3">List of Banners</h2>
          <table class="table table-stripped">
            <thead class="thead-dark">
              <tr>
                <th scope="col">id</th>
                <th scope="col">title</th>
                <th scope="col">status</th>
                <th scope="col">Updated At</th>
                <th scope="col">Options</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(banner, index) in banners" :key="index">
                <td>{{ index+1 }}</td>
                <td>{{ banner.title }}</td>
                <td>{{ banner.status }}</td>
                <td>{{ banner.updatedAt }}</td>
                <td><router-link class="btn-sm btn-info" :to="{ name: 'BannerDetails', params: {id: banner.id} }">Details</router-link></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
export default {
  name: 'Banner',
  components: {
    Navbar,
    Footer
  },
  created () {
    this.$store.dispatch('getBanners')
  },
  computed: {
    banners () {
      return this.$store.getters.filteredBanners
    }
  }
}
</script>

<style>

</style>
