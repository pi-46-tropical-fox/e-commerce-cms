<template>
  <div class="container">
      <div class="row">
          <div class="col-6">
            <img src="../assets/manclothes.jpg" class="card-img-top" alt="Login Image">
          </div>
          <div class="col-6">
            <form @submit.prevent ="login">
                <div class="form-group row">
                    <label for="exampleInputEmail1" class="col-sm-2 col-form-label">Email</label>
                    <div class="col-sm-10">
                    <input type="email" v-model="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
                    <div class="col-sm-10">
                    <input type="password" v-model="password" class="form-control" id="inputPassword">
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>

          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  // computed: {
  //   data() {
  //     return this.$store.state.email
  //   }
  // },
  methods: {
    login () {
      const payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('login', payload)
    }
  }

}
</script>

<style>

</style>
