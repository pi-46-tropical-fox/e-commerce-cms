<template>
    <form class="container" @submit="updateData">
      <h2 class="title" style="text-align: center">Update Product</h2>
        <div class="field">
          <label class="label">Name</label>
          <div class="control">
            <input class="input" type="text" v-model="selectedData.name">
          </div>
        </div>
        <div class="field">
          <label class="label">Image Url</label>
          <div class="control">
            <input class="input" type="text" v-model="selectedData.image_url">
          </div>
        </div>
        <div class="field">
          <label class="label">Price</label>
          <div class="control">
            <input class="input" type="text" v-model="selectedData.price">
          </div>
        </div>
        <div class="field">
          <label class="label">Stock</label>
          <div class="control">
            <input class="input" type="text" v-model="selectedData.stock">
          </div>
        </div>
        <button type="submit" class="button">Save</button>
    </form>
</template>

<script>
export default {
  name: 'Form Edit',
  computed: {
    selectedData () {
      return this.$store.state.selectedData
    }
  },
  methods: {
    updateData () {
      this.$store.dispatch('updateProduct', this.selectedData)
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<style>

</style>
