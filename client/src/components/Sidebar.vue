<template>
  <div>
    <div class="button-link">
      <router-link class="btn btn-primary mb-3" to="/Home/ProductGroup" >View Products</router-link>
      <router-link class="btn btn-primary mb-3" to="/Home/bannerGroup" >View Banners</router-link>
      <router-link class="btn btn-primary mb-3" to="/Home/addProduct" >Add Product</router-link>
      <router-link class="btn btn-primary mb-3" to="/Home/addBanner" >Add Banner</router-link>
      <router-link class="btn btn-primary mb-3" to="/Home/addCategory" >Add Category</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sidebar',
  computed: {
    filters () {
      return this.$store.state.filters
    },
    categories () {
      return this.$store.state.categories
    }
  },
  created () {
    this.$store.dispatch('fetchCategories')
  }
}
</script>

<style>
.button-link {
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  margin-left: 30px;
}
</style>
