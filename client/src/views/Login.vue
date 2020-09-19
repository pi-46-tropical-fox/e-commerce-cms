<template>
    <div class="form-container">
        <form @submit.prevent="login">
            <!-- <div class="tabs">
              <ul>
                <li class="is-active"><a>Login</a></li>
                <li><a>Register</a></li>
              </ul>
            </div> -->
            <div class="field">
                <label class="label">Email</label>
                <div class="control">
                    <input class="input" type="email" v-model="email">
                </div>
            </div>
            <div class="field">
                <label class="label">Password</label>
                <div class="control">
                    <input class="input" type="password" v-model="password">
                </div>
            </div>
            <button class="button" type="submit">Login</button>
        </form>
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
    async login () {
      const data = {
        email: this.email,
        password: this.password
      }
      await this.$store.dispatch('login', data)
      await this.$router.push({ path: '/' })
    }
  }
}
</script>

<style>

</style>
