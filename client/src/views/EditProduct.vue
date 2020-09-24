<template>
  <div>
    <Navbar />
    <div class="container">
        <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div class="card card-signin my-5">
            <div class="card-body">
                <h5 class="card-title text-center text-dark">Update Product</h5>
                <form @submit.prevent="submitEditProduct" class="form-updateProduct">

                    <div class="form-label-group">
                        <label for="name">Name</label>
                        <input type="text" v-model="name" class="form-control">
                    </div>

                    <div class="form-label-group">
                        <label for="image_url">Image Url</label>
                        <input type="text" v-model="image_url" class="form-control">
                    </div><br>

                    <div class="form-label-group">
                        <label for="price">Price</label>
                        <input type="text" v-model="price" class="form-control">
                    </div>

                    <div class="form-label-group">
                        <label for="stock">Stock</label>
                        <input type="text" v-model="stock" class="form-control">
                    </div><br>

                    <button class="btn btn-lg btn-success btn-block text-uppercase" type="submit">Update Product</button>
                </form>
            </div>
            </div>
        </div>
        </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
export default {
  name: 'EditProduct',
  data () {
    return {
      name: '',
      image_url: '',
      price: '',
      stock: ''
    }
  },
  components: {
    Navbar
  },
  methods: {
    fetchOneProduct () {
      this.$store.dispatch('fetchItemById', this.$route.params.id)
    },
    submitEditProduct () {
      const payload = {
        id: this.$route.params.id,
        name: this.name,
        image_url: this.image_url,
        price: this.price,
        stock: this.stock
      }
      this.$store.dispatch('editProduct', payload)
      this.$router.push({ path: '/' })
    }
  },
  watch: {
    '$store.state.oneProduct.name' () {
      this.name = this.$store.state.oneProduct.name
      this.image_url = this.$store.state.oneProduct.image_url
      this.price = this.$store.state.oneProduct.price
      this.stock = this.$store.state.oneProduct.stock
    }
  },
  created () {
    this.fetchOneProduct()
  },
  computed: {
    data: {
      get () {
        return this.$store.state.oneProduct
      }
    }
  }
}
</script>

<style>

</style>
