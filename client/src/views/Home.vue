<template>
  <div class="home">
    <NavbarHome/>

    <Loading v-if="$store.state.loadingStatus"/>
    <div class="d-flex flex-row justify-content-center mx-3 mb-3">
      <form @submit.prevent ="filterCategories" class="form-inline " style="justify-content: center!important;">
        <select id="inputCategory" class="form-control form-group mx-sm-3 mb-2" v-model="category" style="width:200px;">
          <option selected value="Unknown">Unknown</option>
          <option value="Kaos">Kaos</option>
          <option value="Kemeja">Kemeja</option>
          <option value="Dress">Dress</option>
          <option value="Celana">Celana</option>
          <option value="Rok">Rok</option>
          <option value="Sepatu">Sepatu</option>
          <option value="Jam Tangan">Jam Tangan</option>
        </select>
        <!-- <div class="form-group mx-sm-3 mb-2">
          <input type="password" class="form-control" id="inputPassword2" placeholder="Category">
        </div> -->
        <button type="submit" class="btn btn-warning mb-2">Filter</button>
      </form>
        <router-link class="btn btn-warning mb-2 ml-auto" to="/products">Create Product</router-link>
    </div>

      <!-- <div>
        <SoldChart :data="dummyData" />
      </div> -->
      <div class="container">
        <table class="table table-hover" style="font-size: 1.2em">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Id Product</th>
              <th scope="col">Name</th>
              <th scope="col">Category</th>
              <th scope="col">Stock</th>
              <th scope="col">Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
              <Products v-for="(product, index) in data.products" :key="index"
                    :itemData="product" :number="index" @removeData="removeItem"></Products>
          </tbody>
        </table>
        </div>

  </div>
</template>

<script>
import Products from '../components/Products.vue'
import NavbarHome from '../components/NavbarHome.vue'
import Loading from '../components/Loading.vue'
// import SoldChart from '../components/SoldChart.vue'

export default {
  name: 'Home',
  components: {
    Products,
    NavbarHome,
    Loading
    // SoldChart
  },
  data () {
    return {
      category: ''
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
    filterCategories () {
      this.data.products = this.data.products.filter(item => item.category === this.category)
    },
    goToCreateProduct () {
      this.$router.push('/products')
    }
  },
  created () {
    this.fetchProducts()
  }
}
</script>

<style>
</style>
