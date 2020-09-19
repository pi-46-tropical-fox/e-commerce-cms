<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-8">
          <h2 class="mt-3">Edit Banner</h2>
          <form @submit.prevent="editBanner">
            <div class="form-group">
              <label>Title</label>
              <input type="text" class="form-control" v-model="selectedBanner.title" required>
            </div>
            <label>Status</label>
            <div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" v-model="selectedBanner.status" value="true">
                <label class="form-check-label" for="inlineRadio1">Active</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" v-model="selectedBanner.status" value="false" required>
                <label class="form-check-label" for="inlineRadio2">Inactive</label>
              </div>
            </div>
            <div class="form-group mt-3">
              <label>Image URL</label>
              <input type="text" class="form-control" v-model="selectedBanner.image_url" required>
              <small><a href="https://imgur.com/t/upload" target="_blank">Get url of your image</a></small>
            </div>
            <button type="submit" class="btn-sm btn-dark">Submit</button>
            <router-link class="btn-sm btn-danger ml-2 p-2" :to="{ name: 'BannerDetails' }">Cancel</router-link>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditBanner',
  computed: {
    selectedBanner: {
      get () {
        return this.$store.state.banner
      }
    }
  },
  methods: {
    editBanner () {
      const payload = {
        editData: this.selectedBanner,
        id: this.$route.params.id
      }
      this.$store.dispatch('editBanner', payload)
    }
  }
}
</script>

<style>

</style>
