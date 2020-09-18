<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> -->
      <Navbar/>
    </div>
    <router-view/>
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
