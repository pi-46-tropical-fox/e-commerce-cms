<template>
  <div class="home animate__animated animate__zoomIn" style="margin-top: 80px;">
    <img alt="logo" src="https://cdn.pixabay.com/photo/2016/03/31/19/42/clothes-1295223_960_720.png" style="height: 150px; margin-bottom: 20px;">
    <HelloWorld msg="Welcome to Sepatu-KW"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
<style>
.home{
  margin-top: 60px
}
</style>
