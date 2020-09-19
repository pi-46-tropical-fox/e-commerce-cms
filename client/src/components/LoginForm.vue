<template>
<div class="form-container mx-aut">
  <form @submit.prevent='login'>
    <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input type="email" class="form-control" v-model="email" aria-describedby="emailHelp">
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control" v-model="password">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</div>
</template>

<script>
import axios from '@/config/axios.js'
export default {
  name: 'LoginForm',
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      const payload = {
        email: this.email,
        password: this.password
      }
      axios({
        url: '/login',
        method: 'POST',
        data: payload
      })
        .then(response => {
          localStorage.setItem('access_token', response.data.access_token)
          this.$store.dispatch('login')
          this.$router.push({ path: '/home' })
        })
        .catch (err => {
          console.log(err)
          alertify.dialog('alert').set({ transition: 'flipx', message: 'Email or Password is invalid' }).show()
        })
    }
  }
}
</script>

<style>

</style>
