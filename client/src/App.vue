<template>
  <div id="app">
    <div class="navbar navbar-expand-sm bg-light navbar-light">
      <router-link to="/" class="navbar-brand">Home</router-link>
      <a v-if="loginStatus" @click.prevent="logout" class="nav-link" href="">Logout</a>
    </div>
    <h1 class="text-left m-3">E-Commerce CMS</h1><hr />
    <router-view/>
  </div>
</template>

<script>
export default {
  methods: {
    logout () {
      localStorage.clear()
      this.$store.commit('CHANGE_LOGIN_STATUS', false)
      this.$router.push('/login')
    }
  },
  computed: {
    loginStatus () {
      return this.$store.state.loginStatus
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
