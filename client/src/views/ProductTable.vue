<template>
<!-- table Product START -->
  <div>
    <h2>List of Products</h2>
    <div class="info">
        <table class="table">
            <thead class="thead-dark">
                <tr class="text-center">
                    <th scope="col">No.</th>
                    <th scope="col">Product's Name</th>
                    <th scope="col">Display</th>
                    <th scope="col">Price</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Category</th>
                    <th scope="col">Set Banner</th>
                    <th scope="col">Option</th>
                </tr>
            </thead>
            <tbody class="table-bordered">
                <!-- looping data START -->
                <TableDataProduct
                v-for="(product, index) in $store.state.products"
                :key="index"
                :product="product" :index="index"></TableDataProduct>
                <!-- looping data END -->
            </tbody>
        </table>
    </div>
  </div>
<!-- table product END -->
</template>

<script>
import TableDataProduct from '../components/TableDataProduct.vue'
export default {
  name: 'ProductTable',
  components: {
    TableDataProduct
  },
  created () {
    this.$store.dispatch('showProducts')
  }
}
</script>

<style scoped>

</style>
