<template>
  <div class="home">
    <div class="container" style="margin-top: 30px">
      <Navbar></Navbar> 
      <div class="row d-flex">
        <Card
          v-for="item in items"
          :key="item.id"
          :itemData="item"
        ></Card>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Card from '../components/ItemCard'
import Navbar from '../components/Navbar'

export default {
  name: 'Home',
  components: {
    Card,
    Navbar
  },
  computed: {
    items () {
      return this.$store.state.items
    }
  },
  methods: {
    fetchItem () {
      this.$store.dispatch('fetchItems')
    }
  },
  created () {
    this.fetchItem()
  }
}
</script>
