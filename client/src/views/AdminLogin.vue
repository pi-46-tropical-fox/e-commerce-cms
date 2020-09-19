<template>
  <div id="login-page">
    <h1>Admin Page</h1>
    <LoginForm></LoginForm>
  </div>
</template>

<script>
  import LoginForm from '../components/admin/LoginForm.vue';

  export default {
    name: 'AdminLogin',
    components:{
      LoginForm
    }
  };
</script>


<style scoped>
  #login-page{
    margin: 20px auto;
  }
  h1{
    text-align: center;
    margin: 40px auto;
  }
</style>
