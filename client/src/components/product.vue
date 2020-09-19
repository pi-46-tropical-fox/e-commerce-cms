<template>
  <div class="container mb-2">
    <div class="row">
      <div class="col-12">
        <div class="container d-flex justify-content-start">
          <img :src="productData.image_url" width="350px" alt="" />
        </div>
      </div>
      <div class="col-12 mt-3">
        <div class="container">
          <div class="row">
            <div class="col-4">
              <div>
                <h3>Product Name :</h3>
                <h5>{{ productData.name }}</h5>
              </div>
              <br />
            </div>
            <div class="col-4">
              <div>
                <h3>Price :</h3>
                <h5>Rp {{ new Number(productData.price).toLocaleString("id-ID") }}</h5>
              </div>
              <br />
            </div>
            <div class="col-4">
              <div>
                <h3>Stock :</h3>
                <h5>{{ productData.stock }} Pcs</h5>
              </div>
              <br />
            </div>
          </div>
        </div>
        <div class="row justify-content-between">
            <div class="col-6">
                <button class="btn" @click="editId(productData.id)">
                <router-link class="btn-link" :to="{name:'Edit Product',params:{id:productData.id}}">Edit Product</router-link>
                </button>
            </div>
            <div class="col-6">
                <button class="btn" @click="deleteProduct(productData.id)">
                <router-link class="btn-link" :to="{name:'Home'}">Delete Product</router-link>
                </button>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cards',
  props: {},
  computed: {
    productData () {
      return this.$store.state.productData
    }
  },
  methods: {
    fetchData () {
      this.$store.dispatch('getOne', this.$route.params.id)
    },
    deleteProduct (id) {
      this.$store.dispatch('deleteProduct', id)
    },
    editId (id) {
      this.$store.dispatch('getId',id)
    }

  },
  created () {
    this.fetchData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@700&display=swap');
h5 h3{
  text-align: center;
}
.btn{
  background-color: #2c3e50;
}
.btn-link{
  color: #fff;
  text-decoration: none;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-weight: bolder;
}
.btn:hover{
  background-color: #42b983;
}
.btn-link:hover{
  color: #2c3e50;
}
.container{
  font-family: 'Oswald', sans-serif;
}
</style>
