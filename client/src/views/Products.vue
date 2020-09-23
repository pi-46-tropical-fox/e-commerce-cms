<template>
    <div>
      <Navbar></Navbar>
      <div class="container">
          <h1>List Products</h1>
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
import Navbar from '@/components/Navbar.vue'
import ProductCard from '../components/ProductCard.vue'
export default {
  name: 'productPage',
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

<style scoped>
h1 {
  color:#ffce00;
  font-family: 'Oswald', sans-serif;
  font-size: 80px;
  cursor: pointer;
  text-shadow: 2px 2px 4px darkgoldenrod;
  margin-bottom: 35px;
  margin-left: 350px ;
}

h1:hover {
  text-shadow: 2px 2px 4px #000000;
}
</style>