<template>
  <div class="form-login">
    <div class="login-head">
      <div class="login-content">
        <div class="login-social-content">
          <h3>Login into your account</h3>
        </div>
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="email">Email</label>
            <input required type="email" class="form-control" id="email" v-model="email" />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input required type="password" class="form-control" id="password" v-model="password"/>
          </div>
          <button type="submit" class="btn btn-outline-primary rounded">Login</button>
        </form>
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
      this.$store.dispatch('login', { email: this.email, password: this.password })
        .then(() => {
          console.log('login vue')
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>
.form-login {
  background-image: url('https://i.imgur.com/v4qyNn6.jpg');
  background-size: cover ;
  /* background-position: unset; */
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-head {
  display: flex;
  width: 30em;
  flex-direction: column;
  margin-top: 2em;
  background-color: #fff;
  -webkit-box-shadow: 0px 3px 12px -4px rgba(0,0,0,0.59);
  -moz-box-shadow: 0px 3px 12px -4px rgba(0,0,0,0.59);
  box-shadow: 0px 3px 12px -4px rgba(0,0,0,0.59);
}

.login-head {
  display: flex;
  justify-content: space-around;
}

.login {
  justify-content: center;
  display: flex;
  height: 2em;
  width: 100%;
  align-items: center;
  font-size: 1.5em;
  letter-spacing: 5px;
  font-weight: 200;
}

.login-content {
  margin: 2em 5em;
  display: flex;
  flex-direction: column;
}

.login-social-content {
  text-align: center;
  border-bottom: 1px solid gray;
  margin-bottom: 2em;
}

</style>
