<template>
  <div class="container d-flex justify-content-center">
    <div class="row">
      <div class="cols-6">
        <b-form @submit.prevent="loginSubmit" @reset.prevent="onReset">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input 
          id="input-1"
          v-model="email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Password:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="password"
          type='password'
          required
          placeholder="Enter Password. min 6 characters"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Login</b-button>
    </b-form>
      </div>
       <!-- <div class="cols-6">
         <img src="../assets/login.gif" alt="">
       </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
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

<style scoped>

*{
  background-image: url("../assets/login.gif");
  color: yellow;
}
.container{
  color: yellow;
  background-color: whitesmoke !important;
  padding: 25%;
}
form-input{
  color: yellow;
}
</style>
