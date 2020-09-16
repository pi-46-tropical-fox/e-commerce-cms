<template>
  <div class="home">
    <NavbarHome/>
<!--
        <div class="form-group">
          <label for="exampleFormControlFile1">Example file input</label>
          <input type="file" @change="onFileSelected"
          class="form-control-file" id="exampleFormControlFile1">
          <button @click="onUpload">Upload</button>
        </div> -->
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
      <form @submit.prevent ="filterCategories" class="form-inline" style="justify-content: center!important;">
        <select id="inputCategory" class="form-control form-group mx-sm-3 mb-2" v-model="category" style="width:200px;">
          <option selected value="Unknown">Choose...</option>
          <option value="Kaos">Kaos</option>
          <option value="Kemeja">Kemeja</option>
          <option value="Dress">Dress</option>
          <option value="Celana">Celana</option>
          <option value="Rok">Rok</option>
          <option value="Sepatu">Sepatu</option>
          <option value="Jam Tangan">Jam Tangan</option>
        </select>
        <!-- <div class="form-group mx-sm-3 mb-2">
          <input type="password" class="form-control" id="inputPassword2" placeholder="Category">
        </div> -->
        <button type="submit" class="btn btn-primary mb-2">Filter</button>
      </form>

      <div class="container mr-2">
        <div class="row d-flex">
          <Card v-for="product in data.products" :key="product.id"
            :itemData="product" @removeData="removeItem"></Card>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '../components/ItemCard.vue'
import NavbarHome from '../components/NavbarHome.vue'

export default {
  name: 'Home',
  components: {
    Card,
    NavbarHome
  },
  data () {
    return {
      category: ''
      // selectedFile: null
    }
  },
  computed: {
    data () {
      // return this.$store.getters.filterByCategory
      return this.$store.state.products
    }
  },
  methods: {
    fetchProducts () {
      this.$store.dispatch('fetchProducts')
    },
    removeItem (id) {
      this.data.products = this.data.products.filter(item => item.id !== id)
    },
    filterCategories () {
      this.data.products = this.data.products.filter(item => item.category === this.category)
    }
    // onFileSelected (event) {
    //   this.selectedFile = event.target.files[0]
    // },
    // onUpload() {

    // }
  },
  created () {
    this.fetchProducts()
  }
}
</script>
