<template>
  <div>
      <div class="header text-center p-4 ">
          <h1>List All Product</h1>
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
    // deleteProduct (id) {
    //   this.products = this.products.filter(product => product.id !== id)
    // }
  },
  created () {
    this.fetchProduct()
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  }
}
</script>

<style>

</style>
