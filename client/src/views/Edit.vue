<template>
  <div class="div">
    <h1>Edit Item Form</h1>
  <div class="container border shadow-sm bg-light">
    <form @submit.prevent="submitEdit">
  <div class="form-group">
    <label for="InputName">Name</label>
    <input type="text" class="form-control" v-model="name" id="InputName" aria-describedby="emailHelp">
  </div>
  <div class="form-group">
    <label for="Description">Description</label>
    <input type="text" class="form-control" v-model="description" id="Description">
  </div>
  <div class="form-group">
    <label for="Gender">Gender</label>
    <select class="form-control" v-model="gender" id="Gender">
      <option value="Male">Male</option>
      <option value="Female">Female</option>
    </select>
  </div>
  <div class="form-group">
    <label for="Category">Category</label>
    <select class="form-control" v-model="category" id="Category">
      <option value="Diver">Dive Watch</option>
      <option value="Dress Watch">Dress Watch</option>
      <option value="Sports Watch">Sports Watch</option>
      <option value="Tool Watch">Tool Watch</option>
      <option value="Casual Watch">Casual Watch</option>
    </select>
  </div>
  <div class="form-group">
    <label for="Diameter">Diameter</label>
    <input type="text" class="form-control" v-model="diameter" id="Diameter" aria-describedby="emailHelp">
  </div>
  <div class="form-group">
    <label for="Movement">Movement</label>
    <input type="text" class="form-control" v-model="movement" id="Movement">
  </div>
  <div class="form-group">
    <label for="Image">Image-link</label>
    <input type="text" class="form-control" v-model="image" id="Image">
  </div>
  <div class="form-group">
    <label for="Stock">Stock</label>
    <input type="text" class="form-control" v-model="stock" id="Stock" aria-describedby="emailHelp">
  </div>
  <div class="form-group">
    <label for="Price">Price</label>
    <input type="text" class="form-control" v-model="price" id="Price">
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
  </div>
    </div>
</template>

<script>
export default {
  name: 'Edit',
  data () {
    return {
      name: '',
      description: '',
      gender: '',
      category: '',
      diameter: '',
      movement: '',
      stock: '',
      price: '',
      image: ''
    }
  },
  methods: {
    fetchOneProduct () {
      this.$store.dispatch('fetchOneProduct', this.$route.params.productId)
      console.log(this.name)
    },
    submitEdit () {
      const payload = {
        id: this.$route.params.productId,
        name: this.name,
        description: this.description,
        gender: this.gender,
        category: this.category,
        diameter: this.diameter,
        movement: this.movement,
        stock: this.stock,
        price: this.price,
        image: this.image
      }
      this.$store.dispatch('editProduct', payload)
      this.$router.push({ name: 'Home' })
    }
  },
  watch: {
    '$store.state.oneProduct.name' () {
    //   console.log('ini watch')
      this.name = this.$store.state.oneProduct.name
      this.description = this.$store.state.oneProduct.description
      this.gender = this.$store.state.oneProduct.gender
      this.category = this.$store.state.oneProduct.category
      this.diameter = this.$store.state.oneProduct.diameter
      this.movement = this.$store.state.oneProduct.movement
      this.image = this.$store.state.oneProduct.image
      this.stock = this.$store.state.oneProduct.stock
      this.price = this.$store.state.oneProduct.price
    //   console.log(this.$store.state.oneProduct, 'ini dari watch')
    }
  },
  created () {
    this.fetchOneProduct()
  },
  computed: {
    // getters
    data: {
      get () {
        console.log(this.$store.state.oneProduct)
        return this.$store.state.oneProduct
      }
    }
  }
}
</script>

<style>

</style>
