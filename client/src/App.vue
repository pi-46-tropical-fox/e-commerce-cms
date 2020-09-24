<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
* {
  font-family: 'Poppins', sans-serif;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav a {
  font-weight: bold;
  color: #d7e1eb;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
