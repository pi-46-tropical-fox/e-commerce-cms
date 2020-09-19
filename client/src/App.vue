<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 10px 20px;
  margin-bottom: 30px;
  background-color: #797a7e;
}

#nav a {
  font-weight: bold;
  color: white;
}

#nav a.router-link-exact-active {
  color: #ffc107;
}
body {
  background: rgb(121,122,126);
  background: linear-gradient(0deg, rgba(121,122,126,1) 8%, rgba(216,211,205,1) 43%, rgba(247,242,231,1) 100%);
  background-attachment: fixed;
}
</style>
