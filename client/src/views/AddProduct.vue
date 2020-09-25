<template>
  <div class="container">
    <button @click="back" class="btn btn-info d-flex mb-3">Back</button>
    <div class="row">
      <div class="col-6">
        <div class="card">
          <div class="card-body">
            <h1 class="card-title">Add Product</h1>
            <form @submit.prevent="addProduct">
              <div class="form-group row">
                <label class="col-sm-3 col-form-label text-right">Name</label>
                <div class="col-sm-9">
                  <input v-model="name" type="text" class="form-control">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-3 col-form-label text-right">Image URL</label>
                <div class="col-sm-9">
                  <input v-model="image_url" type="text" class="form-control">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-3 col-form-label text-right">Price</label>
                <div class="col-sm-9">
                  <input v-model="price" type="number" class="form-control">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-3 col-form-label text-right">Stock</label>
                <div class="col-sm-9">
                  <input v-model="stock" type="number" class="form-control">
                </div>
              </div>
              <div class="form-group row">
                <div class="col-sm-5 ml-auto">
                  <input type="submit" class="form-control btn btn-success" value="Create">
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
  name: 'AddProduct',
  data () {
    return {
      name: null,
      image_url: null,
      price: null,
      stock: null
    }
  },
  methods: {
    back () {
      this.$router.push('/')
    },
    addProduct () {
      this.$store.dispatch('addProduct', {
        name: this.name,
        image_url: this.image_url,
        price: +this.price,
        stock: +this.stock
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
  beforeRouteEnter (to, from, next) {
    if (!localStorage.getItem('access_token')) {
      return next('/login')
    }
    return next()
  }
}
</script>
