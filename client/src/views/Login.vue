<template>
  <div>
    <div class="container mt-5">
      <b-card no-body class="container bg-warning" style="max-width: 800px;">
        <b-row no-gutters>
          <b-col md="6">
            <b-card-img src="https://picsum.photos/400/400/?image=20" alt="Image" class="rounded-0"></b-card-img>
          </b-col>
          <b-col md="6" class="bg-warning">
            <b-card-body title="Login Form" class="mt-3">
              <b-form  class="mt-5" @submit.prevent="login">
                <b-form-group
                    id="input-group-1"
                    label="Email address:"
                    label-for="input-1"
                >
                    <b-form-input
                    id="input-1"
                    v-model="email"
                    type="email"
                    required
                    placeholder="Enter email"
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-2" label="Your Password:" label-for="input-2">
                    <b-form-input
                    id="input-2"
                    type="password"
                    v-model="password"
                    required
                    placeholder="Enter Password"
                    ></b-form-input>
                </b-form-group>
                <b-button type="submit" variant="primary">Login</b-button>
              </b-form>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
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
      const payload = {
        email: this.email,
        password: this.password
      }

      this.$store.dispatch('login', payload)
      this.$store.commit('SET_IS_LOGIN', true)
      this.$router.push('/Home')
    }
  }
}
</script>

<style>

</style>
