<template>
  <div class="container shadow p-4" style="width:40em">
    <div v-for="(err, i) in error" :key="i">
      <span style="color:red"> {{ err }} </span>
    </div> 
    <b-form @submit.prevent="login" shadow>
      <b-form-group
        id="input-group-1"
        label="Email address"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          type="email"
          required
          placeholder="Enter email"
          v-model="email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Password" label-for="input-2">
        <b-form-input
          id="input-2"
          required
          placeholder="Enter Your Password"
          type="password"
          v-model="password"
        ></b-form-input>
      </b-form-group>
      <div style="display:flex;justify-content:center;">
        <b-button style="width:10em" type="submit" variant="primary">Login</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      error: []
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("loginPost", {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push("/product");
        })
        .catch(err => {
          this.error = err.response.data.errors
        })
    }
  }
};
</script>

<style></style>
