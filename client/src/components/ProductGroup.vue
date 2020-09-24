<template>
  <div class='container'>
    <div class="mb-5">
      <h1>Product List</h1>
    </div>
    <div>
      <b-alert :variant="color" show v-if="notification[0]">{{notification[0]}}</b-alert>
      <Product class="mb-3"
        v-for="product in products"
        :key= 'product.id'
        :product='product'
      >
      </Product>
    </div>
  </div>
</template>

<script>
import Product from '../components/ProductItem'
export default {
  components: {
    Product
  },
  computed: {
    products () {
      return this.$store.state.products
    },
    notification: {
      get () {
        return this.$store.state.notification
      }
    },
    color: {
      get () {
        return this.$store.state.color
      }
    }
  },
  created () {
    this.$store.dispatch('fetchProducts')
  }
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
}

</style>
