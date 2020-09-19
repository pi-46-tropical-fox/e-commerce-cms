<template>
      <div id="addpage">
        <div class="add">
      <h1>Edit Product</h1>
      <div class="d-flex justify-content-center">
    <form @submit.prevent="submitEdit">
  <div class="form-group">
    <label for="name">Name</label>
    <input type="text" class="form-control" v-model="selectedData.name">
  </div>
  <div class="form-group">
    <label for="image_url">Image Url</label>
    <input type="text" class="form-control" v-model="selectedData.image_url">
  </div>
    <div class="form-group">
    <label for="price">Price</label>
    <input type="number" class="form-control" v-model="selectedData.price">
  </div>
    <div class="form-group">
    <label for="stock">Stock</label>
    <input type="number" class="form-control" v-model="selectedData.stock">
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
</div>
</div>
  </div>
</template>

<script>
export default {
  name: 'EditPage',
  computed: {
    selectedData: {
      get () {
        return this.$store.state.selectedData
      }

    }
  },
  methods: {
    submitEdit () {
      this.$store.dispatch('editData', this.selectedData)
    }
  },
  created () {
    const id = this.$route.params.id
    this.$store.dispatch('fetchData', id)
  }
}
</script>

<style>

</style>
