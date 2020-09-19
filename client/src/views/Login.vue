<template>
  <div>
    <div class="container d-flex justify-content-center form-group">
      <form>
        <div class="card" style="width: 32rem;">
          <div class="card-body">
            <h5 class="card-title">Your path for power starts here</h5>
            <div class="row mt-5 mx-auto justify-content-center">
              <label class="col-3 justify-content-">Email</label>
              <input class="col-8" type="email" v-model="email">
            </div>
            <div class="row mt-3 mx-auto justify-content-center">
              <label class="col-3 justify-content-">Password</label>
              <input class="col-8" type="password" v-model="password">
            </div>
            <!-- <input class="btn btn-primary" type="submit" value="Login"> -->
            <a class="btn btn-primary mt-5" @click.prevent="login">Login</a>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      const data = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('login', data)
      // this.$store.commit('changeLogged')
      if (this.$store.state.isLoggedIn) {
        this.$router.push('/products')
      } else {
        // this.$router.push('/login')
      }
    }
  },
  created () {
  }
}
</script>

<style>

</style>
