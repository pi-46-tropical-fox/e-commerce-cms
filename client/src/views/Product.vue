<template>
  <div>
    <Navbar></Navbar>
    <div class="container mt-5">
      <div class="row">
        <div class="col-6">
        <router-link class="btn-sm btn-success mr-2" :to="{ name: 'AddProduct' }">Add Product</router-link>
        <router-view></router-view>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <h2 class="mt-3">List of Products</h2>
          <table class="table table-striped">
            <thead class="thead-dark">
              <tr>
                <th scope="col">no.</th>
                <th scope="col">name</th>
                <th scope="col">price</th>
                <th scope="col">stock</th>
                <th scope="col">category</th>
                <th scope="col">Updated At</th>
                <th scope="col">Options</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, index) in products" :key="product.id">
                <td>{{ index+1 }}</td>
                <td>{{ product.name }}</td>
                <td>{{ product.price }}</td>
                <td>{{ product.stock }}</td>
                <td>{{ product.category }}</td>
                <td>{{ product.updatedAt }}</td>
                <td><router-link class="btn-sm btn-info" :to="{ name: 'ProductDetails', params: {id: product.id, image: product.image_url} }">Details</router-link></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
export default {
  name: 'Product',
  components: {
    Navbar,
    Footer
  },
  created () {
    this.$store.dispatch('getProducts')
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  }
}
</script>

<style>

</style>
