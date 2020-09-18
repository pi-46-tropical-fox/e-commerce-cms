<template>
  <div id="loginCard">
      <!-- <h1>This is supposed to be Login Form</h1> -->
      <div class="card shadow" style="width: 18rem;">
        <img src="../assets/authentication.svg" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">Login</h5>
              <form>
                <div class="form-group">
                  <label for="emailLogin">Email Address</label>
                  <input type="email" class="form-control" id="emailLogin" aria-describedby="emailHelp">
                  <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                  <label for="passwordLogin">Password</label>
                  <input type="password" class="form-control" id="passwordLogin">
                </div>
                <!-- <div class="form-group form-check">
                  <input type="checkbox" class="form-check-input" id="exampleCheck1">
                  <label class="form-check-label" for="exampleCheck1">Check me out</label>
                </div> -->
                <button type="submit" class="btn btn-primary">Log In</button>
              </form>
            <!-- <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> -->
            <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
  </div>
</div>
  </div>
</template>

<script>
export default {
  name: 'LoginForm'
}
</script>

<style scoped>
#loginCard {
    margin-top: 25px;
    display: flex;
    justify-content: center;
}

</style>
