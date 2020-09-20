<template>
<div>
    <Navbar></Navbar>
    <div class="card-container my-5">
    <Card
    v-for="product in filteredCards"
    :key="product.id"
    :product = product
    ></Card>
    </div>
</div>

</template>

<script>
import Card from '../components/Card'
import Navbar from '../components/Navbar'
export default {
  name: 'FilteredProducts',
  data () {
    return {
      filteredProducts: []
    }
  },
  components: {
    Card,
    Navbar
  },
  computed: {
    filteredCards () {
      return this.$store.state.products.filter(el => el.category.toLowerCase() == this.$route.params.category)
    }
  }
}
</script>

<style>

</style>
