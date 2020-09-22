<template>
  <div class="card mb-3">
    <div class="row no-gutters card-container" @click.prevent='displayDetail'>
      <div class="col-md-4">
        <img :src='item.image_url' class="card-img" alt="">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h3 class="card-title">{{item.name}}</h3>
          <h5 class="card-text">Rp. {{priceConverted}}</h5>
          <h6 class="card-text"><small class="text-muted">Stock: {{item.stock}}</small></h6>
        </div>
      </div>
      <div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemCard',
  data () {
    return {
      // price: null
    }
  },
  props: ['item'],
  computed: {
    priceConverted () {
      const price = String(this.item.price).split('')
      const result = []
      let j = price.length
      for (let i = 0; i <= price.length; i++) {
        result.unshift(price[j])
        j -= 1
        if (i % 3 === 0 && i !== 0 && i !== price.length) {
          result.unshift('.')
        }
      }
      return result.join('')
    }
  },
  methods: {
    displayDetail () {
      this.$router.push({ name: 'ItemDetail' })
      let payload= {
        id: this.item.id,
        name: this.item.name,
        image_url: this.item.image_url,
        price: this.item.price,
        stock: this.item.stock,
        CategoryId: this.item.CategoryId
      }
      this.$store.commit('setOnDisplayData', payload)
    }
  }
}
</script>

<style>

</style>
