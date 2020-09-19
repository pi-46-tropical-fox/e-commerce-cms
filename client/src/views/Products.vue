<template>
  <div>
    <h1 class="justify-content-center mt-5">PRODUCTS</h1>
    <div class="container mt-3">
      <div class="row justify-content-center">
        <router-link :to="`/products/1`" tag="b-button" class="col-2 text-center mr-3" variant="outline-secondary">Consumables</router-link>
        <router-link :to="`/products/2`" tag="b-button" class="col-2 text-center mr-3" variant="outline-success">Accessories</router-link>
        <router-link :to="`/products/3`" tag="b-button" class="col-2 text-center mr-3" variant="outline-primary">Support</router-link>
        <router-link :to="`/products/4`" tag="b-button" class="col-2 text-center mr-3" variant="outline-primary">Magical</router-link>
      </div>
      <div class="row justify-content-center mt-3">
        <router-link :to="`/products/5`" tag="b-button" class="col-2 text-center mr-3" variant="outline-danger">Armor</router-link>
        <router-link :to="`/products/6`" tag="b-button" class="col-2 text-center mr-3" variant="outline-danger">Weapons</router-link>
        <router-link :to="`/products/7`" tag="b-button" class="col-2 text-center mr-3" variant="outline-warning">Artifacts</router-link>
      </div>
      <router-view/>
    </div>
  </div>
</template>

<script>
// import ProductCard from '../components/ProductCard'
export default {
  name: 'Products',
  components: {
    // ProductCard
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style>

</style>
