<template>
    <!-- login page START -->
    <div id="loginPage">
      <div id="loginForm">   
        <i class="fa fa-bolt" aria-hidden="true"></i>
        <form @submit.prevent="processLogin">
          <h4>Login Page</h4>
          <hr>
          <div class="form-group">
            <label for="email">Email address</label>
            <input
            v-model="email"
            type="email"
            class="form-control"
            id="email" placeholder="email@example.com">
            <small id="emailHelp" class="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
            v-model="password"
            type="password"
            class="form-control" id="password" placeholder="*****">
          </div>
          <div class="form-group form-check">
            <input @click="togglePassword('password')"
            type="checkbox" class="form-check-input">
            <label class="form-check-label">
              Show password
            </label>
          </div>
          <button type="submit" class="btn">
          <img src="https://www.gambaranimasi.org/data/media/230/animasi-bergerak-burung-0051.gif" 
          alt="animasi-bergerak-burung-0051" width="100"/>
          </button>
          <small>Poke the bird for login</small>
        </form>
      </div>
    </div>
</template>

<script>
import swal from 'sweetalert'
import axios from 'axios'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    togglePassword (id) {
      const x = document.getElementById(id)
      if (x.type === 'password') {
        x.type = 'text'
      } else {
        x.type = 'password'
      }
    },
    processLogin () {
      axios({
        method: 'POST',
        url: 'http://localhost:3000/login',
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then((result) => {
          console.log(result.data)
          localStorage.setItem('access_token', result.data.access_token)
          this.$router.push({ name: 'ProductTable' })
        })
        .catch((err) => {
          console.log(err, 'ini error')
          const error = err.response.data.message
          swal('Error', `${error}`, 'error')
        })
    }
  }
}
</script>
