<template>
  <div class="main mt-3">
    <div class="form-container container">
      <div class="row align-items-center" style="height: 100vh;">
        <div class="col-12">
          <form @submit.prevent="edit">
            <div class="form-group">
              <label for="exampleInputEmail1">Name</label>
              <input type="text" class="form-control" v-model="setData.title" aria-describedby="emailHelp">
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Image Url</label>
                <input type="text" class="form-control" v-model="setData.image_url">
              </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    setData: {
      get(){
        return this.$store.state.editBannerData
      }
    }
  },
  methods: {
    edit(){
      const payload = this.setData
      this.$store.dispatch('editBanner', payload)
    }
  },
  created() {
    this.$store.dispatch("findOneBanner", this.$route.params.id)
  }
}
</script>

<style scoped>
.main {
    margin-left: 120px;
    padding: 0px 10px;
}

.form-container{
  width: 500px;
  height: 100vh;
}
</style>
