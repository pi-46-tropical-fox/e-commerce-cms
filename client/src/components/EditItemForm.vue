<template>
  <div id="editCard">
      <div class="card shadow" style="width: 25rem;">
        <img src="../assets/edit-doc.svg" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">Edit</h5>
              <form>
                <div class="form-group">
                  <label for="nameEdit">Name</label>
                  <input type="text" class="form-control" id="nameEdit">
                </div>
                <div class="form-group">
                  <label for="imageUrlEdit">Image URL</label>
                  <input type="text" class="form-control" id="imageUrlEdit">
                </div>
                 <div class="form-group">
                  <label for="priceEdit">Price</label>
                  <input type="number" class="form-control" id="priceEdit">
                </div>
                <div class="form-group">
                  <label for="stockEdit">Price</label>
                  <input type="number" class="form-control" id="stockEdit">
                </div>
                <button type="submit" class="btn btn-primary">Edit</button>
              </form>
  </div>
</div>
  </div>
</template>

<script>
export default {
  name: 'EditItemForm',
  created () {
    console.log(this.$route.params.id)
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
