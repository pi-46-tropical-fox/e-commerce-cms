<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-8">
          <h2 class="mt-3">Add Product</h2>
          <form @submit.prevent="addProduct">
            <div class="form-group">
              <label>Product Name</label>
              <input type="text" class="form-control" v-model="name">
            </div>
            <div class="form-group">
              <label>Image URL</label>
              <input type="text" class="form-control" v-model="image_url">
              <small><a href="https://imgur.com/t/upload" target="_blank">Get url of your image</a></small>
            </div>
            <div class="form-group">
              <label>Price</label>
              <input type="number" class="form-control" v-model="price">
            </div>
            <div class="form-group">
              <label>Stock</label>
              <input type="number" class="form-control" v-model="stock">
            </div>
            <div class="form-group">
              <label>Category</label>
              <select class="form-control" v-model="category">
                <option>Electronics</option>
                <option>Clothes</option>
                <option>Shoes</option>
                <option>Books</option>
              </select>
            </div>
            <button type="submit" class="btn-sm btn-dark">Submit</button>
            <router-link class="btn-sm btn-danger ml-2 p-2" :to="{ name: 'Product' }">Cancel</router-link>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddProduct',
  data () {
    return {
      name: '',
      image_url: '',
      price: '',
      stock: '',
      category: ''
    }
  },
  methods: {
    addProduct () {
      const payload = {
        name: this.name,
        image_url: this.image_url,
        price: this.price,
        stock: this.stock,
        category: this.category
      }
      this.$store.dispatch('addProduct', payload)
      this.name = ''
      this.image_url = ''
      this.price = ''
      this.stock = ''
      this.category = ''
    }
  }
}
</script>

<style>

</style>
