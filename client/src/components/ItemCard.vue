<template>
  <div class="card col-3">
      <img :src="itemData.image_url" class="card-img-top" height="200px" :alt="itemData.name">
      <div class="card-body">
        <h5 class="card-title">{{ itemData.name }}</h5>
        <p class="card-text">Rp. {{ formatPrice(itemData.price) }}</p>
        <a @click.prevent="upToDateProduct(itemData.id)" class="btn btn-primary">Edit</a>
        <a @click.prevent="deleteProduct(itemData)" class="btn btn-danger">Delete</a>
      </div>
    </div>
</template>

<script>
export default {
  name: 'ItemCard',
  props: ['itemData'],
  methods: {
    formatPrice (value) {
      const val = (value / 1).toFixed().replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    deleteProduct (data) {
      console.log(data.id, 'ini id masuk  loo');
      this.$store.dispatch('deleteProduct', data)
    }
  }
}
</script>

<style>

</style>
