<template>
  <div class='container'>
    <Card
      v-for="product in products.products"
      :key= 'product.id'
      :product='product'
    >
    </Card>
  </div>
</template>

<script>
import Card from '../components/CardItem'
export default {
  components: {
    Card
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  created () {
    this.$store.dispatch('fetchProducts')
  }
}
</script>

<style>

</style>
