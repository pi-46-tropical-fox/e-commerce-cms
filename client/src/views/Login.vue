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
import axios from 'axios'
export default {
  name: 'Login',
   data () {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    login () {
      let payload = {
        email : this.email,
        password : this.password
      }
      console.log(payload, "dapet payload");
      axios({
        url: 'http://localhost:3000/login',
        method: "POST",
        data: payload
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('email', data.email)
          localStorage.setItem('role', data.role)
        })
        .catch(err => console.log(err))
    }
  },

}
</script>

<style>

</style>
