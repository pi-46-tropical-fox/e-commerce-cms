<template>
  <div>
    <div class="card shadow mr-2 mb-2 ml-3" style="width: 18rem;" id="itemCard">
        <img src="../assets/photo.svg" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">{{ productData.name }}</h5>
            <p class="card-text">Price: {{ productData.price }}</p>
            <p class="card-text">Stock: {{ productData.stock }}</p>
            <a class="btn btn-primary mr-2" @click.prevent="editProduct(productData.id)">
                <img src="../assets/edit.svg">
                Edit
                </a>
            <a class="btn btn-primary" @click.prevent="deleteProduct(productData.id)">
                <img src="../assets/trash-2.svg">
                Delete
                </a>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['productData'],
  name: 'ItemCard',
  methods: {
    deleteProduct (id) {
      axios({
        method: 'DELETE',
        url: `http://localhost:3001/products/${id}`
      })

        .then(({ response }) => {
          this.$store.commit('removeProduct', id)
        })

        .catch(({ err }) => {
          console.log(err)
        })
    },
    editProduct (id) {
      // console.log(id)
      this.$router.push({ path: `/edit/${id}` })
    }
  }
}
</script>

<style scoped>

</style>
