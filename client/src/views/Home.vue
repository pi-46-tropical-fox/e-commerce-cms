<template>
  <section id="home-page" class="row">
        <div class="col-4 d-flex align-items-center" id="home-page">
            <img src="https://image.freepik.com/free-vector/modern-web-design-concept-with-flat-style_23-2147935005.jpg" alt="" class="w-100">
        </div>
        <div class="col-8" style="height: 400px;">
            <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center">
                    <h3>List Product</h3>
                </div>
                <button @click="toAddProduct" class="btn btn-info float-right">Add Product</button>
            </div>
            <!-- component product table -->
            <ProductTable :products="products"></ProductTable>
            <!-- child-from-home -->
            <router-view></router-view>
        </div>
    </section>
</template>

<script>
import axios from '../config/axios'
import ProductTable from '../components/ProductTable'

export default {
  name: 'Home',
  data () {
    return {
      products: []
    }
  },
  components: {
    ProductTable
  },
  methods: {
    fetchProduct () {
      axios({
        method: 'get',
        url: '/products'
      })
        .then(({ data }) => {
          // console.log(data, '<<< ini data')
          this.products = data
        })
        .catch(err => {
          console.log(err, '<<< ini error')
        })
    },
    toAddProduct () {
      this.$router.push({name: 'AddProduct'})
    }
  },
  created () {
    this.fetchProduct()
  }
}
</script>
