<template>
  <div class="container">
    <div class="col-sm-10 offset-sm-1 text-center">
      <form class="form-body" @submit.prevent="sendUpdateProduct">
        <div class="form-group">
          <label for="name">Name</label>
          <input v-model="name" type="text" class="form-control" id="name" placeholder="Enter name">
        </div>
        <div class="form-group">
          <label for="image_url">Image URL</label>
          <input v-model="image_url" type="text" class="form-control" id="image_url" placeholder="Enter image url">
        </div>
        <div class="form-group">
          <label for="price">Price</label>
          <input v-model="price" type="number" class="form-control" id="price" placeholder="Enter price">
        </div>
        <div class="form-group">
          <label for="stock">Stock</label>
          <input v-model="stock" type="number" class="form-control" id="stock" placeholder="Enter stock">
        </div>
        <button type="submit" class="btn btn-primary rounded mr-3">edit product</button>
        <button @click="$router.push('/')" class="btn btn-outline-danger rounded">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UpdateProduct',
  data () {
    return {
      name: '',
      image_url: '',
      price: '',
      stock: '',
    }
  },
  methods: {
    getProduct () {
      this.$store.dispatch('getProduct', this.$route.params.id)
    },
    sendUpdateProduct () {
      const payload = {
        id: this.$route.params.id,
        name: this.name,
        image_url: this.image_url,
        price: this.price,
        stock: this.stock
      }
      this.$store.dispatch('updateProduct', payload)
      this.$router.push('/')
    }
  },
  watch: {
    '$store.state.aProduct.name' () {
      this.name = this.$store.state.aProduct.name
      this.image_url = this.$store.state.aProduct.image_url
      this.price = this.$store.state.aProduct.price
      this.stock = this.$store.state.aProduct.stock
    }
  },
  created () {
    this.getProduct()
  }
}
</script>

<style scoped>
.form-body {
  background-image: url('https://i.imgur.com/xov4GOP.jpg');
  margin-top: 5em;
  padding: 2em 6em;
  -webkit-box-shadow: 0px 3px 12px -4px rgba(0,0,0,0.59);
  -moz-box-shadow: 0px 3px 12px -4px rgba(0,0,0,0.59);
  box-shadow: 0px 3px 12px -4px rgba(0,0,0,0.59);
}
</style>
