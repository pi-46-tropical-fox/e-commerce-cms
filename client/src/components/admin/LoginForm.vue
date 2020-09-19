<template>
  <div id="login-form">
    <b-form @submit.prevent="login">
      <label for="text-email">Email</label>
      <b-input class="input" type="email" id="text-email" v-model="email"></b-input>
      <label for="text-password">Password</label>
      <b-input class="input" type="password" id="text-password" v-model="password"></b-input>
      <b-button type="submit" variant="info" id="login-button">Login</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  computed: {},
  methods: {
    login() {
      axios({
        method: "post",
        url: "https://sleepy-woodland-73566.herokuapp.com/admin/login",
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(response => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Wellcome ${response.data.email}!`,
            showConfirmButton: false,
            timer: 1500
          });
          localStorage.setItem("access_token", response.data.access_token);
          this.$store.commit("fillToken", response.data);
          this.$router.push({ path: "/admin/dashboard" });
        })
        .catch(err => {
          console.log(err.response)
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${err.response.data.message}`,
          });
        });
    }
  }
};
</script>

<style scoped>
#login-form {
  width: 500px;
  padding: 30px 20px;
  box-shadow: 3px 3px 3px 3px #888888;
  border-radius: 3px;
  margin: auto;
}
.input {
  margin: 5px auto;
}
#login-button {
  width: 100px;
  margin: 20px auto;
  text-align: center;
}
#title {
  margin: 10px auto;
}
</style>