<template>
  <div class="container">
    <form class="form-body" @submit.prevent="addProduct">
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
      <button type="submit" class="btn btn-primary rounded mr-3">Add product</button>
      <button @click="$router.push('/')" class="btn btn-outline-danger rounded">Cancel</button>
    </form>
  </div>
</template>

<script>
// import router from '../router'
export default {
  name: 'FormAddProduct',
  data () {
    return {
      name: '',
      image_url: '',
      price: '',
      stock: ''
    }
  },
  methods: {
    addProduct () {
      this.$store.dispatch('addProduct', {
        name: this.name,
        image_url: this.image_url,
        price: this.price,
        stock: this.stock
      })
        .then((data) => {
          this.$router.push('/')
        })
    }
  }
}
</script>

<style scoped>
.container {
  background-image: url('https://i.imgur.com/xov4GOP.jpg');
  height: 100vh;
}

.form-add-product {
  margin-top: 5rem;
  padding: 2em 0;
  -webkit-box-shadow: 0px 3px 12px -4px rgba(0,0,0,0.59);
  -moz-box-shadow: 0px 3px 12px -4px rgba(0,0,0,0.59);
  box-shadow: 0px 3px 12px -4px rgba(0,0,0,0.59);
}
</style>
