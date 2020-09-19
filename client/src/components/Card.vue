<template>
  <div class="card mb-3 mt-3 mr-2 ml-2 pt-1 pb-1 pl-1 pr-1 shadow-sm">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img :src="productData.image" class="card-img">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h4 class="card-title">{{ productData.name }}</h4>
              <div class="row text-left">
                <h6>{{ productData.description }} </h6>
                </div>
                <div class="row border justify-content-center text-warning" style="background-color:  #2c3e50; color: #ffb142">
                  <h5>Specification</h5>
                </div>
              <div class="row text-left">
              <p>Gender: {{productData.gender}} <br>
              Category: {{productData.category}} <br>
                Dimension: {{ productData.diameter }} <br>
              Movement: {{ productData.movement }} <br>
              </p>
            </div>
             <div class="row border justify-content-center text-warning" style="background-color:  #2c3e50; color: #ffb142">
               <div class="col text-left">
                  <h6>Price Rp. {{ productData.price }}</h6>
                  </div>
                  <div class="col text-right">
                  <small>Stock {{ productData.stock }}</small>
                  </div>
                </div>
                <div class="row">
                <button class="btn btn-sm btn-dark text-white mr-2" @click="editProduct(productData.id)" type="submit">Edit</button>
                <button class="btn btn-sm btn-dark text-white" @click="deleteProduct(productData.id)" type="submit">Delete</button>
                </div>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['productData'],
  methods: {
    editProduct (id) {
      this.$router.push({ path: `/products/${id}` })
    },
    deleteProduct (id) {
      this.$store.dispatch('deleteProducts', id)
    }
  }
}
</script>

<style>

</style>
