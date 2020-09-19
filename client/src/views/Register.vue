<template>
  <div>
    <div class="container mt-5">
      <b-card no-body class="container bg-warning" style="max-width: 800px;">
        <b-row no-gutters>
          <b-col md="6">
            <b-card-img src="https://picsum.photos/400/400/?image=20" alt="Image" class="rounded-0"></b-card-img>
          </b-col>
          <b-col md="6" class="bg-warning">
            <b-card-body title="Register Form" class="mt-2">
              <b-form  class="mt-3" @submit='register'>
                <b-form-group label="Your Name:">
                    <b-form-input
                    type="text"
                    v-model="name"
                    required
                    placeholder="Enter Name"
                    ></b-form-input>
                </b-form-group>

                <b-form-group label="Email address:">
                    <b-form-input
                    v-model="email"
                    type="email"
                    required
                    placeholder="Enter email"
                    ></b-form-input>
                </b-form-group>

                <b-form-group label="Your Password:">
                    <b-form-input
                    type="password"
                    v-model="password"
                    required
                    placeholder="Enter Password"
                    ></b-form-input>
                </b-form-group>
                <b-button type="submit" variant="primary">Submit</b-button>
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
  name: 'Register',
  data () {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    register () {
      const payload = {
        name: this.name,
        email: this.email,
        password: this.password
      }

      this.$store.dispatch('register', payload)
      this.$router.push('/Login')
    }
  }
}
</script>

<style>

</style>
