<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
  <a class="navbar-brand" href="#">Gadget Space</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <a class="nav-link" @click.prevent="home">Home</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Products
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" @click.prevent="showTableProduct()">Show All Products</a>
          <a class="dropdown-item" @click.prevent="showAddForm()">Add New Product</a>
        </div>
      </li>
    </ul>
      <button class="btn btn-outline-light my-2 my-sm-2" type="submit">Logout</button>
  </div>
</nav>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    home () {
      this.$router.push({ path: '/home', name: 'Home' })
    },
    showTableProduct () {
      this.$router.push({ path: '/products' })
    },
    showAddForm () {
      this.$router.push({ path: '/products/add' })
    }
  }
}
</script>

<style>

</style>
