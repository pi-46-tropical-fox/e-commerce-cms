<template>
<div class="container">
    <NavbarHome/>
      <div class="row">
          <div class="col-6">
            <img :src="selectedData.image_url" class="card-img-top" alt="Login Image">
          </div>
          <div class="col-6">
           <form @submit.prevent ="editBanner">
              <div class="form-group row">
                <label for="inputProductName" class="col-sm-2 col-form-label">Product Name</label>
                <div class="col-sm-10">
                  <input type="text" v-model="selectedData.title" class="form-control" id="inputProductName">
                </div>
              </div>
              <div class="form-group row">
                <label for="inputCategory" class="col-sm-2 col-form-label">Status</label>
                <div class="col-sm-10">
                  <select id="inputCategory" class="form-control" v-model="selectedData.status" style="width:100px;">
                    <option selected>Choose...</option>
                    <option value="On">On</option>
                    <option value="Off">Off</option>
                  </select>
                  </div>
              </div>
              <div class="form-group row">
                <label for="inputImageUrl" class="col-sm-2 col-form-label">Image</label>
                <div class="col-sm-10">
                  <input type="text" v-model="selectedData.image_url" class="form-control" id="inputImageUrl">
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
  name: 'EditBannerForm',
  components: {
    NavbarHome
  },
  computed: {
    selectedData: {
      get () {
        return this.$store.state.selectedData
      }
    }
  },
  methods: {
    editBanner () {
      this.$store.dispatch('editBanner', this.selectedData)
    }
  },
  created () {
    const id = this.$route.params.id
    this.$store.dispatch('getBanner', id)
  }

}
</script>

<style>

</style>
