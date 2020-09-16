<template>
  <div class="card col-3 mr-2" style="width: 18rem;">
  <img :src="itemData.image_url" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">{{itemData.name}}</h5>
    <p class="card-text">Price = Rp {{itemData.price}}</p>
    <p class="card-text">Stock = {{itemData.stock}} pcs</p>
    <a href="#" class="btn btn-primary mr-2" @click="deleteItem(itemData.id)">Go Delete</a>
    <a href="#" class="btn btn-dark" @click="goToEdit(itemData.id)">Go Edit</a>
  </div>
</div>
</template>

<script>
// import axios from 'axios'
export default {
  props: ['itemData'],
  methods: {
    deleteItem (id) {
      this.$store.dispatch('deleteProduct', id)
      console.log('process ke filter', id)
      this.$emit('removeData', id)
      // console.log('masuk ke delete', id)
      // axios({
      //   url: `http://localhost:3000/products/${id}`,
      //   method: 'DELETE',
      //   headers: {
      //     access_token: localStorage.getItem('access_token')
      //   }
      // })
      //   .then(({ data }) => {
      //     this.$emit('removeData', id)
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
    },
    goToEdit (id) {
      this.$router.push({ path: `/products/${id}` })
    }
  }
}
</script>

<style>

</style>
