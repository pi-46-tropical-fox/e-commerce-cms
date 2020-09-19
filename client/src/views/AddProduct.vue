<template>
  <div class="container animate__animated animate__zoomIn" style="margin-top: 80px">
    <h2>Add New Product</h2>
    <div class="container col-6 mt-4">
    <form @submit.prevent="addProduct">
      <div class="form-group">
        <input type="text" class="form-control" v-model="name" placeholder="Name" />
      </div>
      <div class="form-group">
        <input type="text" class="form-control" v-model="image_url" placeholder="Image Url"/>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <input type="text" class="form-control" v-model="price" placeholder="Price (Number Only)"/>
        </div>
        <div class="form-group col-md-2">
          <input type="text" class="form-control" v-model="stock" placeholder="Stock (Number Only)"/>
        </div>
        <div class="form-group col-md-4">
          <select v-model="category" class="form-control">
            <option value="" selected> - - - Category - - -</option>
            <option value="casual">Casual</option>
            <option value="formal">Formal</option>
            <option value="sport">Sport</option>
          </select>
        </div>
      </div>
      <button type="submit" class="btn btn-primary btn-block">Add New Product</button>
    </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      image_url: '',
      price: null,
      stock: null,
      category: ''
    }
  },
  methods: {
    addProduct () {
      const payload = {
        name: this.name,
        image_url: this.image_url,
        price: +this.price,
        stock: this.stock,
        category: this.category
      }
      this.$store.dispatch('addProduct', payload)
      this.name = ''
      this.image_url = ''
      this.price = null
      this.stock = null
      this.category = ''
    }
  }
}
</script>

<style>
</style>
