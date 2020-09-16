<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="container d-flex justify-content-start">
          <img :src="productData.image_url" width="350px" alt="" />
        </div>
      </div>
      <div class="col-12">
        <div class="container">
          <div class="row">
            <div class="col-4">
              <div>
                <h3>Product Name</h3>
                <h5>{{ productData.name }}</h5>
              </div>
              <br />
            </div>
            <div class="col-4">
              <div>
                <h3>Price</h3>
                <h5>{{ productData.price }}</h5>
              </div>
              <br />
            </div>
            <div class="col-4">
              <div>
                <h3>Stock</h3>
                <h5>{{ productData.stock }}</h5>
              </div>
              <br />
            </div>
          </div>
        </div>
        <div class="row justify-content-between">
            <div class="col-6">
                <button @click="editId(productData.id)">
                <router-link  :to="{name:'Edit Product',params:{id:productData.id}}">Edit Product</router-link>
                </button>
            </div>
            <div class="col-6">
                <button @click="deleteProduct(productData.id)">
                <router-link :to="{name:'Home'}">Delete Product</router-link>
                </button>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "cards",
  props: {},
  computed: {
    productData() {
      return this.$store.state.productData;
    }
  },
  methods: {
    fetchData() {
      this.$store.dispatch("getOne", this.$route.params.id);
    },
    deleteProduct(id){
        this.$store.dispatch('deleteProduct',id)
    },
    editId(id){
    }

  },
  created() {
    this.fetchData();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
