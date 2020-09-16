<template>
<div>
  <div id="nav">
        <router-link to="/">Dashboard</router-link> |
        <router-link to="/products">Create Products</router-link> |
        <router-link to="/login"><span  @click="logout()">Logout</span></router-link>
    </div>
        <div class="mb-3">
            {{$store.state.user}} || {{$store.state.role}}
        </div>
        </div>
</template>

<script>
export default {
  name: 'NavbarHome',
  methods: {
    logout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style>

</style>
