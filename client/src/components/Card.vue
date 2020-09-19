<template>
    <div class="card mx-3 p-3" style="width: 18rem">
     <img :src="product.imageURL" class="card-img-top card-image p-3" alt="...">
     <div class="card-body">
        <h5 class="card-title">{{product.name}}</h5>
        <p class="card-text">{{currencyFormat}}</p>
         <p class="card-text" v-if="$route.params.id === product.id">{{product.stock}}</p>

     </div>
        <div class="footer">
        <i class="fas fa-edit show-info" type="button" @click="goToDetail(product.id)" data-target="#exampleModal">See Detail</i>
         <i class="delete-product fas fa-trash-alt" @click="deleteProduct(product.id)">Delete</i>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['product'],
  data: function () {
    return  {
      id: this.product.id,
      item: this.product
    }
  },
  components: {
  },
  methods: {
    deleteProduct (id) {
      this.$store.dispatch('deleteProduct', id)
    },
    goToDetail(id) {
      this.$router.push(`/product/${id}`)
    }
  },
  computed: {
    currencyFormat () {
      console.log(this.id)
      const output = `Rp${new Intl.NumberFormat().format(this.product.price)},00`
      return output
    }
  }
}
</script>

<style>

</style>
