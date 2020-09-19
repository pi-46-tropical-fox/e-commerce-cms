<template>
  <div id="addCard">
      <div class="card shadow" style="width: 18rem;">
        <img src="../assets/add-doc.svg" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">Add Item</h5>
              <form>
                <div class="form-group">
                  <label for="nameItem">Name</label>
                  <input type="text" class="form-control" id="nameItem">
                </div>
                <div class="form-group">
                  <label for="imageUrlItem">Image URL</label>
                  <input type="text" class="form-control" id="imageUrlItem">
                </div>
                 <div class="form-group">
                  <label for="priceItem">Price</label>
                  <input type="number" class="form-control" id="priceItem">
                </div>
                <div class="form-group">
                  <label for="stockItem">Price</label>
                  <input type="number" class="form-control" id="stockItem">
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
              </form>
  </div>
</div>
  </div>
</template>

<script>
export default {
  name: 'AddItemForm'
}
</script>

<style scoped>
#addCard {
    margin-top: 25px;
    display: flex;
    justify-content: center;
}

</style>
