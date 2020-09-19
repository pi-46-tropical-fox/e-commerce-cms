<template>
  <div class="container">
    <div class="row">
      <div class="col-6">
        <div>
          <img :src="product.image_url" alt="" width="450px" />
        </div>
      </div>
      <div class="col-6">
        <div class="container">
          <div class="container col-9">
            <h1>Edit Product</h1>
            <form @submit.prevent="editProduct">
              <div class="form-group">
                <label for="exampleInputEmail1">Image Url :</label>
                <input
                  type="text"
                  class="form-control"
                  id="image_url"
                  aria-describedby="emailHelp"
                  placeholder="image.png"
                  v-model="dataProd.image_url"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Name :</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  placeholder="Lenovo"
                  v-model="dataProd.name"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Price :</label>
                <input
                  type="number"
                  class="form-control"
                  id="price"
                  placeholder="1000000"
                  v-model="dataProd.price"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Stock :</label>
                <input
                  type="number"
                  class="form-control"
                  id="stock"
                  placeholder="5"
                  v-model="dataProd.stock"
                />
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditProduct',
  data () {
    return {
      dataProd: {}
    //   image_url: this.dataProd.image_url,
    //   name: this.dataProd.name,
    //     price: this.dataProd.price,
    //     stock: this.dataProd.stock
    }
  },
  methods: {
    editProduct () {
      const data = {
        image_url: this.dataProd.image_url,
        name: this.dataProd.name,
        price: this.dataProd.price,
        stock: this.dataProd.stock
      }
      const id = this.$route.params.id
      this.$store.dispatch('edit', { data, id })
    }
  },
  computed: {
    product () {
      this.dataProd = this.$store.state.productData
      return this.$store.state.productData
    }
  },
  created(){
    this.$store.dispatch('getOne',this.$route.params.id)
  }
}
</script>

<style></style>
