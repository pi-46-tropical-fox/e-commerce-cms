<template>
  <div>
      <div class="header text-center p-4 ">
          <h1>List All Product</h1>
      </div>
      <Table
      :products="products"
      @deleteProduct="deleteProduct">
      </Table>
  </div>
</template>

<script>
import axios from '../config/axios'
import Table from '../components/Table'
export default {
  name: 'Products',
  components: {
    Table
  },
  data () {
    return {
      products: []
    }
  },
  methods: {
    fetchProduct () {
      axios({
        method: 'GET',
        url: '/products',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          this.products = data
          console.log(data)
        })
        .catch(err => {
          console.log(err.response.data)
        })
    },
    deleteProduct (id) {
      this.products = this.products.filter(product => product.id !== id)
    }
  },
  created () {
    this.fetchProduct()
  }
}
</script>

<style>

</style>
