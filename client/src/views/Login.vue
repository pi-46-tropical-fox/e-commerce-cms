<template>
  <section id="login" class="row">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <div class="card-title"><h3>Form Login</h3></div>
                        <form action="" id="loginForm" @submit.prevent="login">
                            <div class="form-group row">
                                <label for="reloginEmail" class="col-sm-4 col-form-label">Email</label>
                                <div class="col-sm-8">
                                    <input v-model="email" type="text" name="" id="loginEmail" class="form-control">
                                </div>                                
                            </div>
                            <div class="form-group row">
                                <label for="loginPassword" class="col-sm-4 col-form-label">Password</label>
                                <div class="col-sm-8">
                                    <input v-model="password" type="password" name="" id="loginPassword" class="form-control">
                                </div>
                            </div>
                            <div class="form-group row justify-content-center">
                                <div class="col-sm-6">
                                    <button type="submit" class="btn btn-block btn-info">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
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
          this.$store.dispatch('login', {
              email: this.email,
              password: this.password
          })
      }
  }
}
</script>

<style>

</style>