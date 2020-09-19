<template>
  <div id="product" class="card col-3 mr-5 mt-5 mb-3" style="width: 18rem;">
    <img :src="productData.image_url" class="card-img-top">
  <div class="card-body">
    <h5 class="card-title"> {{ productData.name }} </h5>
    <p class="card-text"> Rp. {{ productData.price }} </p>
    <p class="card-text"> {{ productData.stock }} pcs </p>
    <a class="btn btn-success mr-2" @click="goToEdit(productData.id)">Edit</a>
    <a class="btn btn-danger" @click="deleteProduct(productData.id)">Delete</a>
  </div>
</div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['productData'],
  methods: {
    goToEdit (id) {
      this.$router.push({ path: `/products/${id}` })
    },
    deleteProduct (id) {
      this.$store.dispatch('deleteSubmit', id)
      this.$store.dispatch('fetchProducts')
    }
  }
}
</script>

<style>

</style>
