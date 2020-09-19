<template>
<div class="">
  <Navbar></Navbar>
  <div class="product-edit-container container row mx-auto">
    <div class="p-3 my-5 mx-5" style="width: 18rem" id="card-in-products">
      <img :src="product.imageURL" class="imageinedit mx-auto mt-5" alt="...">
      <div class="card-body edit-card-body mx-5">
          <h1 class="edit-card-title my-auto">{{product.name}}</h1>
          <h1 class="edit-card-title my-auto">{{currencyFormat}}</h1>
        
      </div>
      <br>
      <div>
          <button class="btn btn-primary" @click="goBack"> Back</button>
      </div>
    </div>
    <EditForm
    :product="product"
    ></EditForm>
  </div>
</div>

</template>

<script>
import Navbar from '../components/Navbar'
import EditForm from '../components/EditForm'
export default {
  name: 'Product',
  components: {
    EditForm,
    Navbar
  },
  methods: {
    goBack () {
      this.$router.push({ path: '/home' })
    },
    goEdit (id) {
      console.log(id)
    }
  },
  computed: {
    product () {
      return this.$store.state.products.filter(el => el.id == this.$route.params.id)[0]
    },
    currencyFormat () {
      const output = `Rp${new Intl.NumberFormat().format(this.product.price)},00`
      return output
    }
  }
}
</script>

<style>

</style>
