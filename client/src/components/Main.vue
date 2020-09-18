<template>
  <div id="home-page">
    <div class="hero-text">
      <h1 class="font-weight-bold">Gadget Space <span><font-awesome-icon icon="rocket" /></span></h1>
      <h2>Your Gadget Solution</h2>
      <h5>Gadget Space is a leading Samsung Premium Reseller in Indonesia specializing in Samsung products and a wide range of complementary accessories, software and other products.</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main'
}
</script>

<style>
#home-page, #login-page {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('../assets/img/samsung-banner.jpg');
  height: 80vh;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}
.hero-text {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
}
.hero-text h1 {
  letter-spacing: 10px;
  font-family:'Londrina Solid', cursive;
}
</style>
