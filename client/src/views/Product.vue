<template>
  <div id="product">
    <ComponentHeader title="Product" route="products" />
    <ProductList />
  </div>
</template>

<script>
import ComponentHeader from "../components/shared/ComponentHeader.vue";
import ProductList from "../components/product/List"
import axios from "../config/axios";

export default {
  name: "Product",

  components: {
    ComponentHeader,
    ProductList
  },

  mounted() {
    console.log("MOUNTED", !this.$store.state.productData);

    axios.get('/products', {
      headers: {
        access_token: localStorage.access_token,
      },
    })
    .then(({ data }) => {
      // console.log(data);
      this.$store.dispatch('storeProductData', data)
    });
  },
};
</script>

<style>
</style>