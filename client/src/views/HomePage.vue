<template>
  <div class="page-wrapper">
    <div class="bg-img">
    <Navbar></Navbar>
      <div id="nav">
      </div>
      <div class="transpar">

      </div>
      <div class="caption-home">
        <p id="caption-1">Grow your healthy mind </p>
        <p id="caption-2">with read a good book</p>
        <div id="shopnow-box">
          <router-link to="/products" class="links" id="shopnow-text" href=""><p>Book</p></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
export default {
  name: 'HomePage',
  components: {
    Navbar
  }
}
</script>

<style scoped>

.bg-img
{
  background: url('../assets/23.png');
  background-size: cover;
  height: 78vh;
  /* min-width: 100%; */
  /* background-repeat: no-repeat; */
  /* min-height: 100%; */
  /* width: 100vh; */
}

.page-wrapper {
  background: rgb(245, 245, 245);
  height: 100vh;
}

/* .homepage-wrapper
{
  width: 85%;
  margin-left: 50px;
} */
/* background: white; */
  /* background-size: cover; */
/* .background-img1 { */
  /* background-image: url("../assets/1.png"); */
  /* background-size: cover; */
  /* background-repeat: no-repeat; */
  /* position: absolute; */
  /* top: 0; */
  /* left: 0; */
  /* width: 500vh; */
  /* min-width: 100%;
  height: 50vh;
  padding: 20px;
} */

/* .bg-img {
  background: url('../assets/23.png');
  background-size: cover;
  min-width: 100%;
  height: 100vh;
} */

.caption-home
{
color: black;
text-align: center;
font-size: 22px;
font-family: 'clarkson_scriptregular, Nunito', sans-serif;
font-weight: 100;
/* margin:400px 300px 300px 450px; */
font-size: 50px;
font-weight:400;
}

#shopnow-box {
  margin: auto;
  border: none;
  outline: none;
  height: 30px;
  max-width: 13%;
  background: #1c8adb;
  color: #fff;
  font-size: 18px;
  border-radius: 20px;
  font-weight: 900;
}

 #shopnow-box:hover
{
  cursor: pointer;
  background: lightblue;
}

#shopnow-text {
  margin: auto;
  font-size: 19px;
  font-weight: 600;
  text-decoration: none;
  color: white;
}

#shopnow-text:hover
{
  color: black;
}
#shopnow-box a:hover
{
  color: black;
}

</style>
