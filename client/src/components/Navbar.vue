<template>
    <section id="navbar">
    <nav class="navbar navbar-dark">
      <img id="logo" src="../images/logo.png" alt="" />
      <router-link to="/">Home</router-link>
      <router-link to="/products">Add Products</router-link>
      <button class="btn btn-danger my-2 my-sm-0" type="submit" @click.prevent="signOut">
        Sign Out
      </button>
    </nav>
  </section>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    signOut () {
      localStorage.removeItem('access_token')
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style>

</style>
