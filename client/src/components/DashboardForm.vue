<template>
<div style="top: 30px;">
    <!-- <h1>This is supposed to be Dashboard</h1> -->
    <div class="container" >
      <div class="row">
         <ItemCard v-for="product in products" :key="product.id" :productData="product" @removeData="removeProduct"></ItemCard>
      </div>
    </div>
</div>
</template>

<script>
import ItemCard from '@/components/ItemCard.vue'
export default {
  name: 'DashboardForm',
  components: {
    ItemCard
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  methods: {
    fetchProducts () {
      this.$store.dispatch('fetchProducts')
    },
    removeProduct (id) {
      this.products = this.products.filter(product => product.id !== id)
    }
  },
  created () {
    this.fetchProducts()
  }
}
</script>

<style scoped>

</style>
