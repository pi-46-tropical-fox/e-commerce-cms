<template>
  <div class="about">
    <b-form @submit.prevent="onSubmitLogin">
      <b-form-group label="Email">
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Email"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Email">
        <b-form-input
          id="input-1"
          v-model="form.password"
          type="password"
          required
          placeholder="Password"
        ></b-form-input>
      </b-form-group>

         <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
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
        this.$store.dispatch('login')
        console.log(this.form.email)
      }
    }
}
</script>