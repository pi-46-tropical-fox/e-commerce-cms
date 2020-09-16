<template>
  <div class="container">
    <!-- <h1>This is an product page</h1> -->
      <div class="row col-centered">
        <Card v-for="product in productRp" :key="product.id" :product="product"></Card>
      </div>
  </div>
</template>

<script>
import Card from '../components/Card'
export default {
  name: 'Product',
  components: {
    Card
  },
  methods: {
    fetchProduct () {
      // console.log('masuk fetchproduct di product.vue')
      this.$store.dispatch('fetchProduct')
    }
  },
  created () {
    this.fetchProduct()
  },
  computed: {
    products () {
      return this.$store.state.products
    },
    productRp () {
      this.products.forEach(el => {
        el.price = el.price.toLocaleString()
      })
      return this.products
    }
  }
}
</script>
<style scoped>
.col-centered{
  display: inline-block;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 20px;
}
.container{
  /* position: relative; */
  margin-top: 60px;
}
</style>
