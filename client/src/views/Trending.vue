<template>
  <div class="container">
      <h3>Trending Product</h3>
      <table class="table table-striped">
    <thead>
        <tr>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Stock</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <img :src="dataTrending.image_url" width="80" height="80">
            </td>
            <td scope="row">{{ dataTrending.name}}</td>
            <td scope="row">{{ dataTrending.price}}</td>
            <td scope="row">{{ dataTrending.stock}}</td>
        </tr>
    </tbody>
</table>
  </div>
</template>

<script>
import axios from '../config/axios'
export default {
  name: 'Trending',
  data () {
    return {
      dataTrending: {}
    }
  },
  methods: {
    fetchTrending () {
      const random = Math.ceil(Math.random() * 3)
      axios({
        method: 'get',
        url: '/products/'
      })
        .then(({ data }) => {
          this.dataTrending = data[random]
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.fetchTrending()
  }
}
</script>

<style>

</style>
