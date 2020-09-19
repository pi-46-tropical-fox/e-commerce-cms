<template>
  <div class="container d-flex justify-content-center align-items-center" style="height:100vh">
    <div class="container col-6">
      <h1 style="text-align:center;font-weght:bolder;" class="mb-3">foxShop</h1>
      <form @submit.prevent="loginPost">
        <div class="container" id="form" style="background:#fff">
          <div class="form-group">
          <label for="exampleInputEmail1">Email address :</label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            v-model="email"
            placeholder="email@foxShop.com"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password :</label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            v-model="password"
            placeholder="*****"
          />
        </div>
        
        </div>
        <div class="container d-flex justify-content-center" style="width:100%">
        <button type="submit" class="btn">Login</button>
        </div>
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

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@700&family=Poppins:ital,wght@1,600&display=swap');

h1{
  font-family: "Josefin Sans", sans-serif;
  font-size: 50px;
  background-color: #2c3e50;
  color: #fff;
  padding-top: 20px;
}
label{
font-family: 'Oswald', sans-serif;
font-family: 'Poppins', sans-serif
}
.btn{
  background-color:#2c3e50 ;
  color: #fff;
  border-radius: 0;
  font-family: "Josefin Sans", sans-serif;
  font-size: large;
}
.btn:hover{
  color: #2c3e50;
  background-color: #fff;
}
</style>
