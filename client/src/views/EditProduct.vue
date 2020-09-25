<template>
  <div class="container">
    <button @click="back" class="btn btn-info d-flex mb-3">Back</button>
    <div class="row">
      <div class="col-6">
        <div class="card">
          <div class="card-body">
            <h1 class="card-title">Edit Product</h1>
            <form @submit.prevent="updateProduct">
              <div class="form-group row">
                <label class="col-sm-3 col-form-label text-right">Name</label>
                <div class="col-sm-9">
                  <input v-model="product.name" type="text" class="form-control">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-3 col-form-label text-right">Image URL</label>
                <div class="col-sm-9">
                  <input v-model="product.image_url" type="text" class="form-control">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-3 col-form-label text-right">Price</label>
                <div class="col-sm-9">
                  <input v-model="product.price" type="number" class="form-control">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-3 col-form-label text-right">Stock</label>
                <div class="col-sm-9">
                  <input v-model="product.stock" type="number" class="form-control">
                </div>
              </div>
              <div class="form-group row">
                <div class="col-sm-5 ml-auto">
                  <input type="submit" class="form-control btn btn-success" value="Update">
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditProduct',
  methods: {
    back () {
      this.$router.push('/')
    },
    updateProduct () {
      this.$store.dispatch('editProduct', {
        id: this.product.id,
        name: this.product.name,
        image_url: this.product.image_url,
        price: this.product.price,
        stock: this.product.stock,
        category: undefined
      })
        .then(({ data }) => {
          this.$store.dispatch('fetchProducts')
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
    product () {
      return this.$store.state.selectedProduct
    }
  },
  created () {
    const products = this.$store.state.products
    const product = products.find(product => product.id === +this.$route.params.id)
    this.$store.commit('UPDATE_SELECTED_PRODUCT', product)
  },
  beforeRouteEnter (to, from, next) {
    if (!localStorage.getItem('access_token')) {
      return next('/login')
    }
    return next()
  }
}
</script>
