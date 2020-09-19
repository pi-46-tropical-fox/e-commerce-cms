<template>
  <div class="container d-flex justify-content-start">
    <div class="container">
      <h1>Add New Product</h1>
      <form @submit.prevent="addProduct">
        <div class="form-group">
          <label for="exampleInputEmail1">Image Url :</label>
          <input
            type="text"
            class="form-control"
            id="image_url"
            aria-describedby="emailHelp"
            placeholder="image.png"
            v-model="image_url"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Name :</label>
          <input
            type="text"
            class="form-control"
            id="name"
            placeholder="Lenovo"
            v-model="name"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Price :</label>
          <input
            type="number"
            class="form-control"
            id="price"
            placeholder="1000000"
            v-model="price"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Stock :</label>
          <input
            type="number"
            class="form-control"
            id="stock"
            placeholder="5"
            v-model="stock"
          />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'addProduct',
  props: {},
  data () {
    return {
      image_url: '',
      name: '',
      price: null,
      stock: null
    }
  },
  methods: {
    addProduct () {
      const newProduct = {
        image_url: this.image_url,
        name: this.name,
        price: this.price,
        stock: this.stock
      }
      this.$store.dispatch('add', newProduct)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
