<template>
  <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: CornflowerBlue">
    <router-link to='/' style="text-decoration:none;">
        <a class="navbar-brand" id="logo">SomeShop</a>
    </router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <button type="button" class="btn btn-success" style="margin-right: 10px" @click.prevent="addProductFrom">Add Product</button>
              <button type="button" class="btn btn-danger" @click.prevent="logout" >Logout</button>
            </li>
        </ul>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push({ path: '/login' })
        })
    },
    addProductFrom () {
      this.$router.push({ path: '/products' })
    }
  }
}
</script>

<style>

</style>
