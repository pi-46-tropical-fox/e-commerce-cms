<template>
    <nav class="navbar bg-danger navbar-expand-lg navbar-dark">
         <a class="navbar-brand" href="#"><img style="width:28px;" class="mx-3" src="../assets/icon2.png">Aya CMS</a>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <router-link class="nav-link" to="/">Dashboard</router-link>
                </li>
                <li class="nav-item active">
                    <router-link class="nav-link" to="/logout">Logout</router-link>
                </li>
                </ul>
            </div>
    </nav>
</template>

<script>
export default {
    
}
</script>