<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-8">
          <h2 class="mt-3">Add Banner</h2>
          <form @submit.prevent="addBanner">
            <div class="form-group">
              <label>Title</label>
              <input type="text" class="form-control" v-model="title" required>
            </div>
            <label>Status</label>
            <div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" v-model="status" value="true">
                <label class="form-check-label" for="inlineRadio1">Active</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" v-model="status" value="false" required>
                <label class="form-check-label" for="inlineRadio2">Inactive</label>
              </div>
            </div>
            <div class="form-group mt-3">
              <label>Image URL</label>
              <input type="text" class="form-control" v-model="image_url" required>
              <small><a href="https://imgur.com/t/upload" target="_blank">Get url of your image</a></small>
            </div>
            <button type="submit" class="btn-sm btn-dark">Submit</button>
            <router-link class="btn-sm btn-danger ml-2 p-2" :to="{ name: 'Banner' }">Cancel</router-link>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddBanner',
  data () {
    return {
      title: '',
      status: '',
      image_url: ''
    }
  },
  methods: {
    addBanner () {
      const payload = {
        title: this.title,
        status: this.status,
        image_url: this.image_url
      }
      this.$store.dispatch('addBanner', payload)
    }
  }
}
</script>

<style>

</style>
