<template>
  <div class="main mt-3">
    <form @submit.prevent="add">
      <div class="form-group">
        <label for="exampleInputEmail1">Name</label>
        <input type="text" class="form-control" v-model="name" aria-describedby="emailHelp">
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Image Url</label>
          <input type="text" class="form-control" v-model="image_url">
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Price</label>
          <input type="number" class="form-control" v-model="price">
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Stock</label>
          <input type="number" class="form-control" v-model="stock">
        </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data(){
    return {
      name: '',
      image_url: '',
      price: '',
      stock: ''
    }
  },
  methods: {
    add(){
      const payload = {
        name: this.name,
        image_url: this.image_url,
        price: this.price,
        stock: this.stock
      }

      this.$store.dispatch('addMovie', payload)
    }
  }
}
</script>

<style scoped>
  .main {
    margin-left: 120px;
    padding: 0px 10px;
  }

</style>
