<template>
    <div id="register">
      <form action id="registerForm" @submit.prevent="register">
        <div class="form-group">
          <input type="text" v-model="name" placeholder="Your full name" />
        </div>
        <div class="form-group">
          <input type="text" v-model="username" placeholder="Username" />
        </div>
        <div class="form-group">
          <input type="email" v-model="email" placeholder="Email" />
        </div>
        <div class="form-group">
          <input type="password" v-model="password" placeholder="Password" />
        </div>
        <div class="form-group text-center">
          <input type="submit" class="btn info" value="Register" />
        </div>
      </form>
    </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      username: '',
      email: '',
      password: ''
    }
  },

  methods: {
    register(){
      let payload = {
        name: this.name,
        username: this.username,
        email: this.email,
        password: this.password
      }

      this.name = ''
      this.email = ''
      this.username = ''
      this.password = ''

      this.$emit('register', payload)
    }
  }
};
</script>

<style>
</style>