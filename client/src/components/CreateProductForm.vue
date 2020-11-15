<template>
  <div class="container">
    <NavbarHome/>
      <div class="row">
          <div class="col-6">
            <img src="../assets/image.png" class="card-img-top" alt="Login Image">
          </div>
          <div class="col-6">
          <form @submit.prevent ="createProduct">
              <div class="form-group row">
                <label for="inputProductName" class="col-sm-2 col-form-label">Product Name</label>
                <div class="col-sm-10">
                  <input type="text" placeholder="Insert Product Name..." v-model="name" class="form-control" id="inputProductName">
                </div>
              </div>
              <div class="form-group row">
                <label for="inputImageUrl" class="col-sm-2 col-form-label">Image</label>
                <div class="col-sm-10">
                  <input type="text" v-model="image_url" placeholder="Insert Image Url..." class="form-control" id="inputImageUrl">
                </div>
              </div>
              <div class="form-group row">
                <label for="inputCategory" class="col-sm-2 col-form-label">Category</label>
                 <div class="col-sm-10">
                  <select id="inputCategory" class="form-control" v-model="category" style="width:100px;">
                    <option selected value="Unknown">Choose...</option>
                    <option value="Kaos">Kaos</option>
                    <option value="Kemeja">Kemeja</option>
                    <option value="Dress">Dress</option>
                    <option value="Celana">Celana</option>
                    <option value="Rok">Rok</option>
                    <option value="Sepatu">Sepatu</option>
                    <option value="Jam Tangan">Jam Tangan</option>
                  </select>
                </div>
              </div>
              <div class="form-group row">
                <label for="inputPrice" class="col-sm-2 col-form-label">Price</label>
                <div class="col-sm-10">
                  <input type="number" placeholder="Insert Price..." v-model="price" class="form-control" id="inputPrice" style="width:150px;">
                </div>
              </div>
              <div class="form-group row">
                <label for="inputStock" class="col-sm-2 col-form-label">Stock</label>
                <div class="col-sm-10">
                  <input type="number" placeholder="Stock..." v-model="stock" class="form-control" id="inputStock" style="width:100px;">
                </div>
              </div>
              <button type="submit" class="btn btn-secondary mt-3" style="width: 200px">Submit</button>
            </form>
          </div>
      </div>
  </div>
</template>

<script>
import NavbarHome from '../components/NavbarHome.vue'
export default {
  name: 'CreateProductForm',
  components: {
    NavbarHome
  },
  data () {
    return {
      name: '',
      category: '',
      image_url: '',
      stock: '',
      price: ''
    }
  },
  methods: {
    createProduct () {
      const payload = {
        name: this.name,
        category: this.category,
        image_url: this.image_url,
        stock: this.stock,
        price: this.price
      }
      this.$store.dispatch('createProduct', payload)
    }
  }
}
</script>

<style>

</style>
