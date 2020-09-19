<template>
  <div class="home">
    <div id="nav">
      <router-link to="/home">Home</router-link> |
      <router-link to="/add-product">Add Product</router-link> |
      <!-- <button @click.prevent="logout"></button> -->
    </div>
    <div class="container" style="margin-top: 30px">
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

export default {
  name: 'Home',
  components: {
    Card
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
    // logout () {
    //   // this.$store.dispatch('logout', false)
    //   localStorage.clear()
    // }
  },
  created () {
    this.fetchItem()
  }
}
</script>
