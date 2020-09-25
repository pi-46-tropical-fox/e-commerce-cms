
<template>
  <div id="app">
    <Navbar v-if="isAuthenticated" @logout="logout" />

    <div :class="isAuthenticated ? 'container' : ''" class="flex pt-16 pb-8">
      <Menu v-if="isAuthenticated"></Menu>
      <router-view id="content" class="w-full"></router-view>
    </div>

    <Footer v-if="isAuthenticated" />

    <!-- <Navbar @logout="logout" />

    <div class="flex pt-16 pb-8">
    <div :class="isAuthenticated ? 'container' : ''" class="flex pt-16 pb-8">
      <Menu />
      <router-view id="content"></router-view>
    </div>

    <Footer /> -->
  </div>
</template>

<script>
import Navbar from "./components/main/Nav.vue";
import Footer from "./components/main/Footer.vue";

import Menu from "./components/shared/Menu.vue";

import swal from "./config/swal";

import Auth from "./views/Auth.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Menu,
    Footer,
  },

  data() {
    return {};
  },

  created() {
    document.title = this.$store.state.title;
    // try {
    //   // NOTE: 45min refresh policy is what google recommends
    //   window.setInterval(this.$refreshToken(), 2.7e6);
    // } catch (e) {
    //   console.error(e);
    // }
  },

  methods: {
    async logout() {
      // if (this.$isAuthenticated()) this.$logout();

      localStorage.clear();
      // console.log(this.$store);
      this.$store.dispatch("logout");

      this.$router.push({ name: "Login" });

      swal.showToastSuccess("Logged out successfully.");
    },
  },

  computed: {
    isAuthenticated: {
      get() {
        return this.$store.state.isAuthenticated;
      },
    },
  },
};
</script>

<style>
#content {
  @apply ml-4;
}

.form-group {
  @apply my-2
}

.form-group label {
  @apply text-sm
}

.form-group input {
  @apply border-b-2
}
</style>
