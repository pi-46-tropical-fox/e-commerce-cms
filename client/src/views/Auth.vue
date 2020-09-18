<template>
  <div>
    <h1 class="login-text">
     Login
    </h1>
    <LoginForm></LoginForm>
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue'
export default {
  name: 'Auth',
  components: {
    LoginForm
  },
  methods: {
  }
}
</script>

<style>

</style>
