<template>
  <div class="home">
    <Navbar />
    <div class="container">
      <div class="row justify-content-center">
        <ProductTable :dataProduct="products"></ProductTable>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductTable from '../components/ProductTable'
import Navbar from '../components/Navbar'
export default {
  name: 'Home',
  components: {
    ProductTable,
    Navbar
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  methods: {
    fetchProducts () {
      console.log('methods fetchproduct')
      this.$store.dispatch('fetchProducts')
    },
    logout () {
      localStorage.clear()
      location.reload()
    }
  },
  created () {
    console.log('masuk created')
    this.fetchProducts()
  }
}
</script>

<style scoped>
.home {
  background-image: url('https://i.imgur.com/tfuacyp.jpg');
  background-size: cover;
}
.container {
  -webkit-box-shadow: 0px 3px 12px -4px rgba(0,0,0,0.59);
  -moz-box-shadow: 0px 3px 12px -4px rgba(0,0,0,0.59);
  box-shadow: 0px 3px 12px -4px rgba(0,0,0,0.59);
}
</style>
