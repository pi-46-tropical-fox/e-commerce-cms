<template>
  <div>
    <div class="button-link">
      <router-link class="btn btn-primary mb-3" to="/Home/cardGroup" >View Product</router-link>
      <router-link class="btn btn-primary mb-3" to="/Home/addProduct" >Add Product</router-link>
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
}
</style>
