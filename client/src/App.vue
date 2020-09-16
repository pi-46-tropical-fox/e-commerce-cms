<template>
  <div id="app">
      <b-navbar class="navbar fixed-top bg-dark navbar-dark" id="nav" toggleable="lg">
        <div class="container">
        <b-navbar-brand>Sepatu-KW</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-navbar-nav>
            <b-nav-item><router-link to="/">Home</router-link></b-nav-item>
            <b-nav-item><router-link to="/product" v-if="$store.state.isLogin === true">Product</router-link></b-nav-item>
            <b-nav-item><router-link to="/login" v-if="$store.state.isLogin === false">Sign in</router-link></b-nav-item>
            <b-nav-item><a v-if="$store.state.isLogin === true && $store.state.role === 'user'" @click.prevent="logout">Sign Out</a></b-nav-item>
          </b-navbar-nav>
            <b-nav-item-dropdown right v-if="$store.state.isLogin === true && $store.state.role === 'admin'">
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content>
                Admin
              </template>
              <b-dropdown-item class="bg-dark admin" id="addProduct" @click.prevent="addProduct">Add Product</b-dropdown-item>
              <b-dropdown-item class="bg-dark admin" id="signout" @click.prevent="logout">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
          </b-collapse>
        </div>
      </b-navbar>
    <router-view/>
  </div>
</template>
<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('logout')
      this.$router.push({ path: '/' })
    },
    addProduct () {
      this.$router.push({ path: '/add' })
    }
  },
  created () {
    if (localStorage.getItem('access_token')) {
      this.$store.commit('SET_IS_LOGIN', true)
      this.$store.commit('SET_ROLE', localStorage.getItem('role'))
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
  /* color: #2c3e50; */
}

.navbar {
  margin-bottom: 30px;
  font-weight: bold;
}

#nav a{
  color: #fff;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.admin{
  color: black !important;
}
</style>
