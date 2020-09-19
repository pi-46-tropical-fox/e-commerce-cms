
<template>
  <div class="home vh-100">
    <b-container fluid>
      <b-row class="vh-100">
        <b-col class="left-side">
          <b-container fluid="xs" class="w-75">
            <p>Welcome to Schmetterlingsladen!</p>
            <b-button @click="loginForm" class="button" style="font-family: 'Alata', sans-serif;" size="lg" type="button" name="button">Log in here</b-button>
          </b-container>
        </b-col>
        <b-col cols="5" class="bg-image">
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>

export default {
  name: 'Home',
  methods: {
    loginForm () {
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style scoped>
.home {
  background-color: #FBF7ED;
  font-family: 'Poppins', sans-serif;
}
p {
  font-size: 2em;
  font-weight: bold;
  color: #963a2f;
}
.bg-image {
  background-size: cover;
  background-image: linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url("../assets/gallery.jpeg");
  background-repeat: repeat;
  background-position: 50% 50%;
}
.left-side {
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.button {
  background-color: #a8a676;
}
.button:hover {
  background-color:#963a2f;
}
@media (max-width: 768px) {
  p {
    font-size: 4vw;
  }
  .bg-image {
    background-color: #FBF7ED;
  }
}
</style>