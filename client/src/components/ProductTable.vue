<template>
  <table class="table table-hover">
    <thead>
      <tr>
        <th scope="col"><h4>Product Image</h4></th>
        <th scope="col"><h4>Name</h4></th>
        <th scope="col"><h4>Price</h4></th>
        <th scope="col"><h4>Stock</h4></th>
        <th scope="col"><h4>Action</h4></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <th><img :src="product.image_url" alt="" class="img-thumbnail" style="max-width: 10vw;"></th>
        <td><h5>{{ product.name }}</h5></td>
        <td><h5>{{ new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(product.price) }}</h5></td>
        <td><h5>{{ product.stock }}</h5></td>
        <td>
          <!-- <button >Edit</button> -->
          <router-link :to="{ name:'Edit', params:{ id : product.id }}" class="btn btn-primary mx-1" >Edit</router-link>
          <button class="btn btn-primary mx-1" @click="deleteProduct(product.id)">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
    created() {
        this.$store.dispatch('getProducts')
        console.log(this.$store.state.products);
    },
    computed: {
      products() {
        return this.$store.state.products
      }
    },
    methods: {
      deleteProduct(id) {
        this.$store.dispatch('deleteProduct', id)
        this.$store.dispatch('getProducts')
      }
    }
}
</script>