<template>
  <div class="home">
    <Sidebar class="col-2"></Sidebar>
    <div class="col-9">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from '../components/Sidebar'
export default {
  name: 'Home',
  components: {
    Sidebar
  },
  computed: {
    filter () {
      return this.$store.state.filter
    }
  },
  methods: {
  },
  created () {
    this.$store.dispatch('fetchProducts')
    this.$store.dispatch('fetchCategories')
  }
}
</script>

<style>
.home {
  display: flex
}
</style>
