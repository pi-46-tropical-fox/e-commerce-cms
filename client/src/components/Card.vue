<template>
    <div class="card mx-3 p-3" style="width: 18rem">
     <img :src="product.imageURL" class="card-img-top card-image" alt="...">
     <div class="card-body">
        <h5 class="card-title">{{product.name}}</h5>
        <p class="card-text">{{currencyFormat}}</p>
     </div>
        <div class="footer">
        <i class="fas fa-edit show-info" type="button" data-toggle="modal" data-target="#exampleModal">Edit</i>
         <i class="delete-product fas fa-trash-alt" @click="deleteProduct(product.id)">Delete</i>
        </div>
        <EditForm
          :id="product.id"
          :item="product"
          ></EditForm>
    </div>
</template>

<script>
import EditForm from '../components/EditForm'
export default {
  name: 'Card',
  props: ['product'],
  data: function () {
    return  {
      item: this.product
    }
  },
  components: {
    EditForm
  },
  methods: {
    deleteProduct (id) {
      this.$store.dispatch('deleteProduct', id)
    }
  },
  computed: {
    currencyFormat () {
      console.log(this.product.id)
      const output = `Rp${new Intl.NumberFormat().format(this.product.price)},00`
      return output
    }
  }
}
</script>

<style>

</style>
