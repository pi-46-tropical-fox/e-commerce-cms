<template>
  <div>
      <div class="header text-center p-4 ">
          <h1>List All Product</h1>
          <router-link class="btn btn-dark mr-2" to="/products/add">Add New Product</router-link>
      </div>
      <Table
      :products="products">
      </Table>
  </div>
</template>

<script>
import Table from '../components/Table'
export default {
  name: 'Products',
  components: {
    Table
  },
  methods: {
    fetchProduct () {
      this.$store.dispatch('fetchProduct')
    }
  },
  created () {
    this.fetchProduct()
  },
  computed: {
    products () {
      for (const el of this.$store.state.products) {
        el.price = `Rp ${el.price.toLocaleString()}`
      }
      return this.$store.state.products
    }
  }
}
</script>

<style>

</style>
