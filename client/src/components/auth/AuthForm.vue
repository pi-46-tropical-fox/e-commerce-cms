<template>
    <div class="card">
        <AuthTab :currentTab="currentTab" @changeTab="setCurrentTab"></AuthTab>

        <div class="wrapper">
            <!-- LoginForm -->
            <LoginForm @login="login" v-if="currentTab === 'login'"></LoginForm>
            <!-- RegisterForm -->
            <RegisterForm @register="register" v-else-if="currentTab === 'register'"></RegisterForm>
        </div>

        <!-- GoogleLogin -->
        <!-- <GoogleLogin v-if="currentTab === 'login'" @googleLogin="googleLogin"></GoogleLogin> -->
    </div>
</template>

<script>
import AuthTab from './AuthTab'
import LoginForm from './LoginForm'
// import RegisterForm from './RegisterForm'
// import GoogleLogin from './GoogleLogin'

export default {
    components: {
        AuthTab,
        LoginForm,
        // RegisterForm,
        // GoogleLogin
    },

    data() {
        return {
            currentTab: 'login'
        }
    },

    methods: {
        setCurrentTab(payload){
            this.currentTab = payload
        },

        login(payload){
            this.$emit('login', payload)
        },

        // register(payload){
        //     this.$emit('register', payload)
        // },

        // googleLogin(googleUser){
        //     this.$emit('googleLogin', googleUser)
        // }
    }
}
</script>

<style>

</style>