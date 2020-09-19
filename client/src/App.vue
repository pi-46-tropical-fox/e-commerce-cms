<template>
  <div id="app">
    <div id="nav">
      <router-link class="mr-3" to="/home">Home</router-link>
      <router-link class="mr-3" to="/Login" v-show="!isLogin">Login</router-link>
      <router-link class="mr-3" to="/Register" v-show="!isLogin">Register</router-link>
      <b-button @click='logout' variant="secondary" v-show="isLogin">Logout</b-button>
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$store.commit('SET_IS_LOGIN', false)
      this.$router.push('/login')
    }
  },
  created () {
    if (localStorage.getItem('access_token')) {
      this.$store.commit('SET_IS_LOGIN', true)
    } else {
      this.$store.commit('SET_IS_LOGIN', false)
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
