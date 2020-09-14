<template>
    <div>
        <Login></Login>
        <Register></Register>
        <Home></Home>        
        <h1>{{message}}</h1>
    </div>
</template>

<script>
import Login from "./views/Login"
import Register from "./views/Register"
import Home from "./views/Dashboard"
export default {
    data(){
        page : 'login'
        return {message: "E-Commerce CMS"}
    },
    components:{
        Login,
        Register,
        Home,
    },
    methods:{
        logout(){
            this.page = 'login'
            localStorage.clear()
        },
        changePage(page){
            this.page = page
            if(page === 'Dashboard'){
                this.fetchData()
            }
        },
        fetchData(){
            axios({
                method : 'GET',
                url: 'http://localhost:3000/',
                headers:{
                    access_token : localStorage.access_token
                }
            })
        },
    },
    created(){
        if(localStorage.getItem(access_token)){
            this.page = 'Dashboard'
            this.fetchData()
        }else{
            this.page = 'Login'
        }
    }
}       
</script>

<style lang="stylus">

</style>