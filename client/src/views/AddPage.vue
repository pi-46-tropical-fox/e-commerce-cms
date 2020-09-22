<template>
  <div class="add-page">
    <div class="card item-detail add-container">
      <label for="name">Game Title</label>

      <input type="text" v-model="name">

      <br>

      <label for="image-url">Image URL</label>

      <input type="text" v-model="image_url">

      <br>
      <label for="price">Price</label>

      <input type="number" v-model="price">

      <br>

      <label for="stock">Stock</label>

      <input type="number" v-model="stock">

      <br>

      <label for="stock">Category</label>

      <select name="category" v-model="CategoryId">
        <option  v-for="category in categoriesData" :key="category.id" :value="category.id">{{category.name}}</option>

      </select>

      <br>
      <br>

      <div class="item-detail-button">
        <button class="btn btn-warning" @click.prevent="addItem">Submit</button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'AddPage',
  data () {
    return {
      name: '',
      image_url: '',
      price: null,
      stock: null,
      CategoryId: null

    }
  },
  computed: {
    categoriesData () {
      return this.$store.state.categoriesData
    }
  },
  methods: {
    addItem () {
      const payload = {
        name: this.name,
        image_url: this.image_url,
        price: this.price,
        stock: this.stock,
        CategoryId: this.CategoryId
      }
      console.log(payload)
      this.$store.dispatch('addItem', payload)
    }

  }
}
</script>

<style>

</style>
