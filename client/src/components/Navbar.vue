<template>
<div class="nav-wrapper" >
  <nav class="navbar navbar-expand-lg text-center container-fluid-nav text-center" id="nav-body">
      <a class="navbar-brand" href="#"><b>Bookiepedia</b></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse"
        data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown"
        aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li v-if="currentRoute.path === '/products'" class="nav-item">
            <router-link to="/products/add" class="nav-link"
            id="nav-login" href="#"><b>Release New Book! </b></router-link>
          </li>

          <li v-if="currentRoute.path === '/banners'" class="nav-item">
            <router-link to="/banners/add" class="nav-link"
            id="nav-login" href="#">Add Banner</router-link>
          </li>

          <li class="nav-item active">
            <router-link to="/" class="nav-link"
            href="#">Home <span class="sr-only">
            </span></router-link>
          </li>

          <li class="nav-item">
            <router-link to="/products" class="nav-link"
            id="nav-login" href="#">Books</router-link>
          </li>

          <li class="nav-item">
            <router-link to="/banners" class="nav-link"
            id="nav-login" href="#">Banners</router-link>
          </li>

          <li v-if="!name" class="nav-item">
            <router-link to="/login" class="nav-link"
            id="nav-login" href="#">Login</router-link>
          </li>

          <li v-if="name" class="nav-item">
            <a class="nav-link"
            id="nav-logout" @click.prevent="logout" href="#">Logout</a>
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
      this.$store.commit('changeLogin', false)
      this.$store.commit('setRole', '')
      this.$store.commit('setName', '')
      if (this.currentRoute.path === '/products/add' ||
      this.currentRoute.path === 'products/:product_id') {
        this.$router.push('/')
      }
    }
  },
  computed: {
    currentRoute () {
      return this.$route
    },
    role () {
      return this.$store.state.role
    },
    isLogin () {
      return this.$store.state.isLogin
    },
    name () {
      return this.$store.state.name
    },
    landing () {
      return this.$store.state.landing
    }

  },
  watch: {
    role () {
      return this.$store.state.role
    },
    isLogin () {
      return this.$store.state.isLogin
    }
  }
}
</script>

<style scoped>
.nav-wrapper {
  font-family: 'clarkson_scriptregular, Nunito', sans-serif;
  margin: 0 0 100px 25px;
}
.navbar.navbar-expand-lg li a {
  color: black;
  font-family: 'clarkson_scriptregular, Nunito', sans-serif;
  font-size: 17px;
  font-weight: 100;
}
  /* color: white; */
  /* font-family: 'Open Sans', sans-serif; */

.navbar-brand {
  color: black;
  font-family: 'clarkson_scriptregular, Nunito', sans-serif;
  text-decoration: none;
}

#navbarNavDropdown {
  margin: 0 0 0 20px;
}

.navbar.navbar-expand-lg li a:hover {
  color: rgb(110, 110, 110);
}
  /* color: white; */
  /* font-family: 'Open Sans', sans-serif; */
/* #nav-body {
  min-width: 20%;
} */

/* #nav-login {
  float: right;
  text-align: right;
} */

/* .container-fluid-nav div{
  display: flex;
  justify-content: space-around;
} */
  /* margin-right: 50px; */
</style>
