<template>
  <div class="row" style="width:100vw">
      <div class="col-3">
        <div id="nav">
          <h1>foxShop</h1>
          <hr />
          <router-link to="/">Home</router-link> |
          <!-- <router-link :to="{name:'About'}">Sign Out</router-link> -->
          <button class="btn" id="out" @click="logout">Sign Out</button>
        </div>
      </div>
      <div class="col-9 mb-5 mt-3">
        <div class="d-flex justify-content-between align-items-center mr-5 ">
        <h1 id="products">Products</h1>
        <router-link class="btn" :to="{name:'addProducts'}"><i class="fas fa-plus-square"></i>Add Product</router-link>

        </div>
        <!-- <div class="row"> -->
          <router-view />

        <!-- </div> -->
      </div>
    </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import cards from '../components/cards'
import router from '../router'

export default {
  name: 'Home',
  methods:{
    logout(){
      localStorage.removeItem('access_token')
      router.push('/login')
    }
  },
  components: {
    cards
  },
  created(){
    this.$store.dispatch('fetchData')
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@1,700&display=swap");
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@700&display=swap');

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
  text-align: center;
}

#nav h1 {
  font-family: "Josefin Sans", sans-serif;
  color: aliceblue;
  font-weight: bolder;
  font-size: 3em;
  margin:50px;
}

#nav a {
  font-weight: bold;
  color: #42b983;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.btn{
  background: #2c3e50;
  color: #fff;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-weight: bolder;
}
#products{
  font-family: 'Oswald', sans-serif;
}
.btn #out:hover{
  text-decoration: #42b983;
}

</style>
