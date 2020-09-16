<template>
  <div class="container" style="margin-top: 80px">
    <h2>Edit Product</h2>
    <div class="container col-6 mt-4">
    <form @submit.prevent="editProduct">
      <div class="form-group">
        <input type="text" class="form-control" v-model="product.name" placeholder="Name" />
      </div>
      <div class="form-group">
        <input type="text" class="form-control" v-model="product.image_url" placeholder="Image Url"/>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <input type="text" class="form-control" v-model="product.price" placeholder="Price (Number Only)"/>
        </div>
        <div class="form-group col-md-2">
          <input type="text" class="form-control" v-model="product.stock" placeholder="Stock (Number Only)"/>
        </div>
        <div class="form-group col-md-4">
          <select v-model="product.category" class="form-control">
            <option value="" selected> - - - Category - - -</option>
            <option value="casual">Casual</option>
            <option value="formal">Formal</option>
            <option value="sport">Sport</option>
          </select>
        </div>
      </div>
      <button type="submit" class="btn btn-primary btn-block">Edit Product</button>
    </form>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    getProduct () {
      this.$store.dispatch('getProductById', this.$route.params.id)
    },
    editProduct () {
      const payload = {
        id: this.product.id,
        name: this.product.name,
        image_url: this.product.image_url,
        price: +this.product.price,
        stock: this.product.stock,
        category: this.product.category
      }
      this.$store.dispatch('editProduct', payload)
      this.$router.push({ path: `/product/${this.$route.params.id}` })
      // this.name = ''
      // this.image_url = ''
      // this.price = ''
      // this.stock = ''
      // this.category = ''
    }
  },
  computed: {
    product () {
      return this.$store.state.product
    }
  },
  created () {
    this.getProduct()
  }
}
</script>

<style>
</style>
