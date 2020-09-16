<template>
  <table class="table table-hover">
    <thead>
      <tr>
        <th scope="col">Image</th>
        <th scope="col">Name</th>
        <th scope="col">Price</th>
        <th scope="col">Stock</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <th><img :src="product.image_url" alt="" class="img-thumbnail" style="max-width: 10vw;"></th>
        <td>{{ product.name }}</td>
        <td>{{ product.price }}</td>
        <td>{{ product.stock }}</td>
        <td>
          <!-- <button >Edit</button> -->
          <router-link :to="{ name:'Edit', params:{ id : product.id }}" class="btn btn-primary" >Edit</router-link>
          <button class="btn btn-primary" @click="deleteProduct(product.id)">Delete</button>
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