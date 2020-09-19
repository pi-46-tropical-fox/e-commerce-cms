<template>
  <div>
    <!-- Side navigation -->
    <div class="d-flex row justify-content-center sidenav">
      <div class="title">
          <router-link :to="{name: 'Moviescard'}">Anime Shop</router-link>
      </div>

      <div class="option d-flex flex-column justify-content-around">
        <div>
          <router-link :to="{name: 'Moviescard'}">Products</router-link>
        </div>
        <div>
          <router-link :to="{name: 'Bannerscard'}">Banners</router-link>
        </div>
      </div>

      <div class="logout d-flex align-items-end">
        <a @click.prevent="logout" class="btn">Logout</a>
      </div>
    </div>

    <!-- Show Homecontent -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    logout(){
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style scoped>
  .sidenav {
    height: 100%;
    width: 120px;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #b33939;
    overflow-x: hidden;
    padding-top: 20px;
  }

  .sidenav a {
    padding: 6px 8px 6px 16px;
    text-decoration: none;
    font-size: 17px;
    color: #fff;
    display: block;
  }

  .sidenav a:hover {
    color: #000000;
  }

  .logout {
    padding-bottom: 20px;
  }
</style>
