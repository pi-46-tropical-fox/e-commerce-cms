<template>
  <div class="d-flex my-5 p-5 login-content">
    <div class="mx-auto">
      <lottie-player class="p-0" src="https://assets8.lottiefiles.com/packages/lf20_eKQynt.json"  background="transparent"  speed=".8"  style="width: 700px; height: 700px;"  autoplay></lottie-player>
    </div>

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
