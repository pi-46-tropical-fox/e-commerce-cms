<template>
  <div id="product">
    <ProductList />
    <!-- <ProductModal :product="product" /> -->
  </div>
</template>

<script>
import ProductList from "../components/product/List"
import axios from "../config/axios";

export default {
  name: "Product",

  components: {
    ProductList,
  },

  mounted() {
    this.$store.dispatch('getProducts')
  },

  computed: {
    products() {
      return this.$store.state.products
    }
  }
};
</script>

<style>
</style>