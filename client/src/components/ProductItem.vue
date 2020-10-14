<template>
  <div class="productItem">
    <div>
      <img class="product" :src="product.image_url" :alt="product.name" srcset="">
    </div>
    <div class="detailProduct">
      <h3>{{product.name}}</h3>
      <span class="mt-3 mb-3">Price : Rp. {{product.price.toLocaleString()}}</span><span class="mt-3 mb-3">Stock :{{product.stock}}</span>
      <div>
        <router-link class="btn btn-primary mr-3" :to="`/Home/editProduct/${product.id}`" >Edit</router-link>
        <b-button href="#" variant="danger" @click.prevent="deleteProduct">Delete</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cardItem',
  props: ['product'],
  methods: {
    deleteProduct () {
      this.$store.dispatch('deleteProduct', this.product)
        .then(() => {
          this.$router.push('/Home')
          setTimeout(() => {
            this.$store.commit('SET_NOTIFICATION', [])
          }, 2000)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>
.productItem {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border:solid grey;
}

.product {
  height: 300px;
  width: 300px;
}

.detailProduct {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width:300px;
}

</style>
