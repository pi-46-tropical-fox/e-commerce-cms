<template>
  <div class="for-background">
  <div class="sign-in">
      <div class="container-fluid col-sm-4 p-4">
        <div class="row-3 p-5 border border-secondary" style="border-radius: 10px; box-shadow: 0 0 10px grey, 0 0 3px grey">
          <form @submit.prevent="login" class="loginSubmit">
            <span style="font-size: 30px">Login</span><br>
            <div class="form-group">
              <label for="email" class="col-form-label"></label>
              <div>
                <input type="email" class="form-control" placeholder="Email" v-model="email" required>
              </div>
            </div>
            <div class="form-group">
              <label for="password" class="col-form-label"></label>
              <div>
                <input type="password" class="form-control" placeholder="Password" v-model="password" required>
              </div>
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
          </form>
        </div>
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
  methods: {
    login () {
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>

<style>

</style>
