<template>
  <div class="main mt-3">
    <form @submit.prevent="edit">
      <div class="form-group">
        <label for="exampleInputEmail1">Name</label>
        <input type="text" class="form-control" v-model="setData.name" aria-describedby="emailHelp">
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Image Url</label>
          <input type="text" class="form-control" v-model="setData.image_url">
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Price</label>
          <input type="number" class="form-control" v-model="setData.price">
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Stock</label>
          <input type="number" class="form-control" v-model="setData.stock">
        </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  computed: {
    setData: {
      get(){
        return this.$store.state.editMovieData
      }
    }
  },
  methods: {
    edit(){
      const payload = this.setData
      this.$store.dispatch('edit', payload)
    }
  },
  created() {
    this.$store.dispatch("findOne", this.$route.params.id)
  }
}
</script>

<style scoped>
.main {
    margin-left: 120px;
    padding: 0px 10px;
}
</style>
