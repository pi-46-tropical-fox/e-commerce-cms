<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <div class="container mr-2">
      <div class="row d-flex">
        <Card v-for="product in products" :key="product.id"
          :itemData="product" @removeData="removeItem"></Card>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Card from '../components/ItemCard.vue'
import axios from 'axios'
export default {
  name: 'Home',
  components: {
    Card
  },
  data () {
    return {
      products: []
    }
  },
  methods: {
    fetchData () {
      axios({
        url: `http://localhost:3000/products/`,
        method: "GET",
				headers: {
					access_token: localStorage.access_token
				}
      })
        .then(({ data }) => {
          console.log('ini data',data);
          this.products = data.products
        })
        .catch(err => console.log(err))
    },
    removeItem (id) {
      this.products = this.products.filter(item => item.id !== id)
    }
  },
  created () {
    this.fetchData()
  }
}
</script>
