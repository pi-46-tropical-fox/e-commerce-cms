<template>
  <div id="product">
    <ComponentHeader title="Product" route="products" />
    <ProductList />
  </div>
</template>

<script>
import ComponentHeader from "../components/shared/ComponentHeader.vue";
import CategoryList from "../components/category/List"
import axios from "../config/axios";

export default {
  name: "Category",
  components: {
    ComponentHeader,
  },
  
  mounted() {
    console.log("MOUNTED", !this.$store.state.productData);

    axios.get('/categories', {
      headers: {
        access_token: localStorage.access_token,
      },
    })
    .then(({ data }) => {
      this.$store.dispatch('storeCategoryData', data)
    });
  },
};
</script>

<style>
</style>