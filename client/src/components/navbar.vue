<template>
  <div class="bg primary">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">Logo</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <div>
            <router-link to="/">   Home  </router-link> <br>
          </div>
          <div>
            <router-link to="/add">   Add Product    </router-link> <br>
          </div>
          <b-button @click.prevent="logOut"> Sign Out </b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    logOut() {
      console.log("test");
      localStorage.clear();
    }
  }
};
</script>

<style></style>
