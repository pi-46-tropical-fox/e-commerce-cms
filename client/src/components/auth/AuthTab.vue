<template>
    <div class="tab-wrapper">
      <h3>Login</h3>
      <!-- <a href="#" @click.prevent="changeTab('login')">
        <span class="tab" :class="currentTab === 'login' ? 'active' : ''" id="login-tab">Login</span>
      </a> -->
      <!-- <a href="#" @click.prevent="changeTab('register')">
        <span class="tab" :class="currentTab === 'register' ? 'active' : ''" id="register-tab">Register</span>
      </a> -->
    </div>
</template>

<script>
export default {
    props: {
        currentTab: String
    },

    methods: {
        changeTab(name){
            this.$emit('changeTab', name)
        },

        isActive(name){
            return this.currentTab === name
        }
    },

    // computed: {
    //     isActive(name){
    //         return this.currentTab === name
    //     }
    // }
};
</script>

<style>
</style>