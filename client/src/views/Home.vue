<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <a href="#" class="btn btn-dark"
      data-toggle="modal" data-target="#staticBackdrop"
      >Create Product</a>

    <div class="container mr-2">
      <div class="row d-flex">
        <Card v-for="product in data.products" :key="product.id"
          :itemData="product" @removeData="removeItem"></Card>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Create Product</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent ="createProduct">
              <div class="form-group row">
                <label for="inputProductName" class="col-sm-2 col-form-label">Product Name</label>
                <div class="col-sm-10">
                  <input type="text" v-model="name" class="form-control" id="inputProductName">
                </div>
              </div>
              <div class="form-group row">
                <label for="inputImageUrl" class="col-sm-2 col-form-label">Image</label>
                <div class="col-sm-10">
                  <input type="text" v-model="image_url" class="form-control" id="inputImageUrl">
                </div>
              </div>
              <div class="form-group row">
                <label for="inputPrice" class="col-sm-2 col-form-label">Price</label>
                <div class="col-sm-10">
                  <input type="number" v-model="price" class="form-control" id="inputPrice" style="width:150px;">
                </div>
              </div>
              <div class="form-group row">
                <label for="inputStock" class="col-sm-2 col-form-label">Stock</label>
                <div class="col-sm-10">
                  <input type="number" v-model="stock" class="form-control" id="inputStock" style="width:100px;">
                </div>
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Understood</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '../components/ItemCard.vue'

export default {
  name: 'Home',
  components: {
    Card
  },
  data () {
    return {
      name: '',
      image_url: '',
      stock: 0,
      price: 0
    }
  },
  computed: {
    data () {
      return this.$store.state.products
    }
  },
  methods: {
    fetchProducts () {
      this.$store.dispatch('fetchProducts')
    },
    removeItem (id) {
      this.data.products = this.data.products.filter(item => item.id !== id)
    },
    createProduct () {
      const payload = {
        name: this.name,
        image_url: this.image_url,
        stock: this.stock,
        price: this.price
      }
      this.$store.dispatch('createProduct', payload)
    }
  },
  created () {
    this.fetchProducts()
  }
}
</script>
