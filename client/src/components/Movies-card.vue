<template>
  <tbody>
    <tr
      v-for="(movie, index) in movies"
      :key="movie.id"
    >
      <th scope="row">{{index+1}}</th>
      <td class="w-25">
        <img :src="movie.image_url" class="img-fluid img-thumbnail" :alt="movie.name">
      </td>
      <td>{{ movie.name }}</td>
      <td>{{ movie.price }}</td>
      <td>{{ movie.stock }}</td>
      <td class="d-flex justify-content-around">
        <button class="btn btn-info" style="width: 80px; margin-left: -30px;">
          <router-link class="btn" :to="{ name: 'Edit', params:{id: movie.id} }" style="color: #fff;">Edit</router-link>
        </button>
        <a @click.prevent="deleteItem(movie.id)" class="btn btn-danger d-flex align-items-center justify-content-center" style="width: 80px;">Delete</a>
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
          this.$store.dispatch("deleteItem", id)
        }
      })
    }
  },
  computed: {
    movies(){
      return this.$store.state.movies
    }
  },
  created(){
    this.$store.dispatch("fecthMovies")
  }
}
</script>

<style>

</style>
