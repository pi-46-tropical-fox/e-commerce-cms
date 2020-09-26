<template>
  <div class="container mt-3">
    <div class="row ">
      <div class="col-6">
        <div class="card">
          <div class="card-body">
            <h1 class="card-title">Login</h1><hr>
            <form @submit.prevent="login">
              <div class="form-group row">
                <label class="col-sm-3 col-form-label">Email :</label>
                <div class="col-sm-9">
                  <input v-model="email" type="email" class="form-control">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-3 col-form-label">Password :</label>
                <div class="col-sm-9">
                  <input v-model="password" type="password" class="form-control">
                </div>
              </div>
              <div class="form-group row">
                <div class="col-sm-5 ml-auto">
                  <input type="submit" class="form-control btn btn-success" value="Login">
                </div>
              </div>
            </form>
          </div>
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
      return this.$store.dispatch('login', { email: this.email, password: this.password })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('username', data.username)
          this.$store.commit('CHANGE_LOGIN_STATUS', true)
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  beforeRouteEnter (to, from, next) {
    if (!localStorage.getItem('access_token')) {
      return next()
    }
    return next('/')
  }
}
</script>
