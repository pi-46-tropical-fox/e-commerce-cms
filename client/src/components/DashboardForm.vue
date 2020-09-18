<template>
<div>
    <!-- <h1>This is supposed to be Dashboard</h1> -->
    <div class="container">
      <div class="row">
         <ItemCard v-for="product in products" :key="product.id" :productData="product"></ItemCard>
      </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import ItemCard from '@/components/ItemCard.vue'
export default {
  name: 'DashboardForm',
  components: {
    ItemCard
  },
  data () {
    return {
      products: []
    }
  },
  methods: {
    fetchProducts () {
      axios({
        method: 'GET',
        url: 'http://localhost:3001/products'
      })
        .then(({ data }) => {
          console.log(data)
          this.products = data
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.fetchProducts()
  }
}
</script>

<style scoped>

</style>
