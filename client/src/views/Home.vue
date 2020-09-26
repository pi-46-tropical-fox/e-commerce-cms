<template>
  <div class="home container">
    <p class="text-left">Welcome, you're currently using <mark>{{ username }}</mark> account.</p>
    <h3 class="m-3 text-left">Product List :</h3>
    <div class="text-left">
      <router-link to="/add-product" class="btn btn-primary ml-3 mb-3">Add Product</router-link>
    </div>
    <div class="row">
      <ProductCard v-for="product in products" :key="product.id" :product="product"></ProductCard>
    </div>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard.vue'
export default {
  name: 'Home',
  components: {
    ProductCard
  },
  computed: {
    products () {
      return this.$store.state.products
    },
    username () {
      return localStorage.getItem('username')
    }
  },
  created () {
    if (!localStorage.getItem('access_token')) {
      this.$store.commit('CHANGE_LOGIN_STATUS', false)
    }
    this.$store.commit('CHANGE_LOGIN_STATUS', true)
    this.$store.dispatch('fetchProducts')
  },
  beforeRouteEnter (to, from, next) {
    if (!localStorage.getItem('access_token')) {
      return next('/login')
    }
    return next()
  }
}
</script>
