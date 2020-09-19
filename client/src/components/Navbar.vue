<template>
  <div>
    <nav class="navbar">
      <img src="../assets/market.png" alt="" />
      <router-link to="/products/add">Add Products</router-link>
      <button type="submit" @click.prevent="logout" class="btn btn-danger my-2 my-sm-0">Logout</button>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    logout () {
      localStorage.removeItem('access_token')
      this.$router.push({path: '/login'})
    }
  }
}
</script>

<style lang="css" scoped>
  .nav {
  background-color: #963a2f;
    color: #FBF7ED;
    margin-bottom: 50px;
  }
  .navbar {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .button {
    background-color: #FBF7ED;
    color: #963a2f;
  }
  .button:hover {
    background-color: #DBD7CD;
  }
</style>
