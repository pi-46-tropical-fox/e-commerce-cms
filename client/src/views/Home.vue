<template>
  <div class="row">
      <div class="col-3">
        <div id="nav">
          <h1>foxShop</h1>
          <hr />
          <router-link to="/">Home</router-link> |
          <router-link to="/about">About</router-link>
        </div>
      </div>
      <div class="col-9">
        <h1>Products</h1>
        <div class="row">
          <cards></cards>

        </div>
      </div>
    </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import cards from '../components/cards'

export default {
  name: 'Home',
  components: {
    cards
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@1,700&display=swap");

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  background: #2c3e50;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

#nav h1 {
  font-family: "Josefin Sans", sans-serif;
  color: aliceblue;
  font-weight: bolder;
  font-size: 3em;
}

#nav a {
  font-weight: bold;
  color: #42b983;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
