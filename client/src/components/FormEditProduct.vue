<template>
  <div class="container-form-edit-product">
    <div class="container mt-3">
      <div class="row form-edit-product">
        <div class="col-sm-10 offset-sm-1 text-center">
          <form @submit.prevent="editProduct">
            <div class="form-group">
              <label for="name">Name</label>
              <input v-model="name" type="text" class="form-control" id="name" placeholder="Enter name">
            </div>
            <div class="form-group">
              <label for="image_url">Image URL</label>
              <input v-model="image_url" type="text" class="form-control" id="image_url" placeholder="Enter image url">
            </div>
            <div class="form-group">
              <label for="price">Price</label>
              <input v-model="price" type="number" class="form-control" id="price" placeholder="Enter price">
            </div>
            <div class="form-group">
              <label for="stock">Stock</label>
              <input v-model="stock" type="number" class="form-control" id="stock" placeholder="Enter stock">
            </div>
            <button type="submit" class="btn btn-primary rounded mr-3">edit product</button>
            <button @click="$router.push('/')" class="btn btn-outline-danger rounded">Cancel</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
