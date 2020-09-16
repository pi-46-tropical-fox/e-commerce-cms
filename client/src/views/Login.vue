<template>
<div class="d-flex align-items-center min-vh-100">
    <div class="container">
        <form id="form-login" style="max-width: 60%;" class="mx-auto card shadow rounded">
            <div class="card-body">
                <h1 class="display-1 card-title p-2">Login</h1>
                <br>
                <div class="form-group">
                    <label for="login-email">Email address</label>
                    <input type="email" class="form-control" v-model="email">
                </div>
                <div class="form-group">
                    <label for="login-password">Password</label>
                    <input type="password" class="form-control" v-model="password">
                </div>
                <button type="submit" class="btn btn-primary btn-block">Login</button>
            </div>
        </form>
    </div>
</div>
    
</template>
<script>
export default {
    
}
</script>