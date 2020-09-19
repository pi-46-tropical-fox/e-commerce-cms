<template>
<div class="container row mx-auto">
  <div class="card mx-auto p-3" style="width: 18rem">
    <img :src="product.imageURL" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">{{product.name}}</h5>
        <p class="card-text">{{currencyFormat}}</p>
    </div>
    <div>
        <button class="btn btn-primary" @click="goBack"> Back</button>
    </div>
    <div>
        <i class="fas fa-edit" type="button" data-toggle="modal" data-target="#exampleModal">Edit</i>
    </div>
  </div>
  <EditForm
  :product="product"
  ></EditForm>
</div>
</template>

<script>
import EditForm from '../components/EditForm'
export default {
  name: 'Product',
  components: {
    EditForm
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
