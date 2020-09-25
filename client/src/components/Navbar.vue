<template>
  <nav class="bg-dark">
    <div @click.prevent="$router.push('/')" class="nav-left">
      <img src="https://i.imgur.com/CazzVRS.png" alt="logo"/>
      <h3>CMS</h3>
    </div>
    <div class="nav-center">
      <a @click.prevent="$router.push('/')" href="">Home</a>
      <router-link to="/addProduct">Add Product</router-link>
    </div>
    <div class="nav-right">
      <button @click.prevent="logout">Logout</button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    logout () {
      localStorage.clear()
      location.reload()
    }
  }
}
</script>

<style scoped>

nav {
    display: flex;
    width: 100vw;
    align-items: center;
    background-color: #00bfa6;
    color: white;
    padding: 10px;
}

.nav-left {
    width: 20%;
    display: flex;
    align-items: center;
    cursor: pointer;
}
.nav-left img {
    width: 20%;
    margin-right: 10px;
}

.nav-center {
    width: 60%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.nav-center p {
    color: white;
    text-decoration: none;
    margin: 0 1rem;
    cursor: pointer;
}

.nav-center a {
    color: white;
    text-decoration: none;
    margin: 0 1rem;
    cursor: pointer;
}

.nav-right {
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 2rem;
}

.nav-right button {
    cursor: pointer;
    background-color: #008674;
    padding: 5px 20px;
    border: none;
    color: white;
    border-radius: 10px;
}
</style>
