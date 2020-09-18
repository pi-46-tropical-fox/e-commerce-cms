<template>
    <div>
    <div class="container">
      <div class="row">
        <div class="col-8">
          <h2 class="mt-3">Edit Product</h2>
          <form @submit.prevent="editProduct">
            <div class="form-group">
              <label>Product Name</label>
              <input type="text" class="form-control" v-model="selectedProduct.name" required>
            </div>
            <div class="form-group">
              <label>Image URL</label>
              <input type="text" class="form-control" v-model="selectedProduct.image_url" required>
              <small><a href="https://imgur.com/t/upload" target="_blank">Get url of your image</a></small>
            </div>
            <div class="form-group">
              <label>Price</label>
              <input type="number" class="form-control" v-model="selectedProduct.price" required>
            </div>
            <div class="form-group">
              <label>Stock</label>
              <input type="number" class="form-control" v-model="selectedProduct.stock" required>
            </div>
            <div class="form-group">
              <label>Category</label>
              <select class="form-control" v-model="selectedProduct.category" required>
                <option>Electronics</option>
                <option>Clothes</option>
                <option>Shoes</option>
                <option>Books</option>
              </select>
            </div>
            <button type="submit" class="btn-sm btn-dark">Submit</button>
            <router-link class="btn-sm btn-danger ml-2 p-2" :to="{ name: 'ProductDetails' }">Cancel</router-link>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditProduct',
  computed: {
    selectedProduct: {
      get () {
        return this.$store.state.product
      }
    }
  },
  methods: {
    editProduct () {
      const payload = {
        editData: this.selectedProduct,
        id: this.$route.params.id
      }
      this.$store.dispatch('editProduct', payload)
    }
  }
}
</script>

<style>

</style>
