<template>
  <div>
    <div>
      <b-navbar type="dark" variant="dark">
        <b-navbar-nav>
          <b-nav-item href="#">Gunilify Admin Mode</b-nav-item>
          <b-nav-item>
            <router-link to="/" style="color:white">Product</router-link>
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="User" right class="ml-auto">
            <b-dropdown-item href="#" @click="logout">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-navbar>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Main',
  methods: {
    logout() {
      localStorage.clear()
      this.$router.push('/auth/login')
      this.$swal.fire('Logout Successfully', '', 'success')
    }
  }
};
</script>

<style></style>
