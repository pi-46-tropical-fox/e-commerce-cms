<template>
  <div id="nav" style="padding: 30px; background-color: #ffffff00;">
    <div class="btn-group btn-group-toggle" data-toggle="buttons">
      <label class="btn btn-secondary active">
         <router-link type="radio" to="/login">Thrift & Co CMS</router-link>
      </label>
      <!-- <label class="btn btn-secondary">
         <router-link type="radio" to="/register">Register</router-link>
      </label> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavbarLogin',
  methods: {
  }

}
</script>

<style>

</style>
