<template>
    <div id="addpage">
      <div class="add">
      <h1>Add Product</h1>
      <div class="d-flex justify-content-center">
    <form @submit.prevent="submitProduct">
  <div class="form-group">
    <label for="name">Name</label>
    <input type="text" class="form-control" v-model="name">
  </div>
  <div class="form-group">
    <label for="image_url">Image Url</label>
    <input type="text" class="form-control" v-model="image_url">
  </div>
    <div class="form-group">
    <label for="price">Price</label>
    <input type="number" class="form-control" v-model="price">
  </div>
    <div class="form-group">
    <label for="stock">Stock</label>
    <input type="number" class="form-control" v-model="stock">
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
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
      stock: ''
    }
  },
  methods: {
    submitProduct () {
      const dataProduct = {
        name: this.name,
        image_url: this.image_url,
        price: this.price,
        stock: this.stock
      }
      this.$store.dispatch('submitProduct', dataProduct)
    }
  }
}
</script>

<style>

</style>
