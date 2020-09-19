<template>
<div class="modal fade edit-form" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Edit Product</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form @submit.prevent='goEdit'>
          <div class="form-group">
              <label for="exampleInputEmail1">Product's Name</label>
              <input type="text" class="form-control" v-model="name">
          </div>
          <div class="form-group">
              <label for="exampleInputPassword1">Price</label>
              <input type="number" class="form-control" v-model="price">
          </div>
          <div class="form-group">
              <label for="exampleInputPassword1">Stock</label>
              <input type="number" class="form-control" v-model="stock">
          </div>
          <div class="form-group">
              <label for="exampleInputPassword1">Image URL</label>
              <input type="text" class="form-control" v-model="imageURL">
          </div>
          <div class="form-group">
              <label for="exampleInputPassword1">Category</label>
              <select class="form-control" v-model="category">
              <option value="Electronics">Electronics</option>
              <option value="Sporting Goods">Sporting Goods</option>
              </select>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'EditForm',
  props: ['product'],
  data: function () {
    return {
      name: this.product.name,
      price: this.product.price,
      stock: this.product.stock,
      imageURL: this.product.imageURL,
      category: this.product.category
    }
  },
  methods: {
    goEdit (event) {
      const payload = {
        name: this.name,
        price: +this.price,
        stock: +this.stock,
        imageURL: this.imageURL,
        category: this.category,
        id: this.product.id
      }
      this.$store.dispatch('editProduct', payload)
    }
  }

}
</script>

<style>

</style>
