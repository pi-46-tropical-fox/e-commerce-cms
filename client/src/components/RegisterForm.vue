<template>
  <div id="registerCard">
      <!-- <h1>This is supposed to be Login Form</h1> -->
      <div class="card shadow" style="width: 18rem;">
        <img src="../assets/login.svg" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">Register</h5>
            <small>Already have an account? You can go <a href="/">login here.</a></small>
              <form @submit.prevent="submitRegister">
                <br><div class="form-group">
                  <label for="emailRegister">Email Address</label>
                  <input type="email" class="form-control" id="emailRegister" v-model="registerEmail" aria-describedby="emailHelp">
                  <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                  <label for="passwordRegister">Password</label>
                  <input type="password" class="form-control" id="passwordRegister" v-model="registerPassword">
                </div>
                <button type="submit" class="btn btn-primary">Register</button>
              </form>
  </div>
</div>
  </div>
</template>

<script>
export default {
  name: 'RegisterForm',
  data () {
    return {
      registerEmail: '',
      registerPassword: ''
    }
  },
  methods: {
    submitRegister () {
      this.$store.dispatch('register', {
        registerEmail: this.registerEmail,
        registerPassword: this.registerPassword
      })
      // this.$router.push('/')
      // .then(response => {
      // this.$router.push('/')
      // })
    // },
    // created () {
    //   this.submitRegister()
    // },
    // created () {
    //   this.submitRegister()
    }
  }
}
</script>

<style scoped>
#registerCard {
    margin-top: 25px;
    display: flex;
    justify-content: center;
}

</style>
