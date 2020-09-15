<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Card></Card>
  </div>
</template>

<script>
// @ is an alias to /src
import Card from '../components/itemCard'

export default {
  name: 'Home',
  components: {
    Card
  }
}
</script>
