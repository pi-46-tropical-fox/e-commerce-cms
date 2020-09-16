<template>
  <div class="container">
    <NavbarHome/>
      <div class="row">
          <div class="col-6">
            <img :src="selectedData.image_url" class="card-img-top" alt="Login Image">
          </div>
          <div class="col-6">
           <form @submit.prevent ="editProduct">
              <div class="form-group row">
                <label for="inputProductName" class="col-sm-2 col-form-label">Product Name</label>
                <div class="col-sm-10">
                  <input type="text" v-model="selectedData.name" class="form-control" id="inputProductName">
                </div>
              </div>
              <div class="form-group row">
                <label for="inputCategory">Category</label>
                  <select id="inputCategory" class="form-control" v-model="selectedData.category" style="width:100px;">
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
              <div class="form-group row">
                <label for="inputImageUrl" class="col-sm-2 col-form-label">Image</label>
                <div class="col-sm-10">
                  <input type="text" v-model="selectedData.image_url" class="form-control" id="inputImageUrl">
                </div>
              </div>
              <div class="form-group row">
                <label for="inputPrice" class="col-sm-2 col-form-label">Price</label>
                <div class="col-sm-10">
                  <input type="number" v-model="selectedData.price" class="form-control" id="inputPrice" style="width:150px;">
                </div>
              </div>
              <div class="form-group row">
                <label for="inputStock" class="col-sm-2 col-form-label">Stock</label>
                <div class="col-sm-10">
                  <input type="number" v-model="selectedData.stock" class="form-control" id="inputStock" style="width:100px;">
                </div>
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
      </div>
  </div>
</template>

<script>
import NavbarHome from '../components/NavbarHome.vue'
export default {
  name: 'EditForm',
  data () {
    return {
      selected: {}
    }
  },
  components: {
    NavbarHome
  },
  computed: {
    selectedData: {
      get () {
        return this.$store.state.selectedData
      },
      set (newValue) {
        console.log(newValue)
      }
    }
  },
  methods: {
    editProduct () {
      this.$store.dispatch('editProduct', this.selectedData)
    }
  },
  created () {
    const id = this.$route.params.id
    this.$store.dispatch('getProduct', id)
  }

}
</script>

<style>

</style>
