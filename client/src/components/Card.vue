<template>
  <div class="col-centered">
    <div class="col">
      <div class="card shadow" style="width: 20rem;">
        <img :src="product.image_url" class="card-img-top" alt />
        <div class="card-body">
          <h5 class="card-title">{{product.name}}</h5>
          <p class="card-text">Price: Rp. {{product.price}}</p>
          <p class="card-text">Stock: {{product.stock}}</p>
          <a href="#" class="btn btn-primary" @click.prevent="detailProduct(product.id)" v-if="$store.state.role === 'admin'">DETAILS</a>
          <a href="#" class="btn btn-primary" v-else>BUY</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['product'],
  methods: {
    detailProduct (id) {
      this.$router.push({ path: `/product/${id}` })
    }
  }
}
</script>
