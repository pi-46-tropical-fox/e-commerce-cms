<template>
  <div class="card col-3">
      <img :src="itemData.image_url" class="card-img-top" height="200px" :alt="itemData.name">
      <div class="card-body">
        <h5 class="card-title">{{ itemData.name }}</h5>
        <p class="card-text">Rp. {{ new Number(itemData.price).toLocaleString("id-ID") }}</p>
        <p class="card-text">Stock: {{ itemData.stock }}</p>
        <button type="button" @click.prevent="updateProduct(itemData.id)" class="btn btn-primary">Edit</button>
        <button type="button" @click.prevent="deleteProduct(itemData)" class="btn btn-danger">Delete</button>
      </div>
    </div>
</template>

<script>
export default {
  name: 'ItemCard',
  props: ['itemData'],
  methods: {
    deleteProduct (payload) {
      // console.log(payload, '<<<<<< delete product');
      this.$store.dispatch('deleteProduct', payload)
    },
    updateProduct (id) {
      this.$router.push({ path: `/products/${id}` })
    }
  }
}
</script>

<style>

</style>
