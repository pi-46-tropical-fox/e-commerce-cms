<template>
    <div id="login-page">
        <div class="container">
        <div class="form-container bg-dark">
            <div class="heading">
                <h1 class="font-weight-bold">Welcome!</h1>
            </div>
            <div class="form-box">
                <form @submit.prevent="login">
                    <div class="form-input">
                        <span><font-awesome-icon icon="envelope" /></span>
                        <input type="email" placeholder="Email Address" v-model="email" >
                    </div>
                    <div class="form-input">
                        <span><font-awesome-icon icon="lock" /></span>
                        <input type="password" placeholder="Password" v-model="password" >
                    </div>
                    <div style="text-align: left;">
                        <button type="submit" class="btn">Login</button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      const data = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('loginAccount', data)
    }
  }
}
</script>

<style>
#login-page {
  padding: 30px;
}
#login-page .container {
  width: 400px;
}
.heading {
    color: white;
    margin-bottom: 30px;
    letter-spacing: 3px;
    font-weight: bold;
    text-align: center;
}
.form-container{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 71vh;
    box-shadow: 0px 9px 10px -2px rgba(0,0,0,0.55);
    -webkit-box-shadow: 0px 9px 10px -2px rgba(0,0,0,0.55);
    -moz-box-shadow: 0px 9px 10px -2px rgba(0,0,0,0.55);
}
.form-box{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 60%;
    text-align: center;
}
.form-box h4{
    font-weight: bold;
    color: #fff;
}
.form-box .form-input{
    position: relative;
}
.form-box .form-input input{
    width: 100%;
    height: 40px;
    margin-bottom: 20px;
    border:none;
    border-radius: 5px;
    outline: none;
    background: white;
    padding-left: 45px;
    font-weight: bold;
}
.form-box .form-input span{
    position: absolute;
    top: 6px;
    width: 40px;
    color: #777;
    font-size: 17px;
}
.form-box .form-input input::placeholder{
    padding-left: 0px;
}
.form-box .form-input input:focus,
.form-box .form-input input:valid{
    border-bottom: 2px solid #48403d;
}
.form-box button[type="submit"]{
    border: none;
    cursor: pointer;
    width: 150px;
    height: 40px;
    border-right: 5px;
    background-color: #fff;
    color: #000;
    font-weight: bold;
    border-radius: 5px;
    margin-bottom: 10px;
    transition: 0.5s;
}

.form-box button[type="submit"]:hover{
    box-shadow: 0px 9px 10px -2px rgba(0,0,0,0.55);
    -webkit-box-shadow: 0px 9px 10px -2px rgba(0,0,0,0.55);
    -moz-box-shadow: 0px 9px 10px -2px rgba(0,0,0,0.55);
    background-color: #343a40;
    color: white;
    border: 2px solid white;
}
a {
    text-decoration: none;
}
</style>
