<template>
  <div>
    <div>
      <Navbar></Navbar>
    </div>
    <div>
  <div class="home">
    <div class="container d-flex flex-wrap">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :productData="product"
      ></ProductCard>
    </div>
    </div>
  </div>
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src
import ProductCard from '../components/ProductCard'
import Navbar from '../components/Navbar'

export default {
  name: 'Home',
  components: {
    ProductCard,
    Navbar
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  methods: {
    fetchProducts () {
      this.$store.dispatch('fetchProducts')
    }
  },
  created () {
    this.fetchProducts()
  }
}
</script>
