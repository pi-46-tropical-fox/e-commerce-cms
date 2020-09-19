<template>
  <tbody>
    <tr
      v-for="(banner, index) in banners"
      :key="banner.id"
    >
      <th scope="row">{{index+1}}</th>
      <td class="w-25">
        <img :src="banner.image_url" class="img-fluid img-thumbnail" :alt="banner.title">
      </td>
      <td>{{ banner.title }}</td>
      <td class="d-flex justify-content-around">
        <button class="btn btn-info" style="width: 80px; margin-left: -30px;">
          <router-link class="btn" :to="{ name: 'EditBanner', params:{id: banner.id} }" style="color: #fff;">Edit</router-link>
        </button>
        <a @click.prevent="deleteItem(banner.id)" class="btn btn-danger d-flex align-items-center justify-content-center" style="width: 80px;">Delete</a>
      </td>
    </tr>
  </tbody>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  methods: {
    deleteItem(id){
      Swal.fire({
        title: 'Are you sure to delete this item?',
        showCancelButton: true,
        confirmButtonText: `Yes`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch("deleteBanner", id)
        }
      })
    }
  },
  computed: {
    banners(){
      return this.$store.state.banners
    }
  },
  created(){
    this.$store.dispatch("fecthBanners")
  }
}
</script>

<style>

</style>
