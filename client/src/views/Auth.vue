<template>
  <section class="grid grid-cols-4">
    <div id="auth" class="col-span-1">
      <Logo />
      <!--  -->
      <AuthForm @login="login" @googleLogin="googleLogin" @gSignInOnFail="gSignInOnFail" />
    </div>
    <div class="col-span-3">
        //
    </div>
  </section>
</template>

<script>
import Logo from "../components/main/Logo";
import AuthForm from "../components/auth/AuthForm";
import swal from "../config/swal";

import axios from "../config/axios";

export default {
  name: "AuthPage",

  components: {
    Logo,
    AuthForm,
  },

  data: function () {
    return {};
  },

  methods: {
    gSignInOnFail(error) {
      console.log(error);
    },

    googleLogin(googleUser) {
      if (!localStorage.access_token) {
        const g_access_token = googleUser.getAuthResponse().id_token;

        axios({
          url: "/auth/login/g",
          method: "POST",
          headers: {
            g_access_token,
          },
        })
          .then((result) => {
            let { data } = result;

            Object.keys(data).forEach((key) => {
              localStorage.setItem(key, data[key]);
            });

            this.authenticated = true;
            this.page = "dashboard";

            this.$router.push({ name: "Home" })
            swal.showToastSuccess("Logged in successfully.");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    login(data) {
      axios({
        url: "/auth/login",
        method: "POST",
        data,
      })
        .then((result) => {
          let { data } = result;

          Object.keys(data).forEach((key) => {
            localStorage.setItem(key, data[key]);
          });

          console.log(data);

          this.$store.dispatch('login', data)

          this.$router.push({ name: "Home" });
          swal.showToastSuccess("Logged in successfully.");
        })
        .catch((err) => {
          console.log(err);
        });
    },

    register(data) {
      axios({
        url: "/auth/register",
        method: "POST",
        data,
      })
        .then((result) => {
          let { data } = result;

          swal.showToastSuccess("Registered successfully.");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
</style>