<template>
  <div class="col-3 my-3">
    <div class="card">
      <img :src="product.image_url" :alt="product.name" class="card-img-top" style="max-height: 150px; object-fit: cover;">
      <ul class="list-group list-group-flush">
        <li class="list-group-item"><strong>{{ product.name }}</strong></li>
        <li class="list-group-item"><strong>Price :</strong></li>
        <li class="list-group-item">{{ idr }}</li>
        <li class="list-group-item"><strong>Stock : </strong>{{ product.stock }}</li>
        <li class="list-group-item">
          <router-link :to="`/edit-product/${product.id}`" class="btn btn-info m-2">Edit</router-link>
          <button @click="deleteProduct(product.id)" class="btn btn-danger m-2">Delete</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['product'],
  methods: {
    deleteProduct (id) {
      this.$store.dispatch('deleteProduct', { id })
        .then(({ data }) => {
          this.$store.dispatch('fetchProducts')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
    idr () {
      return this.product.price.toLocaleString('id', { style: 'currency', currency: 'IDR' })
    }
  }
}
</script>
