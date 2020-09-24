<template>
  <table class="table">
    <thead>
      <tr>
        <th>#</th>
        <th scope="col">Name</th>
        <th scope="col">Product Image</th>
        <th scope="col">Price</th>
        <th scope="col">Stock</th>
        <th scope="col">Action</th>
      </tr>
    </thead>

    <tbody v-if="dataProduct">
      <tr :key="i" v-for="(product, i) in dataProduct">
        <td>{{i+1}}</td>
        <td>{{product.name}}</td>
        <td border="1px #48484A"><img :src="product.image_url" height="150px" alt=""></td>
        <td>IDR {{formatPrice(product.price)}}</td>
        <td>{{product.stock}}</td>
        <td colspan="2">
          <a href="" @click.prevent="updateProduct(product.id)">
            <svg height="1.1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
            </svg>
          </a> |
          <a href="" @click.prevent="deleteProduct(product.id)">
            <svg height="1.1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
              <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>
          </a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'productTable',
  props: ['dataProduct'],
  methods: {
    formatPrice (value) {
      const val = (value / 1).toFixed().replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    deleteProduct (id) {
      console.log(id, 'ini di product table')
      this.$store.dispatch('deleteProduct', id)
    },
    updateProduct (id) {
      this.$router.push(`/products/${id}`)
    }
  }
}
</script>

<style scoped>
.table {
  color: #48484A;
  background-color: #fff;
}
</style>
