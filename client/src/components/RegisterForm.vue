<template>
  <div id="registerCard">
      <!-- <h1>This is supposed to be Login Form</h1> -->
      <div class="card shadow" style="width: 18rem;">
        <img src="../assets/login.svg" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">Register</h5>
              <form>
                <div class="form-group">
                  <label for="emailRegister">Email Address</label>
                  <input type="email" class="form-control" id="emailRegister" aria-describedby="emailHelp">
                  <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                  <label for="passwordRegister">Password</label>
                  <input type="password" class="form-control" id="passwordRegister">
                </div>
                <button type="submit" class="btn btn-primary">Register</button>
              </form>
  </div>
</div>
  </div>
</template>

<script>
export default {
  name: 'RegisterForm'
}
</script>

<style scoped>
#registerCard {
    margin-top: 25px;
    display: flex;
    justify-content: center;
}

</style>
