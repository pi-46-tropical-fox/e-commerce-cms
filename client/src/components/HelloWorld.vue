<template>
  <div class="hello container">
    <h1>{{ msg }}</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed ad dolorem a in veritatis error, id sequi. Nihil ducimus sunt, ex, fuga fugiat cum itaque sint reiciendis modi voluptatum alias.</p>
    <div class="container" v-if="$store.state.isLogin === false">
    <h3>Please Sign In To Access Our Collections</h3>
    <ul>
      <li><a href="#" @click.prevent="login">SIgn In</a></li>
    </ul>
    </div>
    <h3 v-if="$store.state.isLogin === true">You're Login, Enjoy!!</h3>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    login () {
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
