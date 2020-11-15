<template>
  <div class="container">
    <!-- <NavbarLogin/> -->
     <Loading v-if="$store.state.loadingStatus"/>
      <div class="row mt-5">
          <div class="col-6">
            <img src="../assets/image.png" class="card-img-top" alt="Login Image">
          </div>
          <div class="col-6">
            <img src="../assets/logowebsite.png" class="card-img-top" alt="Login Image" style="width: 40%; height:auto;">
            <form @submit.prevent ="login"
              style="color:rgb(236 173 60);; font-weight: bold; font-size:1.2em;">
                <div class="form-group row">
                    <label for="exampleInputEmail1" class="col-sm-2 col-form-label">Email</label>
                    <div class="col-sm-10">
                    <input type="email" v-model="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
                    <div class="col-sm-10">
                    <input type="password" v-model="password" class="form-control" id="inputPassword">
                    </div>
                </div>
                <div class="btn-group btn-group-toggle ml-5 mt-2" data-toggle="buttons">
                    <button type="submit" class="btn btn-secondary" id="loginbtn">Login</button>
                </div>

            </form>

          </div>
      </div>
  </div>
</template>

<script>
// import NavbarLogin from '../components/NavbarLogin.vue'
import Loading from '../components/Loading.vue'
export default {
  name: 'Login',
  components: {
    Loading
    // NavbarLogin
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  // computed: {
  //   data() {
  //     return this.$store.state.email
  //   }
  // },
  methods: {
    login () {
      const payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('login', payload)
    }
  }

}
</script>

<style>
#loginbtn {
  color: rgb(236 173 60);
  font-weight: bold;
  width: 200px;
}
</style>
