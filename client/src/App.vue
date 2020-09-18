<template>
  <div id="app">
    <nav class="navbar navbar-light bg-light justify-content-between">
      <a class="navbar-brand"><router-link to="/">ECommerce</router-link></a>
      <div class="form-inline">
        <button class="btn btn-outline-info my-2 my-sm-0" @click="Close">Close</button>
      </div>
    </nav>
    <div class="d-flex justify-content-center align-items-center container">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
      Close () {
          localStorage.clear()
          this.$router.push({name: 'Login'})
      }
  }
}
</script>
<style>
#app {
  font-family: 'Alata', sans-serif;
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
