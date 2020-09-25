<template>
  <div id="product">
    <ComponentHeader title="Product" route="products" />
    <CategoryList />
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
    CategoryList
  },
  
  mounted() {
    axios.get('/categories', {
      headers: {
        access_token: localStorage.access_token,
      },
    })
    .then(({ data }) => {
      this.$store.dispatch('getCategories', data)
    });
  },
};
</script>

<style>
</style>