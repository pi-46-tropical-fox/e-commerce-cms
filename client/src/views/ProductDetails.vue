<template>
  <div>
    <div class="container mt-5">
      <div class="row">
        <div class="col-12">
          <router-link :to="{ name: 'Product' }">Back to Mainpage</router-link>
        </div>
      </div>
    </div>
    <div class="container mt-5">
      <h2>Product Details</h2>
      <div class="row mt-5">
        <div class="col-6">
          <div class="card" style="width: 18rem;">
            <img :src="product.image_url" class="card-img-top" alt="">
            <div class="card-body">
              <h5 class="card-title text-center">{{ product.name }}</h5>
              <small class="card-text">Last Update: {{ product.updatedAt }}</small>
              <a href="#" class="btn btn-danger mt-3" @click.prevent="deleteItem">Delete</a>
            </div>
          </div>
        </div>
        <div class="col-6">
          <router-link class="btn btn-warning" :to="{ name: 'EditProduct' }">Edit Product</router-link>
          <router-view></router-view>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '../components/Footer'
export default {
  name: 'EditProduct',
  components: {
    Footer
  },
  created () {
    const payload = this.$route.params.id
    this.$store.dispatch('getProductById', payload)
  },
  computed: {
    product () {
      return this.$store.state.product
    }
  },
  methods: {
    deleteItem () {
      const payload = this.$route.params.id
      this.$store.dispatch('deleteProduct', payload)
    }
  }
}
</script>

<style>

</style>
