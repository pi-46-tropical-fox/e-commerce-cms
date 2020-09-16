<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-dark">
      <router-link to="/products" class="navbar-brand text-light">CMS</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <router-link :to="{name: 'Banner'}" class="nav-link text-light">Banner</router-link>
          </li>
          <li class="nav-item active">
            <router-link :to="{name: 'Product'}" class="nav-link text-light">Product</router-link>
          </li>
          <li class="nav-item active">
          </li>
          <li class="nav-item">
            <a href="#" @click.prevent="logout" class="nav-link text-light">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    logout () {
      localStorage.clear()
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style>

</style>
