<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top font-weight-bold">
  <a class="navbar-brand" @click.prevent="home">Gadget Space <span><font-awesome-icon icon="rocket" /></span></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <a class="nav-link" @click.prevent="home">Home</a>
      </li>
      <li class="nav-item dropdown" v-if="$store.state.isLogin">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Products
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <router-link to="/products" class="dropdown-item font-weight-bold">Show All Products</router-link>
        </div>
      </li>
    </ul>
    <div v-if="$store.state.isLogin">
      <button class="btn btn-outline-light my-2 my-sm-2 font-weight-bold" @click.prevent="logout">Logout</button>
    </div>
    <div v-else>
      <button class="btn btn-outline-light my-2 my-sm-2 font-weight-bold" @click.prevent="login">Login</button>
    </div>
  </div>
</nav>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    home () {
      this.$router.push({ name: 'Home' })
    },
    logout () {
      this.$store.dispatch('logoutAccount')
    },
    login () {
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style>
.navbar-brand {
  font-family:'Londrina Solid', cursive;
  font-size: 30px;
  letter-spacing: 2px;
}
nav a {
  cursor: pointer;
}
</style>
