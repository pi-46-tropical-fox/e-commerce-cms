<template>
    <div class="login-page">
        <div class="login-container">
            <form class="login-form">
                <div class="form-group">
                  <p id="login-alert" >Login Alert</p>
                    <label for="exampleInputEmail1">Email address</label>
                    <input
                        type="email"
                        class="form-control"
                        v-model="email"/>

                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1"
                      v-model="password"/>
                </div>
                <button @click.prevent="login" class="btn btn-warning">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data () {
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
      this.$store.dispatch('login', payload)
    }
  }
}
</script>

<style>
</style>
