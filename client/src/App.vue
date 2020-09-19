<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> -->
      <Navbar/>
    </div>
    <div class="container my-3">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
export default {
  components : {
    Navbar
  }
}
</script>
