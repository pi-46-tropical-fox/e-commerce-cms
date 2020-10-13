<template>
  <div id="editCard">
      <div class="card shadow" style="width: 25rem;">
        <img src="../assets/edit-doc.svg" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">Edit</h5>
              <form @submit.prevent="submitEdit">
                <div class="form-group">
                  <label for="nameEdit">Name</label>
                  <input type="text" class="form-control" style="text-align: center;" id="nameEdit" v-model="selectedData.name">
                </div>
                <div class="form-group">
                  <label for="imageUrlEdit">Image URL</label>
                  <input type="text" class="form-control" style="text-align: center;" id="imageUrlEdit" v-model="selectedData.image_url">
                </div>
                 <div class="form-group">
                  <label for="priceEdit">Price (Rp)</label>
                  <input type="number" class="form-control" style="text-align: center;" id="priceEdit" v-model="selectedData.price">
                </div>
                <div class="form-group">
                  <label for="stockEdit">Stock</label>
                  <input type="number" class="form-control" style="text-align: center;" id="stockEdit" v-model="selectedData.stock">
                </div>
                <button type="submit" class="btn btn-primary">Edit</button>
              </form>
  </div>
</div>
<!-- {{ $store.state.selectedData }} -->
  </div>
</template>

<script>
export default {
  name: 'EditItemForm',
  computed: {
    selectedData: {
      get () {
        return this.$store.state.selectedData
      }
    }
  },
  methods: {
    submitEdit () {
      // console.log(this.selectedData)
      this.$store.dispatch('editData', this.selectedData)
    }
  },
  created () {
    console.log(this.$route.params.id, 'from views')
    const id = this.$route.params.id
    this.$store.dispatch('fetchEditData', id)
  }
}
</script>

<style scoped>
#editCard {
    margin-top: 25px;
    display: flex;
    justify-content: center;
}

</style>
