<template>
<div class="add-form-container mx-auto">
  <form @submit.prevent='addProduct'>
    <div class="form-group">
        <label for="exampleInputEmail1">Product's Name</label>
        <input type="text" class="form-control" v-model="name" aria-describedby="emailHelp">
    </div>
    <div class="form-group">
        <label for="exampleInputPassword1">Price</label>
        <input type="number" class="form-control" v-model="price">
    </div>
    <div class="form-group">
        <label for="exampleInputPassword1">Stock</label>
        <input type="number" class="form-control" v-model="stock">
    </div>
     <div class="form-group">
        <label for="exampleInputPassword1">URL</label>
        <input type="text" class="form-control" v-model="imageURL">
    </div>
     <div class="form-group">
        <label for="exampleInputPassword1">Category</label>
        <select class="form-control" v-model="category">
          <option value="electronics">Electronics</option>
          <option value="sportinggoods">Sporting Goods</option>
        </select>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</div>
</template>

<script>
export default {
  name: 'LoginForm',
  data: function () {
    return {
      name: '',
      price: 0,
      stock: 0,
      imageURL: '',
      category: ''
    }
  },
  methods: {
    addProduct () {
      const payload = {
        name: this.name,
        price: +this.price,
        stock: +this.stock,
        imageURL: this.imageURL,
        category: this.category
      }
      console.log(payload, '<<< dari component')
      this.$store.dispatch('addProduct', payload)
    }
  }
}
</script>

<style>

</style>
