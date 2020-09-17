<template>
  <div class="home">
    <div class="card-container">
      <Card
      v-for="product in data" :key="product.id"
      :itemData="product"
      @updateItem="updateProduct"
      @deleteItem="deleteProduct"
      ></Card>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Card from '../components/itemCard'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    Card
  },
  data () {
    return {
      data: []
    }
  },
  methods: {
    getProducts () {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/products'
      })
        .then(({ data }) => {
          this.data = data
        })
        .catch(err => { console.log(err) })
    },
    async updateProduct (data) {
      await axios({
        method: 'PUT',
        url: `http://localhost:3000/products/${data.id}`,
        data: data
      })
      try {
        console.log(data)
      }
      catch(err) {
        console.log(err)
      }
    },
    async deleteProduct (id) {
      await axios({
        method: 'DELETE',
        url: `http://localhost:3000/products/${id}`
      })
      try {
        console.log("Delete data success")
      }
      catch(err) {
        console.log(err)
      }
    },
  },
  created () {
    this.getProducts()
  }
}
</script>
