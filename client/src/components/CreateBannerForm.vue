<template>
      <div class="row">
          <div class="col-6">
            <img src="../assets/image1.png" class="card-img-top" alt="Login Image">
          </div>
          <div class="col-6">
          <form @submit.prevent ="createBanner">
              <div class="form-group row">
                <label for="inputBannerName" class="col-sm-2 col-form-label">Banner Name</label>
                <div class="col-sm-10">
                  <input type="text" placeholder="Insert Banner Title..." v-model="title" class="form-control" id="inputProductName">
                </div>
              </div>
              <div class="form-group row">
                <label for="inputImageUrl" class="col-sm-2 col-form-label" >Image</label>
                <div class="col-sm-10">
                  <input type="text" v-model="image_url" class="form-control" placeholder="Insert Image Url..." id="inputImageUrl">
                </div>
              </div>
              <div class="form-group row">
                <label for="inputCategory">Category</label>
                  <select id="inputCategory" class="form-control" v-model="status" style="width:100px;">
                    <option selected>Choose...</option>
                    <option value="On">On</option>
                    <option value="Off">Off</option>
                  </select>
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
      </div>
</template>

<script>

export default {
  name: 'CreateBannerForm',
  data () {
    return {
      title: '',
      status: '',
      image_url: ''
    }
  },
  methods: {
    createBanner () {
      const payload = {
        title: this.title,
        status: this.status,
        image_url: this.image_url
      }
      this.$store.dispatch('createBanner', payload)
    }
  }
}
</script>

<style>

</style>
