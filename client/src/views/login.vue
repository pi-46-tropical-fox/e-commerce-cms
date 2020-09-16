<template>
  <div class="container d-flex">
    <div class="container justify-content-center col-6">
      <h1>foxShop</h1>
      <form @submit.prevent="loginPost">
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            v-model="email"
          />
          <small id="emailHelp" class="form-text text-muted"
            >We'll never share your email with anyone else.</small
          >
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            v-model="password"
          />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name:'login',
  data(){
    return {
      email:'',
      password:''
    }
  },
  methods:{
    loginPost(){
      let userData ={
        email:this.email,
        password:this.password
      }
      this.$store.dispatch('login',userData)
    }
  }
};
</script>

<style></style>
