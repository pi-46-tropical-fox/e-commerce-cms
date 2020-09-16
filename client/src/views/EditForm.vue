<template>
  <div class="container">
      <div class="row">
          <div class="col-6">
            <img src="../assets/manclothes.jpg" class="card-img-top" alt="Login Image">
          </div>
          <div class="col-6">
           <form @submit.prevent ="editProduct">
              <div class="form-group row">
                <label for="inputProductName" class="col-sm-2 col-form-label">Product Name</label>
                <div class="col-sm-10">
                  <input type="text" v-model="selectedData.name" class="form-control" id="inputProductName">
                </div>
              </div>
              <div class="form-group row">
                <label for="inputImageUrl" class="col-sm-2 col-form-label">Image</label>
                <div class="col-sm-10">
                  <input type="text" v-model="selectedData.image_url" class="form-control" id="inputImageUrl">
                </div>
              </div>
              <div class="form-group row">
                <label for="inputPrice" class="col-sm-2 col-form-label">Price</label>
                <div class="col-sm-10">
                  <input type="number" v-model="selectedData.price" class="form-control" id="inputPrice" style="width:150px;">
                </div>
              </div>
              <div class="form-group row">
                <label for="inputStock" class="col-sm-2 col-form-label">Stock</label>
                <div class="col-sm-10">
                  <input type="number" v-model="selectedData.stock" class="form-control" id="inputStock" style="width:100px;">
                </div>
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'EditForm',
  data () {
    return {
      selected: {}
    }
  },
  computed: {
    selectedData: {
      get () {
        return this.$store.state.selectedData
      },
      set (newValue) {
        console.log(newValue)
      }
    }
  },
  methods: {
    editProduct () {
      this.$store.dispatch('editProduct', this.selectedData)
    }
  },
  created () {
    const id = this.$route.params.id
    this.$store.dispatch('getProduct', id)
  }

}
</script>

<style>

</style>
