<template>
  <div id="loginCard">
      <!-- <h1>This is supposed to be Login Form</h1> -->
      <div class="card shadow" style="width: 18rem;">
        <img src="../assets/authentication.svg" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">Log in</h5>
            <small>Please <a href="/register">register here </a>if you don't have an account yet.</small>
              <form @submit.prevent="submitLogin">
                <div class="form-group">
                 <br><label for="emailLogin">Email Address</label>
                  <input type="email" class="form-control" id="emailLogin" v-model="loginEmail" aria-describedby="emailHelp">
                  <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                  <label for="passwordLogin">Password</label>
                  <input type="password" class="form-control" id="passwordLogin" v-model="loginPassword">
                </div>
                <button type="submit" class="btn btn-primary">Log In</button>
              </form>
  </div>
</div>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data () {
    return {
      loginEmail: '',
      loginPassword: ''
    }
  },
  methods: {
    submitLogin () {
      this.$store.dispatch('retrieveToken', {
        loginEmail: this.loginEmail,
        loginPassword: this.loginPassword
      })
      this.$router.push('/dashboard')
    }
  }
}
</script>

<style scoped>
#loginCard {
    margin-top: 25px;
    display: flex;
    justify-content: center;
}

</style>
