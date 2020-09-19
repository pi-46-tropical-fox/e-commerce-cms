<template>
<!-- table Banner START -->
  <div>
    <h2>List of Banners</h2>
    <div class="info">
        <table class="table">
            <thead class="thead-dark">
                <tr class="text-center">
                    <th scope="col">No.</th>
                    <th scope="col">Campaign's Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Status</th>
                    <th scope="col">Display</th>
                    <th scope="col">Option</th>
                </tr>
            </thead>
            <tbody class="table-bordered">
            <!-- looping data START -->
            <TableDataBanner
            v-for="(banner, index) in $store.state.banners"
            :key="banner.id" :index="index" :banner="banner">
            </TableDataBanner>
            <!-- looping data END -->
            </tbody>
        </table>
    </div>
  </div>
<!-- table banner END -->
</template>

<script>
import TableDataBanner from '../components/TableDataBanner.vue'

export default {
  name: 'BannerTable',
  components: {
    TableDataBanner
  },
  created () {
    this.$store.dispatch('showBanners')
  }
}
</script>

<style scoped>

</style>
