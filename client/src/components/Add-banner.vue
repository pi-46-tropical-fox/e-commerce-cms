<template>
  <div class="main mt-3">
    <div class="form-container container">
      <div class="row align-items-center" style="height: 100vh;">
        <div class="col-12">
          <form @submit.prevent="add">
            <div class="form-group">
              <label for="exampleInputEmail1">Name</label>
              <input type="text" class="form-control" v-model="name" aria-describedby="emailHelp">
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Image Url</label>
                <input type="text" class="form-control" v-model="image_url">
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
  data(){
    return {
      name: '',
      image_url: '',
      price: '',
      stock: ''
    }
  },
  methods: {
    add(){
      const payload = {
        name: this.name,
        image_url: this.image_url,
        price: this.price,
        stock: this.stock
      }

      this.$store.dispatch('addBanner', payload)
    }
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
