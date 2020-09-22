<template>
  <div id="addCard">
      <div class="card shadow" style="width: 18rem;">
        <img src="../assets/add-doc.svg" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">Add Item</h5>
              <form @submit.prevent="submitAdd">
                <div class="form-group">
                  <label for="nameItem">Name</label>
                  <input type="text" class="form-control" id="nameItem" v-model="selectedData.name">
                </div>
                <div class="form-group">
                  <label for="imageUrlItem">Image URL</label>
                  <input type="text" class="form-control" id="imageUrlItem" v-model="selectedData.image_url">
                </div>
                 <div class="form-group">
                  <label for="priceItem">Price</label>
                  <input type="number" class="form-control" id="priceItem" v-model="selectedData.price">
                </div>
                <div class="form-group">
                  <label for="stockItem">Price</label>
                  <input type="number" class="form-control" id="stockItem" v-model="selectedData.stock">
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
              </form>
  </div>
</div>
  </div>
</template>

<script>
export default {
  name: 'AddItemForm',
  computed: {
    selectedData: {
      get () {
        return this.$store.state.selectedData
      }
    }
  },
  methods: {
    submitAdd () {
      this.$store.dispatch('addData', this.selectedData)
    }
  }
}
</script>

<style scoped>
#addCard {
    margin-top: 25px;
    display: flex;
    justify-content: center;
}

</style>
