<template>
  <div id="main-page">
    <Navbar>
    </Navbar>
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '../components/Navbar'
export default {
  name: 'Home',
  components: {
    Navbar
  }
}
</script>
