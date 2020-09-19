<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
    <Navbar></Navbar>
    <div class="container">
      <h1 class="display-1 my-5">Products</h1>

      <ProductTable></ProductTable>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import ProductTable from '../components/ProductTable.vue'
export default {
  components: {
    // HelloWorld,
    Navbar,
    ProductTable
  },
}
</script>
