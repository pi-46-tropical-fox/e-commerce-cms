<template>
<div class="container front-container">
    <h1 class="front-text mx-auto mt-5 row">BENZO</h1>
    <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_tyPwHq.json" mode="bounce" background="transparent"  speed="1"  style="width: 500px; height: 500px;"  loop  autoplay></lottie-player>
    <LoginForm class="loginform"></LoginForm>
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
