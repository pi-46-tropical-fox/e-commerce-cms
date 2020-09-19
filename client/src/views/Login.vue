<template>
  <div class="container" style="margin-top: 200px;">
    <div class="container bg-dark shadow animate__animated animate__zoomIn" style="width: 400px; padding: 30px 0;border-radius: 10px;">
        <form @submit.prevent="loginSubmit">
          <div class="form-group">
            <div class="col">
              <input type="email" class="form-control" v-model="email" id="inputEmail3" placeholder="Email" />
            </div>
          </div>
          <div class="form-group">
            <div class="col">
              <input type="password" class="form-control" v-model="password" id="inputPassword3" placeholder="Password" />
            </div>
          </div>
          <div class="form-group">
            <div class="col">
              <button type="submit" class="btn btn-primary btn-block">Sign in</button>
            </div>
          </div>
        </form>
    </div>
  </div>
</template>

<script>
export default {
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
      this.$store.dispatch('login', payload)
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style>
</style>
