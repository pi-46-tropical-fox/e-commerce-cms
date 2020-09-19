<template>
<table class="table table-striped">
    <thead>
        <tr>
            <th scope="col">No ID</th>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Stock</th>
            <th scope="col">Action</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="product in products" :key="product.id">
            <th scope="row">{{ product.id }}</th>
            <td>
                <img :src="product.image_url" width="80" height="80">
            </td>
            <td scope="row">{{ product.name}}</td>
            <td scope="row">{{ product.price}}</td>
            <td scope="row">{{ product.stock}}</td>
            <td scope="row">
                <button type="button" class="btn btn-outline-info btn-sm">
                    <span class="fa fa-edit" @click="toEdit(product.id)"></span>
                </button>
                 |
                <button type="button" class="btn btn-outline-danger btn-sm">
                    <span class="fa fa-trash" @click="deleteProduct(product.id)"></span>
                </button>
            </td>
        </tr>
    </tbody>
</table>
</template>

<script>
import axios from '../config/axios'
export default {
  name: 'ProductTable',
  props: ['products'],
  methods: {
    toEdit (productId) {
      this.$router.push({ name: 'EditProduct', params: { id: productId } })
    },
    deleteProduct (productId) {
      // console.log(productId);

      axios({
        method: 'delete',
        url: '/products/' + productId
      })
        .then(({ data }) => {
          // this.$router.push({name: 'Home'})
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>
