<template>
  <div>
    <Navbar></Navbar>
    <hr>
    <hr>
    <div class="card-container">
    <Card
    v-for="product in products"
    :key="product.id"
    :product = product
    :itemID= product.id
    ></Card>
    </div>
    {{$store.state.products}}
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import Card from '../components/Card'
export default {
  name: 'Home',
  components: {
    Card,
    Navbar
  },
  methods: {
    fetchData () {
      this.$store.dispatch('fetchProduct')
    }
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  created () {
    this.fetchData()
  }
}
</script>
