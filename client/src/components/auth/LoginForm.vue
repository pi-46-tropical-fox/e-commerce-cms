<template>
  <div>
    <div id="login">
      <form action id="loginForm" @submit.prevent="login">
        <div class="form-group">
          <input type="text" v-model="email" placeholder="Email" />
        </div>
        <div class="form-group">
          <input type="password" v-model="password" placeholder="Password" />
        </div>
        <div class="form-group text-center">
          <input type="submit" class="btn info" value="Login" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },

  methods: {
    login(){
      let payload = {
        email: this.email,
        password: this.password
      }

      // this.email = ''
      // this.password = ''

      this.$emit('login', payload)
    }
  }
};
</script>

<style>
</style>