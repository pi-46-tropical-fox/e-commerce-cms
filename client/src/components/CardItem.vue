<template>
  <div class="container">
    <b-card
      img-left
      class="mb-2"
      :title="product.name"
      :img-src="product.image_url"
      :img-alt="product.name"
      style="max-width: 100rem;"
    >
      <router-link class="btn btn-primary mr-3" :to="`/Home/editProduct/${product.id}`" >Edit</router-link>
      <b-button href="#" variant="danger" @click.prevent="deleteProduct">Delete</b-button>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'cardItem',
  props: ['product'],
  methods: {
    deleteProduct () {
      this.$store.dispatch('deleteProduct', this.product)
      this.$router.push('/Home')
    }
  }
}
</script>

<style>

</style>
