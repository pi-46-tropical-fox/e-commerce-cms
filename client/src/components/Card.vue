<template>
    <div class="card mx-3" style="width: 18rem">
     <!-- <img :src="product.imageURL" class="card-img-top" alt="..."> -->
     <div class="card-body">
        <h5 class="card-title">{{product.name}}</h5>
        <p class="card-text">{{currencyFormat}}</p>
         <a href="#" class="btn btn-primary">Show Detail</a>
     </div>
    </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['product'],
  computed: {
    currencyFormat () {
      const output = `Rp${new Intl.NumberFormat().format(this.product.price)},00`
      return output
    }
  }
}
</script>

<style>

</style>
