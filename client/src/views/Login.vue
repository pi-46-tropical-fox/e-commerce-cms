<template>
      <section id="login-page">
      <div class="login-page-left">
      </div>
      <div class="login-page-right">
        <div class="logo">
          <img src="../images/logo.png" alt="">
        </div>
        <h1>Sign In</h1>
          <br />
          <form id="submit-login" @submit.prevent="loginSubmit">
              <label>Email</label>
              <input type="email"  id="email-login" v-model="email">
              <br />
              <label>Password</label>
              <input type="password"  id="password-login" v-model="password">
              <br />
              <button class="login-btn" type="submit">Login</button>
          </form>
      </div>
  </section>
</template>

<script>
export default {
  name: 'LoginPage',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    loginSubmit () {
      const payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('loginSubmit', payload)
    }
  }
}
</script>

<style>

</style>
