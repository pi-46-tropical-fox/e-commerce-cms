<template>
  <div class="about">
    <form @submit.prevent="onSubmitLogin">
      <div class="form-group">
        <label class="form-label">Email</label>
        <input v-model="form.email" class="form-control" type="text" required placeholder="email">
      </div>
      <div class="form-group">
        <label class="form-label">Password</label>
        <input v-model="form.password" class="form-control" type="password" required placeholder="password">
      </div>
      <input type="submit" class="form-control btn btn-primary">
    </form>
  </div>
</template>

<script>
export default {
    data(){
      return {
        form : {
          email : '',
          password : ''
        }
      }
    },
    methods:{
      onSubmitLogin(){
        this.$store.dispatch('login', {email : this.form.email, password: this.form.password })
      }
    }
}
</script>