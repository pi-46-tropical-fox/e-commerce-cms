<template>
<div class="bg-dark vh-100">
<div class="container">
    <div class="row justify-content-center pt-5">
        <div class="col-8 border rounded-lg shadow-sm bg-white">
            <h1 class="mb-3 mt-5">Login Form</h1>
<form class="mb-3" @submit.prevent="submitLogin">
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" v-model="email" aria-describedby="emailHelp">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" v-model="password" id="exampleInputPassword1">
  </div>
  <div class="form-group form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
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
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    submitLogin () {
      const payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('login', payload)
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<style>

</style>
